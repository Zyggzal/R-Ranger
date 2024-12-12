import {GroupProvider} from "../../../Context/Group/GroupContext";
import {useState} from "react";
import {ListUserGroups} from "../../../Components/Group/listUserGroups";
import {AddGroup} from "../../../Components/Group/addGroup";

const Groups = () => {

    const [showGroupModal, setShowGroupModal] = useState(false);

    return (
        <div>
            <div>
                <GroupProvider>
                    <div>
                        <ListUserGroups/>
                    </div>
                    <button onClick={() => setShowGroupModal(true)}>
                        Create Group
                    </button>
                    <AddGroup showModal={showGroupModal} onClose={() => setShowGroupModal(false)} />
                </GroupProvider>
            </div>
        </div>
    )
}

export default Groups;