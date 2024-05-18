import React, { useRef, useState } from 'react';
import styles from '../../styles/videoplayer.module.css'

function VideoPlayer({ url, captionData }) {

  const [captionText, setCaptionText] = useState('')

  const videoRef = useRef(null)

  const handleTimeUpdate = () => {
    let currentTime = videoRef.current.currentTime.toFixed()

    if (captionData[currentTime] && captionData[currentTime].timeStart == currentTime && captionData[currentTime].timeEnd >= currentTime) {
      setCaptionText(captionData[currentTime].text);
    } else {
      setCaptionText('');
    }
  }

  return (
    <div className={styles.container}>
      <video 
        controls 
        className={styles.video}
        onTimeUpdate={handleTimeUpdate}
        ref={videoRef}
      >
        <source src={url} />
      </video>
      {
        captionText &&
        <p className={styles.caption}>{captionText}</p>
      }
    </div>
  )
}

export default VideoPlayer