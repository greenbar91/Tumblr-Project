import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
import FollowingFormTile from '../FollowingFormTile'
import "./FollowingForm.css";
import { getFollowsThunk } from "../../redux/follow";

function FollowingFormPage(){
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const followingList = useSelector((state) => state.follow.following);
    const [userSearch, setUserSearch] = useState('')
console.log(followingList)
    useEffect(() => {
        const getFollowing = async () => await dispatch(getFollowsThunk());
        getFollowing().then(data => console.log(data))
    },[dispatch])

    return (
        <div className="main-content">
        {followingList && <h1>{followingList['Following'].length} Following</h1>}
        <form id="followSearch">
            <div>
                <input type="text" value={userSearch} placeholder="Seach for user" onChange={e => setUserSearch(e.target.value)}></input>
            </div>
        </form>
        {followingList && 
            <ul id="following-ul">
                {followingList['Following'].map(user => 
                    <li key={user.id}>
                        <FollowingFormTile icon='' username={user.username} updated='Coming soon...'/>
                    </li>)}
            </ul>
        }
        </div>
    )
}

export default FollowingFormPage