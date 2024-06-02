import apiInstance from "../interceptors";
import Cookies from "js-cookie";

const profileService = {};

profileService.getProfile = async (userId) => {
  return apiInstance.get(`/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("tokenId")}`,
    },
  });
};

export default profileService;
