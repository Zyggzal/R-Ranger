import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../Context/Event/EventContext";
import {NavLink, useLocation} from "react-router-dom";
import {ListParticipants} from "./listParticipants";
import Loader from "../Loader/Loader";
import { UserContext } from "../../Context/UserContext";
import styles from "./EventItem.css";

export const EventItem = ({id}) =>{

    const {eventById, eventParticipants, getEventUserStatus} = useContext(EventContext);
    const {user} = useContext(UserContext);

    const [event, setEvent] = useState({});
    const [participants, setParticipants] = useState(null);
    const [creator, setCreator] = useState({});
    const [date, setDate] = useState({});
    const [userStatus, setUserStatus] = useState(null);

    // console.log("Role: ", role);

    useEffect( () => {
        const fetchEvent = async () => {
            if (id) {
                const thisEvent = await eventById(await id);
                // console.log(thisEvent);
                setEvent(thisEvent);
                setCreator(thisEvent.creator);
                const timeStyle = {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }
                const eventStartDate = new Date(thisEvent.startDate).toLocaleString([], timeStyle);
                const eventEndDate = new Date(thisEvent.endDate).toLocaleString([], timeStyle);
                setDate({start: eventStartDate, end: eventEndDate});

                const status = await getEventUserStatus(user.id, id);
                setUserStatus(status);
            }
        };

        fetchEvent();

    }, []);

    useEffect(() => {
        if(!userStatus) return;
        
        const fetchParticipants = async () => {
            if(userStatus.role === 'admin' || userStatus.role === 'creator'){
                const thisParticipants = await eventParticipants(id);
    
                setParticipants(thisParticipants);
            }
        }
        fetchParticipants();
    }, [userStatus])
    console.log(event)
    if(!event) return <Loader/>
    return (
        <div className="container mt-4 p-4 border rounded shadow event-box">
            <div className='main-grid-box'>
                <div className='main-text'>
                    <h1 className='event-name'>{event.name}</h1>

                    <div className="main-time">
                        <span>{date.start}</span> - <span>{date.end}</span>
                    </div>
                    <hr className="divider"/>
                    {event.creator && (
                        <div className="main-creator">

                            <div>Creator:</div>
                            <div>{`${event.creator.firstName} ${event.creator.lastName} `}</div>
                            <div className='text-muted'>{`@${event.creator.login}`}</div>
                        </div>
                    )}


                    <div>
                        {event.isPublic ?
                            <div><span className='event-type text-bg-success badge'>Public Event</span></div>
                            :
                            <div><span className='event-type text-bg-danger badge'>Private Event</span></div>
                        }
                    </div>
                </div>
                <div>
                    MAYBE SOME IMAGE
                </div>

            </div>

            <hr className="divider"/>


            <div className="event-desc">
                <div>Description</div>
                <p>{event.publicDescription}</p>
            </div>
            <hr className="divider-mini"/>
            <div className="event-desc private">
                <div>How to enter?</div>
                <div >{event.privateDescription}</div>
            </div>
            <hr className="divider"/>


            {participants && (userStatus.role === 'admin' || userStatus.role === 'creator') && (
                <div className="mt-4 p-3 bg-white border rounded">
                    <h5 className="mb-3">
                        Participants:
                        <span className="text-secondary"> {participants.length} </span>
                        {event.participantsLimit && (
                            <span className="text-secondary">
                        / {event.participantsLimit}
                    </span>
                        )}
                    </h5>
                    <div>
                        <NavLink className='btn btn-link' to='/eventInvite' state={{eventId: event.id}}>Invite to
                            Event</NavLink>
                    </div>
                    <div>
                        <ListParticipants participants={participants} role={userStatus.role}/>
                    </div>
                </div>
            )}
        </div>
    )

}