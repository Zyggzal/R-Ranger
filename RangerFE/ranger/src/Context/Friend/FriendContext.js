import {createContext, useContext, useEffect, useState} from "react";
import {UserContext} from "../UserContext";
import useAPI from "../../Hooks/useAPI";
import DismissableAlert from "../../Components/DismissableAlert/DismissableAlert";

export const FriendContext = createContext();

export const FriendProvider = ({ children }) => {

    const api = useAPI();

    const {user} = useContext(UserContext);

    const [userFriends, setUsersFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [showError, setShowError] = useState(false);
    const [errorText, setErrorText] = useState('');

    const fetchFriends = async () => {
        if(!user) return;

        setIsLoading(true);

        try{
            const response = await api.Get(`users/${user.id}`, 'friends');
            setUsersFriends(response.data.friends)
        }
        catch(err){
            console.log(err);
        }finally {
            setIsLoading(false);
        }
    }

    const addFriend = async (friendId) => {
        if(!user) return;

        try{
            if(friendId === user.id) {
                throw "Can not befriend yourself"
            }
            if(userFriends.some((e)=>e.id === friendId)) {
                throw "You are already friends with this user"
            }
            const response = await api.Post(`users/friends/${friendId}`, {id: user.id});
            fetchFriends();

            return response.status;
        }
        catch (err){
            setErrorText(err);
            setShowError(true);
        }
    }

    const idByLogin = async (login) => {
        const response = await api.Get(`users/friends/search/${login}`);
         // console.log(response);

        if(response.data.length !== 0) return response.data[0].id;
        return -1
    }

    useEffect(() => {
        if(user) fetchFriends();
    }, [user])


    return (
        <FriendContext.Provider value={{userFriends, isLoading, addFriend, idByLogin}}>
            {children}
            { showError && <DismissableAlert onClosed={()=>setShowError(false)} text={errorText}/> }
        </FriendContext.Provider>
    );
}