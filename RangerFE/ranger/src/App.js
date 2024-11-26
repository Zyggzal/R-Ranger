import './App.css';
import { UserProvider } from './Context/UserContext';
import LoginForm from './Components/Login/LoginForm'
import RegisterForm from './Components/Register/RegisterForm';
import Navbar from './Components/Navbar/Navbar';

function App() {
  // const handleGet = async () => {
  //   const res = await api.Get('groups', 'members')

  //   if(res.status === 200) {
  //     console.log(res.data)
  //   }
  //   else {
  //     alert(res.message)
  //   }
  // }

  // const handlePost = async () => {
  //   const res = await api.Post('groups', { name: "Test", createdBy: 1 })

  //   if(res.status === 200) {
  //     console.log(res.data)
  //   }
  //   else {
  //     alert(res.message)
  //   }
  // }

  // const handlePatch = async () => {
  //   const res = await api.Patch('groups/3', { name: "Updated" })

  //   if(res.status === 200) {
  //     console.log(res.data)
  //   }
  //   else {
  //     alert(res.message)
  //   }
  // }

  // const handleDelete = async () => {
  //   const res = await api.Delete('groups/3')

  //   if(res.status === 200) {
  //     console.log(res.data)
  //   }
  //   else {
  //     alert(res.message)
  //   }
  // }

  return (
    <UserProvider>
      <div className="App">
        <Navbar></Navbar>
        <LoginForm></LoginForm>
        <hr/>
        <RegisterForm></RegisterForm>
        {/* <button onClick={handleGet}>Get Groups</button>
        <button onClick={handlePost}>Post Groups</button>
        <button onClick={handlePatch}>Patch Groups</button>
        <button onClick={handleDelete}>Delete Groups</button> */}
      </div>
    </UserProvider>
  );
}

export default App;
