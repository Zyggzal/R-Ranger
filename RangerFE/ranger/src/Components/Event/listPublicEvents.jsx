import {useContext, useEffect} from "react";
import {EventContext} from "../../Context/Event/EventContext";
import {UserContext} from "../../Context/UserContext";

export const ListPublicEvents = () =>{
    const {user}  = useContext(UserContext);
    const {publicEvents, fetchPublicEvents,  loading} = useContext(EventContext);

    useEffect(() => {
        fetchPublicEvents();
    }, [user])


    if(loading || !publicEvents){
        return (<div>Loading...</div>)
    }
    return (

        <div>
            <table>
                <caption>Pubic events table</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Event</th>
                    <th>Creator</th>
                    <th>SendDate</th>
                </tr>
                </thead>
                <tbody>
                {publicEvents.map((event) => (
                    <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.status}</td>
                        <td>{event.name}</td>
                        <td>{event.creator.login}</td>
                        <td>{event.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}