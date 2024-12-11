import {createContext, useContext, useEffect, useState} from "react";
import useAPI from "../../Hooks/useAPI";
import {UserContext} from "../UserContext";

export const GroupContext = createContext();

export const GroupProvider = ({children}) => {

    const api = useAPI();
    const {user} = useContext(UserContext);
    const [userGroups, setUserGroups] = useState([]);
    const [publicGroups, setPublicGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserGroups = async () => {
        if(!user) return;

        setIsLoading(true);

        try{
            const response = await api.Get(`users/${user.id}`, 'creatorOfGroups,memberOf');
            setUserGroups([response.data.creatorOfGroups, response.data.memberOf]);
        }catch(err){
            console.log(err);
        }finally {
            setIsLoading(false);
        }
    }
    const fetchPublicGroups = async () => {
        if(!user) return;

        setIsLoading(true);

        try{
            const response = await api.Get(`groups/public`);
            setPublicGroups(response.data);
        }catch(err){
            console.log(err);
        }finally {
            setIsLoading(false);
        }
    }

    const addGroup = async (group) => {
        if(!user) return;
        try {
            const response = await api.Post(`groups`, {
                name: group.name,
                isPublic: group.isPublic,
                createdBy: group.createdBy,
            });

            fetchUserGroups();
            return response.status
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        if(user) fetchUserGroups();
    }, [user])

    return <GroupContext.Provider value={{userGroups, isLoading, fetchUserGroups, addGroup, publicGroups, fetchPublicGroups}}>
        {children}
    </GroupContext.Provider>;
}