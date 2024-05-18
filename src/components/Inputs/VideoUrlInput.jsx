import React, { useEffect, useState } from 'react';
import styles from '../../../styles/videourlinput.module.css'

function VideoUrlInput({handleVideoUrl}) {

    const [url, setUrl] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        
        if(url){
            setTimeout(() => {
                const isValid = checkIfUrlIsValid(url)
            if(isValid){
                setError(false)
                handleVideoUrl(url)
            } else {
                setError(true)
            }
            }, 900)
        }
    }, [url])

    function checkIfUrlIsValid(url) {
        const pattern =
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)\/?.mp4(\?.*)?$/;
        return pattern.test(url);
      }

    const handleUrlChange = (e) => {
        let value = e.target.value
        setUrl(value)
    }

    const borderError = {
        border: "1px solid #ff0000a0"
    }

    const borderSuccess = {
        border: "1px solid #05af05"
    }

    return (
        <div className={styles.container}>
            <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder='Enter Video URL...'
                className={styles.input}
                style={error ? borderError : borderSuccess}
            />
            {
                error &&
                <span style={{color: "#ff0000a0"}}>Link doesn't look right. (mp4 supported)</span>
            }
        </div>
    )
}

export default VideoUrlInput