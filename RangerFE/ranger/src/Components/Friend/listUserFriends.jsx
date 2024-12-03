import {useContext} from "react";
import {FriendContext} from "../../Context/Friend/FriendContext";

export const ListUserFriends = () =>{

    const {userFriends, isLoading} = useContext(FriendContext);
    // console.log(userFriends);

    if(isLoading || !userFriends) return <div>Loading...</div>;
    return(
        <div>
            <table>
                <caption>User Friends(all status)</caption>
                <thead>
                    <tr>
                        <th>Friend ID</th>
                        <th>Name</th>
                        <th>Login</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {userFriends.map((friend) => (
                    <tr key={friend.id}>
                        <td>{friend.id}</td>
                        <td>{`${friend.firstName} ${friend.lastName}`}</td>
                        <td>{friend.login}</td>
                        <td>{friend.email}</td>
                        <td>{friend.Friend.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
