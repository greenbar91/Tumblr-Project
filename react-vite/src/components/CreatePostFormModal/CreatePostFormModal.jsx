import "./CreatePostFormModal.css";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewPost,  getPostsByCurrentUser } from "../../redux/post";

const CreatePostFormModal = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    const errors = {};

    if (!title) {
      errors.title = "Please enter a title";
    }
    if (!body) {
      errors.body = "Please enter the body";
    }

    setValidationErrors(errors);
  }, [title, body]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPostFormData = {
      title,
      body,
      user_id: sessionUser.id,
      created_at: new Date().toISOString(),
    };

    const newPost = await dispatch(createNewPost(newPostFormData));

    if (newPost) {
      await dispatch(getPostsByCurrentUser());
      closeModal();
      setTimeout(() => {
        navigate("/blog");
      }, 500);
    }
  };

  return (
    <div className="create-post-container">
      <p>{sessionUser.username}</p>
      <hr />

      <form onSubmit={handleSubmit} className="create-post-form">
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          name="body"
          placeholder="Go ahead, put anything."
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <div className="button">
          <button type="button" id="cancel-post" onClick={closeModal}>
            Close
          </button>
          <button
            type="submit"
            id="create-post"
            disabled={Object.values(validationErrors).length}
          >
            Post now
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostFormModal;
