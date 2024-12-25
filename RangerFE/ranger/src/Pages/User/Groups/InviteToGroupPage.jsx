import {useParams} from "react-router-dom";
import {GroupProvider} from "../../../Context/Group/GroupContext";
import {InviteProvider} from "../../../Context/Invite/InviteContext";
import {InviteToGroup} from "../../../Components/Group/InviteToGroup/inviteToGroup";

export const InviteToGroupPage = () => {
    const params = useParams();

    return (
        <GroupProvider>
            <InviteProvider>
                <InviteToGroup groupId={params.id}/>
            </InviteProvider>
        </GroupProvider>
    )
}