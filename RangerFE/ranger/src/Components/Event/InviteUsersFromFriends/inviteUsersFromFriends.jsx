import { useContext, useState } from "react"
import Loader from "../../Loader/Loader"
import { FriendContext } from "../../../Context/Friend/FriendContext"

export const InviteUsersFromFriends = ({onSubmit, event, eventInvites}) => {
    const {isLoading, userFriends} = useContext(FriendContext)

    const [selected, setSelected] = useState([])

    const isInvited = (user) => {
        if(!event && !eventInvites) return true;
        return event.participants.some((m)=> m.id === user.id) || eventInvites.some((i)=> i.UserId === user.id)
    }

    const batchSubmit = (e) => {
        e.preventDefault()
        onSubmit(selected)
    }

    return(
        isLoading ? <Loader/> :
        <form>
            <div className="list-group">
                {
                    userFriends && userFriends.length > 0 ?
                    userFriends.map(f => {
                        return (
                            !isInvited(f) &&
                            <div className="list-group-item list-group-item-action d-flex justify-content-between" key={`frienditem${f.id}`}>
                                <label className="form-check-label" htmlFor={`friendcheck${f.id}`}>{f.firstName} {f.lastName}</label>
                                <input className="form-check-input" id={`friendcheck${f.id}`} type="checkbox" onChange={(e) => {
                                    e.target.checked ?
                                        setSelected(s=>[...s, f.id])
                                        :
                                        setSelected(s=>s.filter(i => i != f.id))
                                }}/>
                            </div>
                        )
                    })
                    :
                    <h2>Nothing to see here yet</h2>
                }
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={batchSubmit} type="submit" className="btn btn-crimson mt-3">Invite Selected</button>
            </div>
        </form>
    )
}