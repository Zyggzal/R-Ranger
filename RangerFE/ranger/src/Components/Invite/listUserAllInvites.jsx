import {useContext, useEffect, useState} from "react";
import {InviteContext} from "../../Context/Invite/InviteContext";
import { InviteItem } from "./InviteItem/InviteItem";
import './listUserAllInvites.css'
import Loader from "../Loader/Loader";
import NoContent from "../NoContent/NoContent";

const ListUserAllInvites = ({type, asc}) => {
    const {allInvites, isLoading, fetchUserInvites} = useContext(InviteContext);
    const [invitesToShow, setInvitesToShow] = useState(null)

    useEffect(() => {
        if(!allInvites) return;

        let list = [];
        switch(type) {
            case 'friends':
                list = allInvites.filter((i) => i.Friend); break;
            case 'events':
                list = allInvites.filter((i) => i.EventId); break;
            default:
                list = allInvites; break;
        }

        list = list.sort((a, b) => {
            const ad = new Date(a.createdAt).getTime()
            const bd = new Date(b.createdAt).getTime()

            return asc === '1' ? ad - bd : bd - ad;
        })

        setInvitesToShow(list)
    }, [allInvites, type, asc]);


    if(isLoading || !invitesToShow) return <Loader/>
    return (
        <>
            {invitesToShow.length <= 0 ? 
                <NoContent/>
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