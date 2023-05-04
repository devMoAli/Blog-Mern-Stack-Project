import "./posts-page.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import PostList from "../../components/posts/PostList";
import Pagination from "../../components/pagination/Pagination";
import Sidebar from "../../components/sidebar/Sidebar";

const POST_PER_PAGE = 4;

const PostsPage = () => {
  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, [dispatch]);
  return (
    <>
      <section className="home">
        <div>
          <div className="home-hero-header">
            <Link
              className="home-link"
              to="https://www.google.com/search?q=weather%20today%20near%20Sharm%20Al%20Shiekh,%20Egypt&ei=uPtBZJ6wL8OJ8gLlo5jwCA&uact=5&oq=weather+sharm+el+sheikh+today&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIKCAAQgAQQRhCAAjIGCAAQFhAeMgYIABAWEB4yCAgAEIoFEIYDMggIABCKBRCGAzIICAAQigUQhgMyCAgAEIoFEIYDMggIABCKBRCGAzoKCAAQRxDWBBCwAzoKCAAQigUQsAMQQzoHCAAQigUQQzoFCAAQgARKBAhBGABQ-B9YtCdgpTVoAXABeACAAVeIAaIDkgEBNpgBAKABAcgBCsABAQ&sclient=gws-wiz-serp&llpgabe=Cg0vZy8xMWhfNHYxYnEz&ved=2ahUKEwiG6KSg_bn-AhWLT8AKHWmID4wQ5ZgEKAB6BAgBEAA"
            >
              {" "}
            </Link>
            <div className="card">
              <div className="container">
                <div className="cloud front">
                  <span className="left-front"></span>
                  <span className="right-front"></span>
                </div>

                <span className="sun sunshine"></span>
                <span className="sun"></span>
                <div className="cloud back">
                  <span className="left-back"></span>
                  <span className="right-back"></span>
                </div>
              </div>

              <div className="card-header">
                <span>
                  Sharm Elsheikh
                  <br />
                  Egypt
                </span>
                <span>May 13</span>
              </div>

              <span className="temp">23°</span>

              <div className="temp-scale">
                <span>Celcius</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-latest-post">Blog Posts</div>
        <div className="home-container">
          <PostList className="post-list" posts={posts} />
          <Sidebar className="sidebar"/>
        </div>
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostsPage;
