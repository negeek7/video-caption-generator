import React, { useEffect, useRef } from 'react';
import styles from '../../../styles/videoplayermodal.module.css'

function VideoPlayerModal({ children, isOpen, onClose }) {


    const modalRef = useRef(null)

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);
  return (
    <div className={styles.container}>
        <div className={styles.subcontainer}></div>
        <div ref={modalRef} className={styles.modalbody}>
            {children}
        </div>
    </div>
  )
}

export default VideoPlayerModal