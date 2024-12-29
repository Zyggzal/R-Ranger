import React, { createContext, useEffect, useState } from 'react';
import useAPI from '../Hooks/useAPI';
import DismissableAlert from '../Components/DismissableAlert/DismissableAlert'
import {useNavigate} from "react-router-dom";

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const api = useAPI() 
    const StoreUser = ({ user, expires }) => {
        localStorage.setItem("user", JSON.stringify({
            id: user.id, 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            login: user.login,
            createdAt: user.createdAt,
            expires
        }))
    }

    const GetUserFromStore = () => {
        const storedUser = localStorage.getItem("user")
        return JSON.parse(storedUser)
    }

    const ClearStoredUser = () => {
        localStorage.removeItem("user")
    }

    const isValid = () => {
        if(user && user.expires) {
            return user.expires > Date.now()
        }

        return GetUserFromStore() ? true : false;
    }

    useEffect(() => {
        const storedUser = GetUserFromStore()
        if(storedUser) {
            storedUser.expires <= Date.now() ? ClearStoredUser() : setUser(storedUser)
        }
    }, [])

    const updateUser = (user) => {
        ClearStoredUser();
        StoreUser(user)
        setUser(GetUserFromStore());
    } 

    const Login = async (email, password) => {
        setIsLoading(true);
        const res = await api.Login(email, password)
        if(res.status === 200) {
            updateUser(res.data);
            setIsLoggedIn(true);
        }
        else {
            setAlertText(res.message)
            setShowAlert(true)
        }
        setIsLoading(false);
    }

    const Logout = () => {
        api.Logout();
        ClearStoredUser();
        setUser(null);
        setIsLoggedIn(false);
    }

    const Register = async (login, firstName, lastName, email, password) => {
        setIsLoading(true);
        const res = await api.Register(login, firstName, lastName, email, password);

        if(res.status === 201) {
            await Login(email, password)
        }
        else {
            setAlertText(res.message)
            setShowAlert(true)
        }
        setIsLoading(false);
    }

    const idByLogin = async (login) => {
        setIsLoading(true);
        const response = await api.Get(`users/friends/search/${login}`);
        
        setIsLoading(false);

        if(response.data.length !== 0) return response.data[0].id;
        return -1
    }

    const editUser = async (id, firstName, lastName, password, newPassword) => {
        setIsLoading(true);
        const params = { password }
        if(firstName) params.firstName = firstName;
        if(lastName) params.lastName = lastName;
        if(newPassword) params.newPassword = newPassword;
 
        const res = await api.Patch(`users/${id}`, params)
        if(res.status === 200) {
            updateUser({ user: res.data, expires: user.expires });
        }
        else {
            setAlertText(res.message)
            setShowAlert(true)
        }
        setIsLoading(false);
    }

    const getSomeUserInfo = async (login, userId) =>{
        setIsLoading(true);
        //get user
        const actualUser = await api.Get(`users/friends/search/${login}`);
        if(actualUser.data.length === 0) return;
        if(actualUser.data[0].id === userId) return 'profile';

        //get status with me
        const isFriend = await getFriendStatus(actualUser.data[0].id, userId);
        // console.log(isFriend)


        //get general groups & friends & events

        setIsLoading(false);

        return {isFriend: isFriend, user: actualUser.data[0]};
    }
    //user public events
    const userPublicEvents = async (id) =>{
        setIsLoading(true);

        const userEvents = await api.Get(`users/${id}`, ['participatesIn']);
        const publicUserEvents = userEvents.data.participatesIn.filter((e) => e.isPublic === true);

        setIsLoading(false);
        return publicUserEvents;
    }
    //user public groups
    const userPublicGroups = async (id) =>{
        setIsLoading(true);

        const userGroups = await api.Get(`users/${id}`, ['memberOf']);

        const member = userGroups.data.memberOf.filter((e) => e.isPublic === true);

        setIsLoading(false);
        return member;
    }

    const getFriendStatus = async (strangerId, userId) =>{
        const userFriends = await api.Get(`users/allfriends/${userId}`, 'friends');
        // console.log(userFriends.data)
        for(let friend of userFriends.data){
            if(strangerId === friend.UserId && userId === friend.friendId){
                if(friend.status === "accepted") return friend;
                if(friend.status === "invited") return "invited";
            }
            else if(userId === friend.UserId && strangerId === friend.friendId){
                if(friend.status === "invited") return "invite you";
            }
        }
        return "no";
    }

    return (
        <UserContext.Provider value={{userPublicGroups, userPublicEvents, getSomeUserInfo, isLoading, user, Login, Logout, Register, isValid, idByLogin, updateUser, editUser }}>
            <div style={{ position: 'relative' }}>
                {children}
                { showAlert && <DismissableAlert text={alertText} onClosed={()=>setShowAlert(false)}/> }
            </div>
        </UserContext.Provider>
    )
}