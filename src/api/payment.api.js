import axiosInstance from "./axios";

export const updatePaymentInfo = async (data) => {
return axiosInstance.put(
    "/Doctors/UpdatePaymentInfo",
    data
);
};