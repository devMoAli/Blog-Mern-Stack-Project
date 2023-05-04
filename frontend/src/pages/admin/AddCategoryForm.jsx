import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import "./admin.css";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const { loading, isCategoryCreated } = useSelector((state) => state.category);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category Title is required");
    if (description.trim() === "")
      return toast.error("Category Description is required");
    if (!file) return toast.error("Category Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);

    dispatch(createCategory(formData));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isCategoryCreated) {
      navigate("/");
    }
  }, [isCategoryCreated, navigate]);

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandler} className="add-category-form">
        <div className="add-category-form-group">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            value={title}
            className="create-post-input"
            placeholder="Category Title"
          />

          <textarea
            className="create-post-textarea"
            placeholder="Category Description"
            value={description}
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          ></textarea>

          <input
            className="create-post-upload"
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="add-category-btn">
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
            "Add"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
