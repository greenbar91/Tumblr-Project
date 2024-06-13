import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./DeleteComment.css";
import {
  deleteCommentByIdThunk,
  getCommentsByPostIdThunk,
} from "../../redux/comment";
import { FaRegTrashAlt, FaCheck, FaTimes } from "react-icons/fa";

function DeleteComment({ commentId, postId }) {
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const comments = useSelector(
    (state) => state.comments.comments_by_id?.comments
  );

  const commentMarkedForDeletion = comments?.find(
    (comment) => comment.id === commentId
  );

  const handleDelete = () => {
    dispatch(deleteCommentByIdThunk(commentMarkedForDeletion.id));

    setTimeout(() => {
      dispatch(getCommentsByPostIdThunk(postId));
    }, 300);
    setShowConfirmation(false);
  };

  return (
    <div className="delete-comment-container">
      {showConfirmation ? (
        <div className="delete-confirmation">

          <FaCheck onClick={handleDelete} className="confirm-icon" />
          <FaTimes onClick={() => setShowConfirmation(false)} className="cancel-icon" />
        </div>
      ) : (
        <FaRegTrashAlt onClick={() => setShowConfirmation(true)} className="delete-button" />
      )}
    </div>
  );
}

export default DeleteComment;
