import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import "./category.css";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

const Category = ({ categories }) => {
  const dispatch = useDispatch();
  const { postsCategories } = useSelector((state) => state.post);

  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category, dispatch]);

  return (
    <section className="category">
      {postsCategories.length === 0 ? (
        <>
          <div className="categoryNotFound">
            <h1 className="category-not-found">
              Category <span>{category}</span> has no posts yet!
            </h1>
          </div>{" "}
          <div className="categoryNotFoundLink">
            <Link to="/posts" className="category-not-found-link">
              Back to Posts Page
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="category-title">Posts based on {category}</h1>

          <PostList posts={postsCategories} />
        </>
      )}
    </section>
  );
};

export default Category;
