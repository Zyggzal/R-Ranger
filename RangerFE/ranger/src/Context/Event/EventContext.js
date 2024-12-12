import {createContext, useCallback, useContext, useEffect, useState} from "react";
import useAPI from "../../Hooks/useAPI";
import {UserContext} from "../UserContext";
import DismissableAlert from "../../Components/DismissableAlert/DismissableAlert";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const api = useAPI();
    const {user} = useContext(UserContext);
    const [userEvents, setUserEvents] = useState([]);
    const [publicEvents, setPublicEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sortAcceptedEvents = (events) => {
        events && setUserEvents(events.filter(event =>(event.status !== 'sent' && event.EventId !== null)));
    }

    const fetchUserEvents = useCallback(async () => {
        if(!user) return;
        setIsLoading(true);

        try {
            const response = await api.Get(`users/${user.id}`, 'participatesIn');
            if(response.status !== 200) {
                throw response.message
            }
            setUserEvents(response.data);
            sortAcceptedEvents(response.data.invites);
        }
        catch (error) {
            setAlertText(error)
            setShowAlert(true)
        }finally {
            setIsLoading(false);
        }
    }, [user, api])
    
    const fetchPublicEvents = useCallback(async () => {
        if(!user) return;

        setIsLoading(true);

        try {
            const response = await api.Get(`events/public`);
            if(response.status !== 200) {
                throw response.message
            }

            setPublicEvents(response.data);
        }
        catch (error) {
            setAlertText(error)
            setShowAlert(true)

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

                if(response.status !== 200) {
                    throw response.message;
                }
                //fetchUserEvents();
            return response;
        }
        catch (error) {
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const eventById = async (id, include) =>{
        if(!user) return;
        try{
            const response = await api.Get(`events/${id}`, include);
            if(response.status !== 200) {
                throw response.message
            }
            return response.data;
        }
        catch (error){
            setAlertText(error)
            setShowAlert(true)
        }
    }

    useEffect(()=>{
        if(user)fetchUserEvents();
    }, [user])

    return (
        <EventContext.Provider value={{userEvents, publicEvents, fetchPublicEvents, fetchUserEvents, isLoading, addEvent, eventById}}>
            <div style={{ position: 'relative'}}>
                {children}
                { showAlert && <DismissableAlert text={alertText} onClosed={()=>setShowAlert(false)}/> }
            </div>
        </EventContext.Provider>
    )
}