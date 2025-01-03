import './App.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { UserProvider } from './Context/UserContext';
import MainLayout from './Layouts/Main/MainLayout';
import { Home } from './Pages/Home/Home';
import { NotFound } from './Pages/NotFound/NotFound';
import { UserEvents } from './Pages/User/Events/UserEvents';
import { RequireAuth } from './Middleware/RequireAuth';
import { Login } from './Pages/Login/Login';
import UserInvites from "./Pages/User/Invites/UserInvites";
import {SimpleEvent} from "./Pages/User/Events/SimpleEvent";
import UserProfile from './Pages/User/UserProfile/UserProfile';
import Groups from './Pages/User/Groups/Groups';
import Friends from './Pages/User/Friends/Friends';
import { AddEventPage } from './Pages/Events/AddEventPage/AddEventPage';
import InviteToEventPage from './Pages/Events/IniteUsersPage/InviteToEventPage';
import {SimpleGroup} from "./Pages/User/Groups/SimpleGroup";
import {InviteToGroupPage} from "./Pages/User/Groups/InviteToGroupPage";
import { EventProvider } from './Context/Event/EventContext';
import { EditEventPage } from './Pages/Events/EditEventPage/EditEventPage';
import {StrangerPage} from "./Pages/User/StrangerPage/StrangerPage";
import { ListPublicEvents } from './Components/Event/listPublicEvents';
import { Welcome } from './Pages/Welcome/Welcome';
import { ListPublicGroups } from './Components/Group/listPublicGroups';
import { GroupProvider } from './Context/Group/GroupContext';

function App() {
    const router = createBrowserRouter(createRoutesFromElements(
    
        <Route path='/' element={<MainLayout />} >
            <Route index element={<Welcome />} />
            <Route path='home' element={<RequireAuth><Home /></RequireAuth>} >
              <Route index element={ <ListPublicEvents /> } />
              <Route path='groups' element={ <GroupProvider><ListPublicGroups /></GroupProvider> } />
            </Route>
            <Route path='login' element={ <Login/>} />
            <Route path='profile' element={ <RequireAuth><UserProfile /></RequireAuth> }>
              <Route path='events' element={ <UserEvents /> } />
              <Route path='invites' element={ <UserInvites /> } />
              <Route path='groups' element={ <Groups /> } />
              <Route path='friends' element={ <Friends /> } />
            </Route>
            <Route path='events/add' element={ <RequireAuth><EventProvider><AddEventPage/></EventProvider></RequireAuth> } />
            <Route path='events/:id/edit' element={ <RequireAuth><EventProvider><EditEventPage/></EventProvider></RequireAuth> } />
            <Route path='events/:id' element={ <RequireAuth><SimpleEvent /></RequireAuth> } />
            <Route path='events/:id/invite' element={ <RequireAuth><InviteToEventPage/></RequireAuth> } />
            <Route path='groups/:id' element={<RequireAuth><SimpleGroup /></RequireAuth>  } />
            <Route path='groups/:id/invite' element={<RequireAuth><InviteToGroupPage /></RequireAuth>  } />
            <Route path='users/:login' element={<RequireAuth><StrangerPage /></RequireAuth>  } />
            <Route path='*' element={<NotFound />} />
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
