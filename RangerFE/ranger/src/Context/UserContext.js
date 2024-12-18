import React, { createContext, useEffect, useState } from 'react';
import useAPI from '../Hooks/useAPI';
import DismissableAlert from '../Components/DismissableAlert/DismissableAlert'

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');

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
        if(!user || !user.expires) {
            return false;
        }

        return user.expires > Date.now()
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
        const res = await api.Login(email, password)
        if(res.status === 200) {
            updateUser(res.data);
            setIsLoggedIn(true);
        }
        else {
            setAlertText(res.message)
            setShowAlert(true)
        }
    }

    const Logout = () => {
        api.Logout();
        ClearStoredUser();
        setUser(null);
        setIsLoggedIn(false);
    }

    const Register = async (login, firstName, lastName, email, password) => {
        const res = await api.Register(login, firstName, lastName, email, password);

        if(res.status === 201) {
            await Login(email, password)
        }
        else {
            setAlertText(res.message)
            setShowAlert(true)
        }
    }

    const idByLogin = async (login) => {
        const response = await api.Get(`users/friends/search/${login}`);
         // console.log(response);

        if(response.data.length !== 0) return response.data[0].id;
        return -1
    }

    const editUser = async (id, firstName, lastName, password, newPassword) => {
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
    }

    return (
        <UserContext.Provider value={{ user, Login, Logout, Register, isValid, idByLogin, updateUser, editUser }}>
            <div style={{ position: 'relative' }}>
                {children}
                { showAlert && <DismissableAlert text={alertText} onClosed={()=>setShowAlert(false)}/> }
            </div>
        </UserContext.Provider>
    )
}