import React, { useEffect, useState } from 'react';
import styles from '../../../styles/timestampinput.module.css'

function TimestampInputs({ timestampType, handleTimestampInput }) {


    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        if (hours || minutes || seconds) {
            setTimeout(() => {
                handleTimestampInput({ hours, minutes, seconds, type: timestampType })
            }, 900)
        }
    }, [hours, minutes, seconds])

    const handleInput = (e, type) => {
        let value = e.target.value
        let numVal = value === "" ? 0 : parseInt(value);
        switch (type) {
            case 'hours':
                setHours(numVal)
                break;
            case 'minutes':
                setMinutes(numVal)
                break;
            case 'seconds':
                setSeconds(numVal)
                break;
            default:
                return '';
        }
    }

    return (
        <>
            <p className={styles.type}>{timestampType}</p>
            <div className={styles.container}>
                <input
                    type="text"
                    id={timestampType}
                    onChange={(e) => handleInput(e, 'hours')}
                    value={hours}
                    className={styles.input}
                    placeholder='H'
                />
                :
                <input
                    type="text"
                    id={timestampType}
                    onChange={(e) => handleInput(e, 'minutes')}
                    value={minutes}
                    className={styles.input}
                    placeholder='M'
                />
                :
                <input
                    type="text"
                    id={timestampType}
                    onChange={(e) => handleInput(e, 'seconds')}
                    value={seconds}
                    className={styles.input}
                    placeholder='S'
                />
            </div>
        </>
    )
}

export default TimestampInputs