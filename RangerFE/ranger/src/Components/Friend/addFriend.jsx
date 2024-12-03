import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {UserContext} from "../../Context/UserContext";
import {FriendContext} from "../../Context/Friend/FriendContext";

export const AddFriend = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const {user} = useContext(UserContext);
    const {addFriend, idByLogin} = useContext(FriendContext);
    const [userNotFoundError, setUserNotFoundError] = useState(false);

    const onSubmit = async (values) => {

        console.log(values);

        const userId = await idByLogin(values.login);
        userId === -1 ? setUserNotFoundError(true) : addFriend(userId);
    };

    if(!user) return <div>Loading...</div>
    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">User Login</label>
            <input type="text" name="login" placeholder="your friend's login" {...register("login", {required: true})} />
            {errors.login && <span className="error">Login is Required</span>}
            {userNotFoundError ? <span className="error">The Login is doesn't exist</span>: null}


            <input type="submit"/>

        </form>
    )
}