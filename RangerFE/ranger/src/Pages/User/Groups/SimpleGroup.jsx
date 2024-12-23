import {useParams} from "react-router-dom";
import {GroupProvider} from "../../../Context/Group/GroupContext";
import {GroupItem} from "../../../Components/Group/GroupItem/GroupItem";

const SimpleGroup = () =>{
    const params = useParams();

    return (
        <GroupProvider>
            <div>
                <GroupItem id={params.id}/>
            </div>
        </GroupProvider>
    )
}

export {SimpleGroup}