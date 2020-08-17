import React, { Fragment, useEffect, useState } from 'react'
import parse from 'html-react-parser';

import MainLayout from '../Layout/MainLayout'
import MaxWidthSection from '../Layout/MaxWidthSection'
import Loading from '../Loading/Loading'
import PrivacyContainer from '../Privacy/PrivacyContainer'

const Privacy = () => {

    const [policyContent, setPolicyContent] = useState(null)

    useEffect(() => {
        let policy
        const getPolicy = async () => {
            policy = await fetch('https://www.iubenda.com/api/terms-and-conditions/27052442')
            const policyDetails = await policy.json()
            setPolicyContent(policyDetails.content)
        }

        getPolicy()
    }, [])

    if (!policyContent) {
        return (
            <Fragment>
                <MainLayout>
                    <Loading />
                </MainLayout>
            </Fragment>
        )
    }

    return (
        <MainLayout>
            <MaxWidthSection>
                <PrivacyContainer>
                    {parse(policyContent)}
                </PrivacyContainer>
            </MaxWidthSection>
        </MainLayout>
    )

}

export default Privacy
