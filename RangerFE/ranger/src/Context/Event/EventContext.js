import {createContext, useContext, useEffect, useState} from "react";
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
        setUserEvents(events.filter(event => {
            if(event.status !== 'sent' && event.EventId !== null)
                return true;
        }));
    }

    const fetchUserEvents = async () => {
        if(!user) return;

        setIsLoading(true);

        try {
            const response = await api.Get(`users/${user.id}`, 'invites,events');
            // setUserEvents(response.data.invites);
            // console.log(response.data.invites);
            sortAcceptedEvents(response.data.invites);
        }
        catch (error) {
            console.log(error);
        }finally {
            setIsLoading(false);
        }
    }
    const fetchPublicEvents = async () => {
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
    }

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

    useEffect(() => {
        if(user) fetchUserEvents();
    }, [user])

    return (
        <EventContext.Provider value={{userEvents, publicEvents, fetchPublicEvents, fetchUserEvents, isLoading, addEvent}}>
            {children}
        </EventContext.Provider>
    )
}