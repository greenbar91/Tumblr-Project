import './Explore.css';
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../../redux/post';

const Explore = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postState.allPosts);

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [dispatch]);

    return (
        <div className="explore">
            {/* <h1 style={{ color: 'white' }}>Explore</h1> */}
            <ul className="post-container">
                {posts.map((post) => {
                    return (<li key={post.id} className="post-item" >
                        <h3>{post.poster}</h3>
                        <hr />
                        <h2>{post.title}</h2>
                        <p> {post.body}</p>
                        <div className="post-stats" >
                            <span><FaRegComment /> {post.comment_count}</span>
                            <span><FaRegHeart /> {post.like_count}</span>
                        </div>
                    </li>);
                })}
            </ul>
        </div>
    );

};

export default Explore;
