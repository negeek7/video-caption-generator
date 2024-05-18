import { React, useEffect, useState } from 'react'
import styles from '../../../styles/captioninput.module.css'

function CaptionInput({ handleCaption }) {

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
        <div>
            <textarea
                placeholder='Enter Caption Here...'
                value={captionInput}
                onChange={handleCaptionInput}
                className={styles.textinput}
            />
        </div>
    )
}

export default CaptionInput