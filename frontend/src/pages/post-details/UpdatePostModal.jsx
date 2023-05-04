import "./updatePostModal.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  const [file, setFile] = useState(null);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };

  useEffect(() => {
    dispatch(fetchCategories);
  }, [dispatch]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("No file selected to be uploaded!");
    console.log("image uploaded successfully");
  };

  return (
    <div className="updatePost">
      <form onSubmit={formSubmitHandler} className="updatePostForm">
        <abbr title="close">
          <i
            onClick={() => setUpdatePost(false)}
            className="bi bi-x-square-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="updatePostHead">Update Post</h1>

        <label htmlFor="postTitleInput" className="update-post-title">
          Post Title
        </label>

        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Post Title"
          className="postTitleInput"
        />
        <label htmlFor="postCategory" className="update-post-category">
          Post Category
        </label>

        <select
          className="postCategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <label htmlFor="post-description" className="descriptionInput">
          Post Description
        </label>
        <textarea
          className="post-description"
          placeholder="Post Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"
        ></textarea>

        <div
          onSubmit={updateImageSubmitHandler}
          className="update-post-image-form"
        >
          <label htmlFor="post-thumbnail" className="uploadImage">
            <i className="bi bi-image-fill image-upload"></i>Upload Image
          </label>
          <input
            className="post-thumbnail"
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="update-post-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
