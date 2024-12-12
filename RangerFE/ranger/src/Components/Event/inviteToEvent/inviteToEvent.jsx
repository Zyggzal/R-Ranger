import { useContext, useEffect, useState } from "react"
import { EventContext } from "../../../Context/Event/EventContext"
import Loader from "../../Loader/Loader";
import './inviteToEvent.css'
import { InviteProvider } from "../../../Context/Invite/InviteContext";
import { InviteUserModal } from "../inviteUserModal/inviteUserModal";

export const InviteToEvent = ({ eventId }) => {
    const [event, setEvent] = useState(null);

    const { eventById } = useContext(EventContext);
    const [isFull, setIsFull] = useState(true);
    const [isOver, setIsOver] = useState(false);

    const [modal, setModal] = useState()
    
    useEffect(()=>{
        const fetchEvent = async () => {
            const res = await eventById(eventId, 'participants,invites')
            if(!res) return;
            setEvent(res)
            setIsOver(new Date() - new Date(res.endDate) > 0)
            setIsFull(res.participantsLimit ? res.participants.length >= res.participantsLimit : false)
        }
        fetchEvent()
    }, [eventId])

    return(
        <div style={{position: "relative"}}>
            {
            event ?
            <div className="container text-center">
                <h1>Invite Others to {event.name}</h1>
                <h4>Current Participants: <span className={`badge text-bg-${isFull ? 'danger' : 'success'}`}>{event.participants.length}{event.participantsLimit && `/${event.participantsLimit}`}</span></h4>

                {
                    isOver || isFull ?
                    <div className="alert alert-danger mt-5" role="alert">
                        <strong>You are unable to invite users to this event. </strong>
                        { isOver ? 'This event is over.' : 'This event is full.' } 
                    </div>
                    :
                    <div>
                        <InviteProvider>
                            <InviteUserModal showModal={modal} onClose={() => setModal(false)} event={event}/>
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