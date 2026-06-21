import axiosInstance from "./axios";

export const updateClinicInfo = async (data) => {
  return axiosInstance.put(
    "/Doctors/UpdateClinicInfo",
    data
  );
};