import {GroupContext} from "../../Context/Group/GroupContext";
import {useContext, useEffect, useState} from "react";
import ClockIcon from "../Icons/ClockIcon/ClockIcon";
import { DateToAgo } from "../../Utils/DateTransformer";
import { Modal } from "react-bootstrap";
import Loader from "../Loader/Loader";

export const ListUserGroups = () => {

    //const {user} = useContext(UserContext);s
    const {userGroups, isLoading, deleteGroup} = useContext(GroupContext);
    const [toDelete, setToDelete] = useState(-1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if(isLoading || userGroups.length === 0) return <Loader/>
    return (
        <div className="user-list-container list-group">
            {
                (!userGroups[0] || userGroups[0].length === 0) && (!userGroups[1] || userGroups[1].length === 0)
                && <h3>Nothing to see here yet</h3>
            }
            {
                userGroups[0] && userGroups[0].length > 0 &&
                <>
                    <h3 className="mb-3 mt-2">Created by You</h3>

                    {userGroups[0].map((group) => (
                        <div key={`grouplistitem${group.id}`} className="list-group-item list-group-item-action d-flex justify-content-between">
                            <div>
                                <h5>{group.name}</h5>
                                <p className="text-secondary"><ClockIcon/>Created {DateToAgo(group.createdAt)}</p>
                            </div>
                            <div className="d-flex flex-column align-items-end justify-content-center">
                                <button onClick={()=> {
                                    setToDelete(group);
                                    setShowDeleteModal(true);
                                }} className="btn btn-outline-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </>
            }
            {
                userGroups[1] && userGroups[1].length > 0 &&
                <>
                    <h3 className="mb-3 mt-2">You are a member of</h3>
                    {userGroups[1].map((group) => (
                        <div key={`grouplistitem${group.id}`} className="list-group-item list-group-item-action d-flex justify-content-between">
                        <div>
                            <h5>{group.name}</h5>
                            <p className="text-secondary">Created by @{group.creator.login}</p>
                            <p className="text-secondary">Role: {group.UsersGroups.role}</p>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <p className="text-secondary"><ClockIcon/>Created {DateToAgo(group.createdAt)}</p>
                            <button onClick={()=> {
                                setToDelete(group);
                                setShowDeleteModal(true);
                            }} className="btn btn-outline-danger">Delete</button>
                        </div>
                    </div>
                    ))}
                </>
            }
            <Modal show={showDeleteModal} onHide={()=>setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This group will be removed for you and all its' members.</p>
                    <div className="d-flex justify-content-end">
                        <button  className="btn btn-danger me-2" onClick={()=>{
                            setShowDeleteModal(false);
                            deleteGroup(toDelete.id)
                        }}>Delete</button>
                        <button  className="btn btn-secondary" onClick={()=>setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}



// <div className="user-list-container list-group mt-4">
// { userFriends.map((f) => (
//     f.Friend.status === 'accepted' && <div key={`friendlistitem${f.id}`} className="list-group-item list-group-item-action d-flex justify-content-between">
//         <div>
//             <h5>{f.firstName} {f.lastName}</h5>
//             <p className="text-secondary">@{f.login}</p>
//         </div>
//         <div className="d-flex align-items-center h-1">
//             <button onClick={()=> {
//                 setToDelete(f.Friend);
//                 setShowDeleteModal(true);
//             }} className="btn btn-outline-danger"><PersonDashIcon/> </button>
//         </div>
//     </div>
// )) }
// </div>