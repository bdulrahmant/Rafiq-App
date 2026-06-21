import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiMail, FiEyeOff } from "react-icons/fi";

import { loginUser } from "../../services/login.js";

function LoginForm() {

    const location = useLocation();
    const navigate = useNavigate();

    const role =
        location.pathname === "/login-doctor"
        ? "doctor"
        : "user";

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem("token", response.token);

            console.log(response);

            if (role === "doctor") {

                navigate("/doctor");

            } else {

                navigate("/");
            }

        } catch (error) {

            console.log(
                error.response?.data || error
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">

        <div className="text-center space-y-1">

            <h2 className="text-4xl font-bold text-blue-600">
                !يسعدني رؤيتك مجدداً
            </h2>

            <p className="text-gray-500 text-2xl">
                سجل الدخول للمتابعة إلى حسابك
            </p>

        </div>

        {/* role switch */}
        <div className="flex bg-gray-100 p-1 rounded-lg">

            <Link
                to="/login-user"
                className={`flex-1 text-center py-2 rounded-md text-sm ${
                    role === "user"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600"
                }`}
            >
                مستخدم
            </Link>

            <Link
                to="/login-doctor"
                className={`flex-1 text-center py-2 rounded-md text-sm ${
                    role === "doctor"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600"
                }`}
            >
                طبيب
            </Link>

        </div>

        {/* email */}
        <div className="space-y-1 text-right">

            <label className="text-sm text-gray-600 font-bold text-right">
                البريد الالكتروني او رقم الهاتف
            </label>

            <div className="relative">

                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2.5 pl-10 pr-3 text-sm"
                    placeholder="example@email.com"
                />

            </div>

        </div>

        {/* password */}
        <div className="space-y-1 text-right">

            <label className="text-sm text-gray-600 font-bold text-right">
                كلمة المرور
            </label>

            <div className="relative">

                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded-lg py-2.5 pl-10 pr-10 text-sm"
                    placeholder="********"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>

            </div>

        </div>

        <div className="text-right">

            <Link className="text-xs text-blue-500">
                هل نسيت كلمة السر؟
            </Link>

        </div>

        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2.5 rounded-lg text-sm cursor-pointer hover:bg-blue-600"
        >
            تسجيل الدخول
        </button>

        <p className="text-center text-xs text-gray-500">

            ليس لديك حساب؟{" "}

            <Link
                to="/choose-account"
                className="text-blue-500"
            >
                أنشئ حساب الآن
            </Link>

        </p>

        </form>
    );
}

export default LoginForm;