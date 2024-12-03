import {GroupContext} from "../../Context/Group/GroupContext";
import {useContext, useEffect} from "react";
import {UserContext} from "../../Context/UserContext";

export const ListPublicGroups = () => {

    const {user} = useContext(UserContext);
    const {publicGroups, isLoading, fetchPublicGroups} = useContext(GroupContext);

    useEffect(() => {
        fetchPublicGroups();
    }, [user])

    if(isLoading || !publicGroups) return <div>Loading...</div>
    return (
        <div>
            <h1>Public groups</h1>
            <ul>
                {publicGroups.map(group => (
                    <li key={group.id}>
                        <h4>{group.name}</h4>
                        <div>Creator: {group.creator.login}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}