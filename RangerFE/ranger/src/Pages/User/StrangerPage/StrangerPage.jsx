import {UserProvider} from "../../../Context/UserContext";
import {RandomUserPage} from "../../../Components/User/RandomUserPage";
import {useParams} from "react-router-dom";
import {FriendProvider} from "../../../Context/Friend/FriendContext";

export const StrangerPage = () => {

    const params = useParams();

    return (
        <UserProvider>
            <FriendProvider>
                <RandomUserPage login={params.login}/>
            </FriendProvider>
        </UserProvider>
    )
}