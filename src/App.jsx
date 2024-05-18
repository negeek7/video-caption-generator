import { useCallback, useState } from 'react'
import './App.css'
import styles from '../styles/app.module.css'
import VideoUrlInput from './components/Inputs/VideoUrlInput'
import VideoPlayer from './components/VideoPlayer'
import TimestampInputs from './components/Inputs/TimestampInputs'
import { convertToSeconds } from './util/util'

function App() {

  const [videoUrl, setVideoUrl] = useState('')
  const [startingTimestamp, setStartingTimestamp] = useState(0)
  const [endingTimestamp, setEndingTimestamp] = useState(0)

  const handleVideoUrl = useCallback((url) => {
    if(url) setVideoUrl(url)
  }, [videoUrl])

  const handleTimestampInput = (data) => {
    let {hours, minutes, seconds, type} = data
    if(type === "FROM") {
      let value = convertToSeconds(hours, minutes, seconds)
      setStartingTimestamp(value)
    } else if (type === "TO") {
      let value = convertToSeconds(hours, minutes, seconds)
      setEndingTimestamp(value)
    }
  }

  console.log(startingTimestamp, "STARTING TIMEE")

  return (
    <>
      {/* <h1 className={styles.heading}>Video Caption</h1>
      <VideoUrlInput handleVideoUrl={handleVideoUrl}/>

      {
        videoUrl && <VideoPlayer url={videoUrl}/>
      } */}

      <TimestampInputs 
        timestampType={'FROM'}
        handleTimestampInput={handleTimestampInput}
      />
    </>
  )
}

export default App
