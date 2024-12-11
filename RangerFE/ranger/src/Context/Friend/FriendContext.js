import {createContext, useContext, useEffect, useState} from "react";
import {UserContext} from "../UserContext";
import useAPI from "../../Hooks/useAPI";

export const FriendContext = createContext();

export const FriendProvider = ({ children }) => {

    const api = useAPI();

    const {user} = useContext(UserContext);

    const [userFriends, setUsersFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    //const [friendID, setFriendID] = useState(-1);

    const fetchFriends = async () => {
        if(!user) return;

        setIsLoading(true);

        try{
            const response = await api.Get(`users/${user.id}`, 'friends');
            // console.log(response.data.friends);
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
            const response = await api.Post(`users/friends/${friendId}`, {id: user.id});
            return response.status;
        }
        catch (err){
            console.log(err);
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
        </FriendContext.Provider>
    );
}