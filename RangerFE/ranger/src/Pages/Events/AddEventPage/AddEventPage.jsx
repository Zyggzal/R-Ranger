import { useContext } from "react";
import { AddEvent } from "../../../Components/Event/addEvent/addEvent";
import InfoIcon from "../../../Components/Icons/InfoIcon/InfoIcon";
import { EventContext } from "../../../Context/Event/EventContext";
import './AddEventPage.css'
import {useLocation, useNavigate} from "react-router-dom";

const AddEventPage = () => {
    const { addEvent } = useContext(EventContext)

    const location = useLocation();
    const {groupId} = location.state || {};

    const navigate = useNavigate()

    const onSubmit = async (values) => {
      const res = await addEvent(values)
      if(res){
        navigate(`/events/${res.data[0].id}/invite`, { replace: true, state: { pass: 'd' } })
      }
    }

    return (
        <>
            <div className="card text-center stepContainer">
                <div className="card-body">
                    <div className="card-body">
                        <h5 className="card-title">Event Info</h5>
                        {groupId && <h4 className="badge p-2 bg-danger">Group Event <InfoIcon content={
                            <p><strong>Group events</strong> will be visible to all members of the group regardless of whether the event is <strong>public</strong> or <strong>private</strong>.</p>
                        }/></h4>}
                    </div>
                </div>
            </div>
            <div>
                <AddEvent onSubmit={onSubmit} groupId={groupId}/>
                <div className="background-stripe"></div>
            </div>
        </>
    )
}

export {AddEventPage};