import {useContext, useEffect, useState} from "react";
import {GroupContext} from "../../../Context/Group/GroupContext";
import {UserContext} from "../../../Context/UserContext";
import Loader from "../../Loader/Loader";
import InfoIcon from "../../Icons/InfoIcon/InfoIcon";
import ClockIcon from "../../Icons/ClockIcon/ClockIcon";
import CountdownComponent from "../../CountdownComponent/CountdownComponent";
import {DateToAgo} from "../../../Utils/DateTransformer";
import {NavLink} from "react-router-dom";
import EditIcon from "../../Icons/EditIcon/EditIcon";
import {ListParticipants} from "../../Event/listParticipants";
import {ReviewsProvider} from "../../../Context/Reviews/ReviewsContext";
import {EventReviewsList} from "../../Event/EventReview/EventRewiewsList";
import PersonPlusIcon from "../../Icons/PersonPlusIcon/PersonPlusIcon";
import {ListGroupEvents} from "../../Event/listGroupEvents";
import {EventProvider} from "../../../Context/Event/EventContext";
import styles from "./GroupItem.css"
import {ListGroupMembers} from "../listGroupMembers";
import LockIcon from "../../Icons/LockIcon/LockIcon";

export const GroupItem = ({id}) => {

    const {groupById} = useContext(GroupContext);
    const {user} = useContext(UserContext);

    const [group, setGroup] = useState({});
    const [events, setEvents] = useState([]);

    const [userStatus, setUserStatus] = useState('stranger');

    const findUserStatus = () =>{
        if(group.members){
            const status = group.members.find(member => member.id === user.id).UsersGroups.role;

            setUserStatus(status);//
        }
    }

    useEffect(() => {
        const fetchGroup = async () => {
            const thisGroup = await groupById(id, ["creatorOf", 'members']);
            setEvents(thisGroup.creatorOf)
            setGroup(thisGroup);

        }

        fetchGroup()
    }, [])

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
                            <span>
                                {group.name} <LockIcon unlocked={group.isPublic}/>
                            </span>
                        </div>
                    </h3>

                    {group.creator && (
                        <div className="group-creator">

                            <div>Creator:</div>
                            <div>{`${group.creator.firstName} ${group.creator.lastName} `}</div>
                            <div className='text-secondary'>{`@${group.creator.login}`}</div>
                        </div>
                    )}

                    <hr className="divider" style={{width:'95%'}}/>

                    {group.members && (
                        <div>
                            <div className='members-count'>Members: {group.members.length}
                                {userStatus === 'Creator' || userStatus === 'Admin' ? (
                                        <NavLink className='btn edit-btn' to={`/events/${id}/invite`}>Edit(copied from event) <EditIcon/></NavLink>
                                    ) :
                                    null
                                }
                            </div>
                            <ListGroupMembers members={group.members}/>
                        </div>

                    )}
                </div>
                <div>
                    <h2>Group Events
                        {userStatus === 'Creator' || userStatus === 'Admin' ? (
                            <NavLink className="btn btn-crimson ms-3" to={`/events/add`} state={{groupId: group.id}}>
                                Create group event
                            </NavLink>
                        ) :
                        null
                        }

                    </h2>
                    {events && (
                        <EventProvider>
                            <ListGroupEvents events={events}/>
                        </EventProvider>
                    )}
                </div>
            </div>
        </div>
    )
}