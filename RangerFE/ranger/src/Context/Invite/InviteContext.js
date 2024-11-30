import {createContext, useContext, useEffect, useState} from "react";
import {UserContext} from "../UserContext";
import useAPI from "../../Hooks/useAPI";

export const InviteContext = createContext();

export const InviteProvider = ({ children }) => {

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
        dataEG.map((item) => {
            if(item.status === 'sent'){
                // console.log(item);
                if(item.EventId !== null){
                    events = [...events, item];
                }
                else if(item.GroupId !== null && item.EventId === null){
                    groups = [...groups, item];
                }
            }
        });
        //friends


        dataF.map((item) => {
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

    const fetchUserInvites = async () => {
        if(!user) return;

        setIsLoading(true);

        try{
            const responseEG = await api.Get(`users/${user.id}`, 'invites');
            const responseF = await api.Get(`users/${user.id}`, 'friends');
            // console.log(responseF.data.friends);
            // console.log(response.data.invites);
            sortInvites(responseEG.data.invites, responseF.data.friends);
        }
        catch(err){
            console.log(err);
        }finally {
            setIsLoading(false);
        }
    }

useEffect(() => {
    if(user) fetchUserInvites();
}, [user]);


    return (
        <InviteContext.Provider value={{friendInvites, eventInvites, groupInvites, allInvites, isLoading}}>
            {children}
        </InviteContext.Provider>
    );
}

