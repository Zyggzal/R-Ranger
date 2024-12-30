import CalendarIcon from '../../Components/Icons/CalendarIcon/CalendarIcon';
import GroupIcon from '../../Components/Icons/GroupIcon/GroupIcon';
import HumanIcon from '../../Components/Icons/HumanIcon/HumanIcon';
import InviteIcon from '../../Components/Icons/InviteIcon/InviteIcon';
import EditIcon from '../../Components/Icons/EditIcon/EditIcon';
import StarIcon from '../../Components/Icons/StarIcon/StarIcon';
import { NavLink } from "react-router-dom";
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
                <div className='welcome-creators pt-5 mt-5'>
                    <h1>Functions</h1>
                    <hr className='w-25 welcome-divider' /> 
                    <div className='d-flex justify-content-center mt-4 flex-wrap'>
                        <a href='#arrange' className="welcome-function-item d-flex flex-column align-items-center">
                            <EditIcon/>
                            <p>Arrange and manage your events</p>
                        </a>
                        <a href='#friends' className="welcome-function-item d-flex flex-column align-items-center">
                            <HumanIcon/>
                            <p>Make friends with other users</p>
                        </a>
                        <a href='#groups' className="welcome-function-item d-flex flex-column align-items-center">
                            <GroupIcon/>
                            <p>Create and manage groups of users</p>
                        </a>
                        <a href='#invites' className="welcome-function-item d-flex flex-column align-items-center">
                            <InviteIcon/>
                            <p>Manage invitations and send invites to others</p>
                        </a>
                        <a href='#participate' className="welcome-function-item d-flex flex-column align-items-center">
                            <CalendarIcon/>
                            <p>Participate in events organized by others</p>
                        </a>
                        <a href='#reviews' className="welcome-function-item d-flex flex-column align-items-center">
                            <StarIcon/>
                            <p>Leave reviews on events you've participated in</p>
                        </a>
                    </div>
                </div>
                <div id='arrange' className="welcome-creators pt-5 mt-5">
                    <h1>Arrange Events</h1>
                    <hr className='w-25 welcome-divider' /> 
                    <div className='d-flex justify-content-between welcome-bg arrange-bg'>
                        <div className='welcome-fade-container d-flex'>
                            <div className="welcome-fade-text d-flex flex-column justify-content-center align-items-center p-4">
                                <h1>Describe your event in detail before sharing it with the world</h1>
                                <NavLink className='btn btn-crimson' to='/events/add'>Go</NavLink>
                            </div>
                            <div className="welcome-fade-icon d-flex justify-content-center align-items-center">
                                <EditIcon/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='friends' className="welcome-creators pt-5 mt-5">
                    <h1>Make Friends</h1>
                    <hr className='w-25 welcome-divider' /> 
                    <div className='d-flex justify-content-between welcome-bg-mirror friends-bg'>
                        <div className='welcome-fade-container-mirror d-flex'>
                            <div className="welcome-fade-icon d-flex justify-content-center align-items-center">
                                <HumanIcon/>
                            </div>
                            <div className="welcome-fade-text d-flex flex-column justify-content-center align-items-center p-4">
                                <h1>Add friends and keep up to date with each other's events</h1>
                                <NavLink className='btn btn-crimson' to='/profile/friends'>Go</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='groups' className="welcome-creators pt-5 mt-5">
                    <h1>Form Groups</h1>
                    <hr className='w-25 welcome-divider' /> 
                    <div className='d-flex justify-content-between welcome-bg groups-bg'>
                        <div className='welcome-fade-container d-flex'>
                            <div className="welcome-fade-text d-flex flex-column justify-content-center align-items-center p-4">
                                <h1>Create groups and organize group-wide events</h1>
                                <NavLink className='btn btn-crimson' to='/profile/groups'>Go</NavLink>
                            </div>
                            <div className="welcome-fade-icon d-flex justify-content-center align-items-center">
                                <GroupIcon/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='invites' className="welcome-creators pt-5 mt-5">
                    <h1>Manage Invites</h1>
                    <hr className='w-25 welcome-divider' /> 
                    <div className='d-flex justify-content-between welcome-bg invites-bg'>
                        <div className='welcome-fade-container-mirror d-flex'>
                            <div className="welcome-fade-icon d-flex justify-content-center align-items-center">
                                <InviteIcon/>
                            </div>
                            <div className="welcome-fade-text d-flex flex-column justify-content-center align-items-center p-4">
                                <h1>Choose the right options for you and decline the ones you dislike</h1>
                                <NavLink className='btn btn-crimson' to='/profile/invites'>Go</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='participate' className="welcome-creators pt-5 mt-5">
                    <h1>Participate in Events</h1>
                    <hr className='w-25 welcome-divider' /> 
                    <div className='d-flex justify-content-between welcome-bg participate-bg'>
                        <div className='welcome-fade-container d-flex'>
                            <div className="welcome-fade-text d-flex flex-column justify-content-center align-items-center p-4">
                                <h1>Find and take part in various events organized by other users</h1>
                                <NavLink className='btn btn-crimson' to='/home'>Go</NavLink>
                            </div>
                            <div className="welcome-fade-icon d-flex justify-content-center align-items-center">
                                <CalendarIcon/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='reviews' className="welcome-creators pt-5 mt-5">
                    <h1>Leave Reviews</h1>
                    <hr className='w-25 welcome-divider' /> 
                    <div className='d-flex justify-content-between welcome-bg reviews-bg'>
                        <div className='welcome-fade-container-mirror d-flex'>
                            <div className="welcome-fade-icon d-flex justify-content-center align-items-center">
                                <StarIcon/>
                            </div>
                            <div className="welcome-fade-text d-flex flex-column justify-content-center align-items-center p-4">
                                <h1>Leave valuable feedback on the events you took part in to motivate organizers to improve</h1>
                                <NavLink className='btn btn-crimson' to='/profile/events'>Go</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='welcome-creators pt-5 mt-5 pb-5'>
                    <h1>Start now!</h1>
                    <hr className='w-25 welcome-divider' /> 
                    <NavLink to='/profile/events' className='btn btn-crimson'>Let's go</NavLink>
                </div>
            </div>
        </div>
    )
}

export {Welcome};