import {useContext, useEffect, useState} from "react";
import {FriendContext} from "../../Context/Friend/FriendContext";
import { DateToAgo } from "../../Utils/DateTransformer";
import PersonDashIcon from "../Icons/PersonDashIcon/PersonDashIcon";
import { Modal } from "react-bootstrap";
import NoContent from "../NoContent/NoContent";
import Loader from "../Loader/Loader";
import ThreeDotsIcon from "../Icons/ThreeDotsIcon/ThreeDotsIcon";
import { NavLink } from "react-router-dom";

export const ListUserFriends = ({asc}) =>{

    const {userFriends, isLoading, declineFriendRequest} = useContext(FriendContext);
    const [friendsToShow, setFriendsToShow] = useState(null);

    const [toDelete, setToDelete] = useState(-1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if(userFriends) {
            let list = userFriends.filter((f) => f.Friend.status === 'accepted')

            list = list.sort((a, b) => {
                let diff = a.login.localeCompare(b.login);

                if(asc === '0') diff *= -1;

                return diff;
            })

            setFriendsToShow(list);
        }
    }, [userFriends, asc])

    if(isLoading || !userFriends) return <Loader/>;
    return(
        <div className="user-list-container list-group mt-4">
            { 
                !friendsToShow || friendsToShow.length === 0 ? <NoContent/> : friendsToShow.map((f) => (
                <div key={`friendlistitem${f.id}`} className="list-group-item list-group-item-action d-flex justify-content-between word-break">
                    <div>
                        <h5>{f.firstName} {f.lastName}</h5>
                        <p className="text-secondary">@{f.login}</p>
                    </div>
                    <div className="d-flex align-items-center h-1">
                        <button onClick={()=> {
                            setToDelete(f.Friend);
                            setShowDeleteModal(true);
                        }} className="btn btn-outline-danger"><PersonDashIcon/> </button>
                        <NavLink to={`/users/${f.login}`} className="btn btn-outline-secondary ps-0 pe-0 pt-2 pb-2 ms-2"><ThreeDotsIcon/></NavLink>
                    </div>
                </div>
            )) }
            <Modal show={showDeleteModal} onHide={()=>setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This user will be removed from your friend list.</p>
                    <div className="d-flex justify-content-end">
                        <button  className="btn btn-danger me-2" onClick={()=>{
                            setShowDeleteModal(false);
                            declineFriendRequest(toDelete)
                        }}>Delete</button>
                        <button  className="btn btn-secondary" onClick={()=>setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}