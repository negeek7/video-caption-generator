import React, { useEffect, useState } from 'react';
import styles from '../../../styles/videourlinput.module.css'

function VideoUrlInput({handleVideoUrl}) {

    const [url, setUrl] = useState('')

    useEffect(() => {
        
        if(url){
            handleVideoUrl(url)
        }
    }, [url])

    const handleUrlChange = (e) => {
        let value = e.target.value
        setUrl(value)
    }

    return (
        <div className={styles.container}>
            <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder='Enter Video URL...'
                className={styles.input}
            />
        </div>
    )
}

export default VideoUrlInput