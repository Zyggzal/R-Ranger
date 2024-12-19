import { useCallback, useContext, useEffect, useState } from "react"
import { EventContext } from "../../../Context/Event/EventContext"
import Loader from "../../Loader/Loader";
import './inviteToEvent.css'
import { InviteContext, InviteProvider } from "../../../Context/Invite/InviteContext";
import { InviteUserModal } from "../inviteUserModal/inviteUserModal";
import { DateToAgo } from "../../../Utils/DateTransformer";
import { Outlet, useNavigate } from "react-router-dom";
import ArrowDownIcon from "../../Icons/ArrowDownIcon/ArrowDownIcon";
import ArrowLeftSquareIcon from "../../Icons/ArrowLeftSquareIcon/ArrowLeftSquareIcon";

export const InviteToEvent = ({ eventId }) => {
    const navigate = useNavigate()

    const [event, setEvent] = useState(null);
    const [eventInvites, setEventInvites] = useState(null);

    const { eventById, removeParticipant } = useContext(EventContext);
    const { fetchEventInvites, removeInvite } = useContext(InviteContext);

    const [isFull, setIsFull] = useState(true);
    const [isOver, setIsOver] = useState(false);

    const [modal, setModal] = useState()

    const fetchInvites = useCallback(async () => {
        if(event) {
            const res = await fetchEventInvites(event.id)
            setEventInvites(res)
        }
    }, [event])

    const fetchEvents = useCallback(async () => {
        const res = await eventById(eventId, 'participants')
        if(!res) {
            return;
        } 
        setEvent(res)
        setIsOver(new Date() - new Date(res.endDate) > 0)

    }, [eventId])
    
    useEffect(()=> {
        const fetchEvent = async () => {
            if(!eventId) return;
            const res = await eventById(eventId, 'participants')
            if(!res) {
                return;
            } 
            setEvent(res)
            setIsOver(new Date() - new Date(res.endDate) > 0)

            const inv = await fetchEventInvites(res.id)
            setEventInvites(inv)
        }
        fetchEvent()
    }, [eventId])

    useEffect(() => {
        if(event && event.participantsLimit) {
            let cur = 0;
            if(eventInvites) {
                cur += eventInvites.length;
            }
            if(event.participants) {
                cur += event.participants.length;
            }
            setIsFull(cur >= event.participantsLimit)
        }
        else {
            setIsFull(false);
        }
    }, [event, eventInvites])

    return(
        <div className="invite-event-body" style={{position: "relative"}}>
            {/* <button className="btn btn-outline-danger btn-exit" onClick={()=>navigate(-1)}><ArrowLeftSquareIcon/> Back</button> */}
            {
            event && eventInvites ?
            <div className="container text-center">
                <h1>Invite Others to {event.name}</h1>
                <h4>
                    Current Participants: 
                    <span className={`badge ms-1 text-bg-${isFull ? 'danger' : 'success'}`}>{event.participants.length + eventInvites.length}{event.participantsLimit && `/${event.participantsLimit}`}</span> 
                    { !isOver && !isFull && <button className="btn btn-outline-success ms-3" onClick={()=>setModal(true)}><strong>+</strong></button>}
                    
                </h4>
                <div className="accordion m-5">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Participants
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="list-group">
                                {
                                event.participants.map((u)=>{
                                    return <div key={u.id} className="list-group-item list-group-item-action invite-event-item">
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-column align-items-start">
                                                <h3>{u.firstName} {u.lastName}</h3>
                                                <p className="text-secondary">@{u.login}</p>
                                            </div>
                                            <div className="d-flex flex-column align-items-end">
                                                <p className="text-secondary">Signed Up: { DateToAgo(u.EventParticipants.createdAt) }</p>
                                                <h6>Role: { u.EventParticipants.role }</h6>
                                                { u.EventParticipants.role !== 'creator' && 
                                                <button className="btn btn-outline-danger" onClick={ async ()=> {
                                                    await removeParticipant(event.id, u.id)
                                                    fetchEvents()
                                                }}>Remove</button>}
                                            </div>
                                        </div>
                                    </div>
                                })
                                }
                                {
                                eventInvites.map((i)=>{
                                    return <div key={i.id} className="list-group-item list-group-item-action invite-event-item">
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-column align-items-start">
                                                <h3>{i.user.firstName} {i.user.lastName}</h3>
                                                <p className="text-secondary">@{i.user.login}</p>
                                                <h6>Invited by @{i.sender.login}</h6>
                                            </div>
                                            <div className="d-flex flex-column align-items-end">
                                                <p className="text-secondary">Invited: { DateToAgo(i.createdAt) }</p>
                                                <button className="btn btn-outline-danger" onClick={ async ()=> {
                                                    await removeInvite(i.id)
                                                    fetchInvites()
                                                }}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                })
                                }
                        </div>
                    </div>
                </div>
            </div>
                {
                    isOver || isFull ?
                    <div className="alert alert-danger mt-5" role="alert">
                        <strong>You are unable to invite users to this event. </strong>
                        { isOver ? 'This event is over.' : 'This event is full.' } 
                    </div>
                    :
                    <div>
                        <InviteProvider>
                            <InviteUserModal eventInvites={eventInvites} showModal={modal} onClose={(res) => {
                                res && fetchInvites()
                                setModal(false)
                            }} event={event}/>
                        </InviteProvider>
                    </div>
                }
            </div>
            :
            <div className="loader-container">
                <Loader/>
            </div>
            }
        </div>
    )
}

export default InviteToEvent;