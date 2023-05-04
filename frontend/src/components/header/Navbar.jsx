import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav
      style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="navbar"
    >
      <ul className="nav-links">
        <Link onClick={() => setToggle(false)} to="/" className="nav-link">
          <i className="bi bi-house"></i>
          Home
        </Link>
        <Link onClick={() => setToggle(false)} to="/posts" className="nav-link">
          <i className="bi bi-stickies"></i>
          Posts
        </Link>
        {user && (
          <Link
            onClick={() => setToggle(false)}
            to="/posts/create-post"
            className="nav-link"
          >
            <i className="bi bi-journal-plus"></i>
            Create Post
          </Link>
        )}
        {user?.isAdmin && (
          <Link
            onClick={() => setToggle(false)}
            to="/admin-dashboard"
            className="nav-link"
          >
            <i className="bi bi-person-check"></i>
            Admin Dashboard
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
