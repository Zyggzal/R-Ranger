import { ListPublicEvents } from "../../Components/Event/listPublicEvents";
import { EventProvider } from "../../Context/Event/EventContext";
import {NavLink} from "react-router-dom";

const Home = () => {
    return (
        <EventProvider>
            <div>
                <h1>Main page</h1>
                <NavLink to="/users/aBOUBA">dadad</NavLink>
                <NavLink to="/users/zyggzal">zyggzal</NavLink>
                <NavLink to="/users/rogerskevin">rogerskevin</NavLink>
                <ListPublicEvents/>
            </div>
        </EventProvider>
    )
}

export {Home};