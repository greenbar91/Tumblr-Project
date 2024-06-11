import { csrfFetch } from './csrf';
// import {createSelector} from 'reselect';

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
        console.log(data)
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
    let follow;
    try{
      follow = await csrfFetch(`/api/following/${data.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    catch(e){
      return await e.json()
    }

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
    await dispatch(unfollowUser(data))
    return data
  }
}

// // Selectors
// const getFollowing = state => state.followReducer
// export const selectAllFollowing = createSelector(getFollowing, data => Object.values(data.following))

const initialState = { following: {} };

function followReducer(state = initialState, action) {
  let newState = {}
  switch (action.type) {
    case GET_ALL_FOLLOWS:
      return { ...state, following: action.payload };

    case FOLLOW_USER:
      newState = {...state}
      newState['following'][action.payload.id] = action.payload
      return newState

    case UNFOLLOW_USER:
      newState = {...state}
      delete newState['following'][action.payload]
      return newState

    default:
      return state;
  }
}

export default followReducer;