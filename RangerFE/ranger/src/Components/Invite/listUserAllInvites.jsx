import {useContext} from "react";
import {InviteContext} from "../../Context/Invite/InviteContext";

const ListUserAllInvites = () =>{

    //const {user} = useContext(UserContext);
    const {allInvites, isLoading} = useContext(InviteContext);

    if(isLoading || !allInvites) return <div>Loading...</div>
    return (
        <div>
            {allInvites.length <= 0 ? 
                <h1>Nothing to see here yet...</h1>
                :
                <table className="table">
                    <caption>All User Invites</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Sender</th>
                            <th>IsGroup</th>
                            <th>IsEvent</th>
                            <th>IsFriend</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    allInvites.map((invite) => (
                        <tr key={`${invite.id}-${invite.createdAt}`}>
                            <td>{invite.id}</td>
                            <td>{!invite.Friend ? invite.status ? 'accepted' : 'pending' : invite.Friend.status}</td>
                            <td>{invite.sender ? invite.sender.login : invite.login}</td>
                            <td>{invite.GroupId ? 'Yes' : 'No'}</td>
                            <td>{invite.EventId ? 'Yes' : 'No'}</td>
                            <td>{invite.Friend ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default ListUserAllInvites;