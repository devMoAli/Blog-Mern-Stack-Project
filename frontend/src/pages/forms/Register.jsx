import "./form.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

const Register = () => {
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const avatar = require("../../images/avatar.png");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(registerUser({ username, email, password }));
  };

  const navigate = useNavigate();

  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: "success",
    }).then((isOk) => {
      if (isOk) {
        // take User to Login Page
        navigate("/login");
      }
    });
  }

  return (
    <section className="form-container">
      <div className="form-container">
        <form onSubmit={formSubmitHandler} className="form">
          <img className="formAvatar" src={avatar} alt="" />
          <p className="regTitle">Register </p>
          <p className="message">Sign up now and get full access to our app </p>

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                id="username"
                placeholder=""
                className="form-input"
              />
              <span value="username">Username</span>
            </label>

            <label htmlFor="email" className="form-label">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                placeholder=""
                className="form-input"
              />
              <span value="email">Email</span>
            </label>

            <label htmlFor="password" className="form-label">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                placeholder=""
                className="form-input"
              />
              <span value="password">Password</span>
            </label>
          </div>
          <button type="submit" className="form-btn">
            Register
          </button>

          <div className="signin">
            Already have an account?{" "}
            <Link className="login" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
