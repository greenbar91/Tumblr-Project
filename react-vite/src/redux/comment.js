import { csrfFetch } from "./csrf";

const GET_ALL_COMMENTS = "comments/getAllComments"
const GET_COMMENTS_BY_POSTID = "comments/getCommentsByPostId";

const getAllComments = (comments) => ({
    type:GET_ALL_COMMENTS,
    payload:comments
})

const getCommentsByPostId = (comments) => ({
  type: GET_COMMENTS_BY_POSTID,
  payload: comments,
});

export const getCommentsByPostIdThunk = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    console.log(data)
    dispatch(getCommentsByPostId(data));
  } else {
    const errors = await res.json();
    return errors
  }
};

export const getAllCommentsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/posts//comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data)
      dispatch(getCommentsByPostId(data));
    } else {
      const errors = await res.json();
      return errors
    }
  };

const initialState = {comments:[]};

function commentReducer(state=initialState, action){
    switch(action.type) {
        case GET_ALL_COMMENTS:
            return {...state, comments: action.payload}
        case GET_COMMENTS_BY_POSTID:
            return {...state, comments_by_id: action.payload}
        default:
            return state
    }
}

export default commentReducer
