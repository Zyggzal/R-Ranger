import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../Context/Event/EventContext";
import {NavLink, useLocation} from "react-router-dom";
import {ListParticipants} from "./listParticipants";
import Loader from "../Loader/Loader";
import { UserContext } from "../../Context/UserContext";
import styles from "./EventItem.css";
import InfoIcon from "../Icons/InfoIcon/InfoIcon";
import ClockIcon from "../Icons/ClockIcon/ClockIcon";
import EditIcon from "../Icons/EditIcon/EditIcon";

export const EventItem = ({id}) =>{

    const {eventById, eventParticipants, getEventUserStatus} = useContext(EventContext);
    const {user} = useContext(UserContext);

    const [event, setEvent] = useState({});
    const [participants, setParticipants] = useState(null);
    const [creator, setCreator] = useState({});
    const [date, setDate] = useState({});
    const [userStatus, setUserStatus] = useState(null);

    useEffect( () => {
        const fetchEvent = async () => {
            if (id) {
                const thisEvent = await eventById(await id);
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

    if(!event) return <Loader/>
    return (
        <div className="container mt-4 p-4 border rounded shadow event-box">
            <div className='main-grid-box'>
                <div className='main-text'>
                    <div className="d-flex justify-content-between align-items-center event-name">
                        <h1>{event.name}</h1>
                        
                        <div>
                            {event.isPublic ?
                                <div><span className='event-type text-bg-success badge'>
                                    Public 
                                    <InfoIcon content={<p>Users can see this event on the dashboard and sign up without invitations.</p>}/>
                                    </span>
                                </div>
                                :
                                <div><span className='event-type text-bg-danger badge'>
                                    Private 
                                    <InfoIcon content={<p>Private events are only accesible via invitations.</p>}/>
                                    </span>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="main-time">
                        <span><ClockIcon/> {date.start}</span> - <span><ClockIcon/> {date.end}</span>
                    </div>
                    <hr className="divider"/>
                    {event.creator && (
                        <div className="main-creator">

                            <div>Creator:</div>
                            <div>{`${event.creator.firstName} ${event.creator.lastName} `}</div>
                            <div className='text-secondary'>{`@${event.creator.login}`}</div>
                        </div>
                    )}
                </div>
                <div>
                    MAYBE SOME IMAGE
                </div>

            </div>

            <hr className="divider"/>


            <div className="event-desc">
                <div>
                    Public Description 
                    <InfoIcon content={<p><strong>Public</strong> description.<br/>Write the info you want everyone to see here. <br/><span className='text-secondary'>General info: type of activity, target audience, etc.</span></p>}/>
                </div>
                <p>{event.publicDescription}</p>
            </div>
            <hr className="divider-mini"/>
            <div className="event-desc">
                <div>
                    Private Description
                    <InfoIcon content={<p><strong>Private</strong> description.<br/>Write the info you want only the participants to see here. <br/><span className='text-secondary'>Specific info: links, locations, etc.</span></p>}/>
                </div>
                <div >{event.privateDescription}</div>
            </div>
            <hr className="divider"/>


            {participants && (userStatus.role === 'admin' || userStatus.role === 'creator') && (
                <div className="mt-4 p-3 border rounded">
                    <h5 className="mb-3">
                        Participants:
                        <span className="text-secondary ms-2"> {participants.length} </span>
                        {event.participantsLimit && (
                            <span className="text-secondary">
                        / {event.participantsLimit}
                    </span>
                        )}
                        <NavLink className='btn edit-btn' to={`/events/${id}/invite`}><EditIcon/></NavLink>
                    </h5>
                    <div>
                        <ListParticipants participants={participants} role={userStatus.role}/>
                    </div>
                </div>
            )}
        </div>
    )

}