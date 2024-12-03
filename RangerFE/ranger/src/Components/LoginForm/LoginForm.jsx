import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Loader from "../Loader/Loader";
import useAPI from "../../Hooks/useAPI";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { Login } = useContext(UserContext);
    const api = useAPI();

    const navigate = useNavigate();

    const handleLogin = async () => {
        await Login(email, password);
        navigate(-2);
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {api.isBusy && <Loader/>}
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' />
            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginForm;