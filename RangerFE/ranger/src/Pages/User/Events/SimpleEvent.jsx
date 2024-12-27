import { EventProvider } from "../../../Context/Event/EventContext";
import {useParams} from "react-router-dom";
import {EventItem} from "../../../Components/Event/EventItem";

const SimpleEvent = () => {

    const params = useParams()

    return (
        <EventProvider>
            <div>
                <EventItem id={params.id} />
            </div>
        </EventProvider>
    )
}

export {SimpleEvent};