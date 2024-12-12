import { useForm } from 'react-hook-form'
import {useContext, useState} from "react";
import {UserContext} from "../../../Context/UserContext";
import {EventContext} from "../../../Context/Event/EventContext";
import InfoIcon from '../../Icons/InfoIcon/InfoIcon';
import ClockIcon from '../../Icons/ClockIcon/ClockIcon';
import ArrowDownIcon from '../../Icons/ArrowDownIcon/ArrowDownIcon';
import './addEvent.css'

export const AddEvent = () => {
    const {register, handleSubmit, /*watch,*/ formState} = useForm();

    const {user} = useContext(UserContext);
    const {addEvent} = useContext(EventContext);

    const [limit, setLimit] = useState(false);
    
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [signUpEndDate, setSignUpEndDate] = useState(null);

    const [event, setEvent] = useState({});

    const onSubmit = (values) => {
        if(parseInt(values.participantsLimit) <= 0 || values.participantsLimit === "" || !limit){
            values.participantsLimit = null;
        }
        else values.participantsLimit = parseInt(values.participantsLimit);
        const otherFields = {
            createdBy: user.id,
            createdByGroup: null,
            isGroupEvent: "0"
        }
        const newEvent = {...values, ...otherFields};
        console.log(startDate)

        //setEvent(newEvent);
        //addEvent(newEvent);
    };

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)} className="form p-5">
            <div className='mb-3 d-flex justify-content-between'>
                <div>
                    <label className='form-label'>Event Name</label>
                    <InfoIcon content={'The name of your event'}/>
                    <input className='form-control' type="text" name="name" placeholder="Event Name" {...register("name", {required: true})} />
                    {formState.errors.name && <span className="error">Name is Required</span>}
                </div>
                <div>
                    <label className='form-label'>Type</label>
                    <InfoIcon content={<p><strong>Public</strong> events will be open to anyone<br /><strong>Private</strong> events will only be accessible via invitations</p>}/>
                    <select className='form-select' name="isPulbic" {...register("isPublic")}>
                        <option value={1}>Public</option>
                        <option value={0}>Private</option>
                    </select>
                </div>
                <div>
                    <input className='form-check-input m-2' type='checkbox' onChange={(e)=>{setLimit(e.target.checked)}}/>
                    <label className='form-label'>Participants limit</label>
                    <InfoIcon content={<p>The limit of participants for this event.</p>}/>
                    <div>
                        <input disabled={!limit} className='form-control' type="number" name="participantsLimit"
                            placeholder="Participants limit" {...register("participantsLimit")} />
                    </div>
                </div>
            </div>
            <div>
                <label className='form-label'>Event Description</label>
                <InfoIcon content={<p><strong>Public</strong> description.<br/>Write the info you want everyone to see here. <br/><span className='text-secondary'>General info: type of activity, target audience, etc.</span></p>}/>
                <textarea className='form-control p-4 m-3' type="text" name="description"
                       placeholder="Public Description" {...register("description", {required: true})} />
                {formState.errors.description && <span className="error">Public description is Required</span>}
            </div>
            <div>
                <label className='form-label'>Private Description</label>
                <InfoIcon content={<p><strong>Private</strong> description.<br/>Write the info you want only the participants to see here. <br/><span className='text-secondary'>Specific info: links, locations, etc.</span></p>}/>
                <textarea className='form-control p-4 m-3' type="text" name="link" placeholder="Private Description" {...register("link", {required: true})} />
                {formState.errors.link && <span className="error">Private description is Required</span>}
            </div>
            <div className='card p-5'>
                <h1 className='mb-5'>Event timeline</h1>
                <div className='d-flex justify-content-between'>
                    <div className='time-card'>
                        <label className='form-label'>Sign up end date</label>
                        <InfoIcon content={<p>After this date, users will be unable to sign up to the event.</p>}/>
                        <input onChange={(e)=>{setSignUpEndDate(e.target.value);console.log("A")}} max={formState.startDate} className='form-control' type="datetime-local" name="signUpEndDate"
                        {...register("signUpEndDate", {required: true, max: startDate})} />
                        {formState.errors.signUpEndDate && <span className="error">SignUp end date is Required</span>}
                        <div className='pt-5'>
                            <ClockIcon/>
                        </div>
                        <ArrowDownIcon/>
                    </div>
                    <div className='time-card'>
                        <label className='form-label'>Start date</label>
                        <InfoIcon content={<p>When this event starts.</p>}/>
                        <input onChange={(e)=>setStartDate(e.target.value)} className='form-control' type="datetime-local" name="startDate"
                            {...register("startDate", {required: true, max: endDate})} />
                        {formState.errors.startDate && <span className="error">Start date is Required</span>}
                        <div className='pt-5'>
                            <ClockIcon/>
                        </div>
                        <ArrowDownIcon/>
                    </div>
                    <div className='time-card'>
                        <label className='form-label'>End Date</label>
                        <InfoIcon content={<p>When this event ends.</p>}/>
                        <input onChange={(e)=>setEndDate(e.target.value)} className='form-control' type="datetime-local" name="endDate"
                            {...register("endDate", {required: true, min: startDate})} />
                        {formState.errors.endDate && <span className="error">End date is Required</span>}
                        <div className='pt-5'>
                            <ClockIcon/>
                        </div>
                        <ArrowDownIcon/>
                    </div>
                </div>
                <hr className='timeline'/>
            </div>
            
            <input type="submit"/>
        </form>
    )
}