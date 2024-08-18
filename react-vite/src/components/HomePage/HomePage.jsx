import "./HomePage.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLikeThunk, deleteLikeThunk } from "../../redux/like";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostDetailsModel from "../PostDetailsModel";
import AuthFormModal from "../AuthFormModal";
import { getFollowedPostsThunk } from "../../redux/post";
import { formatDistanceToNow } from "date-fns";
import { FaGithub } from "react-icons/fa";

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postState.allPosts);
  const userLikes = useSelector((state) => state.likes.likes);
  const currentUser = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const defaultIcon =
    "https://rumblrbucket.s3.us-east-2.amazonaws.com/DefaultIcon.png";

  useEffect(() => {
    dispatch(getFollowedPostsThunk());
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
    if (!currentUser) {
      return;
    }
    const alreadyLiked = userLikes?.some((like) => like.post_id === postId);
    if (alreadyLiked) {
      await dispatch(deleteLikeThunk(postId));
    } else {
      await dispatch(postLikeThunk(postId));
    }
  };

  return (
    <div className="explore">
      {posts.length === 0 ? (
        <p className="no-posts-home">
          No posts available! Follow other users to see their posts here!
        </p>
      ) : (
        <ul className="post-container grid-item">
          {posts.map((post) => {
            const hasLiked = userLikes?.some(
              (like) => like.post_id === post.id
            );
            const timeAgo = formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
            });

            return (
              <li key={post.id} className="post-item">
                <div id="pi-user">
                  {post.poster && (
                    <img
                      width={50}
                      height={50}
                      src={
                        post.poster.profile_pic
                          ? post.poster.profile_pic
                          : defaultIcon
                      }
                      alt="Profile"
                    />
                  )}
                  <div id="user-info">
                    <div id="username-follow">
                      <h3 className="post-username">
                        {currentUser ? (
                          <OpenModalMenuItem
                            onModalClose={closeMenu}
                            itemText={post.poster?.username}
                            modalComponent={<PostDetailsModel post={post} />}
                          />
                        ) : (
                          <OpenModalMenuItem
                            onModalClose={closeMenu}
                            itemText={post.poster?.username}
                            modalComponent={<AuthFormModal />}
                          />
                        )}
                      </h3>
                    </div>
                    <div className="time-ago">{timeAgo}</div>
                  </div>
                </div>
                <div id="pi-title">
                  <h1>{post?.title}</h1>
                </div>
                <div id="pi-body">
                  <p>{post?.body}</p>
                </div>
                <div className="post-stats">
                  {currentUser && (
                    <span onClick={() => handleLike(post.id)}>
                      {hasLiked ? (
                        <FaHeart className="liked" />
                      ) : (
                        <FaRegHeart className="un-liked" />
                      )}{" "}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div
        className="github-link"
        style={{
          color: "white",
          position: "absolute",
          top: "3rem",
          right: "3rem",
        }}
      >
        <a href="https://github.com/greenbar91/Tumblr-Project">
          <FaGithub style={{ paddingTop: "5px", fontSize: "18px" }}></FaGithub>
          GitHub
        </a>
      </div>
    </div>
  );
}

export default HomePage;
