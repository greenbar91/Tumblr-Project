import "./Explore.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postLikeThunk, deleteLikeThunk } from "../../redux/like";
import { fetchAllPostsThunk } from "../../redux/post";
import { getFollowsThunk } from "../../redux/follow";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import PostDetailsModel from "../PostDetailsModel";
import AuthFormModal from "../AuthFormModal";
import FollowUserButton from "../FollowUser/FollowUser";
import { formatDistanceToNow } from "date-fns";
import { FaGithub } from "react-icons/fa";


const Explore = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postState.allPosts);
  const userLikes = useSelector((state) => state.likes.likes);
  const currentUser = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.followReducer);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const defaultIcon =
    "https://rumblrbucket.s3.us-east-2.amazonaws.com/DefaultIcon.png";

  useEffect(() => {
    dispatch(getFollowsThunk());

    setTimeout(() => {
      dispatch(fetchAllPostsThunk());
    }, 500);
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
      <ul className="post-container grid-item">
        {posts.map((post) => {
          const hasLiked = userLikes?.some((like) => like.post_id === post.id);
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
                    alt={`${post.poster?.username}'s profile`}
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
                    {Object.values(following["following"]).find(
                      (user) => user.id === post.user_id
                    ) === undefined &&
                      currentUser &&
                      currentUser.id !== post.user_id && (
                        <FollowUserButton id={post.user_id} />
                      )}
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
};

export default Explore;
