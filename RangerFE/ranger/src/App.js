import './App.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import LoginForm from './Components/LoginForm/LoginForm'
import RegisterForm from './Components/RegisterForm/RegisterForm';
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
import ListUserAllInvites from "./Components/Invite/listUserAllInvites";
import {ListUserSortedInvites} from "./Components/Invite/listUserSortedInvites";
import {FriendProvider} from "./Context/Friend/FriendContext";
import {ListUserFriends} from "./Components/Friend/listUserFriends";
import {AddFriend} from "./Components/Friend/addFriend";
import MainLayout from './Layouts/Main/MainLayout';
import { Home } from './Pages/Home/Home';
import { NotFound } from './Pages/NotFound/NotFound';
import { UserEvents } from './Pages/User/Events/UserEvents';
import { RequireAuth } from './Middleware/RequireAuth';
import { Login } from './Pages/Login/Login';
import UserInvites from "./Pages/User/Invites/UserInvites";
import FriendsAndGroups from "./Pages/User/FriendsAndGroups/FriendsAndGroups";
import {SimpleEvent} from "./Pages/User/Events/SimpleEvent";
import UserProfile from './Pages/User/UserProfile/UserProfile';
import Groups from './Pages/User/Groups/Groups';
import Friends from './Pages/User/Friends/Friends';

function App() {
    const router = createBrowserRouter(createRoutesFromElements(
    
        <Route path='/' element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path='login' element={ <Login/>} />
            <Route path='profile' element={ <RequireAuth><UserProfile /></RequireAuth> }>
              <Route path='events' element={ <UserEvents /> } />
              <Route path='invites' element={ <UserInvites /> } />
              <Route path='groups' element={ <Groups /> } />
              <Route path='friends' element={ <Friends /> } />
            </Route>
            <Route path='eventItem' element={ <RequireAuth><SimpleEvent /></RequireAuth> } />
            <Route path='*' element={<NotFound />} />
            {/* <Route path='students' element={<Students />} />
            <Route path='students/:id' element={ <SingleStudent /> } />
            <Route path='students/:id/edit' element={ <EditStudent /> } />
    
            <Route path='students/new' element={
              <RequireAuth>
                 <CreateStudent /> 
              </RequireAuth>
             } 
            />
    
            <Route path='about/*' element={<About />}>
                    <Route path="contacts" element={<p>Our phone: +38-099-999-99-01</p>} />
                    <Route path="team" element={<p>Our Team: Alex, Mary, Sergiy</p>} />
                    <Route path="maps" element={<p>Map: ----0---- </p>} />
            </Route>
            <Route path='login/' element={<Login /> } />
              */}
        </Route>
      ));
  return (
    <>
      <UserProvider >
        <div className="App">
            <RouterProvider router={router} />
        </div>
      </UserProvider>
    </>
  );
}

export default App;
