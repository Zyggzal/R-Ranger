import LockIcon from "../Icons/LockIcon/LockIcon";
import ClockIcon from "../Icons/ClockIcon/ClockIcon";
import {NavLink} from "react-router-dom";
import ThreeDotsIcon from "../Icons/ThreeDotsIcon/ThreeDotsIcon";
import {useContext} from "react";
import {EventContext} from "../../Context/Event/EventContext";
import styles from "./listGroupEvents.css";
import NoContent from "../NoContent/NoContent";

export const ListGroupEvents = ({events}) => {

    // console.log(events);
    const {getEventStatus} = useContext(EventContext)

    return (
        events.length === 0 ? <NoContent/> :
        <div className="user-list-container list-group">
            {
                events.map((event) => (
                    <div key={event.id} className="list-group-item list-group-item-action d-flex justify-content-between">
                        <div>
                            <h2>{ event.name } { <LockIcon unlocked={event.isPublic} /> }</h2>
                            <div className="text-secondary event-time-status">
                                <ClockIcon/>
                                {`${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`}
                                <div>Status: {getEventStatus(event)}</div>
                            </div>

                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <NavLink className='btn p-1 btn-outline-danger' to={`/events/${event.id}`}><ThreeDotsIcon/></NavLink>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}