import { EventProvider } from "../../../Context/Event/EventContext";
import { ListUserEvents } from "../../../Components/Event/listUserEvents";
import {AddEvent} from "../../../Components/Event/addEvent";

const UserEvents = () => {
    return (
        <EventProvider>
            <div>
                <h1>Your Events</h1>
                <ListUserEvents />
                <hr/>
                <AddEvent />
            </div>
        </EventProvider>
    )
}

export {UserEvents};