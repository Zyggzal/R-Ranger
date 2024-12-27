import InfoIcon from "../Icons/InfoIcon/InfoIcon";

export const ListParticipants = ({participants}) =>{
    if(!participants || participants.length === 0) return(
        <div>NoParticipants</div>
    )
    return (
        <div className="container mt-4">
            <div
                className="user-list-container list-container"
                style={{maxHeight: "300px", overflowY: "auto"}}
            >
                <ul className="list-group">
                    {participants.map((user) => (
                        <li
                            key={user.id}
                            className="list-group-item"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <div>
                                {user.firstName} {user.lastName}
                            </div>
                            <div>@{user.login}</div>
                            <div>@{user.email}</div>
                            <div>
                                {user.EventParticipants.role}
                                <InfoIcon content={
                                    <p>
                                        {
                                            user.EventParticipants.role === 'participant' &&
                                            <><strong>Participants</strong> can view this event and its' members without making any changes</>
                                        }
                                        {
                                            user.EventParticipants.role === 'admin' &&
                                            <><strong>Admins</strong> can manage this event's participants (<strong>invite, remove, promote, demote</strong>)</>
                                        }
                                        {
                                            user.EventParticipants.role === 'creator' &&
                                            <><strong>Creator</strong> can edit this event's information as well as manage its' participants</>
                                        }
                                    </p>
                                }/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}