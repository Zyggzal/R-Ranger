import { AddEvent } from "../../../Components/Event/addEvent/addEvent";
import { EventProvider } from "../../../Context/Event/EventContext";
import './AddEventPage.css'
import {useLocation} from "react-router-dom";

const AddEventPage = () => {

    const location = useLocation();

    const {groupId} = location.state || {};

    return (
        <EventProvider>
            <div className="card text-center stepContainer">
                <div className="card-body">
                    <div className="card-body">
                        {groupId && <h5>Group Event</h5>}
                        <h5 className="card-title">Event Info</h5>
                    </div>
                </div>
            </div>
            <div>
                <AddEvent/>
                <div className="background-stripe"></div>
            </div>
        </EventProvider>
    )
}

export {AddEventPage};