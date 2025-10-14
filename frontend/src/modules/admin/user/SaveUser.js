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

const SaveUser = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get("id");
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    };
    dispatch(createOrUpdateUserAction(payload));
  };

  useEffect(() => {
    if (userState.success) {
      if (!userId) {
        toast.success(userState.success);
      } else {
        navigate("/users/admin");
      }
      dispatch(clrUserStateMsg());
    }
  }, [dispatch, userState.success, userId, navigate]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserAction({ userId, isAdmin: "true" }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userState.user) {
      setName(userState.user.name || "");
      setEmail(userState.user.email || "");
      setPassword(""); // keep empty for security, let admin enter new one if needed
      setProfileImg(userState.user.userImg?.imgUrl || null);
    }
  }, [userState.user]);

  return (
    <div className="flex-[4]">
      <p className="text-center my-4 uppercase text-xl font-bold">
        {userId ? "Update" : "Create"} User
      </p>
      <form className="p-20 pt-5" onSubmit={createOrUpdateUserHandler}>
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

        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          name="profileImg"
          accept="image/*"
          onChange={selectProfileImg}
        />
        <label
          className="flex items-center mb-5 bg-gray-200 rounded cursor-pointer py-2.5"
          htmlFor="fileInput"
        >
          <span className="ml-2 text-gray-400">Select profile pic</span>
        </label>
        {profileImg && (
          <span className="text-green-600">
            {profileImg.length > 20
              ? profileImg.slice(0, 20) + "..."
              : profileImg}
          </span>
        )}

        <button
          type="submit"
          disabled={formValidation()}
          className={`py-2 outline-none rouded mt-2 w-full font-bold tracking-wide flex items-center justify-center  ${
            formValidation()
              ? "bg-transparent text-gray-600 cursor-not-allowed border border-gray-600"
              : "primary_bg text-white cursor-pointer"
          }`}
        >
          {authState.loading.signup ? (
            <Spinner color="aliceblue" size="1.3rem" />
          ) : (
            "SUBMIT"
          )}
        </button>
      </form>
    </div>
  );
};

export default SaveUser;
