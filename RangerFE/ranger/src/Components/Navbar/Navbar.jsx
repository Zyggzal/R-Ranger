import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import { NavLink } from "react-router-dom";
import ExitIcon from "../Icons/ExitIcon/ExitIcon";
import HumanIcon from "../Icons/HumanIcon/HumanIcon";
import './Navbar.css'
import EditIcon from "../Icons/EditIcon/EditIcon";
import CalendarIcon from "../Icons/CalendarIcon/CalendarIcon";
import GroupIcon from "../Icons/GroupIcon/GroupIcon";
import InviteIcon from "../Icons/InviteIcon/InviteIcon";

const Navbar = () => {
    const { user, Logout } = useContext(UserContext);

    const linkStyle = ({ isActive }) => ({ color: isActive ? '#E5383B' : 'white' })
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <NavLink className='ranger-logo' to='/' style={linkStyle}>
                    <img src="/Resources/Images/RangerLogo.PNG"/>
                    <h1>RANGER</h1>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {
                    user ?
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className='btn btn-link' to='/home' style={linkStyle}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='btn btn-link' to='/events/add' style={linkStyle}><EditIcon/>New Event</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='btn btn-link' to='/profile/events' style={linkStyle}><CalendarIcon/>Events</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='btn btn-link' to='/profile/invites' state={'invites'} style={linkStyle}><InviteIcon/>Invites</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='btn btn-link' to='/profile/friends' state={'friends'} style={linkStyle}><HumanIcon/>Friends</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='btn btn-link' to='/profile/groups' state={'groups'} style={linkStyle}><GroupIcon/>Groups</NavLink>
                        </li>
                    </ul>
                    :
                    <div className="me-auto"></div>
                }
                { 
                user ? 
                    <div className="d-flex align-items-center">
                        <NavLink className='nav-link m-3 user-name' to='/profile/events' style={linkStyle}><HumanIcon/>{user.login}</NavLink>
                        <button className="btn btn-outline-danger logout-button" onClick={Logout}><ExitIcon/></button>
                    </div>
                    :
                    <div>
                        <NavLink className='btn login-button' to='/login'>Log in</NavLink>
                    </div>
                }

                </div>
            </div>
            </nav>
    )
}

export default Navbar;