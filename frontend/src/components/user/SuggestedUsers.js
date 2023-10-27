import React, { useEffect } from "react";
import stl from "./SuggestedUsers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestedUsersAction } from "../../redux/actions/userAction";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const SuggestedUsers = () => {
  const { users } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const getUsers = () => {
    dispatch(getSuggestedUsersAction());
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={stl.container}>
      <h4>Suggestions for you</h4>

      {users.map((u) => {
        return (
          <Link to={`/profile/${u._id}`} key={u._id}>
            <div className={stl.users}>
              {u.profileImg.img_url ? (
                <img src={u.profileImg.img_url} alt="" />
              ) : (
                <Avatar />
              )}
              <span>{u.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
