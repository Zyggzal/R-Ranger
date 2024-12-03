import { useForm } from 'react-hook-form'
import {useContext} from "react";
import {UserContext} from "../../Context/UserContext";
import {EventContext} from "../../Context/Event/EventContext";

export const AddEvent = () => {
    const {register, handleSubmit, /*watch,*/ formState: {errors}} = useForm();

    const {user} = useContext(UserContext);
    const {addEvent} = useContext(EventContext);

    //const [event, setEvent] = useState({});

    const onSubmit = (values) => {
        if(parseInt(values.participantsLimit) <= 0 || values.participantsLimit === ""){
            values.participantsLimit = null;
        }
        else values.participantsLimit = parseInt(values.participantsLimit);
        const otherFields = {
            createdBy: user.id,
            createdByGroup: null,
            isGroupEvent: "0"
        }
        const newEvent = {...values, ...otherFields};

        //setEvent(newEvent);
        addEvent(newEvent);
    };

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Event Name</label>
            <input type="text" name="name" placeholder="Event Name" {...register("name", {required: true})} />
            {errors.name && <span className="error">Name is Required</span>}
            <label htmlFor="">Event Description</label>
            <input type="text" name="description"
                   placeholder="Description" {...register("description", {required: true})} />
            {errors.description && <span className="error">Description is Required</span>}
            <label htmlFor="">Event Link</label>
            <input type="text" name="link" placeholder="Link" {...register("link", {required: true})} />
            {errors.link && <span className="error">Link is Required</span>}
            <label htmlFor="">Start date</label>
            <input type="datetime-local" name="startDate"
                   {...register("startDate", {required: true})} />
            {errors.startDate && <span className="error">Start date is Required</span>}
            <label htmlFor="">End Date</label>
            <input type="datetime-local" name="endDate"
                   {...register("endDate", {required: true})} />
            {errors.endDate && <span className="error">End date is Required</span>}
            <label htmlFor="">Sign end date</label>
            <input type="datetime-local" name="signUpEndDate"
                   {...register("signUpEndDate", {required: true})} />
            {errors.signUpEndDate && <span className="error">SignUp end date is Required</span>}
            <label htmlFor="">Type</label>
            <select name="isPulbic" {...register("isPublic")}>
                <option value={1}>Public</option>
                <option value={0}>Private</option>
            </select>
            <label htmlFor="">Amount fo participants</label>
            <input type="number" name="participantsLimit"
                   placeholder="Participants limit" {...register("participantsLimit")} />

            <input type="submit"/>

        </form>
    )
}