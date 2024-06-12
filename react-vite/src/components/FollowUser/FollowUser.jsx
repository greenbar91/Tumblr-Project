import './FollowUser.css'
import { useDispatch } from "react-redux";
import { followUserThunk } from '../../redux/follow';

function FollowUserButton({
    id,
}){
    const dispatch = useDispatch();

    const handleFollow = async (e) => {
        e.preventDefault();

        await dispatch(followUserThunk(id))
    }

    return (
        <div id='followBtn'>
            <a href='' onClick={handleFollow}>Follow</a>
        </div>
    )
}

export default FollowUserButton;