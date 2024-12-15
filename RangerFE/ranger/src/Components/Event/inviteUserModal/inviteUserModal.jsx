import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {UserContext} from "../../../Context/UserContext";
import {Modal} from "react-bootstrap";
import { InviteContext } from "../../../Context/Invite/InviteContext";
import { InviteUsersFromGroups } from "../InviteUsersFromGroups/InviteUsersFromGroups";
import { GroupProvider } from "../../../Context/Group/GroupContext";
import { FriendContext, FriendProvider } from "../../../Context/Friend/FriendContext";
import { InviteUsersFromFriends } from "../InviteUsersFromFriends/inviteUsersFromFriends";

export const InviteUserModal = ({showModal, onClose, event, eventInvites}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const {user, idByLogin} = useContext(UserContext);
    const {inviteUserToEvent} = useContext(InviteContext);

    const [userNotFoundError, setUserNotFoundError] = useState(false);
    const [tab, setTab] = useState('login')

    const byLogin = async (values) => {
        const userId = await idByLogin(values.login);

        if(userId === -1){
            setUserNotFoundError(true);
        }
        else{
            setUserNotFoundError(false);
            await inviteUserToEvent(userId, event, eventInvites)
            onClose(true);
        }
    }

    const inviteArray = (array) => {
        if(event.participantsLimit) {
            const promises = []

            const c = event.participantsLimit- event.participants.length
            for(let i = 0; i < c; i++) {
                promises.push(inviteUserToEvent(array[0], event, eventInvites, 'member'))
            }
            Promise.all(promises).then(()=>onClose(true))
        }
        else {
            Promise.all(array.map((e) => {
                return inviteUserToEvent(e, event, eventInvites, 'member')
            })).then(()=>onClose(true))
        }

    }

    if(!user) return <div>Loading...</div>
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
                                <p className= { "nav-link" + (tab === 'events' ? ' active' : '')  } onClick={()=>setTab('login')} aria-current="page" to="events">Via Login</p>
                            </li>
                            <li className="nav-item">
                                <p className= { "nav-link" + (tab === 'invites' ? ' active' : '')  } onClick={()=>setTab('groups')} aria-current="page" to="invites">From Groups</p>
                            </li>
                            <li className="nav-item">
                                <p className= { "nav-link" + (tab === 'friends' ? ' active' : '')  } onClick={()=>setTab('friends')} aria-current="page" to="friends">Friends</p>
                            </li>
                        </ul>
                    </div>
                    <div className="p-3">
                        {
                        tab === 'login' &&
                        <form onSubmit={handleSubmit(byLogin)}>
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
                                onChange={e => setUserNotFoundError(false)}
                                />
                                {errors.login && <div className="text-danger">Login is required</div>}
                                {userNotFoundError ? <div className="text-danger">The Login is doesn't exist</div>: null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">
                                    User Role
                                </label>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-success">
                                    Send Invite
                                </button>
                            </div>
                        </form>
                        }
                        {
                            tab === 'groups' &&
                            <GroupProvider>
                                <InviteUsersFromGroups event={event} eventInvites={eventInvites} onSubmit={inviteArray}/>
                            </GroupProvider>
                        }
                        {
                            tab === 'friends' &&
                            <FriendProvider>
                                <InviteUsersFromFriends event={event} eventInvites={eventInvites} onSubmit={inviteArray}/>
                            </FriendProvider>
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}