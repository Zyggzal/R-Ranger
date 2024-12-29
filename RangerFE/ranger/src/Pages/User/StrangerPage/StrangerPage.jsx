import {UserProvider} from "../../../Context/UserContext";
import {RandomUserPage} from "../../../Components/User/RandomUserPage";
import {useParams} from "react-router-dom";
import {FriendProvider} from "../../../Context/Friend/FriendContext";
import {EventContext, EventProvider} from "../../../Context/Event/EventContext";

export const StrangerPage = () => {

    const params = useParams();

    return (
        <UserProvider>
            <FriendProvider>
                <EventProvider>
                    <RandomUserPage login={params.login}/>
                </EventProvider>
            </FriendProvider>
        </UserProvider>
    )
}