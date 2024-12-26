import { useContext, useEffect, useState } from "react"
import { GroupContext } from "../../../Context/Group/GroupContext"
import Loader from "../../Loader/Loader"
import { UserContext } from "../../../Context/UserContext"
import NoContent from "../../NoContent/NoContent"
import LockIcon from "../../Icons/LockIcon/LockIcon"

export const InviteUsersFromGroups = ({onSubmit, participants, invites, actualGroup}) => {
    const {isLoading, fetchUserGroupsWithIncludes} = useContext(GroupContext)

    const {user} = useContext(UserContext);

    const [selected, setSelected] = useState([])
    const [groups, setGroups] = useState([])

    const [asc, setAsc] = useState('1')
    const [sortBy, setSortBy] = useState('none')

    useEffect(()=>{
        const fetchGroups = async () => {
            let res = await fetchUserGroupsWithIncludes('members')
            if(actualGroup) res = res.filter((g) => g.id !== actualGroup.id);
            for(let i = 0; i < res.length; i++) {
                res[i].members = res[i].members.filter(m => !isInvited(m) && user.id !== m.id)
            }
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
        if(!participants && !invites) return true;
        return participants.some((m)=>m.id === user.id) || invites.some((i)=>i.UserId === user.id)
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
                                    <div className="list-group-item list-group-item-action d-flex">
                                        <input type="checkbox" className="form-check-input me-3" onClick={(e)=> {
                                            for(const child of e.target.parentElement.parentElement.children) {
                                                if(child !== e.target) {
                                                    child.children[1].checked = e.target.checked;
                                                }
                                            }
                                            if(e.target.checked === true) {
                                                setSelected(s => [...s, ...g.members.map(m => m.id)])
                                            }
                                            else {
                                                setSelected(s=>s.filter(i => !g.members.some(m => m.id === i)))
                                            }
                                        }}/>
                                        <label className="form-check-label">All</label>
                                    </div>
                                    {
                                        g.members.map((m) => {
                                            return (
                                                <div className="list-group-item list-group-item-action d-flex justify-content-between" key={`groupmemberitem${m.id}`}>
                                                    <label className="form-check-label" htmlFor={`groupmembercheck${m.id}`}>{m.firstName} {m.lastName}</label>
                                                    <input className="form-check-input" id={`groupmembercheck${m.id}`} type="checkbox" onChange={(e) => {
                                                        e.target.checked ?
                                                            setSelected(s=>[...s, m.id])
                                                            :
                                                            setSelected(s=>s.filter(i => i !== m.id))
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