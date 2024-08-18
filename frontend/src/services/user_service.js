import apiInstance from "../interceptors";
import Cookies from "js-cookie";

const userService = {};

userService.getUserDetails = (userId) => {
  return apiInstance.get(`/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};

userService.getFriends = (userId, userName, method) => {
  const params = {
    userId: userId,
  };
  if (userName) {
    params.userName = userName;
  }
  if (method) {
    params.searchMethod = method;
  }

  return apiInstance.get("/users/search", {
    params: params,
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};
userService.followUnfollowUser = (loggedinUser, targetUser) => {
  return apiInstance.put(
    "/user/follow_unfollow",
    {
      loggedinUserId: loggedinUser,
      targetUserId: targetUser,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("tokenId")}`,
      },
    }
  );
};

userService.getAllUsers = () => {
  return apiInstance.get(`/users`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};

userService.deleteUser = (userId) => {
  return apiInstance.delete(`/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};

export default userService;
