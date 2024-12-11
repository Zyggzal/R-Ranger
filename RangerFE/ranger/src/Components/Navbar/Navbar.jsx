import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { user, Logout } = useContext(UserContext);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <p>{ user ? `Hello there, ${user.login}!` : "Don't be a stranger, log in or register!" }</p>
            <NavLink className='btn btn-link' to='/' style={({ isActive }) => ({ color: isActive ? 'green' : '' })}>Home</NavLink>
            <NavLink className='btn btn-link' to='/eventItem'>Event Item</NavLink>
            { 
                user ? 
                <div>
                    <NavLink className='btn btn-link' to='/profile' style={({ isActive }) => ({ color: isActive ? 'green' : '' })}>{user.login}</NavLink>
                    <button onClick={Logout}>Logout</button>
                </div>
                :
                <div>
                    <NavLink className='btn btn-link' to='/login'>Login</NavLink>
                    
                </div>
            }
        </div>
    )
}

export default Navbar;