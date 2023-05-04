import "./sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const Sidebar = () => {
const dispatch = useDispatch();
const { categories } = useSelector(state => state.category);

useEffect(() => {
  dispatch(fetchCategories());
}, [dispatch])

  return (
    <div className="sidebar">
      <h5 className="sidebarTitle">CATEGORIES</h5>

      <ul className="sidebar-categories">
        {categories.map((category) => (
          <Link
            to={`/posts/categories/${category.title}`}
            key={category._id}
            className="sidebar-link"
          >
            <div className="categories">
              <img className="category-img" src={category?.image.url}alt="" />

              <div className="categories-list">
                <div className="category-list">
                  <p className="category-list-title">{category.title}</p>
                </div>

                <div className="category-list">
                  <p className="category-list-desc">{category.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
