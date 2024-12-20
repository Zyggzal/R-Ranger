import {useContext, useEffect} from "react";
import {EventContext} from "../../Context/Event/EventContext";
import {NavLink} from "react-router-dom";
import ThreeDotsIcon from "../../Components/Icons/ThreeDotsIcon/ThreeDotsIcon"
import LockIcon from "../Icons/LockIcon/LockIcon";
import ClockIcon from "../Icons/ClockIcon/ClockIcon";
import Loader from '../../Components/Loader/Loader'
import './listUserEvents.css'
import NoContent from "../NoContent/NoContent";

export const ListUserEvents = () =>{

    const {userEvents, fetchUserEvents, loading, getEventStatus} = useContext(EventContext);

    useEffect(() => {
        fetchUserEvents();
    }, [])


    if(loading || !userEvents){
        return <Loader/>
    }
    if(userEvents.length === 0){
        return <NoContent/>
    }
    return (
        // toLocaleDateString
        <div className="user-list-container list-group">
            {
                !userEvents.participatesIn || userEvents.participatesIn.length === 0 ? <NoContent/> :
                userEvents.participatesIn.map((event) => (
                    <div key={event.id} className="list-group-item list-group-item-action d-flex justify-content-between">
                        <div>
                            <h2>{ event.name } { <LockIcon unlocked={event.isPublic} /> }</h2>
                            <p className="text-secondary">
                                <ClockIcon/>
                                { `${new Date(event.startDate).toLocaleDateString()} - ${new Date(event.endDate).toLocaleDateString()}` }
                            </p>
                            <h6>Status: {getEventStatus(event)}</h6>
                        </div>
                        <div className="d-flex flex-column align-items-end">
                            <NavLink className='btn p-1 btn-outline-danger' to={`/events/${event.id}`}><ThreeDotsIcon/></NavLink>
                            <div className="pt-3">
                                <p>
                                    Joined On: { new Date(event.EventParticipants.createdAt).toLocaleDateString() } 
                                    <br/>
                                    As { event.EventParticipants.role }
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}