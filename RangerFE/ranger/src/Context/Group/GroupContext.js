import {createContext, useContext, useEffect, useState} from "react";
import useAPI from "../../Hooks/useAPI";
import {UserContext} from "../UserContext";
import DismissableAlert from "../../Components/DismissableAlert/DismissableAlert";

export const GroupContext = createContext();

export const GroupProvider = ({children}) => {

    const api = useAPI();

    const {user} = useContext(UserContext);
    const [userGroups, setUserGroups] = useState([]);
    const [publicGroups, setPublicGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    
    const fetchUserGroups = async () => {
        if(!user) return;

        setIsLoading(true);

        try{
            const response = await api.Get(`users/${user.id}`, 'creatorOfGroups,memberOf');
            if(response.status !== 200) {
                throw response.message;
            }
            setUserGroups([response.data.creatorOfGroups, response.data.memberOf]);
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
        finally {
            setIsLoading(false);
        }
    }

    const fetchUserGroupsWithIncludes = async (include) => {
        if(!user) return;

        setIsLoading(true);

        try{
            const response = await api.Get(`groups/userid/${user.id}`, include);
            if(response.status !== 200) {
                throw response.message
            }

            return response.data
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
        finally {
            setIsLoading(false);
        }
    }

    const fetchPublicGroups = async () => {
        if(!user) return;

        setIsLoading(true);

        try{
            const response = await api.Get(`groups/public`);
            if(response.status !== 200) {
                throw response.message
            }
            setPublicGroups(response.data);
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
        finally {
            setIsLoading(false);
        }
    }

    const addGroup = async (group) => {
        if(!user) return;
        try {
            setIsLoading(true);
            const response = await api.Post(`groups`, {
                name: group.name,
                isPublic: group.isPublic,
                createdBy: group.createdBy,
            });

            setIsLoading(false);

            if(response.status !== 200) {
                throw response.message
            }
            fetchUserGroups();
            return response.status
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
    }

    const deleteGroup = async (groupId) => {
        if(!user) return;
        try {
            setIsLoading(true);
            const response = await api.Delete(`groups/${groupId}`);

            setIsLoading(false);

            if(response.status !== 200) {
                throw response.message
            }
            fetchUserGroups();
            return response.status;
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
    }

    const deleteGroupMember = async (groupId, UserId) => {
        if(!user) return;
        try {
            setIsLoading(true);
            const response = await api.Delete(`groups/${groupId}members/`, { UserId });

            setIsLoading(false);

            if(response.status !== 200) {
                throw response.message
            }
            fetchUserGroups();
            return response.status;
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
    }

    const addGroupMember = async (groupId, UserId) => {
        if(!user) return;
        try {
            setIsLoading(true);
            const response = await api.Post(`groups/${groupId}/members`, { UserId });

            setIsLoading(false);

            if(response.status !== 200) {
                throw response.message
            }
            fetchUserGroups();
            return response.status;
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
    }

    const getGroupStatus = async (GroupId, UserId) => {
        if(!user) return;
        try {
            setIsLoading(true);
            const response = await api.Get(`groups/${GroupId}/memberStatus`, { id: UserId });

            setIsLoading(false);

            if(response.status !== 200) {
                throw response.message
            }

            return response.data;
        }
        catch(err){
            setAlertText(err)
            setShowAlert(true)
        }
    }

    useEffect(() => {
        if(user) fetchUserGroups();
    }, [user])

    return <GroupContext.Provider value={{userGroups, isLoading, fetchUserGroups, fetchUserGroupsWithIncludes, addGroup, publicGroups, fetchPublicGroups, deleteGroup, deleteGroupMember, addGroupMember, getGroupStatus}}>
        {children}
        { showAlert && <DismissableAlert text={alertText} onClosed={()=>setShowAlert(false)}/> }
    </GroupContext.Provider>;
}