import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios'
import API from '../Config/API'

const useAPI = () => {
    useEffect(()=>{
        axios.defaults.withCredentials = true;
    }, []);

    useLayoutEffect(()=>{
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                //const originalRequest = error.config;

                if(error.response.status === 401 && error.response.data === 'Unauthorized') {
                    if(localStorage.getItem("user")) {
                        Logout()
                        localStorage.removeItem("user")
                        console.log("Asdgdfg")
                        window.location.reload()
                    }

                }

                return Promise.reject(error);
        });

        return() => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const Login = async (email, password) => {
        try {
            const request = `${API.host}/auth/login`
            const response = await axios.post(request, { email, password })

            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            const status = err.response.status
            const message = err.response.data.message
            
            return { status, message };
        }
    }

    const Logout = async () => {
        try {
            const request = `${API.host}/auth/logout`
            const response = await axios.post(request);

            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch (err) {
            const status = err.response.status
            const message = err.response.data.message
            
            return { status, message };
        }
    }
    const Register = async (login, firstName, lastName, email, password) => {
        try {
            const request = `${API.host}/auth/register`
            const response = await axios.post(request, { login, firstName, lastName, email, password })
            
            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            const status = err.response.status
            const message = err.response.data.message
            
            return { status, message };
        }
    }

    const Status = async (id) => {
        try {
            const request = `${API.host}/auth/status`
            const response = await axios.post(request, { id })
            
            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            const status = err.response.status
            const message = err.response.data.message
            
            return { status, message };
        }
    }

    const Get = async (path, include) => {
        try {
            const request = `${API.host}/${path}?${include? `include=${include}` : '' }`
            const response = await axios.get(request)
            
            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            const status = err.response.status
            const message = err.response.statusText
            
            return { status, message };
        }
    }
    
    const Post = async (path, params) => {
        try {
            const request = `${API.host}/${path}`
            const response = await axios.post(request, params)

            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            const status = err.response.status
            const message = err.response.statusText
            
            return { status, message };
        }
    }

    const Patch = async (path, params) => {
        try {
            const request = `${API.host}/${path}`
            const response = await axios.patch(request, params)
 
            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            const status = err.response.status
            const message = err.response.statusText
            
            return { status, message };
        }
    }

    const Delete = async (path, payload) => {
        try {
            const request = `${API.host}/${path}`
            const response = await axios.delete(request, { data: payload })

            const data = response.data;
            const status = response.status;

            return { status, data };
        }
        catch(err) {
            const status = err.response.status
            const message = err.response.statusText
            
            return { status, message };
        }
    }

    return {
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