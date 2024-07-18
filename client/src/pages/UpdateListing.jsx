/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import {useSelector} from 'react-redux'
import {useNavigate,useParams} from 'react-router-dom'
import uploadImage from "../Helper/UploadImage.js";

import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
  import {app} from '../firebase.js'
  

export default function CreateListing() {
  const {currentUser}=useSelector((state)=>state.user);
    const [files,setFiles]=useState([])
    const params=useParams()
    const [formData,setFormData]=useState({
        imageUrls:[],
        name:'',
        description:'',
        address:'',
        type:'rent',
        bedrooms:1,
        bathrooms:1,
        discountPrice:0,
        regularPrice:50,
        offer:false,
        parking:false,
        furnished:false,

    })
    const navigate=useNavigate()
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
    const [imageUploadError,setImageUploadError]=useState(false)
    const[uploading,setUploading]=useState(false);
    console.log(formData);
    useEffect(()=>{
        const fetchListing=async()=>{
          const listingId=params.listingId;
          const res=await fetch(`/api/listing/get/${listingId}`);
          const data= await res.json();
          if(data.success===false){
            console.log(data.message);
            return;
          }
          console.log(data);
          setFormData(data);
        }
        fetchListing();
    },[])
    const handleImageSubmit=(e)=>{
    e.preventDefault();
    if(files.length>0 && files.length+formData.imageUrls.length<7){
        const promises=[]
        setUploading(true);
        for(let i=0;i<files.length;i++){
            promises.push(storeImage(files[i]));
        }
          Promise.all(promises).then((urls)=>{
            setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)})
            setImageUploadError(false)
            setUploading(false)
            
          }).catch((error)=>{
            setUploading(false)
            setImageUploadError('Image upload failed 2 mb per');
          })
    }else{
        setImageUploadError("only 6 images can be upload per listing");
          setUploading(false);
    }
   }
   const storeImage=async(file)=>{
    return uploadImage(file);
   }
   const handleRemoveImage=(index)=>{
    setFormData({
        ...formData,
        imageUrls:formData.imageUrls.filter((_,i)=>
            i!==index
        )
    }
    )
   }
   const handleChange=(e)=>{
          if(e.target.id==='sale' || e.target.id==='rent'){
            setFormData({
              ...formData,
              type:e.target.id
            })
          }
          if(e.target.id==='furnished' || e.target.id==='offer' || e.target.id==='parking'){
            setFormData({
              ...formData,
            [e.target.id]:e.target.checked
            })
          }
          if(e.target.type==='number'|| e.target.type==='textarea' || e.target.type==='text'){
            setFormData({
              ...formData,
              [e.target.id]:e.target.value
            })
          }
   }
   const handleSubmit=async(e)=>{
     e.preventDefault();
     try {
      if(formData.imageUrls.length<1)
        return setError("you must upload atleast one picture")

      if(+formData.discountPrice>+formData.regularPrice){
        return setError('regular price must be less than regular price')
      }
      setLoading(false);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef:currentUser._id
        })
      })
      const data= await res.json()
      setLoading(false);
      if(data.success===false){
        setError(data.message);
      }
      console.log("this is the data",data);
      navigate(`/listing/${data._id}`)
      
     } catch (error) {
      setError(error.message);
      console.log(error);
      console.log("error inside catch")
      setLoading(false);
     }

   }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Update a Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            className="p-3 border rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="description"
            className="p-3 border rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="address"
            className="p-3 border rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" onChange={handleChange}  checked={formData.type==='sale'}/>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" onChange={handleChange}  checked={formData.type==='rent'} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" onChange={handleChange}  checked={formData.parking} />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" onChange={handleChange}  checked={formData.furnished} />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" onChange={handleChange}  checked={formData.offer} />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
                <input className="p-3 border border-gray-300 rounded-lg" type="number" id="bedrooms" min='1' max='10' onChange={handleChange}  value={formData.bedrooms} required/>
                <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
                <input className="p-3 border border-gray-300 rounded-lg" type="number" id="bathrooms" min='1' max='10' onChange={handleChange}  value={formData.bathrooms} required/>
                <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
                <input className="p-3 border border-gray-300 rounded-lg" type="number" id="regularPrice" onChange={handleChange}  value={formData.regularPrice} min='50' max='100000000' required/>
                <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-sm">($/ months)</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <input onChange={handleChange}  value={formData.discountPrice} className="p-3 border border-gray-300 rounded-lg" type="number" id="discountPrice" min='0' max='10000000' required/>
                <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-sm">($/ months)</span>
                </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
        <p className="font-semibold">Images:
        <span className="font-normal text-gray-600 ml-2">The first Image will be the cover (max:6)</span>
        </p>
        <div className="flex gap-4">
            <input onChange={(e)=>setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="image/* " multiple />
            <button type="button" onClick={handleImageSubmit} className="p-3 text-green-700 border border-green-600 rounded uppercase hover:shadow-md disabled:opacity-70">{uploading?'uploading...':'upload'}</button>
        </div>
        <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
        {
    formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
        <div key={url} className="flex justify-between p-3 border items-center">
            <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg"/>
            <button type="button" onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
        </div>
    ))
}

        <button disabled={loading || uploading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95">{loading?'loading...':'Update'}</button>
       {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
        

      </form>
     
    </main>
  );
}
