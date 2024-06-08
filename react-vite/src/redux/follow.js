import { csrfFetch } from './csrf';

const GET_ALL_FOLLOWS = 'follows/getAllFollows'
const FOLLOW_USER = 'follows/followUser'
const UNFOLLOW_USER = 'follows/unfollowUser'

const getAllFollows = (data) => ({
    type: GET_ALL_FOLLOWS,
    payload: data
})

const followUser = (followed_user) => ({
    type: FOLLOW_USER,
    payload: followed_user
})

const unfollowUser = (followed_id) => ({
    type: UNFOLLOW_USER,
    payload: followed_id
})

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

export const followUserThunk = (username) => async (dispatch) => {
  let user
  try {
      user = await csrfFetch(`/api/users/${username}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  catch(e){
    return await e.json()
  }

  if(user.ok){
    const data = await user.json()
    const follow = await csrfFetch(`/api/following/${data.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(follow.ok){
      const followData = await follow.json()
      await dispatch(followUser(data))
      return followData
    }
    else return {'error': 'Something went wrong :('}
  }

  else return user
}

export const unfollowUserThunk = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/following/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if(res.ok){
    const data = await res.json()
    await dispatch(unfollowUser)
    return data
  }
}

const initialState = { following: null };

function followReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FOLLOWS:
      return { ...state, following: action.payload };

    case FOLLOW_USER:
      return {...state, following: action.payload.followed_user }

    case UNFOLLOW_USER:
      let newState = {}
      for(let user in state['following']){
        newState[user.id] = user
      }
      delete newState[action.payload]

      return {following: Object.values(newState)}

    default:
      return state;
  }
}

export default followReducer;