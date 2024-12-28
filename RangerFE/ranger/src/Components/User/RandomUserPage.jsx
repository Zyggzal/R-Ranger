import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Context/UserContext";
import Loader from "../Loader/Loader";
import {Modal} from "react-bootstrap";
import PersonDashIcon from "../Icons/PersonDashIcon/PersonDashIcon";
import {FriendContext} from "../../Context/Friend/FriendContext";
import {useNavigate} from "react-router-dom";
import {InviteContext} from "../../Context/Invite/InviteContext";

export const RandomUserPage = ({login}) => {

    const navigate = useNavigate();

    const {declineFriendRequest, addFriend} = useContext(FriendContext);
    const {user, getSomeUserInfo} = useContext(UserContext);

    const [stranger, setStranger] = useState([]);

    const [toDelete, setToDelete] = useState(-1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchStranger = async () => {
            if(!user) return;
            const actualUser = await getSomeUserInfo(login, user.id);
            setStranger(actualUser);
        }

        fetchStranger();

    }, [user])

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
                        <div>Your Friend!</div>
                        <div className="d-flex align-items-center h-1">
                            <button onClick={() => {
                                setToDelete(stranger.isFriend);
                                setShowDeleteModal(true);
                            }} className="btn btn-outline-danger"><PersonDashIcon/></button>
                        </div>

                        <Modal show={showDeleteModal} onHide={()=>setShowDeleteModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Are you sure?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>This user will be removed from your friend list.</p>
                                <div className="d-flex justify-content-end">
                                    <button  className="btn btn-danger me-2" onClick={()=>{
                                        setShowDeleteModal(false);
                                        declineFriendRequest(toDelete);
                                        navigate(-1);
                                    }}>Delete</button>
                                    <button  className="btn btn-secondary" onClick={()=>setShowDeleteModal(false)}>Cancel</button>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                )}
                {stranger.isFriend === "no" && (
                    <div>
                        <div>Not friends</div>

                        <div className="d-flex align-items-center h-1">
                            <button onClick={() => {
                                addFriend(stranger.user.id);
                                navigate(-1);
                            }} className="btn btn-success">Add</button>
                        </div>
                    </div>

                )}
                {stranger.isFriend === "invited" && <div>Invited</div>}
            </div>
        </div>
    )
}