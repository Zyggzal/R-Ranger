import React, { createContext, useState } from 'react';
import useAPI from '../Hooks/useAPI';

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const api = useAPI(token)

    const Login = async (email, password) => {
        const res = await api.Login(email, password)
        if(res.status === 200) {
            setToken(res.data.token)
            setUser(res.data.user)
        }
        else {
            return res.message
        }
    }

    const Logout = () => {
        setToken(null)
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

    const isValid = async () => {
        if(!user || !token) {
            return false
        }
        const res = await api.Get('users/1')
        
        return !res.status === 401
    }

    return (
        <UserContext.Provider value={{ user, api, Login, Logout, Register, isValid }}>
            {children}
        </UserContext.Provider>
    )
}