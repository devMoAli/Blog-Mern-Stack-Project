import { Link } from "react-router-dom";
import "./admin.css";
const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <Link to="/admin-dashboard" className="admin-sidebar-title">
        <i className="bi bi-columns"></i>
        Dashboard
      </Link>
      <ul className="admin-sidebar-list">
        <Link to="/admin-dashboard/users-table" className="admin-sidebar-link">
          <i className="bi bi-person-fill person"></i>
          Users
        </Link>
        <Link to="/admin-dashboard/posts-table" className="admin-sidebar-link">
          <i className="bi bi-file-post postIcon"></i>
          Posts
        </Link>
        <Link
          to="/admin-dashboard/categories-table"
          className="admin-sidebar-link"
        >
          <i className="bi bi-tag-fill catIcon"></i>
          Categories
        </Link>
        <Link
          to="/admin-dashboard/comments-table"
          className="admin-sidebar-link"
        >
          <i className="bi bi-chat-left-text-fill commentIcon"></i>
          Comments
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidebar;
