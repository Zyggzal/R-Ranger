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

export const GroupItem = ({id}) => {

    const {groupById} = useContext(GroupContext);
    const {user} = useContext(UserContext);

    const [group, setGroup] = useState({});
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchGroup = async () => {
            const thisGroup = await groupById(id, "creatorOf");
            setEvents(thisGroup.creatorOf)
            setGroup(thisGroup);
        }

        fetchGroup()
    }, [])

    if(!group) return <Loader/>

    return (
        <div className="container mt-4 p-4 border rounded shadow event-box mb-3">
            <div className='group-grid-box'>
                <div>
                    <div>{group.name}</div>
                    {group.creator && (
                        <div className="main-creator">

                            <div>Creator:</div>
                            <div>{`${group.creator.firstName} ${group.creator.lastName} `}</div>
                            <div className='text-secondary'>{`@${group.creator.login}`}</div>
                        </div>
                    )}
                </div>
                <div>
                    <h2>Group Events
                        <button className="btn btn-crimson ms-3" >
                            Create group event
                        </button>
                    </h2>
                    {events && (
                        <EventProvider>
                            <ListGroupEvents events={events} />
                        </EventProvider>
                    )}
                </div>
            </div>
        </div>
    )
}