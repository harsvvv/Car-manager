/* eslint-disable no-undef */
// /* eslint-disable react/jsx-key */
// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useRef, useState } from "react";
// import {useSelector} from 'react-redux'
// import {useNavigate,useParams} from 'react-router-dom'
// import uploadImage from "../Helper/UploadImage.js";

// import {
//     getDownloadURL,
//     getStorage,
//     ref,
//     uploadBytesResumable,
//   } from 'firebase/storage';
//   import {app} from '../firebase.js'
  

// export default function CreateListing() {
//   const {currentUser}=useSelector((state)=>state.user);
//     const [files,setFiles]=useState([])
//     const params=useParams()
//     const [formData,setFormData]=useState({
//         imageUrls:[],
//         name:'',
//         description:'',
//         address:'',
//         type:'rent',
//         bedrooms:1,
//         bathrooms:1,
//         discountPrice:0,
//         regularPrice:50,
//         offer:false,
//         parking:false,
//         furnished:false,

//     })
//     const navigate=useNavigate()
//     const [error,setError]=useState(false)
//     const [loading,setLoading]=useState(false)
//     const [imageUploadError,setImageUploadError]=useState(false)
//     const[uploading,setUploading]=useState(false);
//     console.log(formData);
//     useEffect(()=>{
//         const fetchListing=async()=>{
//           const listingId=params.listingId;
//           const res=await fetch(`/api/listing/get/${listingId}`);
//           const data= await res.json();
//           if(data.success===false){
//             console.log(data.message);
//             return;
//           }
//           console.log(data);
//           setFormData(data);
//         }
//         fetchListing();
//     },[])
//     const handleImageSubmit=(e)=>{
//     e.preventDefault();
//     if(files.length>0 && files.length+formData.imageUrls.length<7){
//         const promises=[]
//         setUploading(true);
//         for(let i=0;i<files.length;i++){
//             promises.push(storeImage(files[i]));
//         }
//           Promise.all(promises).then((urls)=>{
//             setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)})
//             setImageUploadError(false)
//             setUploading(false)
            
//           }).catch((error)=>{
//             setUploading(false)
//             setImageUploadError('Image upload failed 2 mb per');
//           })
//     }else{
//         setImageUploadError("only 6 images can be upload per listing");
//           setUploading(false);
//     }
//    }
//    const storeImage=async(file)=>{
//     return uploadImage(file);
//    }
//    const handleRemoveImage=(index)=>{
//     setFormData({
//         ...formData,
//         imageUrls:formData.imageUrls.filter((_,i)=>
//             i!==index
//         )
//     }
//     )
//    }
//    const handleChange=(e)=>{
//           if(e.target.id==='sale' || e.target.id==='rent'){
//             setFormData({
//               ...formData,
//               type:e.target.id
//             })
//           }
//           if(e.target.id==='furnished' || e.target.id==='offer' || e.target.id==='parking'){
//             setFormData({
//               ...formData,
//             [e.target.id]:e.target.checked
//             })
//           }
//           if(e.target.type==='number'|| e.target.type==='textarea' || e.target.type==='text'){
//             setFormData({
//               ...formData,
//               [e.target.id]:e.target.value
//             })
//           }
//    }
//    const handleSubmit=async(e)=>{
//      e.preventDefault();
//      try {
//       if(formData.imageUrls.length<1)
//         return setError("you must upload atleast one picture")

//       if(+formData.discountPrice>+formData.regularPrice){
//         return setError('regular price must be less than regular price')
//       }
//       setLoading(false);
//       setError(false);
//       const res = await fetch(`/api/listing/update/${params.listingId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           userRef:currentUser._id
//         })
//       })
//       const data= await res.json()
//       setLoading(false);
//       if(data.success===false){
//         setError(data.message);
//       }
//       console.log("this is the data",data);
//       navigate(`/listing/${data._id}`)
      
//      } catch (error) {
//       setError(error.message);
//       console.log(error);
//       console.log("error inside catch")
//       setLoading(false);
//      }

//    }
//   return (
//     <main className="p-3 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-semibold my-7 text-center">Update a Listing</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
//         <div className="flex flex-col gap-4 flex-1">
//           <input
//             type="text"
//             placeholder="name"
//             className="p-3 border rounded-lg"
//             id="name"
//             maxLength="62"
//             minLength="10"
//             required
//             onChange={handleChange}
//             value={formData.name}
//           />
//           <textarea
//             type="text"
//             placeholder="description"
//             className="p-3 border rounded-lg"
//             id="description"
//             required
//             onChange={handleChange}
//             value={formData.description}
//           />
//           <input
//             type="text"
//             placeholder="address"
//             className="p-3 border rounded-lg"
//             id="address"
//             required
//             onChange={handleChange}
//             value={formData.address}
//           />
//           <div className="flex gap-6 flex-wrap">
//             <div className="flex gap-2">
//               <input type="checkbox" id="sale" className="w-5" onChange={handleChange}  checked={formData.type==='sale'}/>
//               <span>Sell</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id="rent" className="w-5" onChange={handleChange}  checked={formData.type==='rent'} />
//               <span>Rent</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id="parking" className="w-5" onChange={handleChange}  checked={formData.parking} />
//               <span>Parking spot</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id="furnished" className="w-5" onChange={handleChange}  checked={formData.furnished} />
//               <span>Furnished</span>
//             </div>
//             <div className="flex gap-2">
//               <input type="checkbox" id="offer" className="w-5" onChange={handleChange}  checked={formData.offer} />
//               <span>Offer</span>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-6">
//             <div className="flex items-center gap-2">
//                 <input className="p-3 border border-gray-300 rounded-lg" type="number" id="bedrooms" min='1' max='10' onChange={handleChange}  value={formData.bedrooms} required/>
//                 <p>Beds</p>
//             </div>
//             <div className="flex items-center gap-2">
//                 <input className="p-3 border border-gray-300 rounded-lg" type="number" id="bathrooms" min='1' max='10' onChange={handleChange}  value={formData.bathrooms} required/>
//                 <p>Baths</p>
//             </div>
//             <div className="flex items-center gap-2">
//                 <input className="p-3 border border-gray-300 rounded-lg" type="number" id="regularPrice" onChange={handleChange}  value={formData.regularPrice} min='50' max='100000000' required/>
//                 <div className="flex flex-col items-center">
//                 <p>Regular price</p>
//                 <span className="text-sm">($/ months)</span>
//                 </div>
//             </div>
//             <div className="flex items-center gap-2">
//                 <input onChange={handleChange}  value={formData.discountPrice} className="p-3 border border-gray-300 rounded-lg" type="number" id="discountPrice" min='0' max='10000000' required/>
//                 <div className="flex flex-col items-center">
//                 <p>Discount Price</p>
//                 <span className="text-sm">($/ months)</span>
//                 </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col flex-1 gap-4">
//         <p className="font-semibold">Images:
//         <span className="font-normal text-gray-600 ml-2">The first Image will be the cover (max:6)</span>
//         </p>
//         <div className="flex gap-4">
//             <input onChange={(e)=>setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="image/* " multiple />
//             <button type="button" onClick={handleImageSubmit} className="p-3 text-green-700 border border-green-600 rounded uppercase hover:shadow-md disabled:opacity-70">{uploading?'uploading...':'upload'}</button>
//         </div>
//         <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
//         {
//     formData.imageUrls.length > 0 && formData.imageUrls.map((object,index) => (
//         <div key={object.url} className="flex justify-between p-3 border items-center">
//             <img src={object.url} alt="listing image" className="w-20 h-20 object-contain rounded-lg"/>
//             <button type="button" onClick={()=>handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
//         </div>
//     ))
// }

//         <button disabled={loading || uploading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95">{loading?'loading...':'Update'}</button>
//        {error && <p className="text-red-700 text-sm">{error}</p>}
//         </div>
        

//       </form>
     
//     </main>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import uploadImage from "../Helper/UploadImage.js";
import {useParams} from 'react-router-dom'

export default function CreateCarListing() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const params=useParams()
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    carType: "",
    company: "",
    price: 0,
    discountPrice: 0,
    mileage: 0,
    fuelType: "",
    parkingSensors: false,
  });
  console.log("this is form data for testing purpose",formData)
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
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log(formData);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0 && files.length + formData.imageUrls.length <= 10) {
      const promises = [];
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          console.log(urls);
          setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setUploading(false);
          setImageUploadError("Image upload failed. Max size: 2 MB.");
        });
    } else {
      setImageUploadError("Only up to 10 images can be uploaded per listing.");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return uploadImage(file);
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) return setError("You must upload at least one image.");
      if (formData.discountPrice > formData.price) {
        return setError("Discount price must be less than regular price.");
      }
      setLoading(true);
      setError(false);
      const listingId=params.listingId;
      const res = await fetch(`/api/listing/update/${listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      console.log("Response data:", data);
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Update Car Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div >
      <h1 className="mb-3 ml-1 text-2xl">Car Name</h1>
      <input
          type="text"
          placeholder="Car Name"
          className="p-3 border rounded-lg w-full"
          id="name"
          required
          onChange={handleChange}
          value={formData.name}
        />
      </div>
       
        <div>
        <h1 className="mb-3 ml-1 text-2xl">Description</h1>
        <textarea
          placeholder="Description"
          className="p-3 border rounded-lg w-full"
          id="description"
          required
          onChange={handleChange}
          value={formData.description}
        />
        </div>
        <div>
        <h1 className="mb-3 ml-1 text-2xl">Car Type</h1>
        <input
          type="text"
          placeholder="Car Type (e.g., SUV, Sedan)"
          className="p-3 border rounded-lg w-full"
          id="carType"
          required
          onChange={handleChange}
          value={formData.carType}
        />
        </div>
        <div>
        <h1 className="mb-3 ml-1 text-2xl">Company Name</h1>
        <input
          type="text"
          placeholder="Company"
          className="p-3 border rounded-lg w-full"
          id="company"
          required
          onChange={handleChange}
          value={formData.company}
        /></div>
        <div className="flex gap-4 w-full">
          <div>
          <h1 className="mb-3 ml-1 text-2xl">Price</h1>
          <input
            type="number"
            placeholder="Price"
            className="p-3 border rounded-lg"
            id="price"
            required
            onChange={handleChange}
            value={formData.price}
          />
          </div>
          <div>
          <h1 className="mb-3 ml-1 text-2xl">Discount Price</h1>
          <input
            type="number"
            placeholder="Discount Price"
            className="p-3 border rounded-lg"
            id="discountPrice"
            onChange={handleChange}
            value={formData.discountPrice}
          />
          </div>
        </div>
        <div className="flex gap-4">
          <div>
          <h1 className="mb-3 ml-1 text-2xl">Mileage</h1>
          <input
            type="number"
            placeholder="Mileage"
            className="p-3 border rounded-lg"
            id="mileage"
            required
            onChange={handleChange}
            value={formData.mileage}
          />
          </div>
          <div>
          <h1 className="mb-3 ml-1 text-2xl">Fuel Type</h1>
          <input
            type="text"
            placeholder="Fuel Type (e.g., Petrol, Diesel)"
            className="p-3 border rounded-lg"
            id="fuelType"
            required
            onChange={handleChange}
            value={formData.fuelType}
          />
          </div>
        </div>
        <div className="flex gap-4">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="parkingSensors"
              onChange={handleChange}
              checked={formData.parkingSensors}
            />
            Parking Sensors
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Images (Max: 10)</p>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <button
            type="button"
            onClick={handleImageSubmit}
            className="p-3 text-green-700 border border-green-600 rounded hover:shadow-md"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          <p className="text-red-700 text-sm">{imageUploadError}</p>
          {formData.imageUrls.map((object, index) => (
            <div key={object.url} className="flex justify-between items-center border p-3">
              <img src={object.url} alt="Car" className="w-20 h-20 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="p-3 text-red-700 rounded hover:opacity-75"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="p-3 bg-blue-700 text-white rounded hover:opacity-95"
          disabled={loading || uploading}
        >
          {loading ? "Submitting..." : "Update Listing"}
        </button>
        {error && <p className="text-red-700">{error}</p>}
      </form>
    </main>
  );
}
