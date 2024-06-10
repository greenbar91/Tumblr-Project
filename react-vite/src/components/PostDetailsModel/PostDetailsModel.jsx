import "./PostDetailsModel.css";
import CommentsPage from "../CommentsPage";
import { useDispatch, useSelector } from "react-redux";
import { deleteLikeThunk, postLikeThunk } from "../../redux/like";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchPostByIdThunk } from "../../redux/post";

function PostDetailsModel({ post }) {
  const { id, title, body, poster, created_at } = post;
  const dispatch = useDispatch();
  const userLikes = useSelector((state) => state.likes.likes);
  const hasLiked = userLikes.some((like) => like.post_id === id);
  const currentPost = useSelector((state)=> state.postState.currentPost?.post);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    dispatch(fetchPostByIdThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const getTimeAgo = (createdAt) => {
    let postTime = new Date(createdAt);
    let timeDifference = currentTime - postTime;
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
          <span className="right" onClick={() => handleLike(post.id)}>
            {hasLiked ? (
              <FaHeart className="liked" />
            ) : (
              <FaRegHeart className="un-liked" />
            )}{" "}
          </span>
          <div>Comments: {currentPost?.comment_count}</div>
        </div>
      </div>
      <CommentsPage postId={id} />
    </div>
  );
}

export default PostDetailsModel;
