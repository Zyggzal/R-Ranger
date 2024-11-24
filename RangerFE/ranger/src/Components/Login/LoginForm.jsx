import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Loader from "../Loader/Loader";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { api, Login } = useContext(UserContext);

    const handleLogin = async () => {
        await Login(email, password);
        //alert(res ? res :  `Welcome back, ${user.login}`)

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