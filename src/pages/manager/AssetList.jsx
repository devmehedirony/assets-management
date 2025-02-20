import {  useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import SectionTitle from "../../shared/SectionTitle";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AssetList = () => {

  const queryClient = useQueryClient();
  const [search, setSearch] = useState('')

  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { data: assetsList = [], refetch } = useQuery({
    queryKey: ['assetsList', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets/${user?.email}`)
      return res.data
    }
  })


  const handleDelete = asset => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/assets/${asset._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch()
              Swal.fire({
                title: `${asset.productName}`,
                text: "SuccessFully Deleted",
                icon: "success"
              });
            }
          })
      }
    });
  }

  useEffect(() => {
    axiosSecure.get(`/assets/${user?.email}?search=${search}`)
      .then(res => {
        const searchItem = res.data
       
        queryClient.setQueryData(["assetsList", user?.email], searchItem);
    })
  },[axiosSecure, queryClient, search, user?.email])

  const handleSortQuantity = async() => {
  
  const res = await  axiosSecure.get(`/assets/${user?.email}?sort=quantity`)
    const sortedData = res.data; 

  
    queryClient.setQueryData(["assetsList", user?.email], sortedData);
  }

  const handleStatus = async() => {
    const res = await axiosSecure.get(`/assets/${user?.email}?available=Available`)
    const filterdData = res.data; 
  
    queryClient.setQueryData(["assetsList", user?.email], filterdData);
  }

  const handleType = async() => {
    const res = await axiosSecure.get(`/assets/${user?.email}?type=Returnable`)
    const filterdData = res.data;
    

    queryClient.setQueryData(["assetsList", user?.email], filterdData);
  }




  return (
    <div className="min-h-screen w-11/12 xl:w-10/12 mx-auto my-20">
      <Helmet>
        <title>Assets List</title>
      </Helmet>

      <SectionTitle heading={'Assets Lists'}></SectionTitle>
      <div className="flex justify-center  flex-col lg:flex-row  gap-x-32 gap-y-10 items-center my-20">

        {/* sort by quantity */}
        <div className="filter">
          <input className="btn filter-reset" type="radio" name="metaframeworks" aria-label="All" />
          <input onClick={handleSortQuantity} className="btn text-white bg-[#8264FF]" type="radio" name="metaframeworks" aria-label="Sort By Quantity" />

        </div>


        {/* search */}
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input onChange={e => setSearch(e.target.value)} type="search" className="grow" placeholder="Search" />
       
        </label>

        
        {/* filter */}
        <div className="filter gap-x-2">
          <input className="btn filter-reset" type="radio" name="metaframeworks" aria-label="All" />
          <input onClick={handleStatus} className="btn text-white bg-[#8264FF]" type="radio" name="metaframeworks" aria-label="Available" />
          <input onClick={handleType} className="btn text-white bg-[#8264FF]" type="radio" name="metaframeworks" aria-label="Returnable" />
        </div>
      </div>


      <div className="flex justify-center items-center gap-10 flex-wrap">

        {
          assetsList.length > 0 && assetsList.map((asset, idx) => <div key={idx} className="block w-96 p-6  shadow-xl space-y-2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight  ">{asset.productName}</h5>
            <p className="font-normal  "><span className="text-lg text-[#3085d6] font-bold">Type: </span> {asset.productType}</p>
            <p className="font-normal  "><span className="text-lg text-[#3085d6] font-bold">Quantity: </span> {asset.productQuantity}</p>
            <p className="font-normal  "><span className="text-lg text-[#3085d6] font-bold">date: </span> {asset.date}</p>
            <div className="flex items-center justify-center gap-x-4 mt-4 text-white">
              <Link to={`/assets-list/update/${asset._id}`}><button className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer">  Update <MdOutlineBrowserUpdated className="text-xl" /></button></Link>

              <button onClick={() => handleDelete(asset)} className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer">  Delete <RxCross2 className="text-xl" /></button>
            </div>

          </div>
          )
        }

        {
          assetsList.length === 0 && <h2 className="text-center my-4 font-bold text-xl">No Asets Found</h2>
        }

      </div>


    </div>
  );
};

export default AssetList;