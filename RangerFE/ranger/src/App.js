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
            <Route path='events/add' element={ <RequireAuth><AddEventPage/></RequireAuth> } />
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
