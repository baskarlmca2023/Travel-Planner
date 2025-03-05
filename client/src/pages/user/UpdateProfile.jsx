// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   updatePassStart,
//   updatePassSuccess,
//   updatePassFailure,
// } from "../../redux/user/userSlice";

// const UpdateProfile = () => {
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [updateProfileDetailsPanel, setUpdateProfileDetailsPanel] =
//     useState(true);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     address: "",
//     phone: "",
//     avatar: "",
//   });
//   const [updatePassword, setUpdatePassword] = useState({
//     oldpassword: "",
//     newpassword: "",
//   });

//   useEffect(() => {
//     if (currentUser !== null) {
//       setFormData({
//         username: currentUser.username,
//         email: currentUser.email,
//         address: currentUser.address,
//         phone: currentUser.phone,
//         avatar: currentUser.avatar,
//       });
//     }
//   }, [currentUser]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handlePass = (e) => {
//     setUpdatePassword({
//       ...updatePassword,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const updateUserDetails = async (e) => {
//     e.preventDefault();
//     if (
//       currentUser.username === formData.username &&
//       currentUser.email === formData.email &&
//       currentUser.address === formData.address &&
//       currentUser.phone === formData.phone
//     ) {
//       alert("Change atleast 1 field to update details");
//       return;
//     }
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false && res.status !== 201 && res.status !== 200) {
//         dispatch(updateUserSuccess());
//         dispatch(updateUserFailure(data?.messsage));
//         alert("Session Ended! Please login again");
//         navigate("/login");
//         return;
//       }
//       if (data.success && res.status === 201) {
//         alert(data?.message);
//         dispatch(updateUserSuccess(data?.user));
//         return;
//       }
//       alert(data?.message);
//       return;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateUserPassword = async (e) => {
//     e.preventDefault();
//     if (
//       updatePassword.oldpassword === "" ||
//       updatePassword.newpassword === ""
//     ) {
//       alert("Enter a valid password");
//       return;
//     }
//     if (updatePassword.oldpassword === updatePassword.newpassword) {
//       alert("New password can't be same!");
//       return;
//     }
//     try {
//       dispatch(updatePassStart());
//       const res = await fetch(`/api/user/update-password/${currentUser._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatePassword),
//       });
//       const data = await res.json();
//       if (data.success === false && res.status !== 201 && res.status !== 200) {
//         dispatch(updateUserSuccess());
//         dispatch(updatePassFailure(data?.message));
//         alert("Session Ended! Please login again");
//         navigate("/login");
//         return;
//       }
//       dispatch(updatePassSuccess());
//       alert(data?.message);
//       setUpdatePassword({
//         oldpassword: "",
//         newpassword: "",
//       });
//       return;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div
//       className={`updateProfile w-full p-3 m-1 transition-all duration-300 flex justify-center`}
//     >
//       {updateProfileDetailsPanel === true ? (
//         <div className="flex flex-col border self-center border-black rounded-lg p-2 w-72 h-fit gap-2 sm:w-[320px]">
//           <h1 className="text-2xl text-center font-semibold">Update Profile</h1>
//           <div className="flex flex-col">
//             <label htmlFor="username" className="font-semibold">
//               Username:
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="p-1 rounded border border-black"
//               value={formData.username}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="email" className="font-semibold">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="p-1 rounded border border-black"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="address" className="font-semibold">
//               Address:
//             </label>
//             <textarea
//               maxLength={200}
//               type="text"
//               id="address"
//               className="p-1 rounded border border-black resize-none"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="phone" className="font-semibold">
//               Phone:
//             </label>
//             <input
//               type="text"
//               id="phone"
//               className="p-1 rounded border border-black"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </div>
//           <button
//             disabled={loading}
//             onClick={updateUserDetails}
//             className="p-2 text-white bg-slate-700 rounded hover:opacity-95"
//           >
//             {loading ? "Loading..." : "Update"}
//           </button>
//           <button
//             disabled={loading}
//             type="button"
//             onClick={() => setUpdateProfileDetailsPanel(false)}
//             className="p-2 text-white bg-red-700 rounded hover:opacity-95"
//           >
//             {loading ? "Loading..." : "Change Password"}
//           </button>
//         </div>
//       ) : (
//         <div className="flex flex-col border border-black rounded-lg p-2 w-72 h-fit gap-2 sm:w-[320px]">
//           <h1 className="text-2xl text-center font-semibold">
//             Change Password
//           </h1>
//           <div className="flex flex-col">
//             <label htmlFor="username" className="font-semibold">
//               Enter old password:
//             </label>
//             <input
//               type="text"
//               id="oldpassword"
//               className="p-1 rounded border border-black"
//               value={updatePassword.oldpassword}
//               onChange={handlePass}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="username" className="font-semibold">
//               Enter new password:
//             </label>
//             <input
//               type="text"
//               id="newpassword"
//               className="p-1 rounded border border-black"
//               value={updatePassword.newpassword}
//               onChange={handlePass}
//             />
//           </div>
//           <button
//             disabled={loading}
//             onClick={updateUserPassword}
//             className="p-2 text-white bg-slate-700 rounded hover:opacity-95"
//           >
//             {loading ? "Loading..." : "Update Password"}
//           </button>
//           <button
//             disabled={loading}
//             onClick={() => {
//               setUpdateProfileDetailsPanel(true);
//               setUpdatePassword({
//                 oldpassword: "",
//                 newpassword: "",
//               });
//             }}
//             type="button"
//             className="p-2 text-white bg-red-700 rounded hover:opacity-95 w-24"
//           >
//             {loading ? "Loading..." : "Back"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateProfile;





import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updatePassStart,
  updatePassSuccess,
  updatePassFailure,
} from "../../redux/user/userSlice";

const UpdateProfile = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updateProfileDetailsPanel, setUpdateProfileDetailsPanel] =
    useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
  });
  const [updatePassword, setUpdatePassword] = useState({
    oldpassword: "",
    newpassword: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        address: currentUser.address || "",
        phone: currentUser.phone || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePassChange = (e) => {
    setUpdatePassword({
      ...updatePassword,
      [e.target.id]: e.target.value,
    });
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      alert("All fields must be filled!");
      return;
    }

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.message || "An error occurred!");
        dispatch(updateUserFailure(data.message));
        return;
      }

      alert("Profile updated successfully!");
      dispatch(updateUserSuccess(data.user));
    } catch (error) {
      alert("Something went wrong while updating profile!");
      console.error(error);
      dispatch(updateUserFailure(error.message));
    }
  };

  const updateUserPassword = async (e) => {
    e.preventDefault();

    if (!updatePassword.oldpassword || !updatePassword.newpassword) {
      alert("All password fields must be filled!");
      return;
    }

    if (updatePassword.oldpassword === updatePassword.newpassword) {
      alert("New password cannot be the same as the old password!");
      return;
    }

    try {
      dispatch(updatePassStart());
      const res = await fetch(
        `/api/user/update-password/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatePassword),
        }
      );
      const data = await res.json();

      if (!data.success) {
        alert(data.message || "An error occurred while updating password!");
        dispatch(updatePassFailure(data.message));
        return;
      }

      alert("Password updated successfully!");
      dispatch(updatePassSuccess());
      setUpdatePassword({ oldpassword: "", newpassword: "" });
    } catch (error) {
      alert("Something went wrong while updating password!");
      console.error(error);
      dispatch(updatePassFailure(error.message));
    }
  };

  return (
    <div className="updateProfile w-full p-3 m-1 flex justify-center">
      {updateProfileDetailsPanel ? (
        <div className="flex flex-col border border-black rounded-lg p-2 w-72 sm:w-[320px] gap-2">
          <h1 className="text-2xl font-semibold text-center">
            Update Profile
          </h1>
          <div className="flex flex-col">
            <label htmlFor="username" className="font-semibold">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="p-1 rounded border border-black"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="p-1 rounded border border-black"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold">
              Address:
            </label>
            <textarea
              id="address"
              className="p-1 rounded border border-black resize-none"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-semibold">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              className="p-1 rounded border border-black"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={loading}
            onClick={updateUserDetails}
            className="p-2 text-white bg-slate-700 rounded hover:opacity-90"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <button
            onClick={() => setUpdateProfileDetailsPanel(false)}
            className="p-2 text-white bg-red-700 rounded hover:opacity-90"
          >
            Change Password
          </button>
        </div>
      ) : (
        <div className="flex flex-col border border-black rounded-lg p-2 w-72 sm:w-[320px] gap-2">
          <h1 className="text-2xl font-semibold text-center">
            Change Password
          </h1>
          <div className="flex flex-col">
            <label htmlFor="oldpassword" className="font-semibold">
              Old Password:
            </label>
            <input
              type="password"
              id="oldpassword"
              className="p-1 rounded border border-black"
              value={updatePassword.oldpassword}
              onChange={handlePassChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="newpassword" className="font-semibold">
              New Password:
            </label>
            <input
              type="password"
              id="newpassword"
              className="p-1 rounded border border-black"
              value={updatePassword.newpassword}
              onChange={handlePassChange}
            />
          </div>
          <button
            disabled={loading}
            onClick={updateUserPassword}
            className="p-2 text-white bg-slate-700 rounded hover:opacity-90"
          >
            {loading ? "Loading..." : "Update Password"}
          </button>
          <button
            onClick={() => setUpdateProfileDetailsPanel(true)}
            className="p-2 text-white bg-red-700 rounded hover:opacity-90"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;























