import "./notFound.css";
import {Link } from "react-router-dom";
const cat = require("../../images/errorCat.png") ;

const NotFound = () => {
  return (
    <section className="not-found">
      <h2>404</h2>
      <p>Page not found</p>
      <img className="cat" src={cat} alt=""/>
      <Link className="not-found-link" to="/">Go to Home Page</Link>
    </section>
  );
};

export default NotFound;