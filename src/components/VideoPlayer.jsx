import React from 'react';
import styles from '../../styles/videoplayer.module.css'

function VideoPlayer({ url }) {

  console.log(url, "VIDEO URL")

  return (
    <div className={styles.container}>
      <video controls className={styles.video}>
        <source src={url} />
      </video>
    </div>
  )
}

export default VideoPlayer