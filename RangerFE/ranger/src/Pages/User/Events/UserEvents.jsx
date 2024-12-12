import { EventProvider } from "../../../Context/Event/EventContext";
import { ListUserEvents } from "../../../Components/Event/listUserEvents";

const UserEvents = () => {
    return (
        <EventProvider>
            <div>
                <h1>Your Events</h1>
                <ListUserEvents />
                <hr/>
            </div>
        </EventProvider>
    )
}

export {UserEvents};