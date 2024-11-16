/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';



const EditCar = () => {
    const dispatch=useDispatch();
    const { currentUser,loading,error } = useSelector((state) => state.user);
    const [userListings,setUserListings]=useState([])
    const [showListingError,setShowListingError]=useState(false)
    const handleShowListing=async()=>{
        try {
          setShowListingError(false);
          console.log(currentUser._id);
          const res=await fetch(`/api/user/listings/${currentUser._id}`)
           const data=await res.json();
           if(data.success===false){
            setShowListingError(true);
           }
           console.log("this is listing data test purpose",data);
           setUserListings(data);
        } catch (error) {
          setShowListingError(true);
        }
      }
      useEffect(() => {
        handleShowListing();
        
      }, []);
      const handleListingDelete=async(listingId)=>{
        try {
          const res=await fetch(`/api/listing/delete/${listingId}`,{
           method:'DELETE',
          })
          const data=await res.json();
          if(data.success===false){
            console.log(data.message);
            return;
          }
          setUserListings((prev)=>prev.filter((listing)=>listing._id!==listingId));
        } catch (error) {
          console.log(error.message);
        }
      }
  return (
    <div className='w-[80%] mx-auto m-5'>
    <div className='w-full flex justify-center items-center rounded-lg p-2'>
    <h1 className='text-2xl  mx-auto mb-5 w-auto font-bold'>you can edit only your listing</h1>
    </div>
    
        {userListings && userListings.length>0 && 
   
   userListings.map((listing,index)=>(
    <div key={listing._id} className='border  rounded-lg p-3 flex justify-between items-center border border-black gap-4'>
    
     <Link to={`/listing/${listing._id}`}>
      <img src={listing.imageUrls[0].url} alt='coverImage' className='h-16 w-16 object-contain '/>

     </Link>
     <Link to={`/listing/${listing._id}`} className='font-semibold flex-1 hover:underline truncate' >
      <p >{listing.name}</p>
     </Link>
     <div className=" flex flex-col">
      <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>delete</button>
      <Link to={`/update-listing/${listing._id}`}>
      <button className='text-green-700 uppercase'>Edit</button>
      </Link>
      
     </div>
    </div>
   ))
   }
    </div>
  )
}

export default EditCar