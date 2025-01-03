import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../../Context/Event/EventContext";
import {PublicEventSearchComponent} from "../PublicEventListComponent/PublicEventSearchComponent";
import MaGlassIcon from "../../Icons/MaGlassIcon/MaGlassIcon";
import { NavLink } from "react-router-dom";
import GroupIcon from "../../Icons/GroupIcon/GroupIcon";
import ArrowDownIcon from "../../Icons/ArrowDownIcon/ArrowDownIcon";

export const SearchPublicEvents = () => {

    const {
        register,
        watch,
        setValue
    } = useForm();

    const {getEventsByName} = useContext(EventContext);

    const [events, setEvents] = useState([]);

    const watchName = watch("eventName");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (watchName && watchName.length > 3) {
                const fetchEvents = async () => {
                    const actualEvents = await getEventsByName(watchName);
                    setEvents(actualEvents);
                };
                fetchEvents();
            }
        }, 1000);

        return () => clearTimeout(delayDebounce);
    }, [watchName, watch]);


    return (
        <div className="d-flex justify-content-center flex-column">
            <div className="d-flex justify-content-between w-100 align-items-center home-container-header">
                <div className="d-flex flex-column">
                    <h1 className="mt-3">Events For You</h1>
                    <NavLink className='event-group-link ps-4' to='groups'>Groups <ArrowDownIcon rotate='-90'/></NavLink>
                </div>
                <form action="" className="form-horizontal ms-2 w-25" onSubmit={(e) => e.preventDefault()}>
                    <div className="search-input">
                        <MaGlassIcon/>
                        <input
                            className={`add-page-input form-control`}
                            type="text"
                            placeholder="Search"
                            {...register("eventName")}
                        />
                    </div>
                </form>
            </div>
                            
            {events.length > 0 && (
                <>
                    <hr className="divider"/>
                    <h1 className="mt-3 mb-4 ms-2">Search Results for <span style={{ color: '#A4161A'}}>{watchName}</span></h1>
                    <div className="list-group">
                        {
                            events.map((event) => {
                                return <PublicEventSearchComponent key={event.id + event.name} event={event}/>
                            })
                        }
                    </div>
                </>
            )}
        </div>

    )
}