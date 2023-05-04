import { toast } from "react-toastify";
import { useState } from "react";

const AddCategoryForm = () => {
  const [title, setTitle] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Admin Username is required");

    console.log({ title });
  };

  return (
    <div className="add-admin">
      <h6 className="add-admin-title">Add New Admin</h6>
      <form onSubmit={formSubmitHandler} className="add-admin-form">
        <div className="add-admin-form-group">
          <label htmlFor="title">Admin Username</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            placeholder="Enter Admin Username"
          />
        </div>
        <button type="submit" className="add-admin-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
