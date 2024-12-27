import {useCallback, useContext, useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {GroupContext} from "../../../Context/Group/GroupContext";
import {InviteContext, InviteProvider} from "../../../Context/Invite/InviteContext";
import {DateToAgo} from "../../../Utils/DateTransformer";
import Loader from "../../Loader/Loader";
import {InviteUserToGroupModal} from "../../Event/inviteUserToGroupModal/inviteUserToGroupModal";
import { UserContext } from "../../../Context/UserContext";
import PersonDashIcon from "../../Icons/PersonDashIcon/PersonDashIcon";
import InfoIcon from "../../Icons/InfoIcon/InfoIcon";

export const InviteToGroup = ({groupId}) => {
    const [group, setGroup] = useState(null);
    const [groupInvites, setGroupInvites] = useState(null);

    const {groupById, removeParticipant, changeUserRoleInGroup} = useContext(GroupContext);
    const {fetchGroupInvites, removeInvite} = useContext(InviteContext);
    const {user} = useContext(UserContext);

    const [modal, setModal] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const {pass} = location.state || {};
        if(!pass)navigate('/')
    }, [])

    const fetchInvites = useCallback(async () => {
        if(group){
            const res = await fetchGroupInvites(group.id);
            setGroupInvites(res);
        }
    }, [group])

    const fetchGroups = useCallback(async () => {
        const res = await groupById(groupId, 'members')
        if(!res) {
            return;
        }
        setGroup(res);
    }, [groupId])

    useEffect(()=>{
        const fetchGroup = async () => {
            if(!groupId) return;
            const res = await groupById(groupId, 'members');
            if(!res) {
                return;
            }
            setGroup(res)

            const inv = await fetchGroupInvites(res.id);
            setGroupInvites(inv)
        }

        fetchGroup();
    }, [groupById])

    return (
        <div className="invite-event-body" style={{position: "relative"}}>
            {
                group && groupInvites ?
                    <div className="container text-center">
                        <div>
                            <h1 style={{display: 'inline-block'}}>Invite Others to {group.name}</h1>
                            <NavLink style={{marginLeft: '15px', marginBottom: '15px'}} className='btn btn-crimson'
                                     to={`/groups/${group.id}`}><strong>X</strong></NavLink>
                            <div>
                                <button className="btn btn-outline-success ms-3" onClick={() => setModal(true)}>
                                    <strong>+</strong></button>
                            </div>

                        </div>

                        <div className="accordion m-5">
                            <h2 className="accordion-header">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Participants
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show"
                                 data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="list-group">
                                        {
                                            group.members.map((u) => {
                                                return <div key={u.id}
                                                            className="list-group-item list-group-item-action invite-event-item">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-column align-items-start">
                                                            <h3>{u.firstName} {u.lastName}</h3>
                                                            <p className="text-secondary">@{u.login}</p>
                                                        </div>
                                                        <div className="d-flex flex-column align-items-end">
                                                            <p className="text-secondary">Signed
                                                                Up: {DateToAgo(u.UsersGroups.createdAt)}</p>
                                                            <h6>
                                                                Role: {u.UsersGroups.role} 
                                                                <InfoIcon content={
                                                                    <p>
                                                                        {
                                                                            u.UsersGroups.role === 'member' &&
                                                                            <><strong>Members</strong> can view this group and its' events without changing them</>
                                                                        }
                                                                        {
                                                                            u.UsersGroups.role === 'admin' &&
                                                                            <><strong>Admins</strong> can manage this group's members (<strong>invite, remove, promote, demote</strong>)</>
                                                                        }
{
                                                                            u.UsersGroups.role === 'creator' &&
                                                                            <><strong>Creator</strong> can edit this group's information as well as manage its' members</>
                                                                        }
                                                                    </p>
                                                                }/>
                                                            </h6>
                                                            { u.UsersGroups.role !== 'creator' && user.id !== u.id &&
                                                                <div className="d-flex pt-2">
                                                                    {
                                                                        u.UsersGroups.role === 'member' ? 
                                                                            <button className="btn btn-crimson" onClick={ async ()=> {
                                                                                await changeUserRoleInGroup(groupId, u.id, 'admin')
                                                                                fetchGroups()
                                                                            }}>Promote</button>
                                                                            :
                                                                            <button className="btn btn-outline-secondary" onClick={ async ()=> {
                                                                                await changeUserRoleInGroup(groupId, u.id, 'member')
                                                                                fetchGroups()
                                                                            }}>Demote</button>
                                                                    }
                                                                    <button className="btn btn-outline-danger ms-3 p-1" onClick={ async ()=> {
                                                                        await removeParticipant(group.id, u.id)
                                                                        fetchGroups()
                                                                    }}><PersonDashIcon/></button>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                        {
                                            groupInvites.map((i) => {
                                                return <div key={i.id}
                                                            className="list-group-item list-group-item-action invite-event-item">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-column align-items-start">
                                                            <h3>{i.user.firstName} {i.user.lastName}</h3>
                                                            <p className="text-secondary">@{i.user.login}</p>
                                                            <h6>Invited by @{i.sender.login}</h6>
                                                        </div>
                                                        <div className="d-flex flex-column align-items-end">
                                                            <p className="text-secondary">Invited: {DateToAgo(i.createdAt)}</p>
                                                            <button className="btn btn-outline-danger"
                                                                    onClick={async () => {
                                                                        await removeInvite(i.id)
                                                                        fetchInvites()
                                                                    }}>Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <InviteProvider>
                                <InviteUserToGroupModal groupInvites={groupInvites} showModal={modal} onClose={(res) => {
                                    res && fetchInvites()
                                    setModal(false)
                                }} group={group}/>
                            </InviteProvider>
                        </div>

                    </div>
                    :
                    <div className="loader-container">
                        <Loader/>
                    </div>
            }
        </div>
    )
}