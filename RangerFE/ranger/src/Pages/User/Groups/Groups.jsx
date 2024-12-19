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
                    <div className="d-flex align-items-center">
                        <h1>Your groups</h1>
                        <button className="btn btn-crimson ms-3"  onClick={() => setShowGroupModal(true)}>
                            +
                        </button>
                    </div>
                    <div>
                        <ListUserGroups/>
                    </div>
                    <AddGroup showModal={showGroupModal} onClose={() => setShowGroupModal(false)} />
                </GroupProvider>
            </div>
        </div>
    )
}

export default Groups;