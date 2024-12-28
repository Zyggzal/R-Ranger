import { useContext } from "react";
import { DateToAgo } from "../../../Utils/DateTransformer";
import ClockIcon from "../../Icons/ClockIcon/ClockIcon";
import HumanIcon from "../../Icons/HumanIcon/HumanIcon";
import { EventContext } from "../../../Context/Event/EventContext";
import { NavLink } from "react-router-dom";
import GroupIcon from "../../Icons/GroupIcon/GroupIcon";
import MaGlassIcon from "../../Icons/MaGlassIcon/MaGlassIcon";

const PublicEventListComponent = ({event}) => {
    const { getEventStatus } = useContext(EventContext);

    return (
        <div className="container pel-container list-group-item pb-4">
            <div className="pel-creator-container d-flex justify-content-between">
                <div className="d-flex">
                    {
                        event.creatorGroup ?
                        <NavLink className="d-flex event-group-link pel-link" to={`/groups/${event.creatorGroup.id}`}>
                            <GroupIcon/>
                            <p className="mt-3">{ event.creatorGroup.name }</p>
                        </NavLink>
                        :
                        <>
                            <img src="/Resources/Images/RangerPFP2.png"/>
                            <div>
                                <p className="m-1">{ event.creator.firstName } { event.creator.lastName }</p>
                                <NavLink to={`/users/${event.creator.login}`} className="m-1 event-group-link"><HumanIcon/> @{ event.creator.login }</NavLink>
                            </div>
                        </>
                    }
                </div>
                <div>
                    <div><ClockIcon/> { DateToAgo(event.createdAt) }</div>
                    <div className="d-flex justify-content-end"><HumanIcon/> { event.participants.length } { event.participantsLimit && `/ ${event.participantsLimit}` }</div>
                </div>
            </div>
            <hr className="divider"/>
            <div className="pel-content-container">
                <div className="pel-info-container">
                    <h1>{ event.name }</h1>
                    <small><ClockIcon/>{getEventStatus(event)}</small>
                    <p className="mt-5">Starts at {new Date(event.startDate).toLocaleDateString() }</p>
                    <NavLink to={ `/events/${event.id}` } className='btn btn-crimson text-center'><MaGlassIcon/> Details</NavLink>
                </div>
                <div className="pel-desc-container">
                    <p>
                        {event.publicDescription}
                    </p>
                </div>
            </div>
        </div>
    )
}

export {PublicEventListComponent};