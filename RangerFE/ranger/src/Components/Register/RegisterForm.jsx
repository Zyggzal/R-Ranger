import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Loader from "../Loader/Loader";

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');

    const { api, Register } = useContext(UserContext);

    const handleRegister = async () => {
        await Register(login, fName, lName, email, password);
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {api.isBusy && <Loader/>}
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' />
            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' />
            <input value={login} onChange={e=>setLogin(e.target.value)} placeholder='Login' />
            <input value={fName} onChange={e=>setFName(e.target.value)} placeholder='First Name' />
            <input value={lName} onChange={e=>setLName(e.target.value)} placeholder='Last Name' />

            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default RegisterForm;