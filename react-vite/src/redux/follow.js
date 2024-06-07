import { csrfFetch } from './csrf';

const GET_ALL_FOLLOWS = 'follows/getAllFollows'
const FOLLOW_USER = 'follows/followUser'
const UNFOLLOW_USER = 'follows/unfollowUser'

const getAllFollows = (data) => ({
    type: GET_ALL_FOLLOWS,
    payload: data
})

// const followUser = (follower_id, followed_id) => ({
//     type: FOLLOW_USER,
//     payload: {
//         follower_id,
//         followed_id
//     }
// })

// const unfollowUser = (follower_id, followed_id) => ({
//     type: UNFOLLOW_USER,
//     payload: {
//         follower_id,
//         followed_id
//     }
// })

export const getFollowsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/following/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if(res.ok){
        const data = await res.json()
        await dispatch(getAllFollows(data))
        return data
    }

    else if (res.status < 500) {
        const errorMessages = await res.json();
        return errorMessages
      } 

    else {
        return { server: "Something went wrong. Please try again" }
    }
}

const initialState = { following: null };

function followReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FOLLOWS:
      return { ...state, following: action.payload };
    case FOLLOW_USER:
        // const newState = {...state}
        // newState[]
      return { ...state, following: action.payload };
    case UNFOLLOW_USER:
        return {...state, following: action.payload}
    default:
      return state;
  }
}

export default followReducer;