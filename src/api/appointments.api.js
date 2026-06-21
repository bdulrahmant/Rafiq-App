import axiosInstance from "./axios";

export const getMyAppointments = async () => {
  const response = await axiosInstance.get("/Appointments/patient-bookings");
  return response.data;
};

export const getAppointments = getMyAppointments;

// export const getPatientBookings = async (status) => {
//   const response = await axiosInstance.get("/Appointments/patient-bookings", {
//     params: status ? { status } : {},
//   });
//   return response.data || [];

//   // Local fallback filter if backend ignores the status param
//   if (
//     status &&
//     data.length > 0 &&
//     data.some(
//       (b) => b.status && b.status.toLowerCase() !== status.toLowerCase(),
//     )
//   ) {
//     data = data.filter(
//       (b) => b.status && b.status.toLowerCase() === status.toLowerCase(),
//     );
//   }

//   return data;
// };

export const getPatientBookings = async (status) => {
  const response = await axiosInstance.get("/Appointments/patient-bookings", {
    params: status ? { status } : {},
  });

  let data = response.data || [];

  // Local fallback filter if backend ignores the status param
  if (
    status &&
    data.length > 0 &&
    data.some(
      (b) => b.status && b.status.toLowerCase() !== status.toLowerCase()
    )
  ) {
    data = data.filter(
      (b) => b.status && b.status.toLowerCase() === status.toLowerCase()
    );
  }

  return data;
};

export const getAppointmentDetails = async (appointmentId) => {
  const response = await axiosInstance.get(
    `/Appointments/details/${appointmentId}`,
  );
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await axiosInstance.put(`/Appointments/${id}/cancel`);
  return response.data;
};

export const updateBooking = async (data) => {
  const response = await axiosInstance.put("/Appointments/Update-book", data);
  return response.data;
};
