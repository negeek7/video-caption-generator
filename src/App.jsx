import { useState } from 'react'
import './App.css'
import styles from '../styles/app.module.css'
import VideoUrlInput from './components/Inputs/VideoUrlInput'

function App() {

  const [videoUrl, setVideoUrl] = useState('')

  const handleVideoUrl = (url) => {
    setVideoUrl(url)
  }

  return (
    <>
      <h1 className={styles.heading}>Video Caption</h1>
      <VideoUrlInput handleVideoUrl={handleVideoUrl}/>
    </>
  )
}

export default App
