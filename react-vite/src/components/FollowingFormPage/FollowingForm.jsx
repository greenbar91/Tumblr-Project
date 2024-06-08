import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
import FollowingFormTile from '../FollowingFormTile'
import "./FollowingForm.css";
import { getFollowsThunk } from "../../redux/follow";
import { followUserThunk } from "../../redux/follow";

function FollowingFormPage(){
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const followingList = useSelector((state) => state.follow.following, );
    const [userSearch, setUserSearch] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setUserSearch('')
        // setErrors({})
        const getFollowing = async () => await dispatch(getFollowsThunk());
        getFollowing().then(data => console.log(data))
    },[dispatch])

    const followUser = async e => {
        e.preventDefault()

        const res = await dispatch(followUserThunk(userSearch)).then(data => data)

        if(res && res.errors){
            setErrors(res.errors)
        }
    }

    return (
        <div className="main-content">
        {followingList && followingList.length >= 0 && <h3>{followingList.length === 0 || !followingList.length ? 0 : followingList.length} Following</h3>}
        <form id="followSearch" onSubmit={followUser}>
            <div id="user-search-div">
                <input id='username_input' name="username" type="text" value={userSearch} placeholder="Enter a username to follow" onChange={e => setUserSearch(e.target.value)}></input>
                <button>Follow</button>
            </div>
            {errors.length && errors.user_not_found && <p>{errors.user_not_found}</p>}
        </form>
        {followingList && followingList &&
            <ul id="following-ul">
                {followingList.map(user => 
                    <li key={user.id}>
                        <FollowingFormTile id={user.id} icon='' username={user.username} updated='Feature TBD'/>
                    </li>)}
            </ul>
        }
        </div>
    )
}

export default FollowingFormPage