import "./profile.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { ProgressBar } from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../../redux/apiCalls/profileApiCall";
import PostItem from "../../components/posts/PostItem";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);

  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const navigate = useNavigate();
  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadProfilePhoto(formData));
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };

  if (loading) {
    <div className="profile-loader">
      <ProgressBar
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#F4442E"
        barColor="#51E5FF"
      />
    </div>;
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            className="profile-image"
          />
          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button type="submit" className="upload-profile-photo-btn">
                Upload
              </button>
            </form>
          )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Since </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>

        {user?._id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            <i className="bi bi-file-person-fill userDetails"></i>
            User Details
          </button>
        )}
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        {profile?.posts?.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            username={profile?.username}
            userId={profile?._id}
          />
        ))}
      </div>

      {user?._id === profile?._id && (
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          Delete Your Account
        </button>
      )}

      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
};

export default Profile;
