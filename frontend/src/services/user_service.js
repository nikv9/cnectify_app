import apiInstance from "../interceptors";
import Cookies from "js-cookie";

const userService = {};

userService.getUserDetails = async (userId) => {
  return apiInstance.get(`/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};

userService.getFriends = async (userId, userName) => {
  const params = {
    userId: userId,
  };
  if (userName) {
    params.userName = userName;
  }

  return apiInstance.get("/friends", {
    params: params,
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};
userService.followUnfollowUser = async (loggedinUser, targetUser) => {
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

export default userService;
