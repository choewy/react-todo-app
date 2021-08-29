import React from 'react';

const Modal = ({ visible, setVisible, children }) => {
    return (
        <>
            <div className={visible ? "modal-outter visible" : "modal-outter hidden"} />
            <div className={visible ? "modal-wrapper visible" : "modal-wapper hidden"}>
                <div className="modal-inner">
                    <div className="modal-button-box">
                        <button className="modal-close-button" onClick={() => setVisible('')}>X</button>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal;