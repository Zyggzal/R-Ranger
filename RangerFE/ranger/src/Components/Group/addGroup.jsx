import {useForm} from "react-hook-form";
import {useContext} from "react";
import {UserContext} from "../../Context/UserContext";
import {GroupContext} from "../../Context/Group/GroupContext";

export const AddGroup = () => {
    const {register, handleSubmit, /*watch,*/ formState: {errors}} = useForm();

    const {user} = useContext(UserContext);
    const {addGroup} = useContext(GroupContext);

    //const [group, setGroup] = useState({});

    const onSubmit = (values) => {

        const newGroup = {...values, createdBy: user.id};

        //setGroup(newGroup);
        addGroup(newGroup);
    };

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Group Name</label>
            <input type="text" name="name" placeholder="Group Name" {...register("name", {required: true})} />
            {errors.name && <span className="error">Name is Required</span>}
            <select name="isPulbic" {...register("isPublic")}>
                <option value={1}>Public</option>
                <option value={0}>Private</option>
            </select>

            <input type="submit"/>

        </form>
    )
}