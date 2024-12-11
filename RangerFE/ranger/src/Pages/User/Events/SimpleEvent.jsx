import { EventProvider } from "../../../Context/Event/EventContext";
import { ListUserEvents } from "../../../Components/Event/listUserEvents";
import {AddEvent} from "../../../Components/Event/addEvent";
import {useLocation} from "react-router-dom";
import {EventItem} from "../../../Components/Event/EventItem";

const SimpleEvent = () => {

    const location = useLocation();
    const {eventId} = location.state || {};

    return (
        <EventProvider>
            <div>
                <EventItem id={eventId} />
            </div>
        </EventProvider>
    )
}

export {SimpleEvent};