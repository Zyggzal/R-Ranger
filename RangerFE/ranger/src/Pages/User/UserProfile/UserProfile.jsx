import { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import './UserProfile.css'
import UpdateUserForm from "../../../Components/UpdateUserForm/UpdateUserForm";
import EditIcon from "../../../Components/Icons/EditIcon/EditIcon";
import HumanIcon from "../../../Components/Icons/HumanIcon/HumanIcon";
import InviteIcon from "../../../Components/Icons/InviteIcon/InviteIcon";
import CalendarIcon from "../../../Components/Icons/CalendarIcon/CalendarIcon";
import GroupIcon from "../../../Components/Icons/GroupIcon/GroupIcon";
import Loader from "../../../Components/Loader/Loader";

const UserProfile = () => {

    const { user } = useContext(UserContext);

    const [isUpdate, setIsUpdate] = useState(false);


    return (
        !user ? <Loader/> :  
        <div className="d-flex justify-content-between p-3 user-profile-container">
               <div className="container-small user-info-container">
                    <img className="user-pfp" src="/Resources/Images/RangerPFP2.png" alt="profile"/>
                    { isUpdate ? 
                        <UpdateUserForm onSubmit={()=>setIsUpdate(false)}/>
                        :
                        <>
                            <h1>{user.firstName + ' ' + user.lastName} 
                            <span className="edit-btn" onClick={() => setIsUpdate(true)}>
                                <EditIcon/>
                            </span>
                            </h1>
                            <p className="text-secondary mb-5">@{user.login}</p>
                            <h4>{user.email}</h4>
                            <p>Joined on: &nbsp; { new Date(user.createdAt).toLocaleDateString() }</p>
                        </>
                    }
                </div>
            <div className="container">
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/profile/events'><CalendarIcon/>Your Events</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/profile/invites'><InviteIcon/>Your Invitations</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/profile/friends'><HumanIcon/>Your Friends</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/profile/groups'><GroupIcon/>Your Groups</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="p-3">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;