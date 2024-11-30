import {useContext} from "react";
import {InviteContext} from "../../Context/Invite/InviteContext";
import {UserContext} from "../../Context/UserContext";
//ACTUAL INVITES!!!!
export const ListUserSortedInvites = () =>{

    const {user} = useContext(UserContext);
    const {friendInvites, eventInvites, groupInvites, isLoading} = useContext(InviteContext);

    // console.log(friendInvites);
    // console.log(eventInvites);
    // console.log(groupInvites);

    if(isLoading || !friendInvites || !eventInvites || !groupInvites) return <div>Loading...</div>
    return (
        <div>
            <h4>Event invites</h4>
            <ul>
                {eventInvites.map((invite) => (
                    <li key={`${invite.id}event`}>
                        <div>Id: {invite.EventId}</div>
                        <div>Name: {invite.event.name}</div>
                        <div>Sender: {invite.sender.login}</div>
                    </li>
                ))}
            </ul>
            <h4>Group invites</h4>
            <ul>
                {groupInvites.map((invite) => (
                    <li key={`${invite.id}group`}>
                        <div>Id: {invite.GroupId}</div>
                        <div>Name: {invite.group.name}</div>
                        <div>Sender: {invite.sender.login}</div>
                    </li>
                ))}

            </ul>
            <h4>Friend invites</h4>
            <ul>
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