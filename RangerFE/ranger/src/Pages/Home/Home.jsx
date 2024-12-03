import { ListPublicEvents } from "../../Components/Event/listPublicEvents";
import { EventProvider } from "../../Context/Event/EventContext";

const Home = () => {
    return (
        <EventProvider>
            <div>
                <h1>Main page</h1>
                <ListPublicEvents/>
            </div>
        </EventProvider>
    )
}

export {Home};