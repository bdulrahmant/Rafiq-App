function AccountCard({ icon, text, startText }) {
    return (
        <div className="bg-white rounded-xl shadow-md p-7 cursor-pointer hover:shadow-lg transition">

        <div className="flex flex-row-reverse items-start justify-between">

            {/* icon */}
            <div className="bg-gray-100 p-3 rounded-lg">
            <img src={icon} alt="icon" className="w-6 h-6" />
            </div>

            {/* text */}
            <div className="text-right flex-1 mr-4 space-y-2">

            <p className="text-gray-600 text-sm leading-relaxed">
                {text}
            </p>

            <div className="flex items-center text-gray-400 text-sm gap-2">
                <span>{startText}</span>
            </div>

            </div>

        </div>

        </div>
    );
    }

export default AccountCard;