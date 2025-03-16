//Baskar3103   //home.jsx
import React, { useCallback, useEffect, useState } from "react";
import "./styles/Home.css";
import { FaCalendar, FaSearch, FaStar } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { LuBadgePercent } from "react-icons/lu";
import PackageCard from "./PackageCard";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const [topPackages, setTopPackages] = useState([]);
  const [latestPackages, setLatestPackages] = useState([]);
  const [offerPackages, setOfferPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getTopPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=packageRating&limit=8"
      );
      const data = await res.json();
      if (data?.success) {
        setTopPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getLatestPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=createdAt&limit=8"
      );
      const data = await res.json();
      if (data?.success) {
        setLatestPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getOfferPackages = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "/api/package/get-packages?sort=createdAt&offer=true&limit=6"
      );
      const data = await res.json();
      if (data?.success) {
        setOfferPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getTopPackages();
    getLatestPackages();
    getOfferPackages();
  }, []);

  return (
    <div className="main w-full">
      <div className="w-full flex flex-col">
        <div className="backaground_image w-full"></div>
        <div className="top-part w-full gap-2 flex flex-col">
          <h1 className="text-white text-4xl text-center font-bold underline mb-2">
            Discover the Ultimate Travel Guide
          </h1>
          <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
            Transforming travel wishes into cherished memories
          </h1>
          <div className="w-full flex justify-center items-center gap-2 mt-8">
            <input
              type="text"
              className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => navigate(`/search?searchTerm=${search}`)}
              className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
            >
              Go
            </button>
          </div>
          <div className="w-[90%] max-w-xl flex justify-center mt-10">
            {[
              { label: "Best Offers", sort: "offer=true", icon: <LuBadgePercent className="text-2xl" /> },
              { label: "Top Rated", sort: "packageRating", icon: <FaStar className="text-2xl" /> },
              { label: "Latest", sort: "createdAt", icon: <FaCalendar className="text-lg" /> },
              { label: "Most Rated", sort: "packageTotalRatings", icon: <FaRankingStar className="text-2xl" /> }
            ].map(({ label, sort, icon }, index) => (
              <button
                key={index}
                onClick={() => navigate(`/search?sort=${sort}`)}
                className={`flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-white flex-1 ${
                  index === 0 ? "border-e rounded-s-full" : index === 3 ? "border-s rounded-e-full" : "border-x"
                } hover:scale-105 transition-all duration-150`}
              >
                {label} {icon}
              </button>
            ))}
          </div>
        </div>
        <div className="main p-6 flex flex-col gap-5">
          {loading && <h1 className="text-center text-2xl">Loading...</h1>}
          {!loading &&
            topPackages.length === 0 &&
            latestPackages.length === 0 &&
            offerPackages.length === 0 && (
              <h1 className="text-center text-2xl">No Packages Yet!</h1>
            )}
          {/* Top Rated */}
          {!loading && topPackages.length > 0 && (
            <>
              <h1 className="text-2xl font-semibold">Top Packages</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
                {topPackages.map((packageData, i) => {
                  return <PackageCard key={i} packageData={packageData} />;
                })}
              </div>
            </>
          )}
          {/* Latest */}
          {!loading && latestPackages.length > 0 && (
            <>
              <h1 className="text-2xl font-semibold">Latest Packages</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
                {latestPackages.map((packageData, i) => {
                  return <PackageCard key={i} packageData={packageData} />;
                })}
              </div>
            </>
          )}
          {/* Offer */}
          {!loading && offerPackages.length > 0 && (
            <>
              <div className="offers_img"></div>
              <h1 className="text-2xl font-semibold">Best Offers</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
                {offerPackages.map((packageData, i) => {
                  return <PackageCard key={i} packageData={packageData} />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;











// import React, { useEffect, useState } from "react";
// import "./styles/Home.css";
// import { FaCalendar, FaStar } from "react-icons/fa";
// import { FaRankingStar } from "react-icons/fa6";
// import { LuBadgePercent } from "react-icons/lu";
// import PackageCard from "./PackageCard";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();
//   const [topPackages, setTopPackages] = useState([]);
//   const [latestPackages, setLatestPackages] = useState([]);
//   const [offerPackages, setOfferPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   // Carousel Images
//   const carouselImages = [
//     "/assets/images/bg_jmg1.jpg",
//     "/assets/images/travel_img.jpg",
//     "/assets/images/baskar.png",
//   ];
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // Change Background Image Every 3 Seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // Fetch Packages Function
//   const fetchPackages = async (url, setState) => {
//     try {
//       setLoading(true);
//       const res = await fetch(url);
//       const data = await res.json();
//       if (data?.success) {
//         setState(data?.packages);
//       } else {
//         alert(data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPackages("/api/package/get-packages?sort=packageRating&limit=8", setTopPackages);
//     fetchPackages("/api/package/get-packages?sort=createdAt&limit=8", setLatestPackages);
//     fetchPackages("/api/package/get-packages?sort=createdAt&offer=true&limit=6", setOfferPackages);
//   }, []);

//   return (
//     <div className="main w-full">
//       <div className="w-full flex flex-col">
//         {/* Background Image Carousel */}
//         <div
//           className="background_image w-full"
//           style={{ backgroundImage: `url(${carouselImages[currentImageIndex]})` }}
//         ></div>

//         <div className="top-part w-full gap-2 flex flex-col">
//           <h1 className="text-white text-4xl text-center font-bold underline mb-2">
//             Discover the Ultimate Travel Guide
//           </h1>
//           <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
//             Transforming travel wishes into cherished memories
//           </h1>

//           {/* Search Bar */}
//           <div className="w-full flex justify-center items-center gap-2 mt-8">
//             <input
//               type="text"
//               className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <button
//               onClick={() => navigate(`/search?searchTerm=${search}`)}
//               className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95 transition-all"
//             >
//               Go
//             </button>
//           </div>

//           {/* Sorting Buttons */}
//           <div className="w-[90%] max-w-xl flex justify-center mt-10">
//             {[
//               { label: "Best Offers", sort: "offer=true", icon: <LuBadgePercent className="text-2xl" /> },
//               { label: "Top Rated", sort: "packageRating", icon: <FaStar className="text-2xl" /> },
//               { label: "Latest", sort: "createdAt", icon: <FaCalendar className="text-lg" /> },
//               { label: "Most Rated", sort: "packageTotalRatings", icon: <FaRankingStar className="text-2xl" /> }
//             ].map(({ label, sort, icon }, index) => (
//               <button
//                 key={index}
//                 onClick={() => navigate(`/search?sort=${sort}`)}
//                 className={`flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-white flex-1 ${
//                   index === 0 ? "border-e rounded-s-full" : index === 3 ? "border-s rounded-e-full" : "border-x"
//                 } hover:scale-105 transition-all duration-150`}
//               >
//                 {label} {icon}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Packages Section */}
//         <div className="main p-6 flex flex-col gap-5">
//           {loading && <h1 className="text-center text-2xl">Loading...</h1>}

//           {!loading &&
//             topPackages.length === 0 &&
//             latestPackages.length === 0 &&
//             offerPackages.length === 0 && (
//               <h1 className="text-center text-2xl">No Packages Yet!</h1>
//             )}

//           {/* Top Rated Packages */}
//           {!loading && topPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Top Packages</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
//                 {topPackages.map((packageData, i) => (
//                   <PackageCard key={i} packageData={packageData} />
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Latest Packages */}
//           {!loading && latestPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Latest Packages</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
//                 {latestPackages.map((packageData, i) => (
//                   <PackageCard key={i} packageData={packageData} />
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Best Offers */}
//           {!loading && offerPackages.length > 0 && (
//             <>
//               <div className="offers_img"></div>
//               <h1 className="text-2xl font-semibold">Best Offers</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
//                 {offerPackages.map((packageData, i) => (
//                   <PackageCard key={i} packageData={packageData} />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;





// import React, { useCallback, useEffect, useState } from "react";
// import "./styles/Home.css";
// import { FaCalendar, FaStar } from "react-icons/fa";
// import { FaRankingStar } from "react-icons/fa6";
// import { LuBadgePercent } from "react-icons/lu";
// import PackageCard from "./PackageCard";
// import { useNavigate } from "react-router";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";


// // import baskarImg from "../assets/images/baskar.png";

// // const carouselImages = [baskarImg, baskarImg, baskarImg, baskarImg];



// const Home = () => {
//   const navigate = useNavigate();
//   const [topPackages, setTopPackages] = useState([]);
//   const [latestPackages, setLatestPackages] = useState([]);
//   const [offerPackages, setOfferPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   const carouselImages = [
//     "/assets/images/bg_jmg1.jpg",
//     "/assets/images/travel_img.jpg",
//     "/assets/images/baskar.png",
//     "/assets/images/baskar.png",
//   ];

//   const getTopPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/package/get-packages?sort=packageRating&limit=8");
//       const data = await res.json();
//       if (data?.success) {
//         setTopPackages(data?.packages);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const getLatestPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/package/get-packages?sort=createdAt&limit=8");
//       const data = await res.json();
//       if (data?.success) {
//         setLatestPackages(data?.packages);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const getOfferPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/package/get-packages?sort=createdAt&offer=true&limit=6");
//       const data = await res.json();
//       if (data?.success) {
//         setOfferPackages(data?.packages);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getTopPackages();
//     getLatestPackages();
//     getOfferPackages();
//   }, []);

//   return (
//     <div className="main w-full">
//       <div className="w-full flex flex-col">
//           {/* Carousel */}
//   <Swiper
//     modules={[Navigation, Pagination, Autoplay]}
//     spaceBetween={0}
//     slidesPerView={1}
//     navigation
//     pagination={{ clickable: true }}
//     autoplay={{ delay: 1000, disableOnInteraction: false }}
//     loop={true} // Enables infinite looping
//     className="w-full h-[400px]"
//   >
//     {carouselImages.map((img, index) => (
//       <SwiperSlide key={index}>
//         <div
//           className="w-full h-[400px] bg-cover bg-center transition-all duration-700"
//           style={{ backgroundImage: `url(${img})` }}
//         ></div>
//       </SwiperSlide>
//     ))}
//   </Swiper>

//         {/* <div className="top-part w-full gap-2 flex flex-col"> */}
//         <div className="top-part w-full gap-2 flex flex-col backdrop-blur-md p-6 rounded-lg">

//           <h1 className="text-white text-4xl text-center font-bold underline mb-2">
//             Discover the Ultimate Travel Guide
//           </h1>
//           <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
//             Transforming travel wishes into cherished memories
//           </h1>
//           <div className="w-full flex justify-center items-center gap-2 mt-8">
//             <input
//               type="text"
//               className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <button
//               onClick={() => navigate(`/search?searchTerm=${search}`)}
//               className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
//             >
//               Go
//             </button>
//           </div>

//           <div className="w-[90%] max-w-xl flex justify-center mt-10">
//             {[
//               { label: "Best Offers", sort: "offer=true", icon: <LuBadgePercent className="text-2xl" /> },
//               { label: "Top Rated", sort: "packageRating", icon: <FaStar className="text-2xl" /> },
//               { label: "Latest", sort: "createdAt", icon: <FaCalendar className="text-lg" /> },
//               { label: "Most Rated", sort: "packageTotalRatings", icon: <FaRankingStar className="text-2xl" /> }
//             ].map(({ label, sort, icon }, index) => (
//               <button
//                 key={index}
//                 onClick={() => navigate(`/search?sort=${sort}`)}
//                 className={`flex items-center justify-around gap-x-1 bg-blue-950 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-white flex-1 ${
//                   index === 0 ? "border-e rounded-s-full" : index === 3 ? "border-s rounded-e-full" : "border-x"
//                 } hover:scale-105 transition-all duration-150`}
//               >
//                 {label} {icon}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="main p-6 flex flex-col gap-5">
//           {loading && <h1 className="text-center text-2xl">Loading...</h1>}
//           {!loading && topPackages.length === 0 && latestPackages.length === 0 && offerPackages.length === 0 && (
//             <h1 className="text-center text-2xl">No Packages Yet!</h1>
//           )}

//           {/* Top Packages */}
//           {!loading && topPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Top Packages</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
//                 {topPackages.map((packageData, i) => (
//                   <PackageCard key={i} packageData={packageData} />
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Latest Packages */}
//           {!loading && latestPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Latest Packages</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
//                 {latestPackages.map((packageData, i) => (
//                   <PackageCard key={i} packageData={packageData} />
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Offer Packages */}
//           {!loading && offerPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Best Offers</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
//                 {offerPackages.map((packageData, i) => (
//                   <PackageCard key={i} packageData={packageData} />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

















// //src/pages/Home.jsx 1
// import React, { useCallback, useEffect, useState } from "react";
// import "./styles/Home.css";
// import { FaCalendar, FaSearch, FaStar } from "react-icons/fa";
// import { FaRankingStar } from "react-icons/fa6";
// import { LuBadgePercent } from "react-icons/lu";
// import PackageCard from "./PackageCard";
// import { useNavigate } from "react-router";

// const Home = () => {
//   const navigate = useNavigate();
//   const [topPackages, setTopPackages] = useState([]);
//   const [latestPackages, setLatestPackages] = useState([]);
//   const [offerPackages, setOfferPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   const getTopPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "/api/package/get-packages?sort=packageRating&limit=8"
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setTopPackages(data?.packages);
//         setLoading(false);
//       } else {
//         setLoading(false);
//         alert(data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [topPackages]);

//   const getLatestPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "/api/package/get-packages?sort=createdAt&limit=8"
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setLatestPackages(data?.packages);
//         setLoading(false);
//       } else {
//         setLoading(false);
//         alert(data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [latestPackages]);

//   const getOfferPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(
//         "/api/package/get-packages?sort=createdAt&offer=true&limit=6"
//       );
//       const data = await res.json();
//       if (data?.success) {
//         setOfferPackages(data?.packages);
//         setLoading(false);
//       } else {
//         setLoading(false);
//         alert(data?.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }, [offerPackages]);

//   useEffect(() => {
//     getTopPackages();
//     getLatestPackages();
//     getOfferPackages();
//   }, []);

//   return (
//     <div className="main w-full">
//       <div className="w-full flex flex-col">
//         <div className="backaground_image w-full"></div>
//         <div className="top-part w-full gap-2 flex flex-col">
//           <h1 className="text-white text-4xl text-center font-bold underline mb-2">
//           Discover the Ultimate Travel Guide
//           </h1>
//           <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
//           Transforming travel wishes into cherished memories
//           </h1>
//           <div className="w-full flex justify-center items-center gap-2 mt-8">
//             <input
//               type="text"
//               className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//               }}
//             />
//             <button
//               onClick={() => {
//                 navigate(`/search?searchTerm=${search}`);
//               }}
//               className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
//             >
//               Go
//               {/* <FaSearch className="" /> */}
//             </button>
//           </div>
//           <div className="w-[90%] max-w-xl flex justify-center mt-10">
//             <button
//               onClick={() => {
//                 navigate("/search?offer=true");
//               }}
//               className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-e border-white rounded-s-full flex-1 hover:scale-105 transition-all duration-150"
//             >
//               Best Offers
//               <LuBadgePercent className="text-2xl" />
//             </button>
//             <button
//               onClick={() => {
//                 navigate("/search?sort=packageRating");
//               }}
//               className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-x border-white flex-1 hover:scale-105 transition-all duration-150"
//             >
//               Top Rated
//               <FaStar className="text-2xl" />
//             </button>
//             <button
//               onClick={() => {
//                 navigate("/search?sort=createdAt");
//               }}
//               className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-x border-white flex-1 hover:scale-105 transition-all duration-150"
//             >
//               Latest
//               <FaCalendar className="text-lg" />
//             </button>
//             <button
//               onClick={() => {
//                 navigate("/search?sort=packageTotalRatings");
//               }}
//               className="flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-s border-white rounded-e-full flex-1 hover:scale-105 transition-all duration-150"
//             >
//               Most Rated
//               <FaRankingStar className="text-2xl" />
//             </button>
//           </div>
//         </div>
//         main page
//         <div className="main p-6 flex flex-col gap-5">
//           {loading && <h1 className="text-center text-2xl">Loading...</h1>}
//           {!loading &&
//             topPackages.length === 0 &&
//             latestPackages.length === 0 &&
//             offerPackages.length === 0 && (
//               <h1 className="text-center text-2xl">No Packages Yet!</h1>
//             )}
//           {/* Top Rated */}
//           {!loading && topPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Top Packages</h1>
//               <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
//                 {topPackages.map((packageData, i) => {
//                   return <PackageCard key={i} packageData={packageData} />;
//                 })}
//               </div>
//             </>
//           )}
//           {/* Top Rated */}
//           {/* latest */}
//           {!loading && latestPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Latest Packages</h1>
//               <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
//                 {latestPackages.map((packageData, i) => {
//                   return <PackageCard key={i} packageData={packageData} />;
//                 })}
//               </div>
//             </>
//           )}
//           {/* latest */}
//           {/* offer */}
//           {!loading && offerPackages.length > 0 && (
//             <>
//               <div className="offers_img"></div>
//               <h1 className="text-2xl font-semibold">Best Offers</h1>
//               <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
//                 {offerPackages.map((packageData, i) => {
//                   return <PackageCard key={i} packageData={packageData} />;
//                 })}
//               </div>
//             </>
//           )}
//           {/* offer */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

















// //2

// import React, { useCallback, useEffect, useState } from "react";
// import "./styles/Home.css";
// import { FaCalendar, FaStar } from "react-icons/fa";
// import { FaRankingStar } from "react-icons/fa6";
// import { LuBadgePercent } from "react-icons/lu";
// import PackageCard from "./PackageCard";
// import { useNavigate } from "react-router";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";

// const Home = () => {
//   const navigate = useNavigate();
//   const [topPackages, setTopPackages] = useState([]);
//   const [latestPackages, setLatestPackages] = useState([]);
//   const [offerPackages, setOfferPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   const getTopPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/package/get-packages?sort=packageRating&limit=8");
//       const data = await res.json();
//       if (data?.success) {
//         setTopPackages(data?.packages);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const getLatestPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/package/get-packages?sort=createdAt&limit=8");
//       const data = await res.json();
//       if (data?.success) {
//         setLatestPackages(data?.packages);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const getOfferPackages = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/package/get-packages?sort=createdAt&offer=true&limit=6");
//       const data = await res.json();
//       if (data?.success) {
//         setOfferPackages(data?.packages);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getTopPackages();
//     getLatestPackages();
//     getOfferPackages();
//   }, []);

//   return (
//     <div className="main w-full">
//       <Carousel showThumbs={false} autoPlay infiniteLoop>
//         <div className="carousel-image"><img src="..assets/images/bg_img.png" alt="Slide 1" /></div>
//         <div className="carousel-image"><img src="/images/carousel2.jpg" alt="Slide 2" /></div>
//         <div className="carousel-image"><img src="/images/carousel3.jpg" alt="Slide 3" /></div>
//       </Carousel>
      
//       <div className="main p-6 flex flex-col gap-5">
//         {loading && <h1 className="text-center text-2xl">Loading...</h1>}
//         {!loading && topPackages.length === 0 && latestPackages.length === 0 && offerPackages.length === 0 && (
//           <h1 className="text-center text-2xl">No Packages Yet!</h1>
//         )}
        
//         {/* Top Rated */}
//         {!loading && topPackages.length > 0 && (
//           <>
//             <h1 className="text-2xl font-semibold">Top Packages</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-3">
//               {topPackages.map((packageData, i) => (
//                 <PackageCard key={i} packageData={packageData} />
//               ))}
//             </div>
//           </>
//         )}

//         {/* Latest */}
//         {!loading && latestPackages.length > 0 && (
//           <>
//             <h1 className="text-2xl font-semibold">Latest Packages</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-3">
//               {latestPackages.map((packageData, i) => (
//                 <PackageCard key={i} packageData={packageData} />
//               ))}
//             </div>
//           </>
//         )}

//         {/* Offers */}
//         {!loading && offerPackages.length > 0 && (
//           <>
//             <h1 className="text-2xl font-semibold">Best Offers</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-3">
//               {offerPackages.map((packageData, i) => (
//                 <PackageCard key={i} packageData={packageData} />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;





// //Baskar3103
// import React, { useCallback, useEffect, useState } from "react";
// import "./styles/Home.css";
// import { FaCalendar, FaStar } from "react-icons/fa";
// import { FaRankingStar } from "react-icons/fa6";
// import { LuBadgePercent } from "react-icons/lu";
// import PackageCard from "./PackageCard";
// import { useNavigate } from "react-router";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// const carouselResponsive = {
//   superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
//   desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
//   tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
//   mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const [topPackages, setTopPackages] = useState([]);
//   const [latestPackages, setLatestPackages] = useState([]);
//   const [offerPackages, setOfferPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchData = async (sort, setter, extraParams = "") => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/package/get-packages?sort=${sort}&limit=8${extraParams}`);
//         const data = await res.json();
//         if (data?.success) {
//           setter(data?.packages);
//         } else {
//           alert(data?.message || "Something went wrong!");
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData("packageRating", setTopPackages);
//     fetchData("createdAt", setLatestPackages);
//     fetchData("createdAt", setOfferPackages, "&offer=true&limit=6");
//   }, []);

//   return (
//     <div className="main w-full">
//       <div className="w-full flex flex-col">
//         <Carousel responsive={carouselResponsive} infinite autoPlay>
//           <div className="background_image w-full bg-cover bg-center" style={{ backgroundImage: "url('../assets/images/about_img.png')" }}></div>
//           <div className="background_image w-full bg-cover bg-center" style={{ backgroundImage: "url('../assets/images/baskar.png')" }}></div>
//           <div className="background_image w-full bg-cover bg-center" style={{ backgroundImage: "url('../assets/images/bg_jmg1.jpg')" }}></div>
//         </Carousel>
//         <div className="top-part w-full gap-2 flex flex-col">
//           <h1 className="text-white text-4xl text-center font-bold underline mb-2">Discover the Ultimate Travel Guide</h1>
//           <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">Transforming travel wishes into cherished memories</h1>
//           <div className="w-full flex justify-center items-center gap-2 mt-8">
//             <input
//               type="text"
//               className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
//               placeholder="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <button onClick={() => navigate(`/search?searchTerm=${search}`)} className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95">Go</button>
//           </div>
//           <div className="w-[90%] max-w-xl flex justify-center mt-10">
//             {[{ label: "Best Offers", sort: "offer=true", icon: <LuBadgePercent className="text-2xl" /> },
//               { label: "Top Rated", sort: "packageRating", icon: <FaStar className="text-2xl" /> },
//               { label: "Latest", sort: "createdAt", icon: <FaCalendar className="text-lg" /> },
//               { label: "Most Rated", sort: "packageTotalRatings", icon: <FaRankingStar className="text-2xl" /> }].map(({ label, sort, icon }, index) => (
//               <button key={index} onClick={() => navigate(`/search?sort=${sort}`)} className={`flex items-center justify-around gap-x-1 bg-slate-400 text-white p-2 py-1 text-[8px] xxsm:text-sm sm:text-lg border-white flex-1 ${index === 0 ? "border-e rounded-s-full" : index === 3 ? "border-s rounded-e-full" : "border-x"} hover:scale-105 transition-all duration-150`}>
//                 {label} {icon}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="main p-6 flex flex-col gap-5">
//           {loading && <h1 className="text-center text-2xl">Loading...</h1>}
//           {!loading && topPackages.length === 0 && latestPackages.length === 0 && offerPackages.length === 0 && <h1 className="text-center text-2xl">No Packages Yet!</h1>}
//           {!loading && topPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Top Packages</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
//                 {topPackages.map((packageData, i) => <PackageCard key={i} packageData={packageData} />)}
//               </div>
//             </>
//           )}
//           {!loading && latestPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Latest Packages</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
//                 {latestPackages.map((packageData, i) => <PackageCard key={i} packageData={packageData} />)}
//               </div>
//             </>
//           )}
//           {!loading && offerPackages.length > 0 && (
//             <>
//               <h1 className="text-2xl font-semibold">Best Offers</h1>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 my-3">
//                 {offerPackages.map((packageData, i) => <PackageCard key={i} packageData={packageData} />)}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;