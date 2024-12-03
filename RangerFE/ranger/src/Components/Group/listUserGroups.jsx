import {GroupContext} from "../../Context/Group/GroupContext";
import {useContext} from "react";

export const ListUserGroups = () => {

    //const {user} = useContext(UserContext);s
    const {userGroups, isLoading} = useContext(GroupContext);

    if(isLoading || userGroups.length === 0) return <div>Loading...</div>
    return (
        <div>
            <h1>Your groups</h1>
            <ul>
                <h3>You - creator</h3>
                {userGroups[0].map((group) => (
                    <li key={group.id}>
                        <h4>{group.name}</h4>
                        <div>Creator: {group.creator.login}</div>
                    </li>
                ))}
                <h3 >You - member</h3>
                {userGroups[1].map((group) => (
                    <li key={group.id}>
                        <h4>{group.name}</h4>
                        <div>Creator: {group.creator.login}</div>
                        <div>Role: {group.UsersGroups.role}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}