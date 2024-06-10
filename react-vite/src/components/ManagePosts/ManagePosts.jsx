import './ManagePosts.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByCurrentUser } from '../../redux/post.js';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

const ManagePosts = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector((state) => state.postState.allPosts);

    useEffect(() => {
        dispatch(getPostsByCurrentUser());
    }, [dispatch]);

    return (
        <div className="blog">
            <ul className="post-container">
                {posts.map((post) => {
                    return (
                        <li key={post.id} className="post-item">
                            <h3>{post.poster}</h3>
                            <hr />
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>

                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ManagePosts;
