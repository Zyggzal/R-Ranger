import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../../Context/Event/EventContext";
import {PublicEventListComponent} from "../PublicEventListComponent/PublicEventListComponent";
import Loader from "../../Loader/Loader";
import {PublicEventSearchComponent} from "../PublicEventListComponent/PublicEventSearchComponent";
import MaGlassIcon from "../../Icons/MaGlassIcon/MaGlassIcon";

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
                console.log("search...")
                fetchEvents();
            }
        }, 1500);

        return () => clearTimeout(delayDebounce);
    }, [watchName, watch]);


    return (
        <div className="d-flex justify-content-center flex-column">
            <form action="" className="form-horizontal ms-2 w-25">
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
            <hr className="divider"/>
            {events.length > 0 && (
                <div className="list-group">
                    {
                        events.map((event) => {
                            return <PublicEventSearchComponent key={event.id + event.name} event={event}/>
                        })
                    }
                </div>
            )}
        </div>

    )
}