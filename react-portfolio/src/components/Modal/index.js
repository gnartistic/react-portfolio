import React from "react";
import './index.scss';

const Modal = () =>
{
    return (
        <>
            <div className="modal">
                <div className="text-zone">
                    <h3>Message sent!</h3>
                    <button className='flat-button'>
                        DONE
                    </button>
                </div>
            </div>
        </>
    )
};

export default Modal;