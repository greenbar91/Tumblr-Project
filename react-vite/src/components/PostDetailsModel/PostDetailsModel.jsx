import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLikeThunk, postLikeThunk } from "../../redux/like";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import "./PostDetailsModel.css";
import CommentsPage from "../CommentsPage/CommentsPage";

function PostDetailsModel({ post }) {
  const { id, title, body, poster, created_at } = post;

  const dispatch = useDispatch();
  const userLikes = useSelector((state) => state.likes.likes);
  const [likesCount, setLikesCount] = useState(0);
  const hasLiked = userLikes?.some((like) => like.post_id === id);

  useEffect(() => {
    const fetchPostDetails = async () => {
      const res = await fetch(`/api/posts/${id}/likes`);
      if (res.ok) {
        const data = await res.json();
        setLikesCount(data.likes_count);
      }
    };
    fetchPostDetails();
  }, [dispatch, id]);

  const getTimeAgo = (createdAt) => {
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  };

  const handleLike = async (postId) => {
    const alreadyLiked = userLikes.some((like) => like.post_id === postId);
    if (alreadyLiked) {
      await dispatch(deleteLikeThunk(postId));
      setLikesCount((prevCount) => prevCount - 1);
    } else {
      await dispatch(postLikeThunk(postId));
      setLikesCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <div className="post-details">
      <div className="header">
        <div className="poster">{poster.username || poster}</div>
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
          <span className="likes-count">
            {" "}
            {likesCount === 1 ? `${likesCount} Like` : `${likesCount} Likes`}
          </span>
        </div>
      </div>
      <CommentsPage postId={id} />
    </div>
  );
}

export default PostDetailsModel;
