import ClockIcon from "../../Icons/ClockIcon/ClockIcon";
import { NavLink } from "react-router-dom";
import LockIcon from "../../Icons/LockIcon/LockIcon";
import ThreeDotsIcon from "../../Icons/ThreeDotsIcon/ThreeDotsIcon";

const UserEventListComponent = ({event}) => {

    return (
        <div key={event.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center " >
            <div>
                <h2>{event.name} {<LockIcon unlocked={event.isPublic}/>}</h2>
                <p className="text-secondary">
                    <ClockIcon/>
                    {`${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}`}
                </p>
            </div>
            <div className="d-flex flex-column align-items-end">
                <NavLink className='btn p-1 btn-outline-danger' to={`/events/${event.id}`}><ThreeDotsIcon/></NavLink>
            </div>
        </div>
    )
}

export {UserEventListComponent};