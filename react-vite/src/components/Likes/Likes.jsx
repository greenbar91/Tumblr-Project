import "./Likes.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { getUserLikesThunk, deleteLikeThunk } from "../../redux/like";
import { NavLink } from "react-router-dom";

function Likes() {
  const likes = useSelector((store) => store.likes.likes);
  const dispatch = useDispatch();
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    dispatch(getUserLikesThunk);
  }, [dispatch]);

  const toggleLike = async (postId) => {
    setLikedPosts(likedPosts.filter((id) => id !== postId));
    try {
      await dispatch(deleteLikeThunk(postId));
    } catch (error) {
      console.error("Error deleting like:", error);
    }
  };

  return (
    <div className="center-container">
      <div className="likes-container">
        {likes ? (
          likes.map((like) => (
            <div className="post" key={like.id}>
              <header className="post-header">
                <h3 className="post-username">{like?.username}</h3>
                <div>Follow</div>
              </header>
              <div className={"likes-post-navlink"}>
              <NavLink
                to={`/posts/${like.post?.id}`}
                className={"likes-post-navlink"}
              >
                <h3 className="post-title">{like.post?.title}</h3>
                <p className="post-body">{like.post?.body}</p>
              </NavLink>
              </div>
              <div className="post-stats">
                <span>
                  <FaRegComment className="comment-icon" />{" "}
                  {like.post?.comment_count}
                </span>
                <span onClick={() => toggleLike(like.post?.id)}>
                  {likedPosts.includes(like.post?.id) ? (
                    <FaHeart className="un-liked" />
                  ) : (
                    <FaHeart className="liked" />
                  )}{" "}
                  {like.post?.likes_count}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No liked posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Likes;
