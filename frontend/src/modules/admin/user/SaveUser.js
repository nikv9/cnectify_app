import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  clrUserStateMsg,
  createOrUpdateUserAction,
  getUserAction,
} from "../../../redux/user_store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import defaultUserImg from "../../../assets/imgs/avatar.jpg";

const SaveUser = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get("id");
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNotAdmin = window.location.pathname.includes("profile");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  const selectProfileImg = (e) => {
    const selectedFile = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      setProfileImg(reader.result);
    };
  };

  const formValidation = () => {
    if (!userId) {
      return !name || !email || !password;
    }
    return !name || !email;
  };

  const createOrUpdateUserHandler = (e) => {
    e.preventDefault();
    const payload = {
      id: userId,
      name,
      email,
      password,
      profileImg,
      isNotAdmin,
    };
    dispatch(createOrUpdateUserAction(payload));
  };

  useEffect(() => {
    if (userState.success) {
      if (!userId) {
        toast.success(userState.success);
      } else if (isNotAdmin) {
        toast.success(userState.success);
        navigate(`/profile/${userId}`);
      } else {
        navigate("/users/admin");
      }
      dispatch(clrUserStateMsg());
    }
  }, [dispatch, userState.success, userId, navigate]);

  useEffect(() => {
    if (userId) {
      dispatch(
        getUserAction({
          userId,
          isAdmin: isNotAdmin ? "false" : "true",
        })
      );
    }
  }, [dispatch, userId]);

  useEffect(() => {
    console.log(userState.user);
    if (userState.user) {
      setName(userState.user.name || "");
      setEmail(userState.user.email || "");
      setPassword(""); // keep empty for security
      setProfileImg(userState.user.profileImg?.imgUrl || null);
    }
  }, [userState.user]);

  return (
    <div className="flex-[4]">
      <div className="w-[50%] mx-auto">
        <p className="text-center my-4 uppercase text-xl font-bold">
          {userId ? "Update" : "Create"} {isNotAdmin ? "Profile" : "User"}
        </p>
        <form className="" onSubmit={createOrUpdateUserHandler}>
          <div className="flex justify-center mb-5">
            <div className="relative w-fit">
              <img
                src={profileImg || defaultUserImg}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />

              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                name="profileImg"
                accept="image/*"
                onChange={selectProfileImg}
              />

              <label
                htmlFor="fileInput"
                className="absolute bottom-0 right-0 bg-gray-700 hover:bg-gray-800 p-1.5 rounded-full cursor-pointer shadow-md"
                title="Change profile picture"
              >
                <PhotoCameraIcon
                  style={{ color: "white", fontSize: "1.2rem" }}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center mb-5 bg-gray-200 rounded">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-5 bg-gray-200 rounded">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center mb-5 bg-gray-200 rounded">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2.5 w-full border-none outline-none text-gray-700 bg-gray-200"
              required={!userId}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={formValidation()}
            className={`py-2 outline-none rouded mt-2 w-full font-bold tracking-wide flex items-center justify-center  ${
              formValidation()
                ? "bg-transparent text-gray-600 cursor-not-allowed border border-gray-600"
                : "primary_bg text-white cursor-pointer"
            }`}
          >
            {userState.loading.createOrUpdate ? (
              <Spinner color="aliceblue" size="1.3rem" />
            ) : (
              "SUBMIT"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SaveUser;
