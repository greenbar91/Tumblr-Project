import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsByPostIdThunk } from "../../redux/comment";
import "./CommentsPage.css";
import PostComment from "../PostComment";

function CommentsPage({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector(
    (store) => store.comments.comments_by_id?.comments || []
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    dispatch(getCommentsByPostIdThunk(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId); 
  }, []);

  const getTimeAgo = (createdAt) => {
    let commentTime = new Date(createdAt);
    let timeDifference = currentTime - commentTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      if (days < 2) {
        return `${days} day ago`;
      }
      return `${days} days ago`;
    } else if (hours > 0) {
      if (hours < 2) {
        return `${hours} hour ago`;
      }
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      if (minutes < 2) {
        return `${minutes} minute ago`;
      }
      return `${minutes} minutes ago`;
    } else {
      return `${seconds} seconds ago`;
    }
  };

  const adjustCommentTime = (comment) => {
    const commentTime = new Date(comment.created_at);
    const timeDifference = Date.now() - commentTime.getTime();
    const adjustedTime = new Date(Date.now() - timeDifference);
    return {
      ...comment,
      created_at: adjustedTime.toISOString(),
    };
  };

  const sortedComments =
    comments.length > 0
      ? [...comments].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
      : [];

  return (
    <div className="comments-container">
      <PostComment postId={postId} />
      <ul>
        {sortedComments.map((comment) => {
          const adjustedComment = adjustCommentTime(comment);
          return (
            <li key={adjustedComment.id}>
              <div className="comment-header">
                <div className="username">{adjustedComment.username}</div>
                <div className="time">{getTimeAgo(adjustedComment.created_at)}</div>
              </div>
              <div className="comment-body">{adjustedComment.body}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CommentsPage;
