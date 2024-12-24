import { EventProvider } from "../../../Context/Event/EventContext";
import { ListUserEvents } from "../../../Components/Event/listUserEvents";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const UserEvents = () => {
    const [asc, setAsc] = useState('1')
    const [sortBy, setSortBy] = useState('none')

    return (
        <EventProvider>
            <div className="d-flex justify-content-between mb-3">
                <div className="d-flex align-items-center">
                    <h1>Your Events</h1>
                    <NavLink className='btn btn-crimson ms-3' to='/events/add'><strong>+</strong></NavLink>
                </div>
                <div style={{ height: '5%', width: '30%' }} className="d-flex align-items-center">
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
            <ListUserEvents sortBy={sortBy} asc={asc} />
            <hr/>
        </EventProvider>
    )
}

export {UserEvents};