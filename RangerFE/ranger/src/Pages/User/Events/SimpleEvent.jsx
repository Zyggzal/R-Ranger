import { EventProvider } from "../../../Context/Event/EventContext";
import {useLocation} from "react-router-dom";
import {EventItem} from "../../../Components/Event/EventItem";

const SimpleEvent = () => {

    const location = useLocation();
    const {eventId, role} = location.state || {};

    return (
        <EventProvider>
            <div>
                <EventItem id={eventId} role={role} />
            </div>
        </EventProvider>
    )
}

export {SimpleEvent};