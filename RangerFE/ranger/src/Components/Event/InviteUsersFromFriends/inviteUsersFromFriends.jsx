import { useContext, useState } from "react"
import Loader from "../../Loader/Loader"
import { FriendContext } from "../../../Context/Friend/FriendContext"
import NoContent from "../../NoContent/NoContent"

export const InviteUsersFromFriends = ({onSubmit, participants, invites}) => {
    const {isLoading, userFriends} = useContext(FriendContext)

    const [selected, setSelected] = useState([])
    const [asc, setAsc] = useState('1')

    const isInvited = (user) => {
        if(!participants && !invites) return true;
        return participants.some((m)=> m.id === user.id) || invites.some((i)=> i.UserId === user.id)
    }


    const batchSubmit = (e) => {
        e.preventDefault()
        onSubmit(selected)
    }

    return(
        isLoading ? <Loader/> :
        <form>
             <div className="d-flex justify-content-end mb-3 align-items-center">
                <p style={{ width: '25%', paddingTop: '10px' }}>Sort by Name:</p>
                <select style={{ width: '20%' }} className="form-select add-page-input ms-2" value={asc} onChange={(e) => setAsc(e.target.value)}>
                    <option value='1'>Asc</option>
                    <option value='0'>Desc</option>
                </select>
            </div>
            <div className="list-group">
                {
                    userFriends && userFriends.length > 0 ?
                    userFriends.map(f => {
                        return (
                            !isInvited(f) && f.Friend.status === 'accepted' &&
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
                    <NoContent/>
                }
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={batchSubmit} type="submit" className="btn btn-crimson mt-3">Invite Selected</button>
            </div>
        </form>
    )
}