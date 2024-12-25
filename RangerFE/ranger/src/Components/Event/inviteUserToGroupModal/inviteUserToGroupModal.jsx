import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {UserContext} from "../../../Context/UserContext";
import {InviteContext} from "../../../Context/Invite/InviteContext";
import Loader from "../../Loader/Loader";
import {Modal} from "react-bootstrap";
import {GroupProvider} from "../../../Context/Group/GroupContext";
import {InviteUsersFromGroups} from "../InviteUsersFromGroups/InviteUsersFromGroups";
import {FriendProvider} from "../../../Context/Friend/FriendContext";
import {InviteUsersFromFriends} from "../InviteUsersFromFriends/inviteUsersFromFriends";

export const InviteUserToGroupModal = ({showModal, onClose, group, groupInvites}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {user, idByLogin} = useContext(UserContext);
    const {inviteUserToGroup} = useContext(InviteContext);

    const [userNotFoundError, setUserNotFoundError] = useState(false);
    const [tab, setTab] = useState('login')

    const byLogin = async (values) => {
        const userId = await idByLogin(values.login);

        if(userId === -1){
            setUserNotFoundError(true);
        }
        else{
            setUserNotFoundError(false);
            await inviteUserToGroup(userId, group, groupInvites)
            onClose(true);
        }
    }

    const inviteArray = (array) => {
        if(group.participantsLimit) {
            const promises = []

            const c = group.participantsLimit- group.participants.length
            for(let i = 0; i < c; i++) {
                promises.push(inviteUserToGroup(array[0], group, groupInvites, 'Member'))
            }
            Promise.all(promises).then(()=>onClose(true))
        }
        else {
            Promise.all(array.map((e) => {
                return inviteUserToGroup(e, group, groupInvites, 'Member')
            })).then(()=>onClose(true))
        }
    }

    if(!user) return <Loader/>
    return (
        <Modal show={showModal} onHide={()=>onClose(true)}>
            <Modal.Header closeButton>
                <Modal.Title>Invite Users...</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <p className={"nav-link" + (tab === 'login' ? ' active' : '')}
                               onClick={() => setTab('login')} aria-current="page" to="events">Via Login</p>
                        </li>
                        <li className="nav-item">
                            <p className={"nav-link" + (tab === 'groups' ? ' active' : '')}
                               onClick={() => setTab('groups')} aria-current="page" to="invites">From Groups</p>
                        </li>
                        <li className="nav-item">
                            <p className={"nav-link" + (tab === 'friends' ? ' active' : '')}
                               onClick={() => setTab('friends')} aria-current="page" to="friends">Friends</p>
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
                                    {...register("login", {required: true})}
                                    onChange={e => setUserNotFoundError(false)}
                                />
                                {errors.login && <div className="text-danger">Login is required</div>}
                                {userNotFoundError ?
                                    <div className="text-danger">The Login is doesn't exist</div> : null}
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-crimson">
                                    Send Invite
                                </button>
                            </div>
                        </form>
                    }
                    {
                        tab === 'groups' &&
                        <GroupProvider>
                            <InviteUsersFromGroups participants={group.members} invites={groupInvites} actualGroup={group}  onSubmit={inviteArray}/>
                        </GroupProvider>
                    }
                    {
                        tab === 'friends' &&
                        <FriendProvider>
                            <InviteUsersFromFriends participants={group.members} invites={groupInvites} onSubmit={inviteArray}/>
                        </FriendProvider>
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}