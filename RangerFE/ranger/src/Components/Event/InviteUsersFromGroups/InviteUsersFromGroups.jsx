import { useContext, useEffect, useState } from "react"
import { GroupContext } from "../../../Context/Group/GroupContext"
import Loader from "../../Loader/Loader"
import { UserContext } from "../../../Context/UserContext"

export const InviteUsersFromGroups = ({onSubmit, event, eventInvites}) => {
    const {isLoading, fetchUserGroupsWithIncludes} = useContext(GroupContext)

    const {user} = useContext(UserContext);

    const [selected, setSelected] = useState([])
    const [groups, setGroups] = useState([])

    useEffect(()=>{
        const fetchGroups = async () => {
            const res = await fetchUserGroupsWithIncludes('members')

            setGroups(res)
        }
        fetchGroups()
    }, [])

    const isInvited = (user) => {
        if(!event && !eventInvites) return true;
        return event.participants.some((m)=>m.id === user.id) || eventInvites.some((i)=>i.UserId === user.id)
    }

    const batchSubmit = (e) => {
        e.preventDefault()
        onSubmit(selected)
    }

    return(
        isLoading ? <Loader/> :
        <form>
            <div className="accordion accordion-dark">
                {
                    groups && groups.length > 0 ?
                    groups.map(g=>{
                        return(
                            <div key={`groupitem${g.id}`} className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${g.id}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                    {g.name}
                                </button>
                                </h2>
                                <div id={`flush-collapse${g.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body list-group p-2">
                                    {
                                        g.members.map((m) => {
                                            return (
                                                !isInvited(m) && user.id !== m.id &&
                                                <div className="list-group-item list-group-item-action d-flex justify-content-between" key={`groupmemberitem${m.id}`}>
                                                    <label className="form-check-label" htmlFor={`groupmembercheck${m.id}`}>{m.firstName} {m.lastName}</label>
                                                    <input className="form-check-input" id={`groupmembercheck${m.id}`} type="checkbox" onChange={(e) => {
                                                        e.target.checked ?
                                                            setSelected(s=>[...s, m.id])
                                                            :
                                                            setSelected(s=>s.filter(i => i != m.id))
                                                    }}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                </div>
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