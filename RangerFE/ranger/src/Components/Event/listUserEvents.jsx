import {useContext, useEffect} from "react";
import {EventContext} from "../../Context/Event/EventContext";

export const ListUserEvents = () =>{

    const {userEvents, fetchUserEvents, loading} = useContext(EventContext);

    useEffect(() => {
        fetchUserEvents();
        console.log(userEvents)
    }, [])
    //console.log(userEvents)


    if(loading){
        return (<div>Loading...</div>)
    }
    return (

        <div>
            <table>
                <caption>User Events Table</caption>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Event</th>
                        <th>Sender</th>
                        <th>SendDate</th>
                    </tr>
                </thead>
                <tbody>
                {userEvents.map((event) => (
                    <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.status}</td>
                        <td>{event.event.name}</td>
                        <td>{event.sender.login}</td>
                        <td>{event.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}