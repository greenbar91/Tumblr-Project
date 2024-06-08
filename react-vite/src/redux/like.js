import { csrfFetch } from "./csrf";

const GET_USER_LIKES = "likes/getUserLikes";
const POST_LIKE = "likes/postLike";
const DELETE_LIKE = "likes/deleteLike";

const deleteLike = (postId) => ({
  type: DELETE_LIKE,
  payload: postId,
});

const getUserLikes = (user) => ({
  type: GET_USER_LIKES,
  payload: user,
});

const postLike = (like) => ({
  type: POST_LIKE,
  payload: like,
});

export const getUserLikesThunk = async (dispatch) => {
  const res = await csrfFetch("/api/users/likes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserLikes(data.likes));
    return data;
  }
};

export const postLikeThunk = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(postLike(data.like));
    return data;
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

export const deleteLikeThunk = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    dispatch(deleteLike(postId));
  } else {
    const errorData = await res.json();
    return errorData;
  }
};

const initialState = { likes: null };

function likeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_LIKES:
      return { ...state, likes: action.payload };
    case POST_LIKE:
      return { ...state, likes: [...state.likes, action.payload] };
    case DELETE_LIKE:
      return {
        ...state,
        likes: state.likes.filter((like) => like.post_id !== action.payload),
      };
    default:
      return state;
  }
}

export default likeReducer;
