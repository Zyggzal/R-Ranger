import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../Context/Event/EventContext";
import {NavLink} from "react-router-dom";
import ThreeDotsIcon from "../../Components/Icons/ThreeDotsIcon/ThreeDotsIcon"
import LockIcon from "../Icons/LockIcon/LockIcon";
import ClockIcon from "../Icons/ClockIcon/ClockIcon";
import Loader from '../../Components/Loader/Loader'
import './listUserEvents.css'
import NoContent from "../NoContent/NoContent";

export const ListUserEvents = ({sortBy, asc}) =>{

    const {userEvents, fetchUserEvents, loading, getEventStatus, getEventStatusNum} = useContext(EventContext);
    const [eventsToShow, setEventsToShow] = useState(null);

    useEffect(() => {
        fetchUserEvents();
    }, [])

    useEffect(() => {
        if(userEvents && userEvents.participatesIn) {
            let list = userEvents.participatesIn;

            if(sortBy != 'none') {
                list = list.sort((a, b) => {
                    let diff = 0;
                    switch(sortBy) {
                        case 'name':
                            diff = a.name.localeCompare(b.name); break;
                        case 'signup':
                            diff = new Date(a.signUpEndDate).getTime() - new Date(b.signUpEndDate).getTime(); break;
                        case 'start':
                            diff = new Date(a.startDate).getTime() - new Date(b.startDate).getTime(); break;
                        case 'end':
                            diff = new Date(a.endDate).getTime() - new Date(b.endDate).getTime(); break;
                        case 'status':
                            diff = getEventStatusNum(a) - getEventStatusNum(b); break;
                    }

                    if(asc === '1') diff *= -1;

                    return diff;
                })
            }
            setEventsToShow(list)
        }
    }, [userEvents, sortBy, asc])


    if(loading || !userEvents){
        return <Loader/>
    }
    if(!eventsToShow || eventsToShow.length === 0){
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