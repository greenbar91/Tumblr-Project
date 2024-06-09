import "./Explore.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { useEffect, useState , useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLikeThunk, deleteLikeThunk } from "../../redux/like";
import { fetchAllPostsThunk } from "../../redux/post";
import {getCommentsByPostIdThunk } from "../../redux/comment";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostDetailsModel from "../PostDetailsModel";

const Explore = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postState.allPosts);
  const userLikes = useSelector((state) => state.likes.likes);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    dispatch(fetchAllPostsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleLike = async (postId) => {
    const alreadyLiked = userLikes.some((like) => like.post_id === postId);
    if (alreadyLiked) {
      await dispatch(deleteLikeThunk(postId));
    } else {
      await dispatch(postLikeThunk(postId));
    }
  };

  const handleCommentClick = async (postId) => {
    if (selectedPostId === postId) {
      // If the same post is clicked again, clear the selectedPostId
      setSelectedPostId(null);
    } else {
      setSelectedPostId(postId);
      // Dispatch action to fetch comments by postId
      await dispatch(getCommentsByPostIdThunk(postId));
    }
  };

  return (
    <div className="explore">
      <ul className="post-container">
        {posts.map((post) => {
          const hasLiked = userLikes.some((like) => like.post_id === post.id);
          return (
            <li key={post.id} className="post-item">
              <h3 className="post-username"><OpenModalMenuItem onModalClose={closeMenu} itemText={post.poster} modalComponent={<PostDetailsModel post={post}/>}/></h3>
              <hr />
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <div className="post-stats">
                <span>
                  <FaRegComment
                    onClick={() => handleCommentClick(post.id)}
                    className={selectedPostId === post.id ? "active" : ""}
                  />
                  {post.comment_count}
                </span>
                <span onClick={() => handleLike(post.id)}>
                  {hasLiked ? (
                    <FaHeart className="liked" />
                  ) : (
                    <FaRegHeart className="un-liked" />
                  )}{" "}
                  {post.like_count}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Explore;
