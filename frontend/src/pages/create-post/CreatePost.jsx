import "./create-post.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines } from "react-loader-spinner";

const CreatePost = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories);
  }, [dispatch]);

  return (
    <>
      <section className="create-post">
        <img
          className="cam"
          src="https://res.cloudinary.com/ds4msvjqo/image/upload/v1682386862/cam_bqcgcl.png"
          alt=""
        />

        <h1 className="create-post-title">Create New Post</h1>
        <form onSubmit={formSubmitHandler} className="create-post-form">
          <select
            className="options"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option disabled value="">
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Post Title"
            className="create-post-input"
          />
          <textarea
            className="create-post-textarea"
            placeholder="Post Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          ></textarea>
          <input
            className="create-post-upload"
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit" className="create-post-btn">
            {loading ? (
             <RotatingLines
             strokeColor="white"
             strokeWidth="5"
             animationDuration="0.75"
             width="40"
             height="30"
             visible={true}
           />
            ) : (
              "Post"
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default CreatePost;
