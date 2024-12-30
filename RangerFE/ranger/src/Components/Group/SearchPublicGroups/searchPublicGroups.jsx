import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import MaGlassIcon from "../../Icons/MaGlassIcon/MaGlassIcon";
import {GroupContext} from "../../../Context/Group/GroupContext";
import {findAllByDisplayValue} from "@testing-library/react";
import {PublicGroupSearchComponent} from "../PublicGroupListComponent/PulbicGroupSearchComponent";

export const SearchPublicGroups = () => {

    const {
        register,
        watch,
        setValue
    } = useForm();

    const {getGroupsByName} = useContext(GroupContext);

    const [groups, setGroups] = useState([]);

    const watchName = watch("groupName");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (watchName && watchName.length > 2) {
                const fetchGroups = async () => {
                    const actualGroups = await getGroupsByName(watchName);
                    setGroups(actualGroups);
                };
                console.log("search...")
                fetchGroups();
            }
        }, 1000);

        return () => clearTimeout(delayDebounce);
    }, [watchName, watch]);


    return (
        <div className="d-flex justify-content-center flex-column">
            <form action="" className="form-horizontal ms-2 w-25" onSubmit={(e) => e.preventDefault()}>
                <div className="search-input">
                    <MaGlassIcon/>
                    <input
                        className={`add-page-input form-control`}
                        type="text"
                        placeholder="Search"
                        {...register("groupName")}
                    />
                </div>
            </form>
            <hr className="divider"/>
            {groups.length > 0 && (
                <div className="user-list-container list-group">
                    {
                        groups.map((group) => (
                            <PublicGroupSearchComponent key={group.id + group.name} group={group}/>
                        ))
                    }
                </div>
            )}
        </div>

    )
}