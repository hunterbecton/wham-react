import React, { Fragment, useRef } from 'react'
import { navigate } from '@reach/router'
import { Emoji } from 'emoji-mart'
import useSound from 'use-sound'
import { generate } from "short-id";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';

import { apiGetSession, apiGetNewCustomerId } from '../../api/Payment'
import { useSoundboard } from '../../hooks/useSoundboard'
import homepageSounds from '../Homepage/homepageSounds'
import MaxWidthSection from '../Layout/MaxWidthSection'
import MainLayout from '../Layout/MainLayout'
import HomepageHeader from '../Homepage/HomepageHeader'
import HomepageHeading from '../Homepage/HomepageHeading'
import HomepageSubHeading from '../Homepage/HomepageSubHeading'
import Button from '../Button/Button'
import SoundboardContainer from '../Sound/SoundboardContainer'
import EmojiButton from '../Emoji/EmojiButton'
import EmojiBubbleContainer from '../Emoji/EmojiBubbleContainer'
import EmojiHomeBubble from '../Emoji/EmojiHomeBubble'
import AutoExpireHome from '../Emoji/AutoExpireHome'
import HomepageProContainer from '../Homepage/HomepageProContainer'
import HomepageProFeatures from '../Homepage/HomepageProFeatures'
import HomepageProFeature from '../Homepage/HomepageProFeature'
import Sound from '../../images/sound.svg'
import Infinity from '../../images/infinity.svg'
import Key from '../../images/key.svg'
import { useAuth } from '../../hooks/useAuth'

const stripePromise = loadStripe('pk_live_51HFi8kD0C39kKgHjE5ZXplCTM9AUi708a861j9pZRlHKmXLbC4pk9jvFxQF3wV8TrThHUq5ECOLwz8Cfn20lVbsO00XrQv4i9Y')

const Home = () => {

    const { user } = useAuth()

    const buttonRefs = useRef([])

    const { soundboard, setSoundboard } = useSoundboard()

    const sprite = 'https://storage.googleapis.com/wham-uploads/sprite-user-5f0f34fc760271797fa93c86-1597248646837.mp3'

    const timesArray = homepageSounds.map(sound => sound.times)

    const spriteObj = Object.assign(
        ...timesArray.map((time, i) => ({ [i]: time })),
    )

    const [play] = useSound(sprite, {
        sprite: spriteObj
    })

    const randomNumber = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomPosOrNeg = (max, min) => {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        randomNumber *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

        return randomNumber;
    };

    const handlePlayClick = (emojiId, emojiNative, i) => {
        play({ id: String(i) })

        setSoundboard({
            type: "ADD_EMOJI", payload: {
                emojiId,
                emojiNative,
                size: randomNumber(3, 2),
                left: randomNumber(100, 0),
                one: randomPosOrNeg(200, 50),
                two: randomPosOrNeg(200, 50),
                id: generate()
            }
        })
    }

    const handlePlayEnter = (emojiId, emojiNative, e, i) => {
        if (e.key === 'Enter') {
            play({ id: String(i) })

            setSoundboard({
                type: "ADD_EMOJI", payload: {
                    emojiId,
                    emojiNative,
                    size: randomNumber(3, 2),
                    left: randomNumber(100, 0),
                    one: randomPosOrNeg(200, 50),
                    two: randomPosOrNeg(200, 50),
                    id: generate()
                }
            })
        }
    }

    const handleCheckout = async () => {
        let customerId

        // Create customer Id if user doesn't have one
        if (!user.customerId) {
            const customer = await apiGetNewCustomerId()

            customerId = customer.customerId
        }

        if (user.customerId) {
            customerId = user.customerId
        }

        const { session } = await apiGetSession('5f3c2e2776180200046c9e68', customerId)

        const sessionId = session.id

        const stripe = await stripePromise

        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });

        // Handle error
        if (error) {
            toast.error('Could not redirect to checkout.')
        }

    }

    return (
        <Fragment>
            <MainLayout>
                <MaxWidthSection>
                    <HomepageHeader>
                        <HomepageHeading>Chat with Sound</HomepageHeading>
                        <HomepageSubHeading>Create custom soundboards and invite others
            to play along in real time.</HomepageSubHeading>
                        <Button s="l" type="button" onClick={() => user ? navigate('/soundboard/create') : navigate('/signup')}>Create a board</Button>
                    </HomepageHeader>
                </MaxWidthSection>
                <SoundboardContainer gtm='2rem' gsm='2rem' gts="2rem" gss="2rem">
                    {homepageSounds.map((sound, i) => (
                        <EmojiButton key={sound.uid} innerRef={el => (buttonRefs.current[i] = el)}
                            endl="span 2"
                            endm="span 2"
                            ends="span 3"
                            onClick={() => handlePlayClick(sound.emojiId, sound.emojiNative, i)}
                            onKeyDown={e => handlePlayEnter(sound.emojiId, sound.emojiNative, e, i)}
                        >
                            <Emoji
                                emoji={sound.emojiId}
                                skin={Number(sound.emojiSkin)}
                                size={64}
                                native={true}
                            />
                        </EmojiButton>
                    ))}
                </SoundboardContainer>
                <MaxWidthSection>
                    <HomepageHeader margin="8rem 0">
                        <HomepageHeading>Do More with Pro</HomepageHeading>
                        <HomepageSubHeading mb="0">Unlock more fun for $14.99 a year.</HomepageSubHeading>
                        <HomepageProContainer className="homepage-pro">
                            <HomepageProFeatures>
                                <HomepageProFeature image={Sound} alt="sound icon" text="Upload your own sounds"></HomepageProFeature>
                                <HomepageProFeature image={Infinity} alt="infinity icon" text="Create unlimited soundboards"></HomepageProFeature>
                                <HomepageProFeature image={Key} alt="key icon" text="Access all future releases"></HomepageProFeature>
                            </HomepageProFeatures>
                        </HomepageProContainer>
                        <Button s="l" type="button" onClick={() => user ? handleCheckout() : navigate('/signup', { state: { checkout: true } })}>Go Pro</Button>
                    </HomepageHeader>
                </MaxWidthSection>
            </MainLayout>
            <EmojiBubbleContainer>
                {soundboard.emojis.emojiQueue.map(({ id, emojiId, emojiNative, size, left, one, two }) => (
                    <AutoExpireHome key={id} id={id}>
                        <EmojiHomeBubble
                            label={emojiId}
                            symbol={emojiNative}
                            size={size}
                            left={left}
                            one={one}
                            two={two}
                        />
                    </AutoExpireHome>
                ))}
            </EmojiBubbleContainer>
        </Fragment>)
}

export default Home
