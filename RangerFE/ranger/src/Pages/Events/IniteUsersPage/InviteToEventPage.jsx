import { useLocation } from "react-router-dom";
import InviteToEvent from "../../../Components/Event/inviteToEvent/inviteToEvent"
import { EventProvider } from "../../../Context/Event/EventContext"

export const InviteToEventPage = () => {
    const location = useLocation();
    const {eventId} = location.state || {};
    return (
        <EventProvider>
            <InviteToEvent eventId={eventId}/>
        </EventProvider>
    )
}

export default InviteToEventPage;