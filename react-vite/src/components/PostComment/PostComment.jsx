import "./PostComment.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentsByPostIdThunk,
  postCommentByPostIdThunk,
} from "../../redux/comment";
import { fetchPostByIdThunk } from "../../redux/post";
import { PiArrowLineRightBold } from "react-icons/pi";

function PostComment({ postId }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [commentText, setCommentText] = useState("");
  const [errors, setErrors] = useState({});
  const isCommentEmpty = commentText.trim().length === 0;

  useEffect(() => {
    dispatch(fetchPostByIdThunk(postId));
  }, [dispatch, postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newComment = {
      user_id: Number(currentUser.id),
      post_id: postId,
      body: commentText,
      created_at: new Date()
    };

    const data = await dispatch(postCommentByPostIdThunk(postId, newComment));

    if (!data?.message) {
      dispatch(fetchPostByIdThunk(postId));
      dispatch(getCommentsByPostIdThunk(postId));
      setCommentText("");
    }

    if (data?.message) {
      setErrors(data);
    }
  };

  return (
    <div className="comment-container">
      <div className="post-comment-container">
        <form className="comment-form" onSubmit={handleSubmit}>
          {errors && <p>{errors.message}</p>}
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-textarea"
            placeholder={`Reply as @${currentUser.username}`}
          />
          <label
            htmlFor="submit-comment"
            className={`submit-comment ${isCommentEmpty ? 'disabled' : ''}`}
            style={{ color: isCommentEmpty ? '#999' : '#000' }}
          >
            <PiArrowLineRightBold id="submit-comment-icon" />
          </label>
          <input
            id="submit-comment"
            type="submit"
            style={{ display: "none" }}
            disabled={isCommentEmpty}
          />
        </form>
      </div>
    </div>
  );
}


export default PostComment;
