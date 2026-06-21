import { useNavigate } from "react-router-dom";

import label from '../../assets/images/Home/Doctor/icon/Label.png';
import search from '../../assets/images/Home/Doctor/icon/search.png';
import frame from '../../assets/images/Home/Doctor/icon/frame.png';
import bell from '../../assets/images/Home/Doctor/icon/bell.png';
import logo from '../../assets/images/Home/Doctor/img/rafiklogo.png';

function Navbar() {
    const navigate = useNavigate();

    return (
        <header className="w-full bg-white px-8 py-4 flex items-center justify-between">

            {/* LEFT : profile + notification */}
            <div className="flex items-center gap-4">

                {/* Profile */}
                <img
                    src={frame}
                    alt="profile"
                    className="
                        w-10 h-10 rounded-full object-cover
                        cursor-pointer
                        hover:scale-110
                        transition
                    "
                    onClick={() =>
                        navigate("/doctor/profile")
                    }
                />

                {/* Notification */}
                <img
                    src={bell}
                    alt="bell"
                    className="
                        w-7 cursor-pointer
                        hover:scale-110
                        transition
                    "
                    onClick={() =>
                        navigate("/doctor/settings/notifications")
                    }
                />

            </div>

            {/* CENTER : search */}
            <div className="relative w-96">

                <input
                    type="text"
                    placeholder="البحث عن مريض"
                    className="
                        w-full
                        border-2
                        rounded-2xl
                        border-blue-600
                        text-blue-600
                        py-2
                        pr-12
                        pl-4
                        text-right
                        focus:outline-none
                    "
                />

                <img
                    src={search}
                    alt="search"
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        w-6
                    "
                />

            </div>

            {/* RIGHT : location + logo */}
            <div className="flex items-center gap-6">

                <img
                    src={label}
                    alt="location"
                    className="h-8"
                />

                <img
                    src={logo}
                    alt="rafiq"
                    className="h-10"
                />

            </div>

        </header>
    );
}

export default Navbar;