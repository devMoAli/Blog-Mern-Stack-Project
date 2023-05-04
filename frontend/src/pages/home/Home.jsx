import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPosts(1));
  }, [dispatch]);

  return (
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

      <div className="home-latest-post">Latest Posts</div>

      <div className="home-container">
        <PostList className="PostList" posts={posts} />
        <Sidebar />
      </div>

      <div className="home-see-posts-link">
        <Link to="/posts" className="home-link">
          See All Posts
        </Link>
      </div>
    </section>
  );
};
export default Home;
