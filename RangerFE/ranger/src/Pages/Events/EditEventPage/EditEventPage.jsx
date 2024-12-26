import { useCallback, useContext, useState } from "react";
import { AddEvent } from "../../../Components/Event/addEvent/addEvent";
import InfoIcon from "../../../Components/Icons/InfoIcon/InfoIcon";
import { EventContext } from "../../../Context/Event/EventContext";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";

const EditEventPage = () => {
    const { editEvent, eventById } = useContext(EventContext);
    const [event, setEvent] = useState(null);

    const params = useParams();

    const navigate = useNavigate();

    const onSubmit = async (values) => {
      const res = await editEvent(params.id, values);
      if(res){
        navigate(`/events/${params.id}`, { replace: true });
      }
    }

    const fetchEventToEdit = useCallback(async () => {
        const eventToEdit = await eventById(params.id);
        setEvent(eventToEdit);
    }, [eventById])

    useState(() => {
        fetchEventToEdit();
    }, [fetchEventToEdit])

    return (
        !event ? <><Loader/></> :
        <>
            <div className="card text-center stepContainer">
                <div className="card-body">
                    <div className="card-body">
                        <h5 className="card-title">Edit Event Info</h5>
                    </div>
                </div>
            </div>
            <div>
                <AddEvent onSubmit={onSubmit} groupId={event.createdByGroup ? event.createdByGroup : null} oldEvent={event}/>
                <div className="background-stripe"></div>
            </div>
        </>
    )
}

export {EditEventPage};