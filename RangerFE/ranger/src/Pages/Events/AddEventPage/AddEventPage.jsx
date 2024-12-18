import { AddEvent } from "../../../Components/Event/addEvent/addEvent";
import { EventProvider } from "../../../Context/Event/EventContext";
import './AddEventPage.css'

const AddEventPage = () => {
    return (
        <EventProvider>
            <div className="card text-center stepContainer">
                <div className="card-body">
                    <div className="card-body">
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