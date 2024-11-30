import './App.css';
import { UserProvider } from './Context/UserContext';
import LoginForm from './Components/Login/LoginForm'
import RegisterForm from './Components/Register/RegisterForm';
import Navbar from './Components/Navbar/Navbar';
import {EventProvider} from "./Context/Event/EventContext";
import {ListUserEvents} from "./Components/Event/listUserEvents";
import {ListPublicEvents} from "./Components/Event/listPublicEvents";
import {GroupProvider} from "./Context/Group/GroupContext";
import {ListUserGroups} from "./Components/Group/listUserGroups";
import {AddEvent} from "./Components/Event/addEvent";
import {AddGroup} from "./Components/Group/addGroup";
import {ListPublicGroups} from "./Components/Group/listPublicGroups";
import {InviteProvider} from "./Context/Invite/InviteContext";
import {ListUserAllInvites} from "./Components/Invite/listUserAllInvites";
import {ListUserSortedInvites} from "./Components/Invite/listUserSortedInvites";
import {FriendProvider} from "./Context/Friend/FriendContext";
import {ListUserFriends} from "./Components/Friend/listUserFriends";
import {AddFriend} from "./Components/Friend/addFriend";

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
    <UserProvider >
        <div className="App">
            <div>
                <Navbar></Navbar>
                <LoginForm></LoginForm>
                <hr/>
                <RegisterForm></RegisterForm>
                {/* <button onClick={handleGet}>Get Groups</button>
        <button onClick={handlePost}>Post Groups</button>
        <button onClick={handlePatch}>Patch Groups</button>
        <button onClick={handleDelete}>Delete Groups</button> */}
            </div>

            <h1>Events</h1>
            <EventProvider>
                <div>
                    <h2>Lists</h2>
                    <div className="div-grid-lists">
                        <ListUserEvents/>
                        <ListPublicEvents/>
                    </div>
                    <br/>
                    <h2>Form</h2>
                    <div className="div-form-flex">
                        <AddEvent/>
                    </div>
                </div>
            </EventProvider>

            <hr/>

            <h1>Groups</h1>
            <GroupProvider>
                <h2>Lists</h2>
                <div className="div-grid-lists">
                    <ListUserGroups/>
                    <ListPublicGroups/>
                </div>
                <h2>Form</h2>
                <div className="div-form-flex">
                    <AddGroup/>
                </div>
            </GroupProvider>

            <hr/>

            <h1>Invites</h1>
            <InviteProvider>
                <h2>Lists</h2>
                <div className="div-grid-lists">
                    <ListUserAllInvites/>
                    <ListUserSortedInvites/>
                </div>
            </InviteProvider>

            <hr/>

            <FriendProvider>
                <h2>List</h2>
                <div className="div-grid-lists">
                    <ListUserFriends/>
                </div>
                <h2>Form</h2>
                <div className="div-form-flex">
                    <AddFriend/>
                </div>
            </FriendProvider>

        </div>

    </UserProvider>
  );
}

export default App;
