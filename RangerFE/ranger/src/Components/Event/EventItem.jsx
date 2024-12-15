import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../Context/Event/EventContext";
import {useLocation} from "react-router-dom";
import {ListParticipants} from "./listParticipants";

export const EventItem = ({id, role}) =>{

    const {eventById, eventParticipants} = useContext(EventContext);

    const [event, setEvent] = useState({});
    const [participants, setParticipants] = useState(null);
    const [creator, setCreator] = useState({});
    const [date, setDate] = useState({});

    // console.log("Role: ", role);

    useEffect( () => {
        const fetchEvent = async () => {
            if (id) {
                const thisEvent = await eventById(await id);
                // console.log(thisEvent);
                setEvent(thisEvent);
                setCreator(thisEvent.creator);
                const eventStartDate = new Date(thisEvent.startDate).toLocaleString();
                const eventEndDate = new Date(thisEvent.endDate).toLocaleString();
                setDate({start: eventStartDate, end: eventEndDate});

                if(role === 'admin' || role === 'creator'){
                    const thisParticipants = await eventParticipants(id);

                    setParticipants(thisParticipants);
                }
            }
        };

        fetchEvent();

    }, []);
    if(!event) return <div>Loading...</div>
    return (
        <div className="container mt-4 p-4 border rounded bg-light shadow">
            <h1>{event.name}</h1>
            <p className="text-muted">{event.publicDescription}</p>
            <div className="mb-3 fw-bold">
                {date.start} - {date.end}
            </div>

            {participants && (role === 'admin' || role === 'creator') && (
                <div className="mt-4 p-3 bg-white border rounded">
                    <h5 className="mb-3">
                        Participants:
                        <span className="text-secondary"> {participants.length} </span>
                        {event.participantsLimit && (
                            <span className="text-secondary">
                        / {event.participantsLimit}
                    </span>
                        )}
                    </h5>
                    <div>
                        <ListParticipants participants={participants} role={role}/>
                    </div>
                </div>
            )}
        </div>
    )

}