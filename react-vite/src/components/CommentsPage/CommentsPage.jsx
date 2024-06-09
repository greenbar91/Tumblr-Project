import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsByPostIdThunk } from "../../redux/comment";
import "./CommentsPage.css";

function CommentsPage({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.comments.comments_by_id?.comments || []);

  useEffect(() => {
    dispatch(getCommentsByPostIdThunk(postId));
  }, [dispatch, postId]);

  const getTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const commentTime = new Date(createdAt);
    const timeDifference = currentTime - commentTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

  const sortedComments = comments.length > 0
    ? [...comments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    : [];

  return (
    <div className="comments-container">
      <ul>
        {sortedComments.map((comment) => (
          <li key={comment.id}>
            <div className="comment-header">
              <div className="username">{comment.username}</div>
              <div className="time">{getTimeAgo(comment.created_at)}</div>
            </div>
            <div className="comment-body">{comment.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsPage;
