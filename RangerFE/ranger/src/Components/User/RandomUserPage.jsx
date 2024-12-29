import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Context/UserContext";
import Loader from "../Loader/Loader";
import {Modal} from "react-bootstrap";
import PersonDashIcon from "../Icons/PersonDashIcon/PersonDashIcon";
import {FriendContext} from "../../Context/Friend/FriendContext";
import {NavLink, useNavigate} from "react-router-dom";
import {InviteContext} from "../../Context/Invite/InviteContext";
import {PublicEventListComponent} from "../Event/PublicEventListComponent/PublicEventListComponent";
import {UserEventListComponent} from "../Event/UserEventListComponent/userEventListComponent";
import {UserGroupListComponent} from "../Event/UserGroupListComponent/userGroupListComponent";

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
            //events
            const actualPublicEvents = await userPublicEvents(actualUser.user.id);
            // console.log(actualPublicEvents)//
            setEvents(actualPublicEvents);
            //groups
            const actualPublicGroups = await userPublicGroups(actualUser.user.id);
            // console.log(actualPublicEvents)//
            setGroups(actualPublicGroups);

        }

        fetchStranger();

    }, [user]);
    console.log(groups)

    if(!stranger || !stranger.user) return <Loader/>
    return (
        <div className="container mt-4 p-4 border rounded shadow event-box mb-3 w-75">
            <div className='main-text'>
                <div className="d-flex justify-content-around align-items-center event-name">
                    <h1>{stranger.user.firstName + ' ' + stranger.user.lastName}</h1>

                    <h2>@{stranger.user.login}</h2>
                </div>
            </div>
            <div>
                {stranger.isFriend.friendId && (
                    <div>
                        <div className="d-flex gap-5 align-items-center m-2">
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
                    <div className="d-flex gap-5 align-items-center m-2">
                        <div style={{fontSize: '1.3rem'}}>Not friends</div>

                        <div className="d-flex align-items-center h-1 flex-row">
                            <button onClick={() => {
                                addFriend(stranger.user.id);
                                navigate(-1);
                            }} className="btn btn-success">Add
                            </button>
                        </div>
                    </div>

                )}
                {stranger.isFriend === "invited" && <div className='m-2' style={{fontSize: '1.3rem'}}>Invited</div>}
                {stranger.isFriend === "invite you" &&
                    <div className='m-2' style={{fontSize: '1.3rem'}}>User send you friend request! <NavLink
                        to="/profile/invites">Invites</NavLink></div>}
            </div>
            <div>
                <h3>@{stranger.user.login} public events: </h3>
                {events && events.length > 0 && (
                    <div className="user-list-container list-group"
                         style={{maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd"}}>
                        {
                            events.map((event) => {
                                return <UserEventListComponent key={event.id} event={event}/>
                            })
                        }
                    </div>
                )}
            </div>
            <div className='mt-2'>
                <h3>@{stranger.user.login} public groups: </h3>
                {groups && groups.length > 0 && (
                    <div className="user-list-container list-group"
                         style={{maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd"}}>
                        {
                            groups.map((group) => {
                                return <UserGroupListComponent key={group.id} group={group}/>
                            })
                        }
                    </div>
                )}
            </div>
        </div>
    )
}