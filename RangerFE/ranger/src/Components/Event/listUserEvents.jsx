import {useContext, useEffect} from "react";
import {EventContext} from "../../Context/Event/EventContext";

export const ListUserEvents = () =>{

    const {userEvents, fetchUserEvents, loading} = useContext(EventContext);

    useEffect(() => {
        fetchUserEvents();
        //console.log(userEvents)
    }, [])


    if(loading || !userEvents){
        return (<div>Loading...</div>)
    }
    if(userEvents.length === 0){
        return (<div>Zero events</div>)
    }
    return (

        <div>
            <table>
                <caption>User Accepted Events Table</caption>
                <thead>
                    <tr>
                        <th>Event ID</th>
                        <th>Event</th>
                        <th>Role</th>
                        <th>Event type</th>
                        <th>Start date</th>
                        <th>Accepting date</th>
                    </tr>
                </thead>
                <tbody>
                {userEvents.participatesIn.map((event) => (
                    <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.name}</td>
                        <td>{event.EventParticipants.role}</td>
                        <td>{event.isPublic ? "Public" : "Private"}</td>
                        <td>{event.startDate}</td>
                        <td>{event.EventParticipants.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}