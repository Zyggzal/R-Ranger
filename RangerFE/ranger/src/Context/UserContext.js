import React, { createContext, useEffect, useState } from 'react';
import useAPI from '../Hooks/useAPI';
import LoginModal from '../Components/LoginModal/LoginModal';

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);

    const api = useAPI() 
    const StoreUser = ({ user, expires }) => {
        localStorage.setItem("user", JSON.stringify({
            id: user.id, 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            login: user.login,
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

    const Login = async (email, password) => {
        const res = await api.Login(email, password)
        if(res.status === 200) {
            StoreUser(res.data)
            setUser(GetUserFromStore())
        }
        else {
            return res.message
        }
    }

    const Logout = () => {
        api.Logout()
        ClearStoredUser();
        setUser(null)
    }

    const Register = async (login, firstName, lastName, email, password) => {
        const res = await api.Register(login, firstName, lastName, email,password);
        if(res.status === 200) {
            await Login(res.data.email, res.data.password)
        }
        else {
            return res.message
        }
    }

    const openModal = () => {
        setModalVisible(true)
    }

    return (
        <UserContext.Provider value={{ user, modalVisible, openModal, Login, Logout, Register, isValid }}>
            <div style={{ position: 'relative'}}>
                {children}
                {modalVisible && <LoginModal onClose={()=>{setModalVisible(false); console.log("A")}}/>}
            </div>
        </UserContext.Provider>
    )
}