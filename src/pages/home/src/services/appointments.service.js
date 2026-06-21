import api from "./api";

export const getDoctorAppointments = async () => {

  const response = await api.get(
    "/Appointments/my-appointments"
  );

  return response.data;
};
export const createAvailability = async (
  availabilityData
) => {

  const response = await api.post(
    "/Availability",
    availabilityData
  );

  return response.data;
};
export const getAvailability = async (
  date
) => {

  const response = await api.get(
    `/Availability?date=${date}`
  );

  return response.data;
};