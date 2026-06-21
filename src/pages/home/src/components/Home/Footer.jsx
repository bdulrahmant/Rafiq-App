import logo from "../../assets/images/Home/Doctor/img/rafilklogowhite.png";
import location from "../../assets/images/Home/Doctor/icon/location.png";
import mail from "../../assets/images/Home/Doctor/icon/mail.png";
import phone from "../../assets/images/Home/Doctor/icon/call.png";

import { NavLink } from "react-router-dom";

function Footer() {

  const pagesLinks = [
    {
      label: "الرئيسية",
      path: "/doctor",
    },

    {
      label: "تسجيل الدخول",
      path: "/login-doctor",
    },

    {
      label: "المواعيد",
      path: "/doctor/appointments",
    },

    {
      label: "سياسة الخصوصية",
      path: "/doctor/privacy",
    },

    {
      label: "المرضى",
      path: "/doctor/patients",
    },

    {
      label: "الشروط والأحكام",
      path: "/doctor/terms",
    },

    {
      label: "المقالات",
      path: "/doctor/articles",
    },
  ];

  return (
    <footer className="bg-linear-to-b from-[#063b7a] to-[#2c8bd6] text-white">

      {/* top section */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-12
          grid
          gap-10
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          text-center
        "
      >

        {/* contact */}
        <div className="space-y-4 text-center">

          <h3 className="text-xl font-semibold">
            تواصل معنا
          </h3>

          <ul className="space-y-3 text-gray-200">

            <li className="flex justify-center items-center gap-2">

              <img
                src={location}
                className="w-5"
                alt="location"
              />

              مصر - طنطا

            </li>

            <li className="flex justify-center items-center gap-2">

              <img
                src={mail}
                className="w-5"
                alt="mail"
              />

              support@rafiq.com

            </li>

            <li className="flex justify-center items-center gap-2">

              <img
                src={phone}
                className="w-5"
                alt="phone"
              />

              +20 100 000 0000

            </li>

          </ul>

        </div>

        {/* pages */}
        <div className="space-y-4 text-center">

          <h3 className="text-xl font-semibold">
            الصفحات
          </h3>

          <ul
            className="
              grid
              grid-cols-2
              gap-y-3
              text-gray-200
              text-center
            "
          >

            {pagesLinks.map((link, index) => (

              <li key={`${link.path}-${index}`}>

                <NavLink
                  to={link.path}
                  className="
                    hover:text-white
                    transition-all
                    duration-200
                    hover:translate-x-1
                    inline-block
                  "
                >
                  {link.label}
                </NavLink>

              </li>

            ))}

          </ul>

        </div>

        {/* about */}
        <div className="space-y-4 text-center">

          <img
            src={logo}
            alt="rafiq"
            className="w-36 mx-auto"
          />

          <p className="text-sm leading-7 text-white">

            منصة رفيق، شريكك الذكي لإدارة عيادتك.
            نسهل عليك تنظيم مواعيد المرضى بدقة
            واحترافية، ونمنحك مساحة خاصة لنشر
            مقالاتك الطبية ومشاركة خبراتك،
            لتعزيز حضورك الرقمي وبناء جسور
            الثقة مع مرضاك بكل سلاسة.

          </p>

        </div>

      </div>

      {/* divider */}
      <div className="border-t border-white/30"></div>

      {/* copyright */}
      <div className="text-center py-6 text-sm text-gray-200">

        © 2026 منصة رفيق — جميع الحقوق محفوظة

      </div>

    </footer>
  );
}

export default Footer;