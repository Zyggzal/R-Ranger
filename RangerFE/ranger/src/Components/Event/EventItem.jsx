import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../Context/Event/EventContext";
import {useLocation} from "react-router-dom";

export const EventItem = ({id}) =>{

    const {eventById} = useContext(EventContext);

    const [event, setEvent] = useState({});
    const [creator, setCreator] = useState({});
    const [date, setDate] = useState('');

    //console.log(id);

    useEffect( () => {
        const fetchEvent = async () => {
            if (id) {
                const thisEvent = await eventById(await id);
                // console.log(thisEvent);
                setEvent(thisEvent);
                setCreator(thisEvent.creator);
                const eventDate = new Date(thisEvent.startDate);
                setDate(eventDate.toLocaleString());
            }
        };

        fetchEvent();

    }, []);
    if(!event || event === {}) return <div>Loading...</div>
    return(
        <div>
            <h1>{event.name}</h1>
            <div>Description: </div>
            <div>{event.publicDescription}</div>
            { creator && (<div>Creator: {creator.firstName} {creator.lastName} ( {creator.login} )</div>)}
            <p>Date: {date && date}</p>
            <div>Type: {event.isPublic ? (<span>Public</span>) : (<span>Private</span>)}</div>
            <div>Link: {event.privateDescription}</div>
        </div>
    )

}