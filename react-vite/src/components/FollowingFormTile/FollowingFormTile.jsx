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
    // const followingList = useSelector(state => state.follow.following)

    const handleUnfollow = async (e) => {
        e.preventDefault()

        await dispatch(unfollowUserThunk(id))
    }

    return(
        <div className="following_tile">
            <div>
                <img src={icon} alt="icon" width={50} height={50}></img>
            </div>
            <div id='user_updated'>
                <label id='tile-username'>{username}</label>
                <label id='tile-updated'>{updated}</label>
            </div>
            <div className='btn-div'>
                <button id='tile-unfollow-btn' onClick={handleUnfollow}>Unfollow</button>
            </div>
        </div>
    )
}

export default FollowingFormTile;
