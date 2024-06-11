import { useDispatch, useSelector } from "react-redux";
import "./DeleteComment.css";
import {
  deleteCommentByIdThunk,
  getCommentsByPostIdThunk,
} from "../../redux/comment";

function DeleteComment({ commentId, postId }) {
  const dispatch = useDispatch();

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
    }, 500);
  };

  return (
    <div className="delete-comment-container">
      <div className="delete-confirmation"></div>
      <div>
        <button onClick={() => handleDelete()} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteComment;
