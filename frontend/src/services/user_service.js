import apiInstance from "../interceptors";

const userService = {};

userService.getUserDetails = (userId) => {
  return apiInstance.get(`/profile/${userId}`);
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
  });
};
userService.followUnfollowUser = (loggedinUser, targetUser) => {
  return apiInstance.put("/user/follow_unfollow", {
    loggedinUserId: loggedinUser,
    targetUserId: targetUser,
  });
};

userService.getAllUsers = () => {
  return apiInstance.get(`/users`);
};

userService.deleteUser = (userId) => {
  return apiInstance.delete(`/user/${userId}`);
};

userService.createOrUpdateUser = (data) => {
  const hasId = data.id ? true : false;

  return apiInstance[hasId ? "post" : "post"](`/user/create_update`, data);
};

export default userService;
