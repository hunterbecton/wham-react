import React, { Fragment } from 'react'
import { navigate, useLocation } from '@reach/router'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';

import { useAuth } from '../../hooks/useAuth'
import { apiGetSession } from '../../api/Payment'
import MainLayout from '../Layout/MainLayout'
import AuthContainer from './AuthContainer'
import AuthWrapper from './AuthWrapper'
import Button from '../Button/Button'
import AuthText from './AuthText'
import AuthTextWrapper from './AuthTextWrapper'
import AuthTitle from './AuthTitle'
import ForgotPasswordLink from './ForgotPasswordLink'

const stripePromise = loadStripe('pk_test_51HFi8kD0C39kKgHjteaD3LI3RVQgyIG6VN168QWB0fJg8PqELqC8OBVEXyjAX6xSaUsvSnT4TwxtTefhSmw9sqwj00D3t6JcEi')

const SignupForm = () => {
  const { signup } = useAuth()

  const location = useLocation()

  const initialData = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  }

  const validationSchema = Yup.object().shape({
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
            username: value
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
            email: value
          }),
        })
          .then(res => res.json())
          .then(data => data.data.available)
      })
    ,
    password: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must be at least 8 characters and include 1 of each: lowercase letter, uppercase letter, number, and symbol',
      ),
    passwordConfirm: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  })


  const handleCheckout = async () => {
    const { session } = await apiGetSession('5f357add0fa1f0135fff5972')

    const sessionId = session.id

    const stripe = await stripePromise

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    // Handle error
    if (error) {
      console.log(error.message)
    }

  }

  const onSubmit = async data => {
    try {
      const res = await signup(data)

      if (res.status === 'success' && !location.state.checkout) {
        navigate('/dashboard')
      }

      if (res.status === 'success' && location.state.checkout) {
        handleCheckout()
      }


      if (res.status === 'fail' || res.status === 'error') {
        toast.error('Invalid credentials.')
      }

    } catch (error) {
      toast.error('Invalid credentials.')
    }
  }

  return (
    <MainLayout>
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnBlur={true}
        validateOnChange={false}
      >
        {({ isValid, isSubmitting }) => (
          <Fragment>
            <AuthContainer>
              <AuthTitle margin="2rem 0 0 0">Signup</AuthTitle>
              <AuthWrapper>
                <Form>
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
                  <AuthTextWrapper margin="2rem 0 0 0">
                    <AuthText
                      control="input"
                      type="text"
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      autoComplete="on"
                    />
                  </AuthTextWrapper>
                  <AuthTextWrapper margin="2rem 0 0 0">
                    <AuthText
                      control="input"
                      type="password"
                      label="Password"
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="off"
                    />
                  </AuthTextWrapper>
                  <AuthTextWrapper margin="2rem 0 1.5rem 0">
                    <AuthText
                      control="input"
                      type="password"
                      label="Confirm Password"
                      name="passwordConfirm"
                      placeholder="Confirm Password"
                      autoComplete="off"
                    />
                  </AuthTextWrapper>
                  <Button size="s" disabled={!isValid || isSubmitting} type="submit">
                    Signup
                  </Button>
                </Form>
                <ForgotPasswordLink to="/login">Already a user? Login.</ForgotPasswordLink>
              </AuthWrapper>
            </AuthContainer>
          </Fragment>
        )}
      </Formik>
    </MainLayout>
  )
}

export default SignupForm