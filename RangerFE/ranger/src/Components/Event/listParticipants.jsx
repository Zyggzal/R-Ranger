import button from "bootstrap/js/src/button";

export const ListParticipants = ({participants, role}) =>{
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
                                gridTemplateColumns: "2fr 2fr 1fr 1fr",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <div>
                                <strong>{user.firstName} {user.lastName}</strong>
                            </div>
                            <div>{user.email}</div>
                            <div>{user.EventParticipants.role}</div>
                            {role === "creator" &&
                                user.EventParticipants.role !== "creator" &&
                                user.EventParticipants.role !== "admin" && (
                                    <button className="btn btn-success">Promote to admin</button>
                                )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}