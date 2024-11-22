import './App.css';
import useAPI from './Hooks/useAPI';
import { useState } from 'react';

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');

  const [token, setToken] = useState('');
  const api = useAPI(token);

  const handleLogin = async () => {
    const res = await api.Login(email, password)

    if(res.status === 200) {
      setToken(res.data.token)
    }
    else {
      alert(res.message)
    }
  }

  const handleGet = async () => {
    const res = await api.Get('groups', 'members')

    if(res.status === 200) {
      console.log(res.data)
    }
    else {
      alert(res.message)
    }
  }

  const handlePost = async () => {
    const res = await api.Post('groups', { name: "Test", createdBy: 1 })

    if(res.status === 200) {
      console.log(res.data)
    }
    else {
      alert(res.message)
    }
  }

  const handlePatch = async () => {
    const res = await api.Patch('groups/3', { name: "Updated" })

    if(res.status === 200) {
      console.log(res.data)
    }
    else {
      alert(res.message)
    }
  }

  const handleDelete = async () => {
    const res = await api.Delete('groups/3')

    if(res.status === 200) {
      console.log(res.data)
    }
    else {
      alert(res.message)
    }
  }

  const handleRegister = async () => {
    const res = await api.Register(login, fName, lName, email, password)

    if(res.status === 201) {
      console.log(res.data)
      alert("User registered")
    }
    else {
      alert(res.message)
    }
  }

  return (
    <div className="App">
      {api.isBusy && <p>Busy!!!!!!!!!</p>}
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' />
      <hr/>
      <input value={login} onChange={e=>setLogin(e.target.value)} placeholder='Login' />
      <input value={fName} onChange={e=>setFName(e.target.value)} placeholder='First Name' />
      <input value={lName} onChange={e=>setLName(e.target.value)} placeholder='Last Name' />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <p>Token here: {token}</p>
      <button onClick={handleGet}>Get Groups</button>
      <button onClick={handlePost}>Post Groups</button>
      <button onClick={handlePatch}>Patch Groups</button>
      <button onClick={handleDelete}>Delete Groups</button>
    </div>
  );
}

export default App;
