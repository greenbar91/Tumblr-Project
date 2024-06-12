import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsByPostIdThunk } from "../../redux/comment";
import { formatDistanceToNow } from "date-fns";
import "./CommentsPage.css";
import PostComment from "../PostComment";
import UpdateComment from "../UpdateComment";
import DeleteComment from "../DeleteComment";
import { FaPencil } from "react-icons/fa6";


function CommentsPage({ postId }) {
  const dispatch = useDispatch();
  const comments = useSelector(
    (state) => state.comments.comments_by_id?.comments || []
  );
  const currentUserId = useSelector((state) => state.session.user?.id);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    const fetchComments = () => {
      dispatch(getCommentsByPostIdThunk(postId));
    };
    fetchComments();
    const interval = setInterval(fetchComments, 60000);
    return () => clearInterval(interval);
  }, [dispatch, postId]);

  const handleEditClick = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const sortedComments =
    comments.length > 0
      ? [...comments].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )
      : [];

  return (
    <div className="comments-container">
      {!editingCommentId && <PostComment postId={postId} />}
      <ul className="comments-list">
        {sortedComments.map((comment) => {
          let timeAgo = "";
          const date = new Date(comment.created_at);
          timeAgo = formatDistanceToNow(date, { addSuffix: true });

          return (
            <li key={comment.id}>
              <div className="comment-header">
                <div className="username">{comment.username}</div>
                <div className="time">{timeAgo}</div>
              </div>
              <div className="comment-body">
                {editingCommentId === comment.id ? (
                  <UpdateComment
                    postId={postId}
                    comment={comment}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <>{comment.body}</>
                )}
              </div>
              <div className="icon-container">
              {!editingCommentId && currentUserId == comment.user_id && (
                <FaPencil onClick={() => handleEditClick(comment.id)}/>

              )}
              {currentUserId == comment.user_id && !editingCommentId && (
                <DeleteComment commentId={comment.id} postId={postId} />
              )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CommentsPage;
