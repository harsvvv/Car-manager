// /* eslint-disable no-unused-vars */
// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useState } from 'react';
// import {Swiper,SwiperSlide} from 'swiper/react'
// import SwiperCore from 'swiper'
// import { Navigation } from 'swiper/modules';
// import {useSelector} from 'react-redux'

// import Contact from '../components/Contact';
// import 'swiper/css/bundle'
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaParking,
  
// } from 'react-icons/fa';
// import { FaMapMarkerAlt, FaShare, FaGasPump, FaCar } from "react-icons/fa";

// export default function Listing() {
//   const {currentUser}=useSelector((state)=>state.user);
//   SwiperCore.use(Navigation);
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [contact,setContact]=useState(false);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const params=useParams();

//   useEffect(()=>{
//     const fetchListing=async()=>{
//   try {
//     setLoading(true);
//     setError(false);
//     const res = await fetch(`/api/listing/get/${params.listingId}`);
//     const data = await res.json();
//     if (data.success === false) {
//       setError(true);
//       setLoading(false);
//       return;
//     }
//     console.log(data);
//     setListing(data);
//     setLoading(false);
//     setError(false);
//   } catch (error) {
//     console.log("error",error);
//     setLoading(false);
//     setError(true);
//   }
//     }
//     fetchListing()
//   },[params.listingId])
//   return (
//     <main>

//     {loading && <p className='text-center my-7 text-2xl'>loading...</p>}
//     {error && <p className='text-center my-7 text-2xl'>something went wrong</p>}
//     {listing && !loading && !error && (
//         <div>
//          <Swiper navigation>
//   {listing.imageUrls.map((object, index) => (
//     <SwiperSlide key={object.url + index}>
//       <div
//         className="h-[500px] w-full bg-center bg-cover"
//         style={{
//           backgroundImage: `url(${object.url})`,
//           backgroundSize: 'cover',  // Ensures the image covers the entire area
//           backgroundPosition: 'center',  // Ensures the image is centered
//         }}
//       ></div>
//     </SwiperSlide>
//   ))}
// </Swiper>

//           <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
//             <FaShare
//               className='text-slate-500'
//               onClick={() => {
//                 navigator.clipboard.writeText(window.location.href);
//                 setCopied(true);
//                 setTimeout(() => {
//                   setCopied(false);
//                 }, 2000);
//               }}
//             />
//           </div>
//           {copied && (
//             <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
//               Link copied!
//             </p>
//           )}
//           <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
//             <p className='text-2xl font-semibold'>
//               {listing.name} - ${' '}
//               {/* {listing.offer
//                 ? listing.discountPrice.toLocaleString('en-IN')
//                 : listing.regularPrice.toLocaleString('en-IN')}
//               {listing.type === 'rent' && ' / month'} */}
//             </p>
//             <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
//               <FaMapMarkerAlt className='text-green-700' />
//               {/* {listing.address} */}
//             </p>
//             <div className='flex gap-4'>
//               <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
//                 {/* {listing.type === 'rent' ? 'For Rent' : 'For Sale'} */}
//               </p>
//               {/* {listing.offer && (
//                 <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
//                   ${+listing.regularPrice - +listing.discountPrice} off
//                 </p>
//               )} */}
//             </div>
//             <p className='text-slate-800'>
//               <span className='font-semibold text-black'>Description - </span>
//               {listing.description}
//             </p>
//             <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaBed className='text-lg' />
//                 {/* {listing.bedrooms > 1
//                   ? `${listing.bedrooms} beds `
//                   : `${listing.bedrooms} bed `} */}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaBath className='text-lg' />
//                 {/* {listing.bathrooms > 1
//                   ? `${listing.bathrooms} baths `
//                   : `${listing.bathrooms} bath `} */}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaParking className='text-lg' />
//                 {/* {listing.parking ? 'Parking spot' : 'No Parking'} */}
//               </li>
//               <li className='flex items-center gap-1 whitespace-nowrap '>
//                 <FaChair className='text-lg' />
//                 {/* {listing.furnished ? 'Furnished' : 'Unfurnished'} */}
//               </li>
//             </ul>
//             {/* {currentUser && listing.userRef!==currentUser._id && !contact && (
//               <button onClick={()=>setContact(true)} className='bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95'>Contact Landlord</button>
//             )} */}
//             {/* {currentUser ? (
//   listing.userRef !== currentUser._id && !contact && (
//     <button 
//       onClick={() => setContact(true)}  */}
//       {/* className="bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95"
//     >
//       Contact Landlord
//     </button>
//   )
// ) : (
//   <button  
//     className="bg-blue-600 p-3 text-white uppercase rounded-lg hover:opacity-95"
//   >
//     Login to See Contact Details
//   </button>
// )} */}

//             {/* {contact && <Contact listing={listing}/>} */}
//           </div>
//         </div>
//       )}
//     </main>
//   )
// }

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

import { FaMapMarkerAlt, FaShare, FaCar } from 'react-icons/fa';

export default function Listing() {
  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use(Navigation);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log('error', error);
        setLoading(false);
        setError(true);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl">Something went wrong</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((object, index) => (
              <SwiperSlide key={object + index}>
                <div
                  className="h-[500px] w-full bg-center object-cover"
                  style={{
                    backgroundImage: `url(${object.url})`,
                    backgroundSize: 'cover', // Ensures the image covers the entire area
                    backgroundPosition: 'center', // Ensures the image is centered
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${listing.price}
            </p>
           
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.carType}
              </p>
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                company name-{listing.company}
              </p>
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>

            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaCar className="text-lg" />
                {listing.year}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-lg">Mileage: </span>
                {listing.mileage} miles
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-lg">Fuel Type: </span>
                {listing.fuelType}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <span className="text-lg">Parking Sensors: </span>
                {listing.parkingSensors ? "Yes" : "No"}
              </li>
            </ul>

            {listing.discountPrice && (
              <p className="text-red-600 font-semibold">
                Discounted Price: ${listing.discountPrice}
              </p>
            )}

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95"
              >
                Contact Seller
              </button>
            )}

           

            
          </div>
        </div>
      )}
    </main>
  );
}
