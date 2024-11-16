/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
    const navigate=useNavigate();
    const [sidebardata,setSidebardata]=useState({
        searchTerm:'',
       
    })
    const [loading,setLoading]=useState(false);
    const [listings,setListings]=useState([]);
    const [showMore,setShowMore]=useState(false);  
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        
    
       
    
        const fetchListings = async () => {
          setLoading(true);
          setShowMore(false);
          const searchQuery = urlParams.toString();
          const res = await fetch(`/api/listing/get?${searchQuery}`);
          const data = await res.json();
          if (data.length > 8) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
          setListings(data);
          setLoading(false);
        };
    
        fetchListings();
      }, [location.search]);
    
    const handleChange=(e)=>{
       if(e.target.id==='all' ||e.target.id==='rent'|| e.target.id==='sale' ){
        setSidebardata({
            ...sidebardata,
            type:e.target.id
        })
       }
       if(e.target.id==='searchTerm'){
        setSidebardata({
            ...sidebardata,
            searchTerm:e.target.value
        })
       }
       if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer'){
        setSidebardata({
            ...sidebardata,
            [e.target.id]:e.target.checked || e.target.checked==='true'?true:false
        })
       }
       if(e.target.id==='sort_order'){
        const sort=e.target.value.split('_')[0] || 'created_at';
        const order=e.target.value.split('_')[1] || 'desc';
        setSidebardata({
            ...sidebardata,
            sort,order
        })
       }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams();
        urlParams.set('searchTerm',sidebardata.searchTerm);
        urlParams.set('type',sidebardata.type);
        urlParams.set('parking',sidebardata.parking);
        urlParams.set('furnished',sidebardata.furnished);
        urlParams.set('offer',sidebardata.offer);
        urlParams.set('sort',sidebardata.sort);
        urlParams.set('order',sidebardata.order);
        const searchQuery=urlParams.toString()
        navigate(`/search?${searchQuery}`)

    }
    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
          setShowMore(false);
        }
        setListings([...listings, ...data]);
      };
  return (
    <div className='flex flex-col md:flex-row md:min-h-screen'>
        <div className='p-7 border-b-2 md:border-r-2'>
            
        </div>
        <div  className='flex-1'>
            <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Listing Results:</h1>
            <div className="p-7 flex flex-wrap gap-4">
                {
                    !loading && listings.length===0 &&(
                        <p className='text-xl text-slate-700'>No listing found</p>
                    )
                }
                {
                    loading && (
                        <p className='text-3xl text-center'>Loading....</p>
                    )
                }
                {
                    !loading && listings.map((listing)=>
                    <ListingItem key={listing._id} listing={listing}/>
                    )
                }
                {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
               
            </div>
        </div>
    </div>
  )
}
