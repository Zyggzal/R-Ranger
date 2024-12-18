import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {UserContext} from "../UserContext";
import useAPI from "../../Hooks/useAPI";
import DismissableAlert from "../../Components/DismissableAlert/DismissableAlert";

export const InviteContext = createContext();

export const InviteProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const api = useAPI();

    const {user} = useContext(UserContext);

    const [allInvites, setAllInvites] = useState([]);
    const [friendInvites, setFriendInvites] = useState([]);
    const [eventInvites, setEventInvites] = useState([]);
    const [groupInvites, setGroupInvites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sortInvites = (dataEG, dataF) => {
        setAllInvites([...[], ...dataEG, ...dataF]);
        let events = [];
        let groups = [];
        let friends = [];
        //events & groups
        dataEG.forEach((item) => {
            if(item.status === 'sent'){
                if(item.EventId !== null){
                    events = [...events, item];
                }
                else if(item.GroupId !== null && item.EventId === null){
                    groups = [...groups, item];
                }
            }
        });
        //friends


        dataF.forEach((item) => {
            if(item.Friend.status === 'invited'){
                friends = [...friends, item];
            }
        });

        setEventInvites(events);
        setGroupInvites(groups);
        setFriendInvites(friends);

        // console.log(eventInvites);
        // console.log(groupInvites);
        // console.log(friends);
    }

    const fetchUserInvites = useCallback(async () => {
        if(!user) return;

        setIsLoading(true);

        try{
            const responseEG = await api.Get(`users/${user.id}`, 'invites');
            const responseF = await api.Get(`users/${user.id}`, 'friends');
            sortInvites(responseEG.data.invites, responseF.data.friends.filter((i) => i.Friend.status !== 'accepted' ));
        }
        catch(err){
            console.log(err);
        }finally {
            setIsLoading(false);
        }
    }, [api, user])

    useEffect(() => {
        if(user) fetchUserInvites();
    }, [user]);
    //
    const eventUpdateStatus = async (id, status, EventId) =>{
        const UserId = user.id;
        const role = 'participant';
        const response = await api.Patch(`invites/event`, {id, status, EventId, UserId, role});
        return response.status;
    }

    const inviteUserToEvent = async (UserId, Event, invites) => {
        //UserId, senderId, EventId, GroupId, type, role
        const senderId = user.id
        const type = 'event'
        try{
            if(UserId === user.id) {
                throw "Can not invite yourself"
            }
            if(Event.participants && Event.participants.some((e)=>e.id === UserId)) {
                throw "You are already friends with this user"
            }
            if(invites && invites.some((e)=>e.UserId === UserId)) {
                throw "This user is already invited"
            }
            const response = await api.Post('invites', { UserId, EventId: Event.id, senderId, type })
            if(response.status !== 200) {
                throw response.message;
            }

            return response.data;
        }
        catch(error) {
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const fetchEventInvites = async (EventId) => {
        try{
            const response = await api.Get(`invites/eventId/${EventId}`)
            if(response.status !== 200) {
                throw response.message;
            }
            return response.data;
        }
        catch(error) {
            setAlertText(error)
            setShowAlert(true)
        }
    }

    const removeInvite = async (id) =>{
        if(!user) return;
        try{
            const response = await api.Delete(`invites/`, { id });
            if(response.status !== 200) {
                throw response.message
            }
        }
        catch (error){
            setAlertText(error)
            setShowAlert(true)
        }
    }

    return (
        <InviteContext.Provider value={{friendInvites, eventInvites, groupInvites, allInvites, isLoading, eventUpdateStatus, inviteUserToEvent, fetchEventInvites, removeInvite, fetchUserInvites}}>
            <div style={{ position: 'relative'}}>
                {children}
                { showAlert && <DismissableAlert text={alertText} onClosed={()=>setShowAlert(false)}/> }
            </div>
        </InviteContext.Provider>
    );
}

