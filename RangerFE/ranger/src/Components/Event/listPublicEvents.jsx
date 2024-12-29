import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../Context/Event/EventContext";
import {UserContext} from "../../Context/UserContext";
import { PublicEventListComponent } from "./PublicEventListComponent/PublicEventListComponent";
import Loader from "../Loader/Loader";
import NoContent from "../NoContent/NoContent";
import {SearchPublicEvents} from "./SearchPublicEvents/searchPublicEvents";

export const ListPublicEvents = () =>{
    const {user}  = useContext(UserContext);
    const {publicEvents, fetchPublicEvents,  loading, userEvents, getEventStatusNum} = useContext(EventContext);
    const [eventsToShow, setEventsToShow] = useState(null);

    useEffect(() => {
        fetchPublicEvents();
    }, [user])

    useEffect(() => {
        if(publicEvents && userEvents && userEvents.participatesIn) {
            setEventsToShow(publicEvents.filter(e => {
                if(e.participantsLimit && e.participants.length >= e.participantsLimit) {
                    console.log("pipka")
                    return false
                }
                if(!userEvents.participatesIn.some((ue) => ue.id === e.id)) {
                    const status = getEventStatusNum(e)
                    return status < 2
                }
            }).sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }))
        }
    }, [publicEvents, userEvents]);

    if(loading || !publicEvents){
        return <Loader/>
    }
    return (
        <div>
            <SearchPublicEvents/>
            {
                !eventsToShow || eventsToShow.length === 0 ? <NoContent/> :
                    <div className="list-group">
                        {
                            eventsToShow.map((event) => {
                                return <PublicEventListComponent key={event.id} event={event}/>
                            })
                        }
                    </div>
            }
        </div>
    )
}