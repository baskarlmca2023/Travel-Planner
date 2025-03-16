// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import logo from "../assets/images/baskar.png";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     address: "",
//     phone: "",
//   });
//   // console.log(formData);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`/api/auth/signup`, formData);
//       if (res?.data?.success) {
//         alert(res?.data?.message);
//         navigate("/login");
//       } else {
//         alert(res?.data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div
//       className="flex justify-center items-center"
//       style={{
//         width: "100%",
//         height: "90vh",
//         background:
//           "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
//       }}
//     >
//       <form onSubmit={handleSubmit}>
//       <div className="flex flex-col border border-black rounded-lg p-2 w-72 h-fit gap-2 sm:w-[320px] bg-white bg-opacity-60">
//  <img src={logo} alt="Logo" className="w-16 h-16 justify-center " /> 
//         <h1 className="text-3xl text-center font-semibold">Signup</h1>
//          <div className="flex flex-col">
//             <label htmlFor="username" className="font-semibold">
//                Username:
//              </label>
//               <input
//                type="text"
//              id="username"
//                className="p-1 rounded border border-black bg-white bg-opacity-80"
//                onChange={handleChange}
//            />
//           </div> 
//           <div className="flex flex-col">
//             <label htmlFor="email" className="font-semibold">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="p-1 rounded border border-black bg-white bg-opacity-80"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="password" className="font-semibold">
//               Password:
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="p-1 rounded border border-black bg-white bg-opacity-80"
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
//               className="p-1 rounded border border-black resize-none bg-white bg-opacity-80"
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
//               className="p-1 rounded border border-black bg-white bg-opacity-80"
//               onChange={handleChange}
//             />
//           </div>
//           <p className="text-blue-700 text-sm hover:underline">
//             <Link to={`/login`}>Have an account? Login</Link>
//           </p>
//           <button className="p-3 text-white bg-slate-700 rounded hover:opacity-95">
//             Signup
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;




// //baskar
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import logo from "../assets/images/baskar.png";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     address: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`/api/auth/signup`, formData);
//       if (res?.data?.success) {
//         alert(res?.data?.message);
//         navigate("/login");
//       } else {
//         alert(res?.data?.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div
//       className="flex justify-center items-center"
//       style={{
//         width: "100%",
//         height: "90vh",
//         background:
//           "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
//       }}
//     >
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col border border-black rounded-lg p-4 w-72 sm:w-[320px] bg-white bg-opacity-60 items-center">
//           <img src={logo} alt="Logo" className="w-20 h-20 mb-2" />
//           <h2 className="text-xl font-bold text-yellow-700">Travel Tourism</h2>
//           <h1 className="text-3xl text-center font-semibold mt-2">Signup</h1>
//           <div className="flex flex-col w-full">
//             <label htmlFor="username" className="font-semibold">
//               Username:
//             </label>
//             <input
//               type="text"
//               id="username"
//               className="p-1 rounded border border-black bg-white bg-opacity-80"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="email" className="font-semibold">
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="p-1 rounded border border-black bg-white bg-opacity-80"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="password" className="font-semibold">
//               Password:
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="p-1 rounded border border-black bg-white bg-opacity-80"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="address" className="font-semibold">
//               Address:
//             </label>
//             <textarea
//               maxLength={200}
//               id="address"
//               className="p-1 rounded border border-black resize-none bg-white bg-opacity-80"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex flex-col w-full">
//             <label htmlFor="phone" className="font-semibold">
//               Phone:
//             </label>
//             <input
//               type="text"
//               id="phone"
//               className="p-1 rounded border border-black bg-white bg-opacity-80"
//               onChange={handleChange}
//             />
//           </div>
//           <p className="text-blue-700 text-sm hover:underline mt-2">
//             <Link to={`/login`}>Have an account? Login</Link>
//           </p>
//           <button className="p-3 text-white bg-slate-700 rounded hover:opacity-95 mt-2">
//             Signup
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Signup;





import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import logo from "../assets/images/baskar.png";

const Signup = () => {
  const navigate = useNavigate();



  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Too Short!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    address: Yup.string().max(200, "Maximum 200 characters").required("Required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      address: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`/api/auth/signup`, values);
        if (res?.data?.success) {
          alert(res?.data?.message);
          navigate("/login");
        } else {
          alert(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div
      className="flex justify-center items-center"
      style={{
        width: "100%",
        height: "90vh",
        background:
          "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col border border-black rounded-lg p-4 w-72 sm:w-[320px] bg-white bg-opacity-60 items-center">
          <img src={logo} alt="Logo" className="w-20 h-20 mb-2" />
          <h2 className="text-xl font-bold text-yellow-700">Travels & Tourism</h2>
          <h1 className="text-3xl text-center font-semibold mt-2">Signup</h1>
          <div className="flex flex-col w-full">
            <label htmlFor="username" className="font-semibold">Username:</label>
            <input
              type="text"
              id="username"
              className="p-1 rounded border border-black bg-white bg-opacity-80"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && <p className="text-red-500 text-sm">{formik.errors.username}</p>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              className="p-1 rounded border border-black bg-white bg-opacity-80"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="font-semibold">Password:</label>
            <input
              type="password"
              id="password"
              className="p-1 rounded border border-black bg-white bg-opacity-80"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && <p className="text-red-500 text-sm">{formik.errors.password}</p>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="address" className="font-semibold">Address:</label>
            <textarea
              maxLength={200}
              id="address"
              className="p-1 rounded border border-black resize-none bg-white bg-opacity-80"
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address && <p className="text-red-500 text-sm">{formik.errors.address}</p>}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="phone" className="font-semibold">Phone:</label>
            <input
              type="text"
              id="phone"
              className="p-1 rounded border border-black bg-white bg-opacity-80"
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm">{formik.errors.phone}</p>}
          </div>
          <p className="text-blue-700 text-sm hover:underline mt-2">
            <Link to={`/login`}>Have an account? Login</Link>
          </p>
          <button className="p-3 text-white bg-slate-700 rounded hover:opacity-95 mt-2" type="submit">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
