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

export default authService;
