import {useCallback, useContext, useEffect, useState} from "react";
import {GroupContext} from "../../../Context/Group/GroupContext";
import {UserContext} from "../../../Context/UserContext";
import Loader from "../../Loader/Loader";
import {NavLink, useNavigate} from "react-router-dom";
import EditIcon from "../../Icons/EditIcon/EditIcon";
import {ListGroupEvents} from "../../Event/listGroupEvents";
import {EventProvider} from "../../../Context/Event/EventContext";
import styles from "./GroupItem.css"
import {ListGroupMembers} from "../listGroupMembers";
import LockIcon from "../../Icons/LockIcon/LockIcon";
import UpdateGroupForm from "../UpdateGroupForm/UpdateGroupForm";
import TrashIcon from "../../Icons/TrashIcon/TrashIcon";
import { Modal } from "react-bootstrap";
import ExitIcon from "../../Icons/ExitIcon/ExitIcon";

export const GroupItem = ({id}) => {
    const navigate = useNavigate();

    const {groupById, deleteGroup, removeParticipant} = useContext(GroupContext);
    const {user} = useContext(UserContext);

    const [group, setGroup] = useState({});
    const [events, setEvents] = useState([]);

    const [isUpdate, setIsUpdate] = useState(false);

    const [userStatus, setUserStatus] = useState('stranger');

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const findUserStatus = () =>{
        if(group.members){
            const m = group.members.find(member => member.id === user.id);

            let status;

            if(m && m.UsersGroups) {
                status = m.UsersGroups.role;
            }
            else {
                status = 'stranger'
            }

            setUserStatus(status);
        }
    }

    const fetchGroup = useCallback(async () => {
        const thisGroup = await groupById(id, ["creatorOf", 'members']);
        if(thisGroup) {
            setEvents(thisGroup.creatorOf);
            setGroup(thisGroup);
        }
    }, [groupById])

    useEffect(() => {
        fetchGroup()
    }, [fetchGroup])

    useEffect(() => {
        if(group.members) findUserStatus();
    }, [group])

    if(!group) return <Loader/>

    return (
        <div className="container mt-4 p-4 border rounded shadow event-box mb-3">
            <div className='group-grid-box'>
                <div className='group-info'>
                    <h3>
                        <div className='group-name'>
                            {
                                !isUpdate ?
                                <span>
                                    {group.name} <LockIcon unlocked={group.isPublic}/>
                                </span>
                                :
                                <UpdateGroupForm group={group} onSubmit={() => {
                                    fetchGroup();
                                    setIsUpdate(false);
                                }}/>
                            }
                        </div>
                    </h3>
                    {
                        userStatus === 'creator' &&
                        <div className="mb-3 mt-3 d-flex group-item-btns-container">
                            <button className="btn edit-btn" onClick={() => setIsUpdate((prev) => !prev)}><EditIcon/></button>
                            <button className="btn edit-btn" onClick={() => setShowDeleteModal(true)}><TrashIcon/></button>
                        </div>
                    }
                    {group.creator && (
                        <div className="group-creator">

                            <div>Creator:</div>
                            <div>{`${group.creator.firstName} ${group.creator.lastName} `}</div>
                            <NavLink to={`/users/${group.creator.login}`} className='event-group-link'>{`@${group.creator.login}`}</NavLink>
                        </div>
                    )}

                    <div className="d-flex justify-content-end pe-3">
                        {
                            (userStatus === 'member' || userStatus === 'admin') &&
                            <div onClick={()=> {
                                removeParticipant(id, user.id);
                                navigate('/profile/groups');
                            }} className='btn edit-btn'>Quit &nbsp; <ExitIcon /></div>
                        }
                    </div>

                    <hr className="divider" style={{width:'95%'}}/>

                    {group.members && (
                        <div className="group-item-members-list-container">
                            <div className='members-count'>Members: {group.members.length}
                                {userStatus === 'creator' || userStatus === 'admin' ? (
                                        <NavLink className='btn edit-btn' to={`/groups/${id}/invite`} state={{ pass: 'p' }}><EditIcon/></NavLink>
                                    ) :
                                    null
                                }
                            </div>
                            <ListGroupMembers members={group.members}/>
                        </div>

                    )}
                </div>
                <div className="group-events-container">
                    <h2>Group Events
                        {userStatus === 'creator' || userStatus === 'admin' ? (
                            <NavLink className="btn btn-crimson ms-3" to={`/events/add`} state={{groupId: group.id}}>
                                +
                            </NavLink>
                        ) :
                            null
                        }

                    </h2>
                    <div className="group-events-list">
                        {
                            events ? (
                                <EventProvider>
                                    <ListGroupEvents events={events}/>
                                </EventProvider>)
                                :
                                <Loader/>
                        }
                    </div>
                </div>
            </div>
            <Modal show={showDeleteModal} onHide={()=>setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This group will be removed for you and all its' members.</p>
                    <div className="d-flex justify-content-end">
                        <button  className="btn btn-danger me-2" onClick={()=>{
                            setShowDeleteModal(false);
                            deleteGroup(id);
                            navigate('/profile/groups');
                        }}>Delete</button>
                        <button  className="btn btn-secondary" onClick={()=>setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}