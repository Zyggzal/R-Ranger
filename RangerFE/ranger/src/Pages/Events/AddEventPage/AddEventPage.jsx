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
                        <a href="#step2" className="btn btn-primary" onClick={()=>setStep(2)}>Next</a>
                    </div>
                    }
                    { 
                    step === 2 && 
                    <div className="card-body">
                    <h5 className="card-title">Invite Other Users</h5>
                    <a href="#" className="btn btn-primary" onClick={()=>setStep(1)}>Back</a>
                    </div>
                     }
                </div>
            </div>
            <div>
            <div id="step1"></div>
                <AddEvent/>
                <AddEvent/>
                <AddEvent/>
                <AddEvent/>
                <div id="step2"></div>
            </div>
        </EventProvider>
    )
}

export {AddEventPage};