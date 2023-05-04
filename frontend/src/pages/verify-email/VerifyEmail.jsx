import "./verify-email.css";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token, dispatch]);

  return (
    <section className="verify-email">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check verify-email-icon">
            <h1 className="verify-email-title">
              Your Email Address has been Successfully Verified
            </h1>
            <Link to="/login" className="verify-email-link">
              Please Login to your Account
            </Link>
          </i>
        </>
      ) : (
        <>
          <h1 className="verify-email-not-found">Not Found</h1>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
