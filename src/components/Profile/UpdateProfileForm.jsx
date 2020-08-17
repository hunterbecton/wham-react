import React, { Fragment, useEffect, useMemo, useState, useRef } from 'react'
import { navigate } from '@reach/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import Uppy from '@uppy/core'
import { DashboardModal } from '@uppy/react'
import XHRUpload from '@uppy/xhr-upload';
import ImageEditor from '@uppy/image-editor'

import { apiGetMe, apiUpdateMe } from '../../api/User'
import { apiGetPortalSession } from '../../api/Payment'
import { useAuth } from '../../hooks/useAuth'
import MainLayout from '../Layout/MainLayout'
import AuthContainer from '../Auth/AuthContainer'
import AuthWrapper from '../Auth/AuthWrapper'
import Button from '../Button/Button'
import AuthText from '../Auth/AuthText'
import AuthTextWrapper from '../Auth/AuthTextWrapper'
import AuthTitle from '../Auth/AuthTitle'
import UploaderWrapper from '../Profile/UploaderWrapper'
import Profile from './Profile'
import Loading from '../Loading/Loading'
import ProfileHeader from './ProfileHeader'
import Error from '../Error/Error'
import NavLinkButton from '../Navigation/NavLinkButton'

import '../Profile/picker.css'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css';

const UpdateProfileForm = () => {

    const formikRef = useRef()

    const { user, logout } = useAuth()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isError, setIsError] = useState(false)

    const [initialData, setInitialData] = useState(null)

    const uppy = useMemo(() => {
        // Do all the configuration here
        return new Uppy({
            allowMulipleUploads: false,
            restrictions: {
                maxFileSize: 15 * 1024 * 1024,
                maxNumberOfFiles: 1,
                allowedFileTypes: ['.jpg', '.jpeg', '.png'],
            },
        })
            .use(XHRUpload, {
                id: 'XHRUploader',
                endpoint: `${process.env.REACT_APP_API_ENDPOINT}/users/uploadProfile`,
                formData: true,
                withCredentials: true,
                fieldName: 'photo',
                limit: 1,
            })
            .use(ImageEditor, {
                quality: 0.8,
                cropperOptions: {
                    viewMode: 1,
                    background: false,
                    autoCropArea: 1,
                    responsive: true,
                    initialAspectRatio: 1,
                    aspectRatio: 1,
                },
            })
            .on('upload-success', (file, response) => {
                formikRef.current.setFieldValue('photo', response.body.data.gcsUrl)
            });
    }, []);

    // Load data for form
    useEffect(() => {
        // Define async function and call it later
        const fetchData = async sbId => {
            try {
                const data = await apiGetMe()

                // If success set data
                if (data.status === 'success') {

                    setInitialData({
                        username: data.data.data.username,
                        email: data.data.data.email,
                        photo: data.data.data.photo,
                    })

                    return
                }

                if (data.status !== 'success') {
                    switch (data.error.statusCode) {
                        case 401:
                            return navigate('/login')
                        default:
                            return navigate('/login')
                    }
                }


            } catch (error) {
                setIsError(true)
            }
        }

        fetchData()

        return () => setInitialData(null)

    }, [])

    // Clean up uppy on unmount
    useEffect(() => {
        return () => uppy.close()
    }, [uppy])

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const validationSchema = Yup.object().shape({
        photo: Yup.string().required('Required'),
        username: Yup.string()
            .required('Required')
            .matches(
                /^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
                'Invalid username',
            )
            .test(/* name */ 'unique-username',  /* failure message */ 'Username already in use', function (value) {
                return fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/usernameAvailable`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: value,
                        currentUsername: user.username,
                    }),
                })
                    .then(res => res.json())
                    .then(data => data.data.available)
            })
        ,
        email: Yup.string()
            .required('Required')
            .matches(
                /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
                'Invalid email',
            )
            .test(/* name */ 'unique-email',  /* failure message */ 'Email already in use', function (value) {
                return fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/emailAvailable`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: value,
                        currentEmail: user.email
                    }),
                })
                    .then(res => res.json())
                    .then(data => data.data.available)
            })
    })

    const onSubmit = async data => {
        try {
            const res = await apiUpdateMe(data)

            if (res.status === 'success') {
                toast('Profile updated! 🥳')
            }

            if (res.status === 'fail' || res.status === 'error') {
                toast.error('Could not update profile.')
            }

        } catch (error) {
            toast.error('Could not update profile.')
        }
    }

    const handleCustomerPortal = async (customerId) => {
        try {
            const res = await apiGetPortalSession(customerId)

            if (res.status === 'success') {
                // Navigate to stripe customer portal
                navigate(res.session.url)
            }

            if (res.status !== 'success') {
                toast.error('Could not find customer portal.')
            }
        } catch (error) {
            toast.error('Could not find customer portal.')
        }
    }

    if (isError) {
        return (
            <Fragment>
                <MainLayout>
                    <Error />
                </MainLayout>
            </Fragment>
        )
    }

    if (!initialData) {
        return (
            <Fragment>
                <MainLayout>
                    <Loading />
                </MainLayout>
            </Fragment>
        )
    }

    if (initialData) {
        return (
            <MainLayout>
                <Formik
                    innerRef={formikRef}
                    initialValues={initialData}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnBlur={true}
                    validateOnChange={false}
                >
                    {({ isValid, isSubmitting, setFieldValue, values }) => (
                        <Fragment>
                            <AuthContainer>
                                <ProfileHeader>
                                    <AuthTitle>Profile</AuthTitle>
                                    <div>
                                        <NavLinkButton onClick={logout} type="button">Logout</NavLinkButton>
                                        {user.customerId &&
                                            <NavLinkButton onClick={() => handleCustomerPortal(user.customerId)} type="button">Manage Billing</NavLinkButton>
                                        }
                                    </div>
                                </ProfileHeader>
                                <AuthWrapper>
                                    <Form>
                                        <UploaderWrapper>
                                            <label htmlFor="photo">Photo</label>
                                            <Profile photo={values.photo} />
                                            <Button size="s" onClick={handleOpen}>Upload</Button>
                                            <DashboardModal
                                                uppy={uppy}
                                                closeModalOnClickOutside
                                                open={isModalOpen}
                                                onRequestClose={handleClose}
                                                plugins={['Instagram', 'ImageEditor']}
                                                metaFields={[
                                                    { id: 'name', name: 'Name', placeholder: 'File name' },
                                                ]}
                                                locale={{
                                                    strings: {
                                                        dropPasteImport: 'Drop here or %{browse}'
                                                    }
                                                }}
                                                proudlyDisplayPoweredByUppy={false}
                                                theme="dark"
                                            />
                                        </UploaderWrapper>
                                        <AuthTextWrapper>
                                            <AuthText
                                                control="input"
                                                type="text"
                                                label="Username"
                                                name="username"
                                                placeholder="Enter your username"
                                                autoComplete="off"
                                            />
                                        </AuthTextWrapper>
                                        <AuthTextWrapper margin="2rem 0 1.5rem 0">
                                            <AuthText
                                                control="input"
                                                type="text"
                                                label="Email"
                                                name="email"
                                                placeholder="Enter your email"
                                                autoComplete="on"
                                            />
                                        </AuthTextWrapper>
                                        <Button size="s" disabled={!isValid || isSubmitting} type="submit">
                                            Update
                                        </Button>
                                    </Form>
                                </AuthWrapper>
                            </AuthContainer>
                        </Fragment>
                    )}
                </Formik>
            </MainLayout>
        )
    }
}

export default UpdateProfileForm