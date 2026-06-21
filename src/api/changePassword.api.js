import axiosInstance from "./axios.js";

export const changePassword = async (data) => {
  return axiosInstance.post(
    "/Doctors/ChangePassword",
    data
  );
};