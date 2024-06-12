import "./UpdateComment.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommentsByPostIdThunk,
  updateCommentByIdThunk,
} from "../../redux/comment";
import { fetchPostByIdThunk } from "../../redux/post";
import { PiArrowLineRightBold } from "react-icons/pi";

function UpdateComment({ postId, comment, onCancel }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [commentText, setCommentText] = useState(comment.body);
  const [errors, setErrors] = useState(null);
  const isCommentEmpty = commentText.trim().length === 0;

  useEffect(() => {
    setCommentText(comment.body);
  }, [comment.body]);

  const handleSubmit = async () => {
    setErrors(null);

    const updatedComment = {
      id: comment.id,
      user_id: currentUser.id,
      post_id: postId,
      body: commentText,
    };

    const data = await dispatch(
      updateCommentByIdThunk(comment.id, updatedComment)
    );

    if (!data?.message) {
      dispatch(fetchPostByIdThunk(postId));
      onCancel();
      dispatch(getCommentsByPostIdThunk(postId));
    } else {
      setErrors(data.message);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (!isCommentEmpty) {
      handleSubmit();
    }
  };

  return (
    <div className="update-comment-container">
      <div className="update-comment-form-container">
        <form className="update-comment-form" onSubmit={handleSubmit}>
          {errors && <p>{errors}</p>}
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="update-comment-textarea"
            placeholder={`Update your comment`}
          />
          <div className="update-comment-buttons">
            <button
              type="submit"
              className={`submit-update-comment ${isCommentEmpty ? 'disabled' : ''}`}
              onClick={handleButtonClick}
            >
              <PiArrowLineRightBold />
            </button>
            <button
              type="button"
              className="cancel-update-comment"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateComment;
