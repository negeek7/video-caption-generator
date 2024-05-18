import { React, useEffect, useState } from 'react'
import styles from '../../../styles/captioninput.module.css'

function CaptionInput({ handleCaption, generateCaption }) {

    const [captionInput, setCaptionInput] = useState('')

    useEffect(() => {
        if (captionInput) {
            handleCaption(captionInput)
        }
    }, [captionInput])

    const handleCaptionInput = (e) => {
        let value = e.target.value
        setCaptionInput(value)
    }

    return (
        <div className={styles.container}>
            <textarea
                placeholder='Enter Caption Here...'
                value={captionInput}
                onChange={handleCaptionInput}
                className={styles.textinput}
            />
            <div>
            <button onClick={generateCaption} className={styles.generatebutton}>Generate</button>
            </div>
        </div>
    )
}

export default CaptionInput