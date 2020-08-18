import React, { useState, useEffect, Fragment } from 'react'
import { navigate } from '@reach/router'
import { generate } from 'shortid'
import { Formik, Form, FieldArray, ErrorMessage } from 'formik'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import * as Yup from 'yup'
import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'
import Sound from 'react-sound'
import { toast } from 'react-toastify';

import defaultSounds from '../../sounds/defaultSounds'
import { useAuth } from '../../hooks/useAuth'
import {
  apiCreateSoundboard,
  apiUploadSounds,
  apiGetMySoundboard,
  apiUpdateMySoundboard,
} from '../../api/Soundboard'
import TextError from '../Form/TextError'
import EditorTitle from './EditorTitle'
import MainLayout from '../Layout/MainLayout'
import EditorWrapper from '../Editor/EditorWrapper'
import EditorContainer from './EditorContainer'
import EditorSection from './EditorSection'
import EditorSectionTitle from './EditorSectionTitle'
import EditorSelect from './EditorSelect'
import Button from '../Button/Button'
import Loading from '../Loading/Loading';
import SoundSection from './SoundSection'
import SettingsSection from './SettingsSection'
import EditButtons from './EditButtons'
import EditorToggleWrapper from './EditorToggleWrapper'
import EditorToggle from './EditorToggle'
import EditorFieldWrapper from './EditorFieldWrapper'
import UploadButton from './UploadButton'
import EditorUploadWrapper from './EditorUploadWrapper'
import EditorPlayWrapper from './EditorPlayWrapper'
import EditorEmojiWrapper from './EditorEmojiWrapper'
import EditorEmojiSelect from './EditorEmojiSelect'
import Loader from '../../images/loader.svg'
import Error from '../Error/Error'

const SoundboardEditor = props => {

  const [isError, setIsError] = useState(false)

  const [initialData, setInitialData] = useState(null)

  const [emojiOpen, setEmojiOpen] = useState([])

  const [customSoundIds, setCustomSoundIds] = useState([])

  const [playingSounds, setPlayingSounds] = useState([])

  const [uploadingSounds, setUploadingSounds] = useState([])

  const { user } = useAuth()

  // Stop sound debug
  useEffect(() => {
    window.soundManager.setup({ debugMode: false })
  }, [])

  // Load data for form
  useEffect(() => {
    // Define async function and call it later
    const fetchData = async sbId => {
      try {
        const data = await apiGetMySoundboard(sbId)

        // If success set data
        if (data.status === 'success') {
          const soundboard = data.data.soundboard

          // Create new array of sounds from data
          let sounds = Array.from(soundboard.sounds);
          let customSoundIds = []

          // Find all the custom sounds
          const customSounds = sounds.filter(sound => sound.custom)

          // Map custom sound Ids if exist
          if (customSounds.length > 0) {
            customSoundIds = customSounds.map(sound => sound.uid)
            // Add to customSound state array
            setCustomSoundIds(customSoundIds)
          }

          return setInitialData({
            title: soundboard.title,
            status: soundboard.status,
            sounds: soundboard.sounds,
          })
        }

        // If error set error
        setIsError(true)

      } catch (error) {
        // If error set error
        setIsError(true)
      }
    }

    // If soundboard ID is passed in get the data
    if (props.sbId) {
      fetchData(props.sbId)
    }

    if (!props.sbId) {
      // Else set initial values to empty
      setInitialData({
        title: '',
        status: 'drafted',
        sounds: [
          {
            title: '',
            audio: '',
            emojiId: 'star-struck',
            emojiSkin: 1,
            emojiNative: '🤩',
            uid: generate(),
            audioFile: '',
            custom: false,
          },
        ],
      })
    }
  }, [])

  const statusOptions = [
    { key: 'Drafted', value: 'drafted' },
    { key: 'Published', value: 'published' },
    { key: 'Archived', value: 'archived' },
  ]

  const soundOptions = defaultSounds

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    sounds: Yup.array().of(
      Yup.object().shape({
        audio: Yup.string().required('Required'),
        emojiId: Yup.string().required('Required'),
      }),
    ),
    // .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
    // .min(3, 'Minimum of 3 friends'),
  })

  const notifyCreateSuccess = () => {
    toast('Soundboard created! 🥳')
  }

  const notifyUpdateSuccess = () => {
    toast('Soundboard updated! 🥳')
  }

  const notifyUpdateError = () => {
    toast.error('Could not update soundboard.')
  }

  const notifyCreateError = () => {
    toast.error('Could not create soundboard.')
  }

  const onSubmit = async data => {
    // Edit post if id passed in
    if (props.sbId) {
      try {
        const res = await apiUpdateMySoundboard(data, props.sbId)

        if (res.status === 'success') {
          notifyUpdateSuccess()
        }

        if (res.status === 'fail') {
          notifyUpdateError()
        }
      } catch (error) {
        notifyUpdateError()
      }
    }

    // Create new post if no id passed in
    if (!props.sbId) {
      try {
        const res = await apiCreateSoundboard(data)

        if (res.status === 'success') {
          // Navigate to edit page
          navigate(`/soundboard/edit/${res.data.soundboard.id}`)
          notifyCreateSuccess()
        }

        if (res.status === 'fail') {
          notifyCreateError()
        }

      } catch (error) {
        notifyCreateError()
      }
    }
  }

  const handleUploadAudio = async (
    e,
    index,
    uid,
    setFieldValue,
    setFieldError,
  ) => {
    // Add file to be upload status
    setUploadingSounds([...uploadingSounds, uid])
    try {
      const res = await apiUploadSounds(e.currentTarget.files[0])

      if (res.status !== 'success') {
        setFieldError(`sounds[${index}].audio`, 'Error uploading file')
      }

      if (res.status === 'success') {
        setFieldValue(`sounds[${index}].audio`, res.data.gcsUrl)
      }
    } catch (error) {
      setFieldError(`sounds[${index}].audio`, 'Error uploading file')
    }

    // Reset audio file field
    setFieldValue(`sounds[${index}].audioFile`, '')

    // Remove uid from uploading
    const newArray = uploadingSounds.filter(sound => sound !== uid)
    setUploadingSounds(newArray)
  }

  const handleDeleteAudio = async (index, values, setFieldValue) => {
    // const filename = values.sounds[index].audio

    // try {
    //   const res = await apiDeleteSound(filename)
    // } catch (error) {
    //   console.log(error)
    // }

    setFieldValue(`sounds[${index}].audio`, '')
    setFieldValue(`sounds[${index}].audioFile`, '')
  }

  const handleSetCustomSoundIds = async (uid, index, values, setFieldValue) => {
    // Check if array has value and add if false
    if (!customSoundIds.includes(uid)) {
      // Reset current audio url
      setFieldValue(`sounds[${index}].audio`, '')
      setFieldValue(`sounds[${index}].custom`, true)
      return setCustomSoundIds([...customSoundIds, uid])
    }

    // Avoid error when no audio has been uploaded
    if (customSoundIds.includes(uid) && !values.sounds[index].audio) {
      // Remove the item from the array
      const newArray = customSoundIds.filter(
        customSoundId => customSoundId !== uid,
      )
      setFieldValue(`sounds[${index}].custom`, false)

      // Set custom field to false

      return setCustomSoundIds(newArray)
    }

    // Handle when audio has been uploaded
    // and toggling back to default audio
    if (customSoundIds.includes(uid) && values.sounds[index].audio) {
      handleDeleteAudio(index, values, setFieldValue)

      // Reset current audio url
      setFieldValue(`sounds[${index}].audio`, '')
      setFieldValue(`sounds[${index}].custom`, false)

      // Remove the item from the array
      const newArray = customSoundIds.filter(
        customSoundId => customSoundId !== uid,
      )
      setCustomSoundIds(newArray)
    }
  }

  const handlePlay = uid => {
    // Check if array has value and add if false
    if (!playingSounds.includes(uid)) {
      return setPlayingSounds([...playingSounds, uid])
    }
  }

  const handleEndPlay = uid => {
    // Remove the item from the array
    const newArray = playingSounds.filter(
      playingSounds => playingSounds !== uid,
    )
    setPlayingSounds(newArray)
  }

  const handleOnDragEnd = (result, values, setFieldValue) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    const newSoundIds = Array.from(values.sounds)

    const movedItemContent = newSoundIds[source.index]

    newSoundIds.splice(source.index, 1)
    newSoundIds.splice(destination.index, 0, movedItemContent)

    setFieldValue('sounds', newSoundIds)
  }

  const handleEmojiOpen = uid => {
    if (!emojiOpen.includes(uid)) {
      return setEmojiOpen([...emojiOpen, uid])
    }
    // Remove the item from the array
    const newArray = emojiOpen.filter(emojiId => emojiId !== uid)
    return setEmojiOpen(newArray)
  }

  const handleEmojiClick = (emoji, index, uid, setFieldValue, values) => {

    if (!emoji.skin) {
      setFieldValue(`sounds[${index}].emojiId`, emoji.id)
      setFieldValue(`sounds[${index}].emojiNative`, emoji.native)
    }

    if (emoji.id && emoji.skin && emoji.native) {
      setFieldValue(`sounds[${index}].emojiId`, emoji.id)
      setFieldValue(`sounds[${index}].emojiSkin`, emoji.skin)
      setFieldValue(`sounds[${index}].emojiNative`, emoji.native)
    }

    handleEmojiOpen(uid)
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
      <MainLayout margin="0 0 5rem 0">
        <EditorWrapper>
          <EditorContainer>
            <Formik
              initialValues={initialData}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                setFieldValue,
                setFieldError,
                handleBlur,
                isValid,
                isSubmitting,
              }) => (
                  <Form>
                    <EditorTitle
                      control="input"
                      type="text"
                      label=""
                      name="title"
                      maxLength="45"
                      placeholder="Enter soundboard title"
                      autoComplete="off"
                    />
                    <SettingsSection>
                      <EditorSectionTitle>Settings</EditorSectionTitle>
                      <Button disabled={!isValid || isSubmitting} type="submit">
                        Save
                    </Button>
                    </SettingsSection>
                    <EditorSection>
                      <EditorSelect
                        control="select"
                        label="Soundboard Status"
                        name="status"
                        options={statusOptions}
                      />
                    </EditorSection>
                    <EditorSectionTitle margin="2rem 0 1rem 0">Sounds</EditorSectionTitle>
                    <FieldArray name="sounds">
                      {({ push, remove, form }) => {
                        const { values } = form
                        const { sounds } = values
                        return (
                          <DragDropContext
                            onDragEnd={result =>
                              handleOnDragEnd(result, values, setFieldValue)
                            }
                          >
                            <div>
                              <Droppable droppableId="sounds">
                                {provided => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                  >
                                    {sounds.map((sound, index) => (
                                      <Draggable
                                        key={index}
                                        draggableId={`sounds${index}`}
                                        index={index}
                                      >
                                        {provided => (
                                          <SoundSection
                                            key={sound.uid}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                          >
                                            {/* <EditorText
                                              control="input"
                                              type="text"
                                              label="Sound Title"
                                              placeholder="Enter sound title"
                                              name={`sounds[${index}].title`}
                                              maxLength="25"
                                              autoComplete="off"
                                            /> */}
                                            {user.role === 'pro' && (
                                              <EditorToggleWrapper>
                                                <EditorToggle
                                                  role="button"
                                                  className={customSoundIds.includes(sound.uid) ? "active" : ''}
                                                  onClick={() =>
                                                    handleSetCustomSoundIds(
                                                      sound.uid,
                                                      index,
                                                      values,
                                                      setFieldValue,
                                                    )
                                                  }
                                                />
                                                <p>Use custom sound</p>
                                              </EditorToggleWrapper>
                                            )}
                                            {customSoundIds.includes(sound.uid) &&
                                              !values.sounds[index].audio && (
                                                <EditorUploadWrapper>
                                                  <input
                                                    type="file"
                                                    id="audioFile"
                                                    name={`sounds[${index}].audioFile`}
                                                    accept="audio/mpeg3, audio/x-wav"
                                                    style={{ display: 'none' }}
                                                    disabled={uploadingSounds.includes(
                                                      sound.uid,
                                                    )}
                                                    onBlur={handleBlur}
                                                    onChange={e =>
                                                      handleUploadAudio(
                                                        e,
                                                        index,
                                                        sound.uid,
                                                        setFieldValue,
                                                        setFieldError,
                                                      )
                                                    }
                                                  />
                                                  <UploadButton htmlFor="audioFile">
                                                    Upload
                                                  </UploadButton>
                                                  {uploadingSounds.includes(sound.uid) && (
                                                    <img src={Loader} alt="Loader" height="30" />
                                                  )}
                                                </EditorUploadWrapper>
                                              )}
                                            {!customSoundIds.includes(
                                              sound.uid,
                                            ) && (
                                                <EditorFieldWrapper margin="0 0 2rem 0">
                                                  <EditorSelect
                                                    control="selectNe"
                                                    label="Sound Audio"
                                                    name={`sounds[${index}].audio`}
                                                    options={soundOptions}
                                                  />

                                                  <ErrorMessage
                                                    component={TextError}
                                                    name={`sounds[${index}].audio`}
                                                  />
                                                </EditorFieldWrapper>
                                              )}
                                            {values.sounds[index].audio && (
                                              <EditorPlayWrapper>
                                                <Button
                                                  size="s"
                                                  onClick={() =>
                                                    handlePlay(sound.uid)
                                                  }
                                                  type="button"
                                                >
                                                  Play
                                                </Button>
                                                <Sound
                                                  url={values.sounds[index].audio}
                                                  playStatus={
                                                    playingSounds.includes(sound.uid)
                                                      ? Sound.status.PLAYING
                                                      : Sound.status.STOPPED
                                                  }
                                                  onFinishedPlaying={() =>
                                                    handleEndPlay(sound.uid)
                                                  }
                                                />
                                                {customSoundIds.includes(
                                                  sound.uid,
                                                ) && (
                                                    <Button
                                                      size="s"
                                                      type="button"
                                                      onClick={() =>
                                                        handleDeleteAudio(
                                                          index,
                                                          values,
                                                          setFieldValue,
                                                        )
                                                      }
                                                    >
                                                      Delete
                                                    </Button>
                                                  )}
                                              </EditorPlayWrapper>
                                            )}
                                            <EditorEmojiWrapper>
                                              <label>Sound Emoji</label>
                                              <EditorEmojiSelect>
                                                <Emoji
                                                  emoji={
                                                    values.sounds && values.sounds[index]
                                                      ? values.sounds[index].emojiId
                                                      : ''
                                                  }
                                                  skin={
                                                    values.sounds && values.sounds[index]
                                                      ? Number(
                                                        values.sounds[index].emojiSkin,
                                                      )
                                                      : 1
                                                  }
                                                  set="apple"
                                                  size={32}
                                                />
                                                <select onClick={() =>
                                                  handleEmojiOpen(sound.uid)
                                                }>
                                                </select>
                                              </EditorEmojiSelect>
                                              <ErrorMessage
                                                component={TextError}
                                                name={`sounds[${index}].emojiId`}
                                              />
                                            </EditorEmojiWrapper>
                                            <Picker
                                              style={{
                                                position: 'absolute',
                                                zIndex: '1000',
                                                display: `${
                                                  emojiOpen.includes(sound.uid)
                                                    ? 'initial'
                                                    : 'none'
                                                  }`,
                                              }}
                                              set="apple"
                                              onClick={(emoji, e) =>
                                                handleEmojiClick(
                                                  emoji,
                                                  index,
                                                  sound.uid,
                                                  setFieldValue,
                                                  values
                                                )
                                              }
                                            />
                                            <EditButtons>
                                              <i
                                                {...provided.dragHandleProps}
                                                className="las la-arrows-alt"
                                                style={{
                                                  display: `${
                                                    values.sounds.length === 1
                                                      ? 'none'
                                                      : 'initial'
                                                    }`,
                                                  fontSize: '1.25rem',
                                                  color: '#999999',
                                                }}
                                              ></i>
                                              <i
                                                className="las la-times-circle"
                                                style={{
                                                  display: `${
                                                    values.sounds.length === 1
                                                      ? 'none'
                                                      : 'initial'
                                                    }`,
                                                  fontSize: '1.25rem',
                                                  color: '#999999',
                                                  cursor: 'pointer',
                                                }}
                                                onClick={() => remove(index)}
                                              ></i>
                                            </EditButtons>
                                          </SoundSection>
                                        )}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                              <Button
                                type="button"
                                onClick={() =>
                                  push({
                                    title: '',
                                    audio: '',
                                    emojiId: 'star-struck',
                                    emojiSkin: 1,
                                    emojiNative: '🤩',
                                    uid: generate(),
                                    audioFile: '',
                                    defaultAudio: '',
                                    custom: false,
                                  })
                                }
                              >
                                Add Sound
                        </Button>
                            </div>
                          </DragDropContext>
                        )
                      }}
                    </FieldArray>
                  </Form>
                )}
            </Formik>
          </EditorContainer>
        </EditorWrapper>
      </MainLayout>
    )
  }
}

export default SoundboardEditor
