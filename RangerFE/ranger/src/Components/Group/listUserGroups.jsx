import {GroupContext} from "../../Context/Group/GroupContext";
import {useContext, useEffect, useState} from "react";
import ClockIcon from "../Icons/ClockIcon/ClockIcon";
import { DateToAgo } from "../../Utils/DateTransformer";
import { Modal } from "react-bootstrap";
import Loader from "../Loader/Loader";
import NoContent from "../NoContent/NoContent";
import LockIcon from "../Icons/LockIcon/LockIcon";
import {NavLink} from "react-router-dom";
import TrashIcon from "../Icons/TrashIcon/TrashIcon";
import './listUserGroups.css'
import ThreeDotsIcon from "../Icons/ThreeDotsIcon/ThreeDotsIcon";

export const ListUserGroups = ({sortBy, asc}) => {

    //const {user} = useContext(UserContext);s
    const {userGroups, isLoading, deleteGroup} = useContext(GroupContext);
    const [toDelete, setToDelete] = useState(-1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [createdGroupsToShow, setCreatedGroupsToShow] = useState(null);
    const [memberGroupsToShow, setMemberGroupsToShow] = useState(null);

    useEffect(() => {
        if(userGroups) {
            let createdList = userGroups[0];
            let memberList = userGroups[1];

            const sortFunc = (a, b) => {
                let diff = 0;
                switch(sortBy) {
                    case 'name':
                        diff = a.name.localeCompare(b.name); break;
                    case 'created':
                        diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); break;
                    case 'private':
                        diff =  b.isPublic - a.isPublic; break;
                }

                if(asc === '1') diff *= -1;

                return diff;
            }

            if(sortBy !== 'none') {
                if(createdList) createdList = createdList.sort(sortFunc);
                if(memberList) memberList = memberList.sort(sortFunc);
            }

            setCreatedGroupsToShow(createdList);
            setMemberGroupsToShow(memberList);
        }
    }, [userGroups, asc, sortBy])

    if(isLoading || userGroups.length === 0) return <Loader/>
    return (
        <div className="user-list-container list-group">
            {
                (!createdGroupsToShow || createdGroupsToShow.length === 0) && (!memberGroupsToShow || memberGroupsToShow.length === 0)
                && <NoContent/>
            }
            {
                createdGroupsToShow && createdGroupsToShow.length > 0 &&
                <>
                    <h3 className="mb-3 mt-2">Created by You</h3>

                    {createdGroupsToShow.map((group) => (
                        <div key={`grouplistitem${group.id}`}
                             className="list-group-item list-group-item-action d-flex justify-content-between group-link">
                            <div>
                                <h5>{group.name} <LockIcon unlocked={group.isPublic}/></h5>
                                <p className="text-secondary"><ClockIcon/>Created {DateToAgo(group.createdAt)}</p>
                            </div>
                            <div className="d-flex flex-column align-items-end">
                            <NavLink className='btn p-1 btn-outline-secondary mb-2'
                                         to={`/groups/${group.id}`}><ThreeDotsIcon/></NavLink>
                                <button onClick={() => {
                                    setToDelete(group);
                                    setShowDeleteModal(true);
                                    }} className="btn p-1 btn-outline-danger" style={{ height: '45%', textAlign: 'center' }}><TrashIcon/>
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            }
            {
                memberGroupsToShow && memberGroupsToShow.length > 0 &&
                <>
                    <h3 className="mb-3 mt-2">You are a member of</h3>
                    {memberGroupsToShow.map((group) => (
                        <div key={`grouplistitem${group.id}`}
                             className="list-group-item list-group-item-action d-flex justify-content-between">
                            <div>
                                <h5>{group.name}</h5>
                                <p className="text-secondary">Created by @{group.creator.login}</p>
                            <p className="text-secondary">Role: {group.UsersGroups.role}</p>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <p className="text-secondary"><ClockIcon/>Created {DateToAgo(group.createdAt)}</p>
                            <NavLink className='btn p-1 btn-outline-secondary mb-2'
                                         to={`/groups/${group.id}`}><ThreeDotsIcon/></NavLink>
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