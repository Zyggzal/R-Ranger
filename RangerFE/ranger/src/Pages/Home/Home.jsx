import { NavLink, Outlet } from "react-router-dom";
import { EventProvider } from "../../Context/Event/EventContext";
import './Home.css'

const Home = () => {
    return (
        <EventProvider>
            <div className="home-container">
                <Outlet/>
            </div>
        </EventProvider>
    )
}

export {Home};