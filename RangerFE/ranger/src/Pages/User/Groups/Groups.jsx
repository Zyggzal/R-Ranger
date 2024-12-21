import {GroupProvider} from "../../../Context/Group/GroupContext";
import {useEffect, useState} from "react";
import {ListUserGroups} from "../../../Components/Group/listUserGroups";
import {AddGroup} from "../../../Components/Group/addGroup";

const Groups = () => {
    const [showGroupModal, setShowGroupModal] = useState(false);

    const [asc, setAsc] = useState('1')
    const [sortBy, setSortBy] = useState('none')

    return (
        <GroupProvider>
            <div className="d-flex justify-content-between mb-3">
                <div className="d-flex align-items-center">
                    <h1>Your groups</h1>
                    <button className="btn btn-crimson ms-3"  onClick={() => setShowGroupModal(true)}>
                        +
                    </button>
                </div>
                <div style={{ height: '5%', width: '30%' }} className="d-flex align-items-center">
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
            <div>
                <ListUserGroups sortBy={sortBy} asc={asc} />
            </div>
            <AddGroup showModal={showGroupModal} onClose={() => setShowGroupModal(false)} />
        </GroupProvider>
    )
}

export default Groups;