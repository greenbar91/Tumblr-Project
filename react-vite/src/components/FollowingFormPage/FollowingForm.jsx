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
    const animalIcons = ['https://rumblrbucket.s3.us-east-2.amazonaws.com/black-panther_15109156.png',
    'https://rumblrbucket.s3.us-east-2.amazonaws.com/duck_141831.png',
    'https://rumblrbucket.s3.us-east-2.amazonaws.com/elephant_713996.png',
    'https://rumblrbucket.s3.us-east-2.amazonaws.com/fox_185824.png',
    'https://rumblrbucket.s3.us-east-2.amazonaws.com/hen_141833.png',
    'https://rumblrbucket.s3.us-east-2.amazonaws.com/icons8-owl-64.png',
    'https://rumblrbucket.s3.us-east-2.amazonaws.com/monkey_235911.png',
    'https://rumblrbucket.s3.us-east-2.amazonaws.com/seal_185843.png',
    'https://rumblrbucket.s3.us-east-2.amazonaws.com/squirrel_141700.png'
]

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
    }, [userSearch])

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
                <button>Follow</button>
            </div>
            {Object.keys(errors).length > 0 && errors.user_not_found && <p>{errors.user_not_found}</p>}
            {Object.keys(errors).length > 0 && errors.forbidden && <p>{errors.forbidden}</p>}
        </form>
        {followingList &&
            <ul id="following-ul">
                {Object.values(followingList['following']).map(user =>
                    <li key={user.id}>
                        <FollowingFormTile id={user.id} icon={animalIcons[Math.ceil(Math.random() * 9)]} username={user.username} updated='Feature TBD'/>
                    </li>)}
            </ul>
        }
        </div>
    )
}

export default FollowingFormPage
