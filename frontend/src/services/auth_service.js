import apiInstance from "../interceptors";

const authService = {};

authService.login = async (email, password) => {
  // const formData = new FormData();
  // formData.append("email", email);
  // formData.append("password", password);
  return apiInstance.post("/signin", {
    email: email,
    password: password,
  });
};

authService.forgotPass = async (email) => {
  return apiInstance.post("/pass/forgot", {
    email: email,
  });
};
authService.resetPass = async (data) => {
  return apiInstance.put("/pass/reset/" + data.token, data);
};

export default authService;
