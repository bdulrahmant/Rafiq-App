import axiosInstance from "./axios";

export const loginUser = async (loginData) => {
  try {
    console.log("🔐 محاولة تسجيل الدخول مع البيانات:", {
      email: loginData.email,
      role: loginData.role,
    });
    const response = await axiosInstance.post("/Auth/login", loginData);
    console.log("✅ تسجيل الدخول بنجاح");
    return response.data;
  } catch (error) {
    console.error("❌ فشل تسجيل الدخول:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    console.log("👤 محاولة إنشاء حساب مع البيانات:", {
      email: userData.email,
      name: userData.name,
      role: userData.role,
    });
    const response = await axiosInstance.post("/Auth/register", userData);
    console.log("✅ تم إنشاء الحساب بنجاح");
    return response.data;
  } catch (error) {
    console.error("❌ فشل إنشاء الحساب:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};

export const sendOtp = async (email) => {
  const response = await axiosInstance.post("/Auth/send-reset-otp", { email });

  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axiosInstance.post("/Auth/verify-reset-otp", {
    email,
    otp,
  });

  return response.data;
};

export const resetPassword = async (
  email,
  otp,
  newPassword,
  confirmPassword,
) => {
  const response = await axiosInstance.post("/Auth/reset-password", {
    email,
    otp,
    newPassword,
    confirmPassword,
  });

  return response.data;
};
