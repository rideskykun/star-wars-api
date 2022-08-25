import React from 'react'
import './modal.css'

const Modal = ({children, show, onClose}) => {
    return(
        show?
            <div className={'modal-bg'}>
                <div className={'modal-card'}>
                    {children}
                </div>
                <div className={'modal-close'}>
                    <button onClick={onClose}>
                        CLOSE
                    </button>
                </div>
            </div>
            :null
    )
}

export default Modal