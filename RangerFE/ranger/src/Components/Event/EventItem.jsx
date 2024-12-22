import {useCallback, useContext, useEffect, useState} from "react";
import {EventContext} from "../../Context/Event/EventContext";
import {NavLink, useLocation} from "react-router-dom";
import {ListParticipants} from "./listParticipants";
import Loader from "../Loader/Loader";
import { UserContext } from "../../Context/UserContext";
import styles from "./EventItem.css";
import InfoIcon from "../Icons/InfoIcon/InfoIcon";
import ClockIcon from "../Icons/ClockIcon/ClockIcon";
import EditIcon from "../Icons/EditIcon/EditIcon";
import {EventReviewsList} from "./EventReview/EventRewiewsList";
import {ReviewsProvider} from "../../Context/Reviews/ReviewsContext";
import CountdownComponent from "../CountdownComponent/CountdownComponent";
import { DateToAgo } from "../../Utils/DateTransformer";

export const EventItem = ({id}) =>{

    const {eventById, eventParticipants, getEventUserStatus, getEventStatusNum} = useContext(EventContext);
    const {user} = useContext(UserContext);

    const [event, setEvent] = useState({});
    const [participants, setParticipants] = useState(null);
    const [creator, setCreator] = useState({});
    const [date, setDate] = useState({});
    const [userStatus, setUserStatus] = useState(null);
    const [eventStatus, setEventStatus] = useState(null);

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
                setEventStatus(getEventStatusNum(thisEvent))
            }
        };

        fetchEvent();

    }, []);

    const getEventProgressPercent = useCallback(() => {
        const now = Date.now() - new Date(event.startDate)
        const end = new Date(event.endDate) - new Date(event.startDate)

        return (now * 100) / end;
    }, [event])

    useEffect(() => {
        if(!userStatus) return;
        
        const fetchParticipants = async () => {
            const thisParticipants = await eventParticipants(id);

            setParticipants(thisParticipants);
        }
        fetchParticipants();
    }, [userStatus])

    if(!event) return <Loader/>
    return (
        <div className="container mt-4 p-4 border rounded shadow event-box mb-3">
            <div className='main-grid-box'>
                <div className='main-text'>
                    <div className="d-flex justify-content-between align-items-center event-name">
                        <h1>{event.name}</h1>

                        <div>
                            {event.isPublic ?
                                <div><span className='event-type text-bg-success badge'>
                                    Public 
                                    <InfoIcon content={<p>Users can see this event on the dashboard and sign up without
                                        invitations.</p>}/>
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
                <div className="timer-container">
                    <ClockIcon/>
                    {
                        eventStatus === 0 &&
                        <>
                            <h1>
                                Sign up ends in:
                            </h1>
                            <CountdownComponent time={event.signUpEndDate}/>
                        </>
                    }
                    {
                        eventStatus === 1 &&
                        <>
                            <h1>
                                Starts in:
                            </h1>
                            <CountdownComponent time={event.startDate}/>
                        </>
                    }
                    {
                        eventStatus === 2 &&
                        <>
                            <h1>
                                Ends in:
                            </h1>
                            <CountdownComponent time={event.endDate}/>
                            <div style={{width: '70%', backgroundColor: '#B1A7A6' }} className="progress" role="progressbar">
                                <div className="progress-bar" style={{ backgroundColor: '#A4161A',  width: `${getEventProgressPercent()}%`}} >Event Progress</div>
                            </div>
                        </>
                    }
                    {
                        eventStatus === 3 &&
                        <h1>
                            Ended { DateToAgo(event.endDate) }
                        </h1>
                    }
                </div>
            </div>

            <hr className="divider"/>


            <div className="event-desc">
                <h1>
                    Public Description
                    <InfoIcon
                        content={<p><strong>Public</strong> description.<br/>Write the info you want everyone to see
                            here. <br/><span className='text-secondary'>General info: type of activity, target audience, etc.</span>
                        </p>}/>
                </h1>
                <p>{event.publicDescription}</p>
            </div>
            <hr className="divider-mini"/>
            <div className="event-desc">
                <h1>
                    Private Description
                    <InfoIcon content={<p><strong>Private</strong> description.<br/>Write the info you want only the
                        participants to see here. <br/><span className='text-secondary'>Specific info: links, locations, etc.</span>
                    </p>}/>
                </h1>
                <p>{event.privateDescription}</p>
            </div>
            <hr className="divider"/>

            <div className="mt-4 p-3 border rounded div-participants">
                <h1 className="heading">
                    Participants:
                    <span className="ms-3 badge fs-4">
                        {participants && participants.length}
                        {event.participantsLimit && 
                            ` / ${event.participantsLimit}`
                        }
                    </span>
                    {participants && (userStatus.role === 'admin' || userStatus.role === 'creator') && eventStatus <= 1 && (
                        <NavLink className='btn edit-btn' to={`/events/${id}/invite`}>Edit <EditIcon/></NavLink>
                    )}
                </h1>

                <div>
                    <ListParticipants participants={participants}/>
                </div>
            </div>

            {
                eventStatus === 3 &&
                <div className="mt-4 p-3 border rounded div-participants">
                    <h1 className="heading">Reviews:</h1>
                    <ReviewsProvider>
                        <EventReviewsList id={event.id}/>
                    </ReviewsProvider>
                </div>
            }
        </div>
    )

}