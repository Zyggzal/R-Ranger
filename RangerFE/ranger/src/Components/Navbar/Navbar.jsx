import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { user, Logout } = useContext(UserContext);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <p>{ user ? `Hello there, ${user.login}!` : "Don't be a stranger, log in or register!" }</p>
            <NavLink to='/' style={({ isActive }) => ({ color: isActive ? 'green' : '' })}>Home</NavLink>
            <NavLink to='/events' style={({ isActive }) => ({ color: isActive ? 'green' : '' })}>Your Events</NavLink>
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/login'>Login</NavLink>    
            <p>{ user ? <button onClick={Logout}>Logout</button> : 'Not logged in' }</p>
        </div>
    )
}

export default Navbar;