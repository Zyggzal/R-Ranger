import {FriendProvider} from "../../../Context/Friend/FriendContext";
import {useState} from "react";
import {ListUserFriends} from "../../../Components/Friend/listUserFriends";
import {AddFriend} from "../../../Components/Friend/addFriend";
import PersonPlusIcon from '../../../Components/Icons/PersonPlusIcon/PersonPlusIcon';
import MaGlassIcon from "../../../Components/Icons/MaGlassIcon/MaGlassIcon";

const Friends = () => {

    const [showFriendModal, setShowFriendModal] = useState(false);

    const [asc, setAsc] = useState('1')
    const [searchName, setSearchName] = useState('');

    return (
        <FriendProvider>
            <div className="d-flex justify-content-between mb-3 user-profile-event-list-item">
                <button className="btn btn-crimson" onClick={() => setShowFriendModal(true)}>
                    <PersonPlusIcon/> Add friend
                </button>
                <div className="d-flex align-items-center user-profile-filters-container">
                    <p style={{marginBottom: '0px', width: '100%'}}>Sort By Name:</p>
                    <select style={{width: '50%'}} className="form-select add-page-input" value={asc}
                            onChange={(e) => setAsc(e.target.value)}>
                        <option value='1'>Asc</option>
                        <option value='0'>Desc</option>
                    </select>
                </div>
            </div>
            <div className="user-profile-events-search-container">
                <div className="search-input">
                    <MaGlassIcon/>
                    <input
                        className={`add-page-input form-control`}
                        type="text"
                        placeholder="Search"
                        value={searchName} 
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <ListUserFriends asc={asc} searchName={searchName}/>
            </div>
            <AddFriend showModal={showFriendModal} onClose={() => setShowFriendModal(false)} />
        </FriendProvider>
    )
}

export default Friends;