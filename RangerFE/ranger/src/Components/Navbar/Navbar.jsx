import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"

const Navbar = () => {
    const { user, Logout } = useContext(UserContext);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div>{ user ? `Hello there, ${user.login}!` : "Don't be a stranger, log in or register!" }</div>
            <div>{ user ? <button onClick={Logout}>Logout</button> : 'Not logged in' }</div>
        </div>
    )
}

export default Navbar;