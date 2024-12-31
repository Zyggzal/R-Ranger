import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Context/UserContext";
import Loader from "../Loader/Loader";
import {Modal} from "react-bootstrap";
import PersonDashIcon from "../Icons/PersonDashIcon/PersonDashIcon";
import {FriendContext} from "../../Context/Friend/FriendContext";
import {NavLink, useNavigate} from "react-router-dom";
import {UserEventListComponent} from "../Event/UserEventListComponent/userEventListComponent";
import {UserGroupListComponent} from "../Event/UserGroupListComponent/userGroupListComponent";
import './RandomUserPage.css';
import PersonPlusIcon from "../Icons/PersonPlusIcon/PersonPlusIcon";

export const RandomUserPage = ({login}) => {

    const navigate = useNavigate();

    const {declineFriendRequest, addFriend} = useContext(FriendContext);
    const {user, getSomeUserInfo, userPublicEvents, userPublicGroups} = useContext(UserContext);

    const [stranger, setStranger] = useState([]);
    const [events, setEvents] = useState([]);
    const [groups, setGroups] = useState([]);

    const [toDelete, setToDelete] = useState(-1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchStranger = async () => {
            if(!user) return;
            const actualUser = await getSomeUserInfo(login, user.id);
            if(actualUser === 'profile') navigate("/profile/events");
            setStranger(actualUser);
            const actualPublicEvents = await userPublicEvents(actualUser.user.id);
            setEvents(actualPublicEvents);
            const actualPublicGroups = await userPublicGroups(actualUser.user.id);
            setGroups(actualPublicGroups);

        }

        if(user && user.login === login) {
            navigate('/profile/events', { replace: true })
            return
        }

        fetchStranger();

    }, [user]);

    if(!stranger || !stranger.user) return <Loader/>
    return (
        <div className="d-flex text-white p-3 rnd-user-profile-container">
            <div className="d-flex flex-column rnd-user-info-container p-2">
                <div>
                    <img src="/Resources/Images/RangerPFP2.png"/>
                    <div className="">
                        <h1>{stranger.user.firstName + ' ' + stranger.user.lastName}</h1>
                        <h4 className="ms-2 text-secondary">@{stranger.user.login}</h4>
                    </div>
                </div>
                <hr style={{ borderWidth: '3px' }}/>
                <div className="d-flex justify-content-end">
                    {stranger.isFriend.friendId && (
                        <div>
                            <div className="d-flex column-gap-5 align-items-center m-2 flex-wrap">
                                <div style={{fontSize: '1.3rem'}}>Your Friend!</div>
                                <div className="d-flex align-items-center h-1">
                                    <button onClick={() => {
                                        setToDelete(stranger.isFriend);
                                        setShowDeleteModal(true);
                                    }} className="btn btn-outline-danger"><PersonDashIcon/></button>
                                </div>
                            </div>


                            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are you sure?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>This user will be removed from your friend list.</p>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-danger me-2" onClick={() => {
                                            setShowDeleteModal(false);
                                            declineFriendRequest(toDelete);
                                            navigate(-1);
                                        }}>Delete
                                        </button>
                                        <button className="btn btn-secondary"
                                                onClick={() => setShowDeleteModal(false)}>Cancel
                                        </button>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    )}
                    {stranger.isFriend === "no" && (
                        <div className="d-flex column-gap-5 align-items-center m-2 flex-wrap">
                            <div style={{fontSize: '1.3rem'}}>Not friends</div>

                            <div className="d-flex align-items-center flex-row">
                                <button onClick={() => {
                                    addFriend(stranger.user.id);
                                    navigate(-1);
                                }} className="btn btn-success"><PersonPlusIcon/></button>
                            </div>
                        </div>

                    )}
                    {stranger.isFriend === "invited" && <div className='m-2' style={{fontSize: '1.3rem'}}>Invited</div>}
                    {stranger.isFriend === "invite you" &&
                        <div className='m-2' style={{fontSize: '1.3rem'}}>This user sent you friend request! 
                        <NavLink className='invite-item-link ms-2' to="/profile/invites">Invites</NavLink></div>}
                </div>
            </div>
            <div className="w-100 ms-4">
                <div>
                    <h3>User's events: </h3>
                    {(events && events.length > 0) ? (
                        <div className="user-list-container list-group rnd-user-sroll-list"
                            style={{maxHeight: "48vh", overflowY: "auto", border: "1px solid #ddd"}}>
                            {
                                events.map((event) => {
                                    return <UserEventListComponent key={event.id} event={event}/>
                                })
                            }
                        </div>
                    ) : <h4 className="text-secondary">Empty</h4>}
                </div>
                    <div className='mt-3'>
                        <h3>User's groups: </h3>
                        {(groups && groups.length > 0) ? (
                            <div className="user-list-container list-group rnd-user-sroll-list"
                                style={{maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd"}}>
                                {
                                    groups.map((group) => {
                                        return <UserGroupListComponent key={`$grouplistitem{group.id}`} group={group}/>
                                    })
                                }
                            </div>
                        ): <h4 className="text-secondary">Empty</h4>}
                    </div>
                </div>
        </div>
    )
}