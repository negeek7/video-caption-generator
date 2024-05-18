import { useCallback, useState } from 'react'
import './App.css'
import styles from '../styles/app.module.css'
import VideoUrlInput from './components/Inputs/VideoUrlInput'
import VideoPlayer from './components/VideoPlayer'

function App() {

  const [videoUrl, setVideoUrl] = useState('')

  const handleVideoUrl = useCallback((url) => {
    if(url) setVideoUrl(url)
  }, [videoUrl])

  return (
    <>
      <h1 className={styles.heading}>Video Caption</h1>
      <VideoUrlInput handleVideoUrl={handleVideoUrl}/>

      {
        videoUrl && <VideoPlayer url={videoUrl}/>
      }
    </>
  )
}

export default App
