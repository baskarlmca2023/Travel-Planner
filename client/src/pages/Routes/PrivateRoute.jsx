import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);

  const authCheck = async () => {
    const res = await fetch("/api/user/user-auth", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data.check) setOk(true);
    else setOk(false);
  };

  useEffect(() => {
    if (currentUser !== null) authCheck();
  }, [currentUser]);

  return ok ? <Outlet /> : <Spinner />;
}






// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Outlet, Navigate } from "react-router-dom";
// import Spinner from "../components/Spinner";

// export default function PrivateRoute() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         const res = await fetch("/api/user/user-auth", {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });

//         const data = await res.json();
//         if (data?.success) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Auth Check Error:", error);
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (currentUser !== null) {
//       authCheck();
//     } else {
//       setLoading(false);
//     }
//   }, [currentUser]);

//   if (loading) return <Spinner />;
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// }



// //baskar
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Outlet, Navigate } from "react-router-dom";
// import Spinner from "../components/Spinner";

// export default function PrivateRoute() {
//   const { currentUser } = useSelector((state) => state.user);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         const res = await fetch("/api/user/user-auth", {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });

//         if (res.status === 401) {
//           setIsAuthenticated(false);
//           setLoading(false);
//           return;
//         }

//         const data = await res.json();
//         if (data?.success) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Auth Check Error:", error);
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (currentUser !== null) {
//       authCheck();
//     } else {
//       setLoading(false);
//     }
//   }, [currentUser]);

//   if (loading) return <Spinner />;
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// }




