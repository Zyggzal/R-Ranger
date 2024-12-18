import {useContext, useState} from "react";
import {FriendContext} from "../../Context/Friend/FriendContext";
import { DateToAgo } from "../../Utils/DateTransformer";
import PersonDashIcon from "../Icons/PersonDashIcon/PersonDashIcon";
import { Modal } from "react-bootstrap";

export const ListUserFriends = () =>{

    const {userFriends, isLoading, declineFriendRequest} = useContext(FriendContext);
    const [toDelete, setToDelete] = useState(-1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if(isLoading || !userFriends) return <div>Loading...</div>;
    return(
        <div className="user-list-container list-group mt-4">
            { userFriends.map((f) => (
                f.Friend.status === 'accepted' && <div key={`friendlistitem${f.id}`} className="list-group-item list-group-item-action d-flex justify-content-between">
                    <div>
                        <h5>{f.firstName} {f.lastName}</h5>
                        <p className="text-secondary">@{f.login}</p>
                    </div>
                    <div className="d-flex align-items-center h-1">
                        <button onClick={()=> {
                            setToDelete(f.Friend);
                            setShowDeleteModal(true);
                        }} className="btn btn-outline-danger"><PersonDashIcon/> </button>
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