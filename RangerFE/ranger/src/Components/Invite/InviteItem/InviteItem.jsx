import { useContext, useEffect, useState } from "react"
import ClockIcon from "../../Icons/ClockIcon/ClockIcon"
import { DateToAgo } from "../../../Utils/DateTransformer"
import { FriendContext } from "../../../Context/Friend/FriendContext"
import { EventContext } from "../../../Context/Event/EventContext"
import { GroupContext } from "../../../Context/Group/GroupContext"
import { NavLink } from "react-router-dom"

export const InviteItem = ({invite, onAccept, onDecline}) => {
    const [eventType, setEventType] = useState(null)

    const {acceptFriendRequest, declineFriendRequest} = useContext(FriendContext)
    const {acceptEventInvite, declineEventInvite} = useContext(EventContext)
    const {acceptGroupInvite, declineGroupInvite} = useContext(GroupContext)

    useEffect(() => {
        if(invite.Friend) {
            setEventType('friend')
        }
        else if(invite.EventId) {
            setEventType('event')
        }
        else if(invite.GroupId) {
            setEventType('group')
        }
    }, [])

    const handleAccept = async () => {
        switch(eventType) {
            case 'friend':
                await acceptFriendRequest(invite.Friend); break;
            case 'event':
                await acceptEventInvite(invite); break;
            case 'group':
                await acceptGroupInvite(invite); break;
        }
        onAccept(invite);
    }

    const handleDecline = async () => {
        switch(eventType) {
            case 'friend':
                await declineFriendRequest(invite.Friend); break;
            case 'event':
                await declineEventInvite(invite); break;
            case 'group':
                await declineGroupInvite(invite); break;
        }
        onDecline(invite);
    }
    return (
        <div className="container invite-item-container">
            <img className="arrow" alt='arrow' src='/Resources/Images/Arrow.png'/>
            <img className="bend" alt='arrow' src='/Resources/Images/PaperBend.png'/>
            {
                eventType === 'friend' &&
                <>
                    <p className="time-label text-secondary"><ClockIcon/> {DateToAgo(invite.Friend.createdAt) }</p>
                    <h1>
                    <NavLink to={`/users/${invite.login}`} className='invite-item-link'>@{invite.login} </NavLink>
                        sent you a friend request
                    </h1>
                </>
            }
            {
                eventType === 'event' && 
                <>
                    <p className="time-label text-secondary"><ClockIcon/> {DateToAgo(invite.createdAt) }</p>
                    <h1>
                        <NavLink to={`/users/${invite.sender.login}`} className='invite-item-link'>@{invite.sender.login} </NavLink>
                        invited you to 
                        <NavLink to={`/events/${invite.event.id}`} className='invite-item-link'> {invite.event.name}</NavLink>
                    </h1>
                </>
            }
            {
                eventType === 'group' && 
                <>
                    <p className="time-label text-secondary"><ClockIcon/> {DateToAgo(invite.createdAt) }</p>
                    <h1>@{invite.sender.login} invited you to 
                        <NavLink to={`/groups/${invite.group.id}`} className='invite-item-link'> {invite.group.name}</NavLink>
                    </h1>
                </>
            }
            <hr/>
            <div className="btn-container">
                <button className="btn btn-accept"onClick={handleAccept}>Accept</button>
                <button className="btn btn-outline-danger" onClick={handleDecline}>Decline</button>
            </div>
        </div>
    )
}