// import AuthLayout from "../../layouts/Auth.layout";
// import image from "../../assets/images/Auth/chooseaccount.png";
// // import { Link } from "react-router-dom";
// import userIcon from "../../assets/images/Auth/person.png";
// import doctorIcon from "../../assets/images/Auth/doctor.png";

// import AccountCard from "../../components/Auth/Account.card.jsx";

// function ChooseAccountType() {

//     const accounts = [
//         {
//         icon: userIcon,
//         text: "لحجز المواعيد وتشخيص الأعراض والحصول على استشارات طبية متخصصة",
//         startText: "ابدأ كمستخدم"
//         },
//         {
//         icon: doctorIcon,
//         text: "لإدارة مواعيدك وملفك المهني والتواصل مع المرضى بكفاءة",
//         startText: "ابدأ كطبيب"
//         }
//     ];

//     return (
//         <AuthLayout image={image} imageRight={true}>

//         <div className="w-full max-w-md space-y-6 text-right">

//             <h2 className="text-4xl font-bold text-blue-400 leading-relaxed">
//             اختر نوع حسابك للحصول على تجربة مخصصة
//             </h2>

//             {accounts.map((item, index) => (
//             <AccountCard
//                 key={index}
//                 icon={item.icon}
//                 text={item.text}
//                 startText={item.startText}
//             />
//             ))}
//                 <div className="pt-4 flex justify-center">
//                 <button className="bg-blue-400 text-white px-8 py-2.5 rounded-lg hover:bg-blue-500">
//                     متابعة
//                 </button>
//                 </div>

//         </div>

//         </AuthLayout>
//     );
//     }

// export default ChooseAccountType;