import {GroupContext} from "../../Context/Group/GroupContext";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../Context/UserContext";
import Loader from "../Loader/Loader";
import NoContent from "../NoContent/NoContent";
import { PublicGroupSearchComponent } from "./PublicGroupListComponent/PulbicGroupSearchComponent";
import { SearchPublicGroups } from "./SearchPublicGroups/searchPublicGroups";

export const ListPublicGroups = () => {

    const {user} = useContext(UserContext);
    const {publicGroups, isLoading, fetchPublicGroups, userGroups} = useContext(GroupContext);
    const [groupsToShow, setGroupsToShow] = useState(null);

    useEffect(() => {
        fetchPublicGroups();
    }, [user])

    useEffect(() => {
        if(publicGroups && userGroups) {
            setGroupsToShow(publicGroups.filter(g => {
                return !userGroups.some((ug) => ug.id === g.id)
            }).sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }))
        }
    }, [publicGroups, userGroups]);

    if(isLoading || !publicGroups) return <Loader/>
    return (
        <div>
            <SearchPublicGroups/>
            <hr className="divider"/>
            {
                !groupsToShow || groupsToShow.length === 0 ? <NoContent/> :
                <div className="user-list-container list-group">
                    {publicGroups.map(group => (
                        <PublicGroupSearchComponent key={group.id + group.name} group={group}/>
                    ))}
                </div>
            }
        </div>
    )
}

// const {user}  = useContext(UserContext);
//     const {publicEvents, fetchPublicEvents,  loading, userEvents, getEventStatusNum} = useContext(EventContext);
//     const [eventsToShow, setEventsToShow] = useState(null);

//     useEffect(() => {
//         fetchPublicEvents();
//     }, [user])

//     useEffect(() => {
//         if(publicEvents && userEvents && userEvents.participatesIn) {
//             setEventsToShow(publicEvents.filter(e => {
//                 if(e.participantsLimit && e.participants.length >= e.participantsLimit) {
//                     return false
//                 }
//                 if(!userEvents.participatesIn.some((ue) => ue.id === e.id)) {
//                     const status = getEventStatusNum(e)
//                     return status < 2
//                 }
//             }).sort((a, b) => {
//                 return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//             }))
//         }
//     }, [publicEvents, userEvents]);

//     if(loading || !publicEvents){
//         return <Loader/>
//     }
//     return (
//         <div>
//             <SearchPublicEvents/>
//             <GroupProvider>
//                 <SearchPublicGroups/>
//             </GroupProvider>

//             {
//                 !eventsToShow || eventsToShow.length === 0 ? <NoContent/> :
//                     <div className="list-group">
//                         {
//                             eventsToShow.map((event) => {
//                                 return <PublicEventListComponent key={event.id} event={event}/>
//                             })
//                         }
//                     </div>
//             }
//         </div>
//     )