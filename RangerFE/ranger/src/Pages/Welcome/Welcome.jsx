import { useEffect } from 'react';
import './Welcome.css'

const Welcome = () => {

    return (
        <div className='welcome-container'>
            <div className='welcome-background'>
                <div className='welcome-header'>
                    <img  src='Resources/Images/RangerIcon.ico'/>
                    <h1 className='welcome-title'>WELCOME TO RANGER!</h1>
                    <h3>A useful tool for planning and arranging events</h3>
                </div>
                <div className="welcome-creators">
                    <h1>Creators</h1>
                    <hr className='w-25 welcome-divider' />
                    <div className='d-flex justify-content-center mt-4 flex-wrap'>
                        <div className="container invite-item-container welcome-creator-item">
                            <img className="arrow" alt='arrow' src='/Resources/Images/Arrow.png'/>
                            <img className="bend" alt='bend' src='/Resources/Images/PaperBend.png'/>
                            <div className='d-flex flex-column align-items-center row-gap-4'>
                                <img className='welcome-creator-image' src='/Resources/Images/SlipokurovPic.png'/>
                                <h2>Slipokurov Valerii</h2>
                            </div>
                        </div>
                        <div className="container invite-item-container">
                            <img className="arrow mirror" alt='arrow' src='/Resources/Images/Arrow.png'/>
                            <img className="bend" alt='bend' src='/Resources/Images/PaperBend.png'/>
                            <div className='d-flex flex-column align-items-center row-gap-4'>
                                <img className='welcome-creator-image' src='/Resources/Images/RangerPFP2.png'/>
                                <h2>Voloshyn Olexii</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='welcome-creators pt-5'>
                    <h1>Functions</h1>
                    <hr className='w-25 welcome-divider' /> 
                </div>
            </div>
        </div>
    )
}

export {Welcome};