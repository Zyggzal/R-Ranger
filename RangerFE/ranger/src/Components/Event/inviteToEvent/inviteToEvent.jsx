import { useCallback, useContext, useEffect, useState } from "react"
import { EventContext } from "../../../Context/Event/EventContext"
import Loader from "../../Loader/Loader";
import './inviteToEvent.css'
import { InviteContext, InviteProvider } from "../../../Context/Invite/InviteContext";
import { InviteUserModal } from "../inviteUserModal/inviteUserModal";
import { DateToAgo } from "../../../Utils/DateTransformer";

export const InviteToEvent = ({ eventId }) => {
    const [event, setEvent] = useState(null);
    const [eventInvites, setEventInvites] = useState(null);

    const { eventById } = useContext(EventContext);
    const { fetchEventInvites } = useContext(InviteContext);

    const [isFull, setIsFull] = useState(true);
    const [isOver, setIsOver] = useState(false);

    const [modal, setModal] = useState()

    const fetchInvites = useCallback(async () => {
        if(event) {
            const res = await fetchEventInvites(event.id)
            
            setEventInvites(res)
        }
    }, [event])
    
    useEffect(()=>{
        const fetchEvent = async () => {
            const res = await eventById(eventId, 'participants')
            if(!res) {

                return;
            } 
            setEvent(res)
            setIsOver(new Date() - new Date(res.endDate) > 0)
            setIsFull(res.participantsLimit ? res.participants.length >= res.participantsLimit : false)

            const inv = await fetchEventInvites(res.id)
            setEventInvites(inv)
        }
        fetchEvent()
    }, [eventId])

    return(
        <div style={{position: "relative"}}>
            {
            event && eventInvites ?
            <div className="container text-center">
                <h1>Invite Others to {event.name}</h1>
                <h4>Current Participants: <span className={`badge text-bg-${isFull ? 'danger' : 'success'}`}>{event.participants.length + eventInvites.length}{event.participantsLimit && `/${event.participantsLimit}`}</span></h4>
                <div className="list-group">
                    {
                        event.participants.map((u)=>{
                            return <a href="#" key={u.id} className="list-group-item list-group-item-action">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-column align-items-start">
                                        <h3>{u.firstName} {u.lastName}</h3>
                                        <p className="text-secondary">@{u.login}</p>
                                    </div>
                                    <div className="d-flex flex-column align-items-end">
                                        <p className="text-secondary">Signed Up: { DateToAgo(u.EventParticipants.createdAt) }</p>
                                        <h6>Role: { u.EventParticipants.role }</h6>
                                    </div>
                                </div>
                            </a>
                        })
                    }
                    {
                        eventInvites.map((i)=>{
                            return <a href="#" key={i.id} className="list-group-item list-group-item-action">
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-column align-items-start">
                                        <h3>{i.user.firstName} {i.user.lastName}</h3>
                                        <p className="text-secondary">@{i.user.login}</p>
                                        <h6>Invited by @{i.sender.login}</h6>
                                    </div>
                                    <div className="d-flex flex-column align-items-end">
                                        <p className="text-secondary">Invited: { DateToAgo(i.createdAt) }</p>
                                        <h6>Role: { i.role }</h6>
                                    </div>
                                </div>
                            </a>
                        })
                    }
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
                                <button onClick={()=>setModal(true)}>Add</button>
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