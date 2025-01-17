import {useContext} from "react";
import {InviteContext} from "../../Context/Invite/InviteContext";

export const ListUserSortedInvites = () =>{

    const {friendInvites, eventInvites, groupInvites, isLoading, eventUpdateStatus} = useContext(InviteContext);


    if(isLoading || !friendInvites || !eventInvites || !groupInvites) return <div>Loading...</div>

    function eventHandler(id, EventId, action) {
        switch(action){
            case 'accept':
                eventUpdateStatus(id, 'accepted', EventId);
                break;
            case 'decline':
                eventUpdateStatus(id, 'declined', EventId);
                break;
            default: break;
        }
    }

    return (
        <div>
            <h4>Event invites</h4>
            <ul className="list-group">
                {eventInvites.map((invite) => (
                    <li key={`${invite.id}event`}>
                        <div>Id: {invite.EventId}</div>
                        <div>Name: {invite.event.name}</div>
                        <div>Sender: {invite.sender.login}</div>
                        <div>
                            <button onClick={e => eventHandler(invite.id, invite.EventId ,'accept')}>Accept</button>
                            <button onClick={e => eventHandler(invite.id, invite.EventId ,'decline')}>Decline</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h4>Group invites</h4>
            <ul className="list-group">
                {groupInvites.map((invite) => (
                    <li key={`${invite.id}group`}>
                        <div>Id: {invite.GroupId}</div>
                        <div>Name: {invite.group.name}</div>
                        <div>Sender: {invite.sender.login}</div>
                    </li>
                ))}

            </ul>
            <h4>Friend invites</h4>
            <ul className="list-group">
                {friendInvites.map((invite) => (
                    <li key={`${invite.id}friend`}>
                        <div>Friend id: {invite.id}</div>
                        <div>Friend login: {invite.login}</div>
                        <div>Date: {invite.Friend.createdAt}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}