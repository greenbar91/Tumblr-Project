import './FollowingFormTile.css'
// import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unfollowUserThunk } from '../../redux/follow';

function FollowingFormTile({
    id,
    icon,
    username,
    updated,
}){
    const dispatch = useDispatch()
console.log(icon)
    // const followingList = useSelector(state => state.follow.following)

    const handleUnfollow = async (e) => {
        e.preventDefault()

        await dispatch(unfollowUserThunk(id)).then(data => console.log(data))
    }

    return(
        <div className="following_tile">
            <div>
                <img src={icon} alt="icon" width={50} height={50}></img>
            </div>
            <div id='user_updated'>
                <label >{username}</label>
                <label>{updated}</label>
            </div>
            <div>
                <button onClick={handleUnfollow}>unfollow</button>
            </div>
        </div>
    )
}

export default FollowingFormTile;