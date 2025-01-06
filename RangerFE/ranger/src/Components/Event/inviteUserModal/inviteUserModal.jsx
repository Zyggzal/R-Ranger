import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../Context/UserContext";
import {Modal} from "react-bootstrap";
import { InviteContext } from "../../../Context/Invite/InviteContext";
import { InviteUsersFromGroups } from "../InviteUsersFromGroups/InviteUsersFromGroups";
import { GroupProvider } from "../../../Context/Group/GroupContext";
import { FriendContext, FriendProvider } from "../../../Context/Friend/FriendContext";
import { InviteUsersFromFriends } from "../InviteUsersFromFriends/inviteUsersFromFriends";
import './inviteUserModal.css'
import Loader from "../../Loader/Loader";

export const InviteUserModal = ({showModal, onClose, event, eventInvites}) => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const {user, getUsersByLogin} = useContext(UserContext);
    const {inviteUserToEvent} = useContext(InviteContext);

    const [userNotFoundError, setUserNotFoundError] = useState(false);
    const [usersToInvite, setUsersToInvite] = useState([]);
    const [tab, setTab] = useState('login')

    const watchLogin = watch('login')

    const byLogin = async (id) => {
        setUserNotFoundError(false);
        await inviteUserToEvent(id, event, eventInvites)
        onClose(true);
    }

    const inviteArray = (array) => {
        if(event.participantsLimit) {
            const promises = []

            const c = event.participantsLimit - event.participants.length
            for(let i = 0; i < array.length; i++) {
                if(i >= c) break;
                promises.push(inviteUserToEvent(array[i], event, eventInvites, 'member'))
            }
            Promise.all(promises).then(()=>onClose(true))
        }
        else {
            Promise.all(array.map((e) => {
                return inviteUserToEvent(e, event, eventInvites, 'member')
            })).then(()=>onClose(true))
        }
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (watchLogin && watchLogin.trim().length > 0) {
                const fetchUsers = async () => {
                    try {
                        const actualUsers = await getUsersByLogin(watchLogin.trim());
                        setUsersToInvite(actualUsers);
                    } catch (error) {
                        console.error("Error fetching users:", error);
                    }
                };
                fetchUsers();
            } else {
                setUsersToInvite([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [watchLogin, getUsersByLogin]);

    if(!user) return <Loader/>
    return (
        <Modal show={showModal} onHide={()=>onClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Invite Users...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <p className= { "nav-link" + (tab === 'login' ? ' active' : '')  } onClick={()=>setTab('login')} aria-current="page" to="events">Via Login</p>
                            </li>
                            <li className="nav-item">
                                <p className= { "nav-link" + (tab === 'groups' ? ' active' : '')  } onClick={()=>setTab('groups')} aria-current="page" to="invites">From Groups</p>
                            </li>
                            <li className="nav-item">
                                <p className= { "nav-link" + (tab === 'friends' ? ' active' : '')  } onClick={()=>setTab('friends')} aria-current="page" to="friends">Friends</p>
                            </li>
                        </ul>
                    </div>
                    <div className="p-3">
                        {
                        tab === 'login' &&
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="mb-3">
                                <label htmlFor="login" className="form-label">
                                    User Login
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="login"
                                    placeholder="User Login"
                                    {...register("login", { required: true })}
                                />
                                {errors.login && <div className="text-danger">Login is required</div>}
                                {userNotFoundError ? <div className="text-danger">The Login is doesn't exist</div>: null}
                            </div>
                            <div className="user-list-container list-group rnd-user-sroll-list">
                                {
                                    usersToInvite.length > 0 &&
                                    usersToInvite.map((user) => (
                                        <div key={user.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                            <div>
                                                {user.firstName} {user.lastName}
                                            </div>
                                            <div>@{user.login}</div>
                                            <button className="btn btn-crimson" onClick={e => byLogin(user.id)}>Invite</button>
                                        </div>
                                    ))
                                }
                            </div>
                        </form>
                        }
                        {
                            tab === 'groups' &&
                            <GroupProvider>
                                <InviteUsersFromGroups participants={event.participants} invites={eventInvites} onSubmit={inviteArray}/>
                            </GroupProvider>
                        }
                        {
                            tab === 'friends' &&
                            <FriendProvider>
                                <InviteUsersFromFriends participants={event.participants} invites={eventInvites} onSubmit={inviteArray}/>
                            </FriendProvider>
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}