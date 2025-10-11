import apiInstance from "../interceptors";

const authService = {};

authService.signup = async (data) => {
  return apiInstance.post("/signup", data);
};

authService.signin = async (email, password) => {
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
