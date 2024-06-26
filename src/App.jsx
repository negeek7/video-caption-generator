import { useCallback, useEffect, useState } from 'react'
import './App.css'
import styles from '../styles/app.module.css'
import VideoUrlInput from './components/Inputs/VideoUrlInput'
import VideoPlayer from './components/VideoPlayer'
import { convertToSeconds } from './util/util'
import CaptionInput from './components/Inputs/CaptionInput'
import TimestampInputs from './components/Inputs/TimestampInputs'
import VideoPlayerModal from './components/Modal/VideoPlayerModal'

function App() {

  const [videoUrl, setVideoUrl] = useState('')
  const [startingTimestamp, setStartingTimestamp] = useState(0)
  const [endingTimestamp, setEndingTimestamp] = useState(0)
  const [captionText, setCaptionText] = useState('')
  const [generateError, setGenerateError] = useState(false)
  const [generateSuccess, setGenerateSuccess] = useState(false)
  const [captionData, setCaptionData] = useState({})
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)
  const [videoOpenError, setVideoOpenError] = useState(false)

  const handleVideoUrl = useCallback((url) => {
    if (url) setVideoUrl(url)
  }, [videoUrl])

  const handleTimestampInput = (data) => {
    let { hours, minutes, seconds, type } = data
    if (type === "FROM") {
      let value = convertToSeconds(hours, minutes, seconds)
      setStartingTimestamp(value)
    } else if (type === "TO") {
      let value = convertToSeconds(hours, minutes, seconds)
      setEndingTimestamp(value)
    }
  }

  useEffect(() => {
    if(generateSuccess){
      setTimeout(() => {
        setGenerateSuccess(false)
      }, 800)
    }
  }, [startingTimestamp, endingTimestamp, captionText, captionData])

  const handleCaption = useCallback((value) => {
    setCaptionText(value)
  }, [captionText])

  const generateCaption = () => {
    if (!startingTimestamp || !endingTimestamp || !captionText) {
      setGenerateError(true)
      setGenerateSuccess(false)
      return;
    }
    try {
      let obj = {}
      obj[startingTimestamp] = { timeStart: startingTimestamp, timeEnd: endingTimestamp, text: captionText }
      setCaptionData({ ...captionData, ...obj })
      setGenerateSuccess(true)
      setGenerateError(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleVideoPlayerModal = () => {
    if (!videoUrl) {
      setVideoOpenError(true)
      return;
    }
    setIsVideoPlayerOpen(true)
    setVideoOpenError(false)
  }

  const closeVideoPlayerModal = () => {
    setIsVideoPlayerOpen(false)
  }

  return (
    <>
      <h1 className={styles.heading}>Video Caption</h1>
      <VideoUrlInput handleVideoUrl={handleVideoUrl} />

      <div className={styles['timestamp-container']}>
        <div>
          <TimestampInputs
            timestampType="FROM"
            handleTimestampInput={handleTimestampInput}
          />
        </div>
        <div>
          <TimestampInputs
            timestampType="TO"
            handleTimestampInput={handleTimestampInput}
          />
        </div>
      </div>


      <CaptionInput
        handleCaption={handleCaption}
        generateCaption={generateCaption}
      />

      {
        generateError && <p className={styles.generateError}>Make sure to not leave any fields empty. Timestamps and captions.</p>
      }
      {
        generateSuccess && <p className={styles.generateSuccess}>Caption Generated.</p>
      }


      <button className={styles.testbutton} onClick={handleVideoPlayerModal}>Test Here</button>
      {
        videoOpenError && <p className={styles.generateError}>Uh oh, Is video URL missing?</p>
      }

      {
        isVideoPlayerOpen &&
        <VideoPlayerModal isOpen={isVideoPlayerOpen} onClose={closeVideoPlayerModal}>
          <VideoPlayer
            captionData={captionData}
            url={videoUrl}
          />
        </VideoPlayerModal>
      }
    </>
  )
}

export default App
// http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4