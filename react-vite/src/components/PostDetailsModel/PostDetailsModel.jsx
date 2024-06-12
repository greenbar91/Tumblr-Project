import "./PostDetailsModel.css";
import CommentsPage from "../CommentsPage";
import { useDispatch, useSelector } from "react-redux";
import { deleteLikeThunk, postLikeThunk } from "../../redux/like";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { fetchPostByIdThunk } from "../../redux/post";

function PostDetailsModel({ post }) {
  const { id, title, body, poster, created_at } = post;
  const dispatch = useDispatch();
  const userLikes = useSelector((state) => state.likes.likes);
  const hasLiked = userLikes?.some((like) => like.post_id === id);

  useEffect(() => {
    dispatch(fetchPostByIdThunk(id));
  }, [dispatch, id]);

  const getTimeAgo = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  const handleLike = async (postId) => {
    const alreadyLiked = userLikes.some((like) => like.post_id === postId);
    if (alreadyLiked) {
      await dispatch(deleteLikeThunk(postId));
    } else {
      await dispatch(postLikeThunk(postId));
    }
  };

  return (
    <div className="post-details">
      <div className="header">
        <div className="poster">{poster}</div>
        <div className="time">{getTimeAgo(created_at)}</div>
      </div>
      <div className="title">{title}</div>
      <div className="body">{body}</div>
      <div className="meta">
        <div className="left">
          <span className="right" onClick={() => handleLike(id)}>
            {hasLiked ? (
              <FaHeart className="liked" />
            ) : (
              <FaRegHeart className="un-liked" />
            )}{" "}
          </span>
        </div>
      </div>
      <CommentsPage postId={id} />
    </div>
  );
}

export default PostDetailsModel;
