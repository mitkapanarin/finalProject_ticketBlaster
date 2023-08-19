// import React, { useState } from "react";
// import "./UpdateUserDetails.css";
// import { useSelector } from "react-redux";
// import { useUpdateUserMutation } from "../../store/API/userApi";
// import { toast } from "react-toastify";
// import ChangePassword from "../ChangePassword/ChangePassword";
// import InputField from "../../Components/Form/InputField";
// import AdminTab from "../../Components/AdminTab/AdminTab";
// import ProfilePictureUpload from "../../Components/Upload/ProfilePictureUpload";

// const UpdateUserDetails = () => {
//   const [updateUser] = useUpdateUserMutation();

//   const { fullName, email, _id } = useSelector((state) => state.User);

//   const [userData, setUserData] = useState({
//     fullName,
//     email,
//     _id,
//   });

//   const handleUserDataChange = (e) => {
//     setUserData({
//       ...userData,
//       [e.target.name]: e.target.value,
//     });
//     console.log(e.target.value);
//   };
//   const handleImageChange = (e) => {
//     setUserData({
//       ...userData,
//       image: e.target.files[0],
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await toast.promise(updateUser(userData), {
//         pending: "Updating User Details...",
//         success: "User Details Updated Successfully!",
//         error: "Error Updating User Details!",
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
// <>
// <AdminTab pageName={"User Details"} />
//     <div className="card-user-details">
//       <form action="" onSubmit={handleSubmit}>
//         <div className="top-user-details">
//           <div className="left-user-details">
//            {/* <ProfilePictureUpload/> */}
//            <InputField
//                   type="file"
//                   name="image"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   label="Profile Image"
//                   required={true}
//                   className="signup-input"
//                 />
//           </div>
//           <div className="right-user-details">
//           <InputField
//               className="inputField"
//               type="text"
//               name="fullName"
//               value={userData?.fullName}
//               onChange={handleUserDataChange}
//               placeholder="Full Name"
//               required={true}
//               label="Full Name"
//             />
//           </div>
//         </div>
//         <div className="bottom-user-details">
//           <div className="left-user-details">
//             <button className="upload-avatar-button-user">Upload Avatar</button>
//           </div>
//           <div className="right-user-details">
//             <InputField
//               className="inputField"
//               type="email"
//               name="email"
//               value={userData?.email}
//               onChange={handleUserDataChange}
//               placeholder="Enter your email"
//               required={true}
//               label="Email"
//             />
//           </div>
//         </div>
//         <div className="sub-section-user-details">
//           <button type="submit" className="submit-button-user">
//             Submit
//           </button>
//         </div>
//       </form>
//       <ChangePassword email={userData.email} />
//     </div>
// </>
//   );
// };

// export default UpdateUserDetails;
