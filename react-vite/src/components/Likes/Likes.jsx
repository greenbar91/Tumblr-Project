import "./Likes.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { getUserLikesThunk } from "../../redux/session";

function Likes() {

  const likes = useSelector((store) => store.session.likes);
  const dispatch = useDispatch();
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    dispatch(getUserLikesThunk);
  }, [dispatch]);

  const toggleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
    
  };

  return (
    <div className="center-container">
      <div className="likes-container">
        {likes ? (
          likes.map((like) => (
            <div key={like.id} className="post">
              <h3 className="post-username">{like.username}</h3>
              <h3>{like.post.title}</h3>
              <p>{like.post.body}</p>
              <div className="post-stats">
                <span>
                  <FaRegComment className="comment-icon" /> {like.post.comment_count}
                </span>
                <span onClick={() => toggleLike(like.post.id)}>
                  {likedPosts.includes(like.post.id) ? (
                    <FaRegHeart className="un-liked" />
                  ) : (
                    <FaRegHeart className="liked" />
                  )}{" "}
                  {like.post.likes_count}
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
