import axiosInstance from "./axios";

export const updateMedicalProfile = async (profileData) => {
  const response = await axiosInstance.put(
    "/Appointments/update-medical-profile",

    profileData,
  );

  return response.data;
};

export const getTopDoctors = async () => {
  const response = await axiosInstance.get("/Doctors/TopDoctors");

  return response.data;
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/Appointments/info");

  return response.data;
};

export const updateUserProfile = async (data) => {
  const response = await axiosInstance.put(
    "/Appointments/update-profile",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await axiosInstance.post(
    "/Appointments/change-password",
    passwordData,
  );

  return response.data;
};

export const uploadMedicalFile = async (formData) => {
  const response = await axiosInstance.post(
    "/Appointments/upload-file",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const getPatientFiles = async (fileType) => {
  const response = await axiosInstance.get("/Appointments/my-files", {
    params: fileType ? { fileType } : {},
  });

  return response.data;
};
