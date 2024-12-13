import { useLocation } from "react-router-dom";
import InviteToEvent from "../../../Components/Event/inviteToEvent/inviteToEvent"
import { EventProvider } from "../../../Context/Event/EventContext"
import { InviteProvider } from "../../../Context/Invite/InviteContext";

export const InviteToEventPage = () => {
    const location = useLocation();
    const {eventId} = location.state || {};
    return (
        <EventProvider>
            <InviteProvider>
                <InviteToEvent eventId={eventId}/>
            </InviteProvider>
        </EventProvider>
    )
}

export default InviteToEventPage;