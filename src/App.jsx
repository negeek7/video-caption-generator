import { useCallback, useState } from 'react'
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
  const [generateError, setGenerateError] = useState()
  const [captionData, setCaptionData] = useState({})
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)

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

  const handleCaption = useCallback((value) => {
    setCaptionText(value)
  }, [captionText])

  const generateCaption = () => {
    try {
      let obj = {}
      obj[startingTimestamp] = { timeStart: startingTimestamp, timeEnd: endingTimestamp, text: captionText }
      setCaptionData({ ...captionData, ...obj })
    } catch (e) {
      console.log(e)
    }
  }

  const handleVideoPlayerModal = () => {
    setIsVideoPlayerOpen(true)
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


      <CaptionInput handleCaption={handleCaption} />

      <button onClick={() => generateCaption()} className={styles.generatebutton}>Generate</button>
      <button onClick={handleVideoPlayerModal}>Test Here</button>

      {
        isVideoPlayerOpen &&
        <VideoPlayerModal isOpen={isVideoPlayerOpen} onClose={closeVideoPlayerModal}>
          <VideoPlayer />
        </VideoPlayerModal>
      }
    </>
  )
}

export default App