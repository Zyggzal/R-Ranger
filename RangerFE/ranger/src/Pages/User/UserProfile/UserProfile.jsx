import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import './UserProfile.css'
import UpdateUserForm from "../../../Components/UpdateUserForm/UpdateUserForm";
import EditIcon from "../../../Components/Icons/EditIcon/EditIcon";

const UserProfile = () => {
    const [tab, setTab] = useState('events');

    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(()=>{
        if(tab) {
            navigate(tab);
        }
    }, [tab])

    return (
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
                            <p className= { "nav-link" + (tab === 'events' ? ' active' : '')  } onClick={()=>setTab('events')} aria-current="page" to="events">Your events</p>
                        </li>
                        <li className="nav-item">
                            <p className= { "nav-link" + (tab === 'invites' ? ' active' : '')  } onClick={()=>setTab('invites')} aria-current="page" to="invites">Your invitations</p>
                        </li>
                        <li className="nav-item">
                            <p className= { "nav-link" + (tab === 'friends' ? ' active' : '')  } onClick={()=>setTab('friends')} aria-current="page" to="friends">Your friends</p>
                        </li>
                        <li className="nav-item">
                            <p className= { "nav-link" + (tab === 'groups' ? ' active' : '')  } onClick={()=>setTab('groups')} aria-current="page" to="groups">Your groups</p>
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