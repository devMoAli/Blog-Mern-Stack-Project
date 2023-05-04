import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";
import AddAdminForm from "./AddAdminForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { getUsersCount } from "../../redux/apiCalls/profileApiCall";
import { getPostsCount } from "../../redux/apiCalls/postApiCall";
import { fetchAllComments } from "../../redux/apiCalls/commentApiCall";

const AdminMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { postsCount } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getUsersCount());
    dispatch(getPostsCount());
    dispatch(fetchAllComments());
  }, [dispatch]);

  return (
    <div className="admin-main">
      <div className="admin-main-header">
        <div className="admin-main-card">
          <div className="cardTitle">
            <h5 className="admin-card-title">Users</h5>
            <div className="admin-card-icon">
              <i className="bi bi-person-fill person"></i>
            </div>
          </div>
          <div className="cardBottom">
            <div className="admin-card-count">{usersCount}</div>
            <div className="admin-card-link-wrapper">
              <Link
                to="/admin-dashboard/users-table"
                className="admin-card-link"
              >
                See all users
              </Link>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <div className="cardTitle">
            <h5 className="admin-card-title">Posts</h5>
            <div className="admin-card-icon">
              <i className="bi bi-file-post postIcon"></i>
            </div>
          </div>
          <div className="cardBottom">
            <div className="admin-card-count">{postsCount}</div>
            <div className="admin-card-link-wrapper">
              <Link
                to="/admin-dashboard/posts-table"
                className="admin-card-link"
              >
                See all posts
              </Link>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <div className="cardTitle">
            <h5 className="admin-card-title">Categories</h5>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill catIcon"></i>
            </div>{" "}
          </div>
          <div className="cardBottom">
            {categories.length}
            <div className="admin-card-link-wrapper">
              <Link
                to="/admin-dashboard/categories-table"
                className="admin-card-link"
              >
                See all categories
              </Link>{" "}
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <div className="cardTitle">
            <h5 className="admin-card-title">Comments</h5>
            <div className="admin-card-icon">
              <i className="bi bi-chat-left-text-fill commentIcon"></i>
            </div>{" "}
          </div>
          <div className="cardBottom">
            <div className="admin-card-count">{comments.length}</div>
            <div className="admin-card-link-wrapper">
              <Link
                to="/admin-dashboard/comments-table"
                className="admin-card-link"
              >
                See all comments
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="mainBottom">
        <AddCategoryForm />
        <AddAdminForm />
      </div>
    </div>
  );
};

export default AdminMain;
