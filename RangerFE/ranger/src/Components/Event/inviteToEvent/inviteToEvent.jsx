import { useCallback, useContext, useEffect, useState } from "react"
import { EventContext } from "../../../Context/Event/EventContext"
import Loader from "../../Loader/Loader";
import './inviteToEvent.css'
import { InviteContext, InviteProvider } from "../../../Context/Invite/InviteContext";
import { InviteUserModal } from "../inviteUserModal/inviteUserModal";
import { DateToAgo } from "../../../Utils/DateTransformer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import PersonDashIcon from "../../Icons/PersonDashIcon/PersonDashIcon";
import { UserContext } from "../../../Context/UserContext";
import InfoIcon from "../../Icons/InfoIcon/InfoIcon";

export const InviteToEvent = ({ eventId }) => {

    const [event, setEvent] = useState(null);
    const [eventInvites, setEventInvites] = useState(null);

    const { eventById, removeParticipant, changeUserRoleInEvent } = useContext(EventContext);
    const { fetchEventInvites, removeInvite } = useContext(InviteContext);
    const {user} = useContext(UserContext);

    const [isFull, setIsFull] = useState(true);
    const [isOver, setIsOver] = useState(false);

    const [modal, setModal] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const {pass} = location.state || {};
        if(!pass)navigate('/')
    }, [])

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
    }, [eventById])

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
            {
            event && eventInvites ?
            <div className="container text-center">
                <div>
                    <h1 style={{ display: 'inline-block' }}>Invite Others to {event.name}</h1>
                    <NavLink style={{ marginLeft: '15px', marginBottom: '15px' }} className='btn btn-crimson' to={`/events/${event.id}`} replace><strong>X</strong></NavLink>
                </div>
                <h4>
                    Current Participants: 
                    <span className={`badge ms-3 text-bg-${isFull ? 'danger' : 'success'}`}>{event.participants.length + eventInvites.length}{event.participantsLimit && `/${event.participantsLimit}`}</span> 
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
                            <div className="list-group rnd-user-sroll-list" style={{ overflowY: 'auto', maxHeight: '55vh' }}>
                                {
                                event.participants.map((u)=>{
                                    return <div key={u.id} className="list-group-item list-group-item-action invite-event-item">
                                        <div className="d-flex justify-content-between invite-to-event-invites-list-item">
                                            <div className="d-flex flex-column align-items-start">
                                                <h3>{u.firstName} {u.lastName}</h3>
                                                <NavLink to={`/users/${u.login}`} className="m-1 event-group-link">@{ u.login }</NavLink>
                                            </div>
                                            <div className="d-flex flex-column align-items-end">
                                                <p className="text-secondary">Signed Up: { DateToAgo(u.EventParticipants.createdAt) }</p>
                                                <h6>
                                                    Role: { u.EventParticipants.role }
                                                    <InfoIcon content={
                                                        <p>
                                                            {
                                                                u.EventParticipants.role === 'participant' &&
                                                                <><strong>Participants</strong> can view this event and its' members without making any changes</>
                                                            }
                                                            {
                                                                u.EventParticipants.role === 'admin' &&
                                                                <><strong>Admins</strong> can manage this event's participants (<strong>invite, remove, promote, demote</strong>)</>
                                                            }
                                                            {
                                                                u.EventParticipants.role === 'creator' &&
                                                                <><strong>Creator</strong> can edit this event's information as well as manage its' participants</>
                                                            }
                                                        </p>
                                                    }/>
                                                </h6>
                                                { u.EventParticipants.role !== 'creator' && user.id !== u.id &&
                                                    <div className="d-flex">
                                                        {
                                                            u.EventParticipants.role === 'participant' ? 
                                                                <button className="btn btn-crimson" onClick={ async ()=> {
                                                                    await changeUserRoleInEvent(eventId, u.id, 'admin')
                                                                    fetchEvents()
                                                                }}>Promote</button>
                                                                :
                                                                <button className="btn btn-outline-secondary" onClick={ async ()=> {
                                                                    await changeUserRoleInEvent(eventId, u.id, 'participant')
                                                                    fetchEvents()
                                                                }}>Demote</button>
                                                        }
                                                        <button className="btn btn-outline-danger ms-3 p-1" onClick={ async ()=> {
                                                             await removeParticipant(event.id, u.id)
                                                            fetchEvents()
                                                        }}><PersonDashIcon/></button>
                                                    </div>
                                                }
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
                                                <NavLink to={`/users/${i.user.login}`} className="m-1 event-group-link">@{ i.user.login }</NavLink>
                                                <h6 className="text-secondary pt-2">
                                                    Invited by
                                                    <NavLink to={`/users/${i.sender.login}`} className="m-1 event-group-link">@{ i.sender.login }</NavLink>
                                                </h6>
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