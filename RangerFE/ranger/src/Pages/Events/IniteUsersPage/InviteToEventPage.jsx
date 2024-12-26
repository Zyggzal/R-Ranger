import { useParams } from "react-router-dom";
import InviteToEvent from "../../../Components/Event/inviteToEvent/inviteToEvent"
import { EventProvider } from "../../../Context/Event/EventContext"
import { InviteProvider } from "../../../Context/Invite/InviteContext";
import { GroupProvider } from "../../../Context/Group/GroupContext";

export const InviteToEventPage = () => {
    const params = useParams()
    
    return (
        <EventProvider>
            <InviteProvider>
                <InviteToEvent eventId={params.id}/>
            </InviteProvider>
        </EventProvider>
    )
}

export default InviteToEventPage;