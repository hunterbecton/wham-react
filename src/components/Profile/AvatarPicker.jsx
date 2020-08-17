import React, { useEffect, useMemo, useState } from 'react'
import Uppy from '@uppy/core'
import { DashboardModal } from '@uppy/react'
import XHRUpload from '@uppy/xhr-upload';
import ImageEditor from '@uppy/image-editor'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css';

import Button from '../Button/Button'
import './picker.css'

const AvatarPicker = ({ setFieldValue }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                getResponseData(responseText) {
                    console.log(responseText);
                    return {
                        fileName: responseText,
                    };
                },
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
            .on('file-editor:start', (file) => {
                console.log(file)
            })
            .on('file-editor:complete', (updatedFile) => {
                console.log(updatedFile)
            })
            .on('upload-success', (file, response) => {
                console.log('response.status', response.status);
                console.log('response.body', response.body);
            });
    }, []);

    useEffect(() => {
        return () => uppy.close()
    }, [uppy])

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
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
        </div>
    )
}

export default AvatarPicker