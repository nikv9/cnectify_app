import React, { useState } from "react";
import { signupAction } from "../../../redux/auth_store";
import Spinner from "../../../components/Spinner";
import { useDispatch, useSelector } from "react-redux";

const UserDetailIdx = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const mode = queryParams.get("mode");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  const selectProfileImg = (e) => {
    const selectedFile = e.target.files[0];
    // console.log(selectedFile);

    const reader = new FileReader();
    //  console.log(reader);
    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      setProfileImg(reader.result);
    };
  };

  const formValidation = () => {
    return !name || !email || !password;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    dispatch(signupAction(name, email, password, profileImg));
  };

  return (
    <div className="flex-[4]">
      <form className="p-2" onSubmit={signupHandler}>
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
            required
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
          {auth.loading ? (
            <Spinner color="aliceblue" size="1.3rem" />
          ) : (
            "SIGNUP"
          )}
        </button>
      </form>
    </div>
  );
};

export default UserDetailIdx;
