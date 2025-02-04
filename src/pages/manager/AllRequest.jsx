import { useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { IoMdCloudDone } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import moment from "moment";
import Swal from "sweetalert2";
import { MdDoneOutline } from "react-icons/md";
import { Helmet } from "react-helmet-async";


const AllRequest = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('')
  const axiosSecure = useAxiosSecure()
  
  const { data: allRequests = [], refetch } = useQuery({
    queryKey: ['allRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/requests')
      return res.data
    }
  })

  const handleApprove = (asset) => {
    
    const approve = {
      status: 'Approved',
      approvalDate: moment().format('dddd, MMMM Do YYYY'),
      productId: asset.productId
    }
    axiosSecure.patch(`/requests/${asset._id}`, approve)
      .then(res => {
      
        if (res.data.result.modifiedCount > 0) {
          refetch()
          Swal.fire("Approved Successfull");
        }
    })
    
  }


  useEffect(() => {
    axiosSecure.get(`/requests?search=${search}`)
        .then(res => {
          const searchItem = res.data
      
          queryClient.setQueryData(["allRequests"], searchItem);
      })
    },[axiosSecure, queryClient, search])
  return (
    <div className="min-h-screen w-11/12  lg:w-10/12 mx-auto my-20">
      <Helmet>
        <title>All Requests</title>
      </Helmet>
      <SectionTitle heading={'All Requests'}></SectionTitle>

   <div className="flex justify-center my-10 ">
        {/* search */}
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input onChange={e => setSearch(e.target.value)} type="search" className="grow" placeholder="Search" />
  
        </label>
      </div>
      

      <div className="flex justify-center items-center gap-10 flex-wrap">

        {
          allRequests.length > 0 && allRequests.map((asset, idx) => <div key={idx} className="block w-96 p-6  shadow-xl space-y-2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{asset.productName}</h5>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Type: </span> {asset.productType}</p>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Requester Mail: </span> {asset.requesterMail}</p>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Requester Name: </span> {asset.requesterName}</p>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Requested: </span> {asset.requestedDate}</p>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Note: </span> {asset?.additionalNote}</p>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Status: </span> {asset?.status}</p>
            <div className="flex items-center justify-center gap-x-4 mt-4 text-white">
              
              {
                asset.status === 'Approved' ? <button className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer" >  Approved This Request  <MdDoneOutline /></button> : <>
                  <button className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer" onClick={() => handleApprove(asset)}>  Approve  <IoMdCloudDone /></button>

                  <button  className="bg-red-500 flex items-center gap-x-2 px-4 py-2 cursor-pointer">  Reject  <RxCross2 className="text-xl" /></button>
                </>
             }
            </div>

          </div>
          )
        }

        {
          allRequests.length === 0 && <h2 className="text-center my-4 font-bold text-xl">No Assets Found</h2>
        }

      </div>
    </div>
  );
};

export default AllRequest;