import { useState } from 'react';
import axios from 'axios'
import API from '../Config/API'

const useAPI = (token) => {
    const [isBusy, setIsBusy] = useState(false);

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

    const Get = async (path, include) => {
        setIsBusy(true)

        try {
            const request = `${API.host}/${path}?include=${include}`
            const response = await axios.get(request, { headers: { Authorization: token } })
            
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
        setIsBusy(true)

        try {
            const request = `${API.host}/${path}`
            const response = await axios.post(request, params, { headers: { Authorization: token } })
            
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

    const Patch = async (path, params) => {
        setIsBusy(true)

        try {
            const request = `${API.host}/${path}`
            const response = await axios.patch(request, params, { headers: { Authorization: token } })
            
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
            const response = await axios.delete(request, { headers: { Authorization: token } })
            
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
        Register,
        Get,
        Post,
        Patch,
        Delete
    }
}

export default useAPI