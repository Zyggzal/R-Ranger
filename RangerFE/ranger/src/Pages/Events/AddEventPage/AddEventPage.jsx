import { useState } from "react";
import { AddEvent } from "../../../Components/Event/addEvent/addEvent";
import { EventProvider } from "../../../Context/Event/EventContext";
import './AddEventPage.css'

const AddEventPage = () => {
    const [step, setStep] = useState(1);

    return (
        <EventProvider>
            <div className="card text-center stepContainer z-1">
                <div className="card-header">
                    Step {step}
                </div>
                <div className="card-body">
                    { 
                    step === 1 &&
                    <div className="card-body">
                        <h5 className="card-title">Event Info</h5>
                    </div>
                    }
                    { 
                    step === 2 && 
                    <div className="card-body">
                    <h5 className="card-title">Invite Other Users</h5>
                    </div>
                     }
                </div>
            </div>
            <div>
                <AddEvent setStep={setStep}/>
            </div>
        </EventProvider>
    )
}

export {AddEventPage};