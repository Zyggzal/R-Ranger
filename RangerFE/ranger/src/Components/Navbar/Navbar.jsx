import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { user, Logout } = useContext(UserContext);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <p>{ user ? `Hello there, ${user.login}!` : "Don't be a stranger, log in or register!" }</p>
            <NavLink className='btn btn-link' to='/' style={({ isActive }) => ({ color: isActive ? 'green' : '' })}>Home</NavLink>
            <NavLink className='btn btn-link' to='/events' style={({ isActive }) => ({ color: isActive ? 'green' : '' })}>Your Events</NavLink>
            <NavLink className='btn btn-link' to='/invites' style={({ isActive }) => ({ color: isActive ? 'green' : '' })}>Your Invites</NavLink>
            <NavLink className='btn btn-link' to='/groups' style={({ isActive }) => ({ color: isActive ? 'green' : '' })}>Groups & Friends</NavLink>
            <NavLink className='btn btn-link' to='/about'>About</NavLink>
            <NavLink className='btn btn-link' to='/login'>Login</NavLink>
            <p>{ user ? <button onClick={Logout}>Logout</button> : 'Not logged in' }</p>
        </div>
    )
}

export default Navbar;