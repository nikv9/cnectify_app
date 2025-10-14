import apiInstance from "../interceptors";

const userService = {};

userService.getUser = (data) => {
  console.log(data);
  const params = {};
  if (data?.isAdmin) params.isAdmin = data.isAdmin;

  return apiInstance.get(`/user${data?.userId ? `/${data.userId}` : ""}`, {
    params,
  });
};

userService.getUsers = (data) => {
  const params = {};
  if (data?.isAdmin) {
    if (data?.userName) params.userName = data.userName;
    if (data?.sortType) params.sort = data.sortType;
    if (data?.currentPage) params.page = data.currentPage;
    if (data?.perPage) params.limit = data.perPage;
  } else {
    if (data?.userId) params.userId = data.userId;
    if (data?.userName) params.userName = data.userName;
    if (data?.searchType) params.searchType = data.searchType;
  }
  console.log(data);

  return apiInstance.get("/users", { params });
};

userService.followUnfollowUser = (loggedinUser, targetUser) => {
  return apiInstance.put("/user/follow_unfollow", {
    loggedinUserId: loggedinUser,
    targetUserId: targetUser,
  });
};

userService.deleteUser = (userId) => {
  return apiInstance.delete(`/user/${userId}`);
};

userService.createOrUpdateUser = (data) => {
  const hasId = data.id ? true : false;

  return apiInstance[hasId ? "post" : "post"](`/user/create_update`, data);
};

export default userService;
