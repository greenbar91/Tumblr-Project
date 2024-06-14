import { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import FollowingFormTile from '../FollowingFormTile'
import "./FollowingForm.css";
import { getFollowsThunk } from "../../redux/follow";
import { followUserThunk } from "../../redux/follow";
// import { selectAllFollowing } from "../../redux/follow";

function FollowingFormPage(){
    const dispatch = useDispatch();
  
    const followingList = useSelector(state => state.followReducer)
    console.log(followingList['following'])
    const [userSearch, setUserSearch] = useState('')
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(true)
    const defaultIcon = 'https://rumblrbucket.s3.us-east-2.amazonaws.com/DefaultIcon.png';

    useEffect(() => {
        setErrors('')
        const getFollowing = async () => await dispatch(getFollowsThunk());
        getFollowing().then(data => console.log(data))
    },[dispatch, setErrors])

    useEffect(() => {
        let newErrors = {...errors}
        delete newErrors['user_not_found']
        delete newErrors['forbidden']
        setErrors(newErrors)

        if(userSearch) setDisabled(false)
        else setDisabled(true)
    }, [userSearch, disabled])

    const followUser = async e => {
        e.preventDefault()

        const res = await dispatch(followUserThunk(userSearch)).then(data => data)

        if(res && res.errors){
            setErrors(res.errors)
        }
        else {
        setUserSearch('')
        setErrors({})
        }
    }

    return (
        <div className="main-content">
        {followingList && followingList.length >= 0 && <h3>{followingList.length === 0 || !followingList.length ? 0 : followingList.length} Following</h3>}
        <form id="followSearch" onSubmit={followUser}>
            <div id="user-search-div">
                <input id='username_input' name="username" type="text" value={userSearch} placeholder="Enter a username to follow" onChange={e => setUserSearch(e.target.value)}></input>
                <button disabled={disabled} id={disabled ? 'disabled' : 'follow-btn'}>Follow</button>
            </div>
            {Object.keys(errors).length > 0 && errors.user_not_found && <p>{errors.user_not_found}</p>}
            {Object.keys(errors).length > 0 && errors.forbidden && <p>{errors.forbidden}</p>}
        </form>
        {followingList &&
            <ul id="following-ul">
                {Object.values(followingList['following']).map(user =>
                    {
                        console.log(user)
                        return (<li key={user.id}>
                            <FollowingFormTile id={user.id} icon={user.profile_pic ? user.profile_pic : defaultIcon} username={user.username} updated='Feature TBD'/>
                        </li>)
                        })}
            </ul>
        }
        </div>
    )
}

export default FollowingFormPage
