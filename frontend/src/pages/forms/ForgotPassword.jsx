import "./form.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");

    dispatch(forgotPassword(email));
  };

  return (
    <section className="form-container">
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <h3 className="password">Password assistance</h3>
          <h6 className="form-password-note">
            Please Type your Email, you should receive an Email from us includes
            a link to reset your Password
          </h6>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-password-input"
          />
        </div>
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
