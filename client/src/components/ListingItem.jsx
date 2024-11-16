/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

export default function CarListingItem({ listing }) {
  console.log("this is car listing " + listing);
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0].url} // Assuming imageUrls is an array of URLs
          alt="car listing cover..."
          className="h-[320] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">{listing.name}</p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            {/* Assuming there's no specific location field in the schema, you can add one or leave it out */}
            <p className="text-sm text-gray-500">{listing.carType}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
          <p className="text-slate-500 mt-2 font-semibold">
            {listing.discountPrice
              ? `$${listing.discountPrice.toLocaleString('en-US')}` // Add dollar symbol if there's a discount
              : `$${listing.price.toLocaleString('en-US')}`} 
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.mileage} miles
            </div>
            <div className="font-bold text-xs">
              {listing.fuelType}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
