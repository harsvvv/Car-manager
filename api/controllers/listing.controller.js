import Listing from "../models/listing.model.js";
import Car from "../models/car.model.js"
import { errorHandler } from "../utils/error.js";
export const createListing=async(req,res,next)=>{
try {
    const listing=await Car.create(req.body);
    return res.status(200).json(listing);
} catch (error) {
    next(error);
}
}

export const deleteListing=async(req,res,next)=>{
    const listing =await Car.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,'Listing not found'));

    }
    if(req.user.id!=listing.userRef){
        return next(errorHandler(401,'you can only delete your own listing'));
    }
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');
    } catch (error) {
        next(error);
    }
}
export const updateListing=async(req,res,next)=>{
    const listing=await Car.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,'Listing not found'));
    }
    if(req.user.id!==listing.userRef){
        return next(errorHandler(401,'you can update your own listing only'));
    }
    try {
        const updatedListing=await Car.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
    }

    export const getListing = async (req, res, next) => {
        try {
          const listing = await Car.findById(req.params.id);
          if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
          }
          res.status(200).json(listing);
        } catch (error) {
          next(error);
        }
      };

      export const getListings = async (req, res, next) => {
        try {
          const limit = parseInt(req.query.limit) || 9;
          const startIndex = parseInt(req.query.startIndex) || 0;
      
          // Construct the filter object
          const filter = {};
          console.log("request reaching for home");
      
          const searchTerm = req.query.searchTerm || '';
      
          // Search by name, description, or carType using regex for case-insensitive search
          const listings = await Car.find({
            $or: [
              { name: { $regex: searchTerm, $options: 'i' } },
              { description: { $regex: searchTerm, $options: 'i' } },
              { carType: { $regex: searchTerm, $options: 'i' } },
            ],
            ...filter
          })
          .limit(limit)
          .skip(startIndex);
      
          return res.status(200).json(listings);
        } catch (error) {
          next(error);
        }
      };
      