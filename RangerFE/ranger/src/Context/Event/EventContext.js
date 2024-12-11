import {createContext, useCallback, useContext, useEffect, useState} from "react";
import useAPI from "../../Hooks/useAPI";
import {UserContext} from "../UserContext";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {

    const api = useAPI();
    const {user} = useContext(UserContext);
    const [userEvents, setUserEvents] = useState([]);
    const [publicEvents, setPublicEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sortAcceptedEvents = (events) => {
        setUserEvents(events.filter(event =>(event.status !== 'sent' && event.EventId !== null)));
    }

    const fetchUserEvents = useCallback(async () => {
        if(!user) return;
        //console.log("A")
        setIsLoading(true);

        try {
            const response = await api.Get(`users/${user.id}`, 'participatesIn');
            // console.log(response.data)
            setUserEvents(response.data);
            // console.log(userEvents)
            //console.log(userEvents)
            //sortAcceptedEvents(response.data.invites);
        }
        catch (error) {
            console.log(error);
        }finally {
            setIsLoading(false);
        }
    }, [user, api])
    
    const fetchPublicEvents = useCallback(async () => {
        if(!user) return;

        setIsLoading(true);

        try {
            const response = await api.Get(`events/public`);
            setPublicEvents(response.data);
        }
        catch (error) {
            console.log(error);

        }finally {
            setIsLoading(false);
        }
    }, [user, api])

    const addEvent = async (event) => {
        if(!user) return;
        try {
            const response = await api.Post(`events`,
                {
                    name: event.name,
                    publicDescription: event.description,
                    privateDescription: event.link,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    signUpEndDate: event.signUpEndDate,
                    isPublic: event.isPublic,
                    isGroupEvent: event.isGroupEvent,
                    participantsLimit: event.participantsLimit,
                    createdBy: event.createdBy,
                    createdByGroup: event.createdByGroup,
                });
            return response.status;
        }
        catch (error) {
            console.log(error);
        }
    }

    const eventById = async (id) =>{
        if(!user) return;
        try{
            const response = await api.Get(`events/${id}`);
            // console.log(response.data);
            return response.data;
        }
        catch (e){
            console.log(e);
        }
    }

    const eventAction = async () => {

    }

    return (
        <EventContext.Provider value={{userEvents, publicEvents, fetchPublicEvents, fetchUserEvents, isLoading, addEvent, eventById}}>
            {children}
        </EventContext.Provider>
    )
}