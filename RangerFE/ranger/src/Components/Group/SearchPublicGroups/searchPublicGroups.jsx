import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import MaGlassIcon from "../../Icons/MaGlassIcon/MaGlassIcon";
import {GroupContext} from "../../../Context/Group/GroupContext";
import {findAllByDisplayValue} from "@testing-library/react";
import {PublicGroupSearchComponent} from "../PublicGroupListComponent/PulbicGroupSearchComponent";
import Loader from "../../Loader/Loader";
import ArrowDownIcon from "../../Icons/ArrowDownIcon/ArrowDownIcon";
import { NavLink } from "react-router-dom";

export const SearchPublicGroups = () => {

    const {
        register,
        watch,
        setValue
    } = useForm();

    const {getGroupsByName, isLoading } = useContext(GroupContext);

    const [groups, setGroups] = useState([]);

    const watchName = watch("groupName");

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (watchName && watchName.length > 2) {
                const fetchGroups = async () => {
                    const actualGroups = await getGroupsByName(watchName);
                    setGroups(actualGroups);
                };
                fetchGroups();
            }
        }, 1000);

        return () => clearTimeout(delayDebounce);
    }, [watchName, watch]);


    return (
        <div className="d-flex justify-content-center flex-column">
            <div className="d-flex justify-content-between w-100 home-container-header align-items-center">
                <div className="d-flex flex-column">
                    <h1 className="mt-3">Groups For You</h1>
                    <NavLink className='event-group-link ps-4' to='/home'>Events <ArrowDownIcon rotate='-90'/></NavLink>
                </div>
                <form action="" className="form-horizontal ms-2 w-25" onSubmit={(e) => e.preventDefault()}>
                    <div className="search-input">
                        <MaGlassIcon/>
                        <input
                            className={`add-page-input form-control`}
                            type="text"
                            placeholder="Search groups"
                            {...register("groupName")}
                        />
                    </div>
                </form>
            </div>
            
            {groups.length > 0 && (
                <>
                    <hr className="divider"/>
                    <div className="user-list-container list-group w-100">
                        <h1>Search Results</h1>
                        {
                            groups.map((group) => (
                                <PublicGroupSearchComponent key={group.id + group.name} group={group}/>
                            ))
                        }
                    </div>
                </>
            )}
        </div>

    )
}