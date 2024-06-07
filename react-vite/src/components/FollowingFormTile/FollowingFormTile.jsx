import './FollowingFormTile.css'

function FollowingFormTile({
    icon,
    username,
    updated,
}){

    return(
        <div className="following_tile">
            <div>
                <img src={icon} alt="icon"></img>
            </div>
            <div id='user_updated'>
                <label >{username}</label>
                <label>{updated}</label>
            </div>
            <div>
                <button>unfollow</button>
            </div>
        </div>
    )
}

export default FollowingFormTile;