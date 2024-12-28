import { Outlet } from "react-router-dom";
import { EventProvider } from "../../Context/Event/EventContext";
import './Home.css'

const Home = () => {
    return (
        <EventProvider>
            <div className="home-container">
                <h1 className="m-3">Events For You</h1>
                <Outlet/>
            </div>
        </EventProvider>
    )
}

export {Home};