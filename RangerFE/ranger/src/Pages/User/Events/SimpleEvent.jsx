import { EventProvider } from "../../../Context/Event/EventContext";
import {useLocation, useParams} from "react-router-dom";
import {EventItem} from "../../../Components/Event/EventItem";

const SimpleEvent = () => {

    const params = useParams()

    //const {eventId, role} = location.state || {};

    return (
        <EventProvider>
            <div>
                <EventItem id={params.id} />
            </div>
        </EventProvider>
    )
}

export {SimpleEvent};