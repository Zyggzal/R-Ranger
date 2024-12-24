import { useContext, useEffect, useState } from "react"
import { GroupContext } from "../../../Context/Group/GroupContext"
import Loader from "../../Loader/Loader"
import { UserContext } from "../../../Context/UserContext"
import NoContent from "../../NoContent/NoContent"
import LockIcon from "../../Icons/LockIcon/LockIcon"

export const InviteUsersFromGroups = ({onSubmit, event, eventInvites}) => {
    const {isLoading, fetchUserGroupsWithIncludes} = useContext(GroupContext)

    const {user} = useContext(UserContext);

    const [selected, setSelected] = useState([])
    const [groups, setGroups] = useState([])

    const [asc, setAsc] = useState('1')
    const [sortBy, setSortBy] = useState('none')

    useEffect(()=>{
        const fetchGroups = async () => {
            const res = await fetchUserGroupsWithIncludes('members')

            setGroups(res)
        }
        fetchGroups()
    }, [])

    useEffect(() => {
        if(groups && sortBy !== 'none') {
            const sortFunc = (a, b) => {
                let diff = 0;
                switch(sortBy) {
                    case 'name':
                        diff = a.name.localeCompare(b.name); break;
                    case 'created':
                        diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); break;
                    case 'private':
                        diff =  b.isPublic - a.isPublic; break;
                }

                if(asc === '1') diff *= -1;

                return diff;
            }

            setGroups((prev) => prev.sort(sortFunc));
        }
    }, [asc, sortBy])

    const isInvited = (user) => {
        if(!event && !eventInvites) return true;
        return event.participants.some((m)=>m.id === user.id) || eventInvites.some((i)=>i.UserId === user.id)
    }

    const batchSubmit = (e) => {
        e.preventDefault()
        onSubmit(selected)
    }

    return(
        isLoading || !groups ? <Loader/> :
        <form>
            <div className="d-flex justify-content-end mb-3">
                <div className="d-flex align-items-center">
                    <p style={{ marginBottom: '0px', width: '100%' }}>Sort By:</p>
                    <select className="form-select add-page-input me-2 ms-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value='none'>-</option>
                        <option value='name'>Name</option>
                        <option value='created'>Created At</option>
                        <option value='private'>Is Private</option>
                    </select>
                    <select className="form-select add-page-input" value={asc} onChange={(e) => setAsc(e.target.value)}>
                        <option value='1'>Asc</option>
                        <option value='0'>Desc</option>
                    </select>
                </div>
            </div>
            <div className="accordion accordion-dark">
                {
                    groups.length > 0 ?
                    groups.map(g=>{
                        return(
                            <div key={`groupitem${g.id}`} className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${g.id}`} aria-expanded="false" aria-controls="flush-collapseOne">
                                    {g.name} <LockIcon unlocked={g.isPublic}/>
                                </button>
                                </h2>
                                <div id={`flush-collapse${g.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body list-group p-2">
                                    <p id="every-button" className="btn btn-secondary" onClick={(e)=> {
                                        for(const child of e.target.parentElement.children) {
                                            if(child.id !== 'every-button') {
                                                child.children[1].checked = !child.children[1].checked;
                                            }
                                        }
                                    }}>All</p>
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
                    <NoContent/>
                }
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={batchSubmit} type="submit" className="btn btn-crimson mt-3">Invite Selected</button>
            </div>
        </form>
    )
}