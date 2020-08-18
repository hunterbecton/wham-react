import React, { Fragment, useEffect, useState, useRef } from 'react'
import { navigate } from '@reach/router'
import io from 'socket.io-client'
import useSound from 'use-sound'
import { Emoji } from 'emoji-mart'
import { generate } from "short-id";

import { useSoundboard } from '../../hooks/useSoundboard'
import { apiGetSoundboard } from '../../api/Soundboard'
import MainLayout from '../Layout/MainLayout'
import EmojiButton from '../Emoji/EmojiButton'
import SoundboardContainer from './SoundboardContainer'
import AutoExpire from '../Emoji/AutoExpire'
import EmojiBubble from '../Emoji/EmojiBubble'
import EmojiBubbleContainer from '../Emoji/EmojiBubbleContainer'
import SoundboardHeader from './SoundboardHeader';
import Loading from '../Loading/Loading';
import Error from '../Error/Error'
import SoundboardModal from './SoundboardModal'

let socket

const Soundboard = props => {

  const { soundboard, setSoundboard } = useSoundboard()

  const [initialData, setInitialData] = useState({})

  const [spriteObj, setSpriteObj] = useState({})

  const [isError, setIsError] = useState(false)

  const [isHowlerLoaded, setIsHowlerLoaded] = useState(false)

  const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomPosOrNeg = (max, min) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    randomNumber *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;

    return randomNumber;
  };

  // Load soundboard data
  useEffect(() => {
    // Define async function and call it later
    const fetchData = async sbId => {
      const data = await apiGetSoundboard(sbId)

      // If success set data
      if (data.status === 'success') {
        const soundboard = data.data.soundboard

        setInitialData(soundboard)
      }

      if (data.status !== 'success') {
        switch (data.error.statusCode) {
          case 401:
            return navigate('/login')
          default:
            return navigate('/login')
        }
      }
    }

    // If soundboard ID is passed in get the data
    if (props.sbId) {
      fetchData(props.sbId)
    }

    if (!props.sbId) {
      setIsError(true)
    }
  }, [])

  // Set sprite object
  useEffect(() => {
    if (initialData.sounds) {
      const timesArray = initialData.sounds.map(sound => sound.times)

      const spriteObj = Object.assign(
        ...timesArray.map((time, i) => ({ [i]: time })),
      )

      setSpriteObj(spriteObj)
    }
  }, [initialData.sounds])

  const silentRefs = useRef([])

  const buttonRefs = useRef([])

  // Create websocket
  useEffect(() => {
    const room = props.sbId

    socket = io(`${process.env.REACT_APP_API}`)

    socket.emit('join', room)

    socket.on('sound', id => {
      silentRefs.current[id].click()
    })

    socket.on('emoji', ({ emojiId, emojiNative }) => {
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
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [])

  // Cleanup global emojiQueue on unmount
  useEffect(() => {
    return () => {
      setSoundboard({ type: "RESET_EMOJI" })
    }
  }, [])

  const [play, { sound }] = useSound(initialData.sprite, {
    onload: () => {
      setIsHowlerLoaded(true)
    },
  })

  useEffect(() => {
    if (isHowlerLoaded) {
      sound._sprite = spriteObj
    }
  }, [isHowlerLoaded])

  const handlePlayClick = (emojiId, emojiNative, i) => {
    socket.emit('sound', i)

    socket.emit('emoji', { emojiId, emojiNative })

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
      socket.emit('sound', i)

      socket.emit('emoji', { emojiId, emojiNative })

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

  const handlePsuedoClick = i => {
    play({ id: String(i) })
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

  if (!initialData || !initialData.sounds) {
    return (
      <Fragment>
        <MainLayout>
          <Loading />
        </MainLayout>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <SoundboardModal>

      </SoundboardModal>
      <MainLayout >
        <SoundboardHeader title={initialData.title} />
        <SoundboardContainer gtm='2rem' gsm='2rem' gts="2rem" gss="2rem">
          {initialData.sounds.map((sound, i) => (
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
        {initialData.sounds.map((sound, i) => (
          <span
            style={{ pointerEvents: 'none', position: 'absolute' }}
            key={i}
            role="button"
            aria-label="hidden button"
            tabIndex="-1"
            ref={el => (silentRefs.current[i] = el)}
            onClick={() => handlePsuedoClick(i)}
            onKeyDown={() => handlePsuedoClick(i)}
          />
        ))}
      </MainLayout>
      <EmojiBubbleContainer>
        {soundboard.emojis.emojiQueue.map(({ id, emojiId, emojiNative, size, left, one, two }) => (
          <AutoExpire key={id} id={id}>
            <EmojiBubble
              label={emojiId}
              symbol={emojiNative}
              size={size}
              left={left}
              one={one}
              two={two}
            />
          </AutoExpire>
        ))}
      </EmojiBubbleContainer>
    </Fragment>)

}

export default Soundboard
