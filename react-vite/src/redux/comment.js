import { csrfFetch } from "./csrf";

const GET_ALL_COMMENTS = "comments/getAllComments";
const GET_COMMENTS_BY_POSTID = "comments/getCommentsByPostId";
const POST_COMMENT_BY_POSTID = "comments/postCommentById";
const UPDATE_COMMENT = "comments/updateCommentById";
const DELETE_COMMENT = "comments/deleteCommentById";

const getAllComments = (comments) => ({
  type: GET_ALL_COMMENTS,
  payload: comments,
});

const getCommentsByPostId = (comments) => ({
  type: GET_COMMENTS_BY_POSTID,
  payload: comments,
});

const postCommentByPostId = (comment) => ({
  type: POST_COMMENT_BY_POSTID,
  payload: comment,
});

const updateCommentById = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment,
});

const deleteCommentById = (comment) => ({
  type: DELETE_COMMENT,
  payload: comment,
});

export const getCommentsByPostIdThunk = (postId) => async (dispatch) => {
  const res = await fetch(`/api/posts/${postId}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getCommentsByPostId(data));
  } else {
    const errors = await res.json();
    return errors;
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

    dispatch(getAllComments(data));
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const postCommentByPostIdThunk =
  (postId, commentData) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(postCommentByPostId(data.comment));
      return data.comment;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const updateCommentByIdThunk =
  (commentId, commentData) => async (dispatch) => {
    const res = await csrfFetch(`/api/posts/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updateCommentById(data.comment));
      return data.comment;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

export const deleteCommentByIdThunk = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(deleteCommentById(data.comment));
    return data.comment;
  } else {
    const errors = await res.json();
    return errors;
  }
};

const initialState = { comments: [] , comments_by_id: []};

function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return { ...state, comments: action.payload };
    case GET_COMMENTS_BY_POSTID:
      return { ...state, comments_by_id: action.payload };
    case POST_COMMENT_BY_POSTID:
      return { ...state, comments_by_id: [...state.comments, action.payload] };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };
    case DELETE_COMMENT:
      delete [action.payload];
      return{...state}
    default:
      return state;
  }
}

export default commentReducer;
