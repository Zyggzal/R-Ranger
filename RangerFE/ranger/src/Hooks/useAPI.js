import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios'
import API from '../Config/API'

const useAPI = () => {
    const [isBusy, setIsBusy] = useState(false);

    useEffect(()=>{
        axios.defaults.withCredentials = true;
    }, []);

    useLayoutEffect(()=>{
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                //const originalRequest = error.config;

                if(error.response.status === 401 && error.response.data === 'Unauthorized') {
                    //Перекинуть на страницу логина
                }

                return Promise.reject(error);
        });

        return() => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const Login = async (email, password) => {
        setIsBusy(true)

        try {
            const request = `${API.host}/auth/login`
            const response = await axios.post(request, { email, password })

            setIsBusy(false)

            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            setIsBusy(false)

            const status = err.response.status
            const message = err.response.data.message
            
            return { status, message };
        }
    }

    const Logout = async () => {
        setIsBusy(true)
        try {
            const request = `${API.host}/auth/logout`
            const response = await axios.post(request);

            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch (err) {
            setIsBusy(false)

            const status = err.response.status
            const message = err.response.data.message
            
            return { status, message };
        }
    }
    const Register = async (login, firstName, lastName, email, password) => {
        setIsBusy(true)

        try {
            const request = `${API.host}/auth/register`
            const response = await axios.post(request, { login, firstName, lastName, email, password })
            
            setIsBusy(false)
            
            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            setIsBusy(false)

            const status = err.response.status
            const message = err.response.data.message
            
            return { status, message };
        }
    }

    const Status = async (id) => {
        try {
            const request = `${API.host}/auth/status`
            const response = await axios.post(request, { id })
            
            setIsBusy(false)
            
            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            setIsBusy(false)

            // const status = err.status
            // const message = err.message
            
            return { err };
        }
    }

    const Get = async (path, include) => {
        setIsBusy(true)

        try {
            const request = `${API.host}/${path}?include=${include}`
            const response = await axios.get(request)
            
            setIsBusy(false)
            
            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            setIsBusy(false)

            const status = err.response.status
            const message = err.response.statusText
            
            return { status, message };
        }
    }
    
    const Post = async (path, params) => {
        setIsBusy(true);
        console.log(params)

        try {

            const request = `${API.host}/${path}`

            const response = await axios.post(request, params)
            
            setIsBusy(false)
            
            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            setIsBusy(false)
            console.log(err)
            const status = err.response.status
            const message = err.response.statusText
            
            return { status, message };
        }
    }

    const Patch = async (path, params) => {
        setIsBusy(true)

        try {
            const request = `${API.host}/${path}`
            const response = await axios.patch(request, params)
            
            setIsBusy(false)
            
            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            setIsBusy(false)

            const status = err.response.status
            const message = err.response.statusText
            
            return { status, message };
        }
    }

    const Delete = async (path) => {
        setIsBusy(true)

        try {
            const request = `${API.host}/${path}`
            const response = await axios.delete(request)
            
            setIsBusy(false)
            
            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            setIsBusy(false)

            const status = err.response.status
            const message = err.response.statusText
            
            return { status, message };
        }
    }

    return {
        isBusy,
        Login,
        Logout,
        Register,
        Status,
        Get,
        Post,
        Patch,
        Delete
    }
}

export default useAPI