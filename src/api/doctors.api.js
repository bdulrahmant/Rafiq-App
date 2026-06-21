import axiosInstance from "./axios";

export const updateClinicInfo = async (data) => {
  return axiosInstance.put("/Doctors/UpdateClinicInfo", data);
};

export const updateDoctorProfile = async (data) => {
  return axiosInstance.put("/Doctors/UpdateProfile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadFile = async (data) => {
  return axiosInstance.post("/Appointments/upload-file", data);
};

export const getAllDoctors = async (search = "") => {
  const response = await axiosInstance.get("/Doctors/allDoctors", {
    params: search ? { search } : {},
  });
  return response.data;
};

export const getDoctorsForListing = async (search = "") => {
  try {
    return await getAllDoctors(search);
  } catch {
    const response = await axiosInstance.get("/Doctors/TopDoctors");
    return response.data;
  }
};

export const getTopDoctors = async () => {
  const response = await axiosInstance.get("/Doctors/TopDoctors");
  return response.data;
};

export const getDoctorDetails = async (id) => {
  const response = await axiosInstance.get(`/Doctors/${id}/details`);
  return response.data;
};

export const getAvailableSlots = async (doctorId, date) => {
  try {
    console.log("🕐 طلب الفترات الزمنية المتاحة...");
    console.table({
      doctorId,
      doctorIdType: typeof doctorId,
      date,
      dateType: typeof date,
      endpoint: `/Doctors/${doctorId}/available-slots?date=${date}`,
    });

    const response = await axiosInstance.get(
      `/Doctors/${doctorId}/available-slots`,
      { params: { date } },
    );
    
    console.log("✅ تم جلب الفترات بنجاح!");
    console.log("📊 عدد الفترات:", response.data?.length || 0);
    console.log("📋 الفترات:", JSON.stringify(response.data, null, 2));
    
    return response.data;
  } catch (error) {
    console.error("❌ فشل جلب الفترات الزمنية!");
    console.error("🔴 رمز الخطأ:", error.response?.status);
    console.error("📋 رسالة الخطأ:", error.response?.data?.message);
    console.error("📊 بيانات الخطأ:");
    console.table({
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.message,
      errorData: JSON.stringify(error.response?.data, null, 2),
      axiosMessage: error.message,
      endpoint: `/Doctors/${doctorId}/available-slots?date=${date}`,
    });
    throw error;
  }
};

export const bookDoctor = async (data, config = {}) => {
  try {
    console.log("📤 طلب حجز الطبيب - البيانات المرسلة:");
    console.log(JSON.stringify(data, null, 2));
    
    console.warn("🔍 فحص القيم:");
    console.table({
      DoctorId_Value: data.DoctorId,
      DoctorId_Type: typeof data.DoctorId,
      SlotId_Value: data.SlotId,
      SlotId_Type: typeof data.SlotId,
      IsValid: data.DoctorId && data.SlotId ? "✅ صحيح" : "❌ ناقص",
      Message: !data.DoctorId ? "DoctorId مفقود" : !data.SlotId ? "SlotId مفقود" : "بيانات صحيحة",
    });
    
    const response = await axiosInstance.post("/Doctors/book", data, config);
    
    console.log("✅ تم حجز الموعد بنجاح");
    console.log("📥 الرد من API:", JSON.stringify(response.data, null, 2));
    
    return response;
  } catch (error) {
    console.error("❌ فشل حجز الموعد");
    console.error("🔴 رمز الخطأ:", error.response?.status);
    console.error("📋 رسالة الخطأ:", error.response?.data?.message);
    console.error("📊 بيانات الخطأ الكاملة:");
    console.table({
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.response?.data?.message,
      errors: error.response?.data?.errors ? JSON.stringify(error.response.data.errors, null, 2) : "لا توجد",
      details: error.response?.data?.details ? JSON.stringify(error.response.data.details, null, 2) : "لا توجد",
    });
    
    // طباعة جميع بيانات الرد الكاملة
    console.error("🔴 رد الخادم الكامل:", error.response?.data);
    
    throw error;
  }
};

// malek 
export const getDoctorProfile = async () => {
  return axiosInstance.get("/Doctors/GetProfile");
};
export const getDoctorHomePageDetails = async () => {
  return axiosInstance.get(
    "/Doctors/GetDoctorHomePageDetails"
  );
};