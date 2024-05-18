import { useState } from 'react'
import './App.css'
import styles from '../styles/app.module.css'
import VideoUrlInput from './components/Inputs/VideoUrlInput'

function App() {

  const handleVideoUrl = (url) => {
    console.log(url, "VIDEO URL")
  }

  return (
    <>
      <h1 className={styles.heading}>Video Caption</h1>
      <VideoUrlInput handleVideoUrl={handleVideoUrl}/>
    </>
  )
}

export default App
