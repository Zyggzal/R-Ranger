import { EventProvider } from "../../../Context/Event/EventContext";
import { ListUserEvents } from "../../../Components/Event/listUserEvents";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import MaGlassIcon from "../../../Components/Icons/MaGlassIcon/MaGlassIcon";

const UserEvents = () => {
    const [asc, setAsc] = useState('1')
    const [sortBy, setSortBy] = useState('none');
    const [searchName, setSearchName] = useState('');

    return (
        <EventProvider>
            <div className="profile-user-events-header mb-3">
                <div className="d-flex align-items-center">
                    <h1>Your Events</h1>
                    <NavLink className='btn btn-crimson ms-3' to='/events/add'><strong>+</strong></NavLink>
                </div>
                <div className="d-flex align-items-center user-profile-filters-container">
                    <p style={{ marginBottom: '0px', width: '100%' }}>Sort By:</p>
                    <select className="form-select add-page-input me-2 ms-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value='none'>-</option>
                        <option value='name'>Name</option>
                        <option value='signup'>Sign Up End Date</option>
                        <option value='start'>Start Date</option>
                        <option value='end'>End Date</option>
                        <option value='status'>Status</option>
                        <option value='private'>Is Private</option>
                    </select>
                    <select className="form-select add-page-input" value={asc} onChange={(e) => setAsc(e.target.value)}>
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
            <ListUserEvents sortBy={sortBy} asc={asc} searchName={searchName}/>
            <hr/>
        </EventProvider>
    )
}

export {UserEvents};