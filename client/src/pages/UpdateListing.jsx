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
