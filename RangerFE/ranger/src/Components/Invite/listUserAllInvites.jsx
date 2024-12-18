import {useContext, useEffect, useState} from "react";
import {InviteContext} from "../../Context/Invite/InviteContext";
import { InviteItem } from "./InviteItem/InviteItem";
import './listUserAllInvites.css'

const ListUserAllInvites = ({type, asc}) => {
    const {allInvites, isLoading, fetchUserInvites} = useContext(InviteContext);
    const [invitesToShow, setInvitesToShow] = useState(null)

    useEffect(() => {
        if(!allInvites) return;
        switch(type) {
            case 'friends':
                setInvitesToShow(allInvites.filter((i) => i.Friend)); break;
            case 'events':
                setInvitesToShow(allInvites.filter((i) => i.EventId)); break;
            default:
                setInvitesToShow(allInvites); break;
        }
    }, [allInvites, type]);

    useEffect(() => {
        invitesToShow && setInvitesToShow(invitesToShow.sort((a, b) => {
            const ad = new Date(a.createdAt).getTime()
            const bd = new Date(b.createdAt).getTime()
            
            return asc ? ad - bd : bd - ad;
        }))
    }, [invitesToShow, asc])


    if(isLoading || !invitesToShow) return <div>Loading...</div>
    return (
        <>
            {invitesToShow.length <= 0 ? 
                <h1>Nothing to see here yet...</h1>
                :
                <div className="invites-list-container">
                    {
                        invitesToShow.map((invite) => (
                            <InviteItem onAccept={fetchUserInvites} onDecline={fetchUserInvites} key={`inviteitem${invite.id}`} invite={invite}/>
                        ))
                    }
                </div>
            }
        </>
    )
}

export default ListUserAllInvites;