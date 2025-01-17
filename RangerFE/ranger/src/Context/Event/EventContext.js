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
            const response = await api.Get(`events/public`, 'participants');
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
                    publicDescription: event.publicDescription,
                    privateDescription: event.privateDescription,
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
            return response;
        }
        catch (error) {
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const getEventsByName = async (name) => {
        if(!user) return;
        try {
            const response = await api.Get(`events/search/${name}`);
            if(response.status !== 200) {
                throw response.message
            }
            return response.data;
        }catch (error){
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const eventById = useCallback(async (id, include) =>{
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
    }, [user])

    const eventParticipants = async (id) => {
        if(!user) return;
        try{
            const response = await api.Get(`events/${id}`, 'participants');
            if(response.status !== 200){
                throw response.message;
            }
            return response.data.participants;
        }
        catch(error){
            setAlertText(error);
            setShowAlert(true);
        }

    }

    const removeParticipant = async (id, UserId) =>{
        if(!user) return;
        try{
            const response = await api.Delete(`events/${id}/participants`, { UserId });
            if(response.status !== 200) {
                throw response.message
            }
        }
        catch (error){
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const getEventStatus = (event) => {
        const now = new Date();
        
        if(new Date(event.endDate) < now) {
            return 'Finished'
        }
        if(new Date(event.startDate) < now) {
            return 'Ongoing'
        }
        if(new Date(event.signUpEndDate) < now) {
            return 'Pending'
        }
        
        return 'Sign Up'
    }

    const getEventStatusNum = (event) => {
        const now = new Date();
        
        if(new Date(event.endDate) < now) {
            return 3
        }
        if(new Date(event.startDate) < now) {
            return 2
        }
        if(new Date(event.signUpEndDate) < now) {
            return 1
        }
        
        return 0
    }

    const acceptEventInvite = async (invite) => {
        if(!user) return;
        try{
            let delResponse;
            if(invite.id) {
                delResponse = await api.Delete('invites', { id: invite.id });
            }
            else {
                delResponse = await api.Delete('invites', { UserId: invite.UserId, EventId: invite.EventId });
            }
            if(delResponse.status !== 200) {
                throw delResponse.message;
            }

            const response = await api.Post(`events/${invite.EventId}/participants`, { UserId: invite.UserId });
            if(response.status !== 200) {
                throw response.message
            }
        }
        catch (error){
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const declineEventInvite = async (invite) => {
        if(!user) return;
        try{
            const response = await api.Delete('invites', { id: invite.id });
            if(response.status !== 200) {
                throw response.message;
            }
        }
        catch (error){
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const getEventUserStatus = async (UserId, EventId) => {
        if(!user) return;
        try{
            const response = await api.Get(`events/${EventId}/participantStatus/${UserId}`);

            if(response.status !== 200) {
                throw response.message;
            }

            return response.data;
        }
        catch (error){
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const editEvent = async (EventId, EventValues) => {
        if(!user) return;
        try{
            const response = await api.Patch(`events/${EventId}/`, EventValues);

            if(response.status !== 200) {
                throw response.message;
            }

            return response.data;
        }
        catch (error){
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const deleteEvent = async (EventId) => {
        if(!user) return;
        try{
            const response = await api.Delete(`events/${EventId}`);

            if(response.status !== 200) {
                throw response.message;
            }
        }
        catch (error){
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const changeUserRoleInEvent = async (EventId, UserId, role) => {
        if(!user) return;
        try{
            const response = await api.Patch(`events/${EventId}/participants`, { role, id: UserId });

            if(response.status !== 200) {
                throw response.message;
            }
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
        <EventContext.Provider value={{getEventsByName, userEvents, publicEvents, fetchPublicEvents, fetchUserEvents, isLoading, addEvent, eventById, removeParticipant, eventParticipants, getEventStatus, acceptEventInvite, declineEventInvite, getEventUserStatus, getEventStatusNum, editEvent, deleteEvent, changeUserRoleInEvent }}>
            <div style={{ position: 'relative'}}>
                {children}
                { showAlert && <DismissableAlert text={alertText} onClosed={()=>setShowAlert(false)}/> }
            </div>
        </EventContext.Provider>
    )
}