import "./UpdateComment.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsByPostIdThunk, updateCommentByIdThunk } from "../../redux/comment";
import { fetchPostByIdThunk } from "../../redux/post";
import { PiArrowLineRightBold } from "react-icons/pi";

function UpdateComment({ postId, commentId, onCancel }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [commentText, setCommentText] = useState("");
  const [errors, setErrors] = useState(null);
  const comments = useSelector((state) => state.comments.comments_by_id);

  useEffect(() => {
    if (comments && comments[commentId]) {
      setCommentText(comments[commentId].body);
    }
  }, [comments, commentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    const updatedComment = {
      id: commentId,
      user_id: currentUser.id,
      post_id: postId,
      body: commentText,
    };

    const data = await dispatch(updateCommentByIdThunk(commentId, updatedComment));

    if (!data?.message) {
      dispatch(fetchPostByIdThunk(postId));
      onCancel();
      dispatch(getCommentsByPostIdThunk(postId))
    } else {
      setErrors(data.message);
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
              className="submit-update-comment"
              disabled={commentText.length < 1}
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
