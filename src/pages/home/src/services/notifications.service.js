import api from "./api";

export const getNotifications = async () => {

  const response = await api.get(
    "/Doctors/GetNotifications"
  );

  return response.data;
};