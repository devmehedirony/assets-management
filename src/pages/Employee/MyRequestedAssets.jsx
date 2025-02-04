import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionTitle from "../../shared/SectionTitle";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const MyRequestedAssets = () => {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()

  const { data: myRequested = [] , refetch} = useQuery({
    queryKey: ['myRequested', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/${user?.email}`)
      return res.data
    }
  })

  const handleDelete = (asset) => {
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
        axiosSecure.delete(`/requests/${asset._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch()
              Swal.fire({
                title: `${asset.requesterName}`,
                text: "Your Request has been deleted.",
                icon: "success"
              });
          }
        })
      }
    });
  }

  const handleReturn = (asset) => {

    const requestId = {
      returnId: asset._id
    }
    
    axiosSecure.patch(`/assets/return/${asset.productId}`, requestId)
      .then(res => {
        
        if (res.data.result.modifiedCount > 0) {
          refetch()
          Swal.fire({
            title: "Return Successfull",
            icon: "success",
            draggable: true
          });
      }
    })
  }

  useEffect(() => {
    axiosSecure.get(`/requests/${user?.email}?search=${search}`)
      .then(res => {
        const searchItem = res.data
        queryClient.setQueryData(["myRequested", user?.email], searchItem);
      })
  }, [axiosSecure, queryClient, search, user?.email])


  const handleStatus = async () => {
    const res = await axiosSecure.get(`/requests/${user?.email}?status=Approved`)
    const filterdData = res.data;
   
    queryClient.setQueryData(["myRequested", user?.email], filterdData);
  }

  const handleType = async () => {
    const res = await axiosSecure.get(`/requests/${user?.email}?type=Returnable`)
    const filterdData = res.data;

    queryClient.setQueryData(["myRequested" , user?.email], filterdData);
  }
  return (
    <div className="min-h-screen w-11/12 lg:w-10/12 mx-auto mt-10 mb-20">
      <Helmet>
        <title>My Requests</title>
      </Helmet>
      <SectionTitle heading={'My Requested Assets'}></SectionTitle>

      <div className="flex justify-center flex-col lg:flex-row  gap-x-32 gap-y-10 items-center my-20">

        {/* search */}
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input onChange={e => setSearch(e.target.value)} type="search" className="grow" placeholder="Search" />

        </label>


        {/* filter */}
        <div className="filter gap-x-2">
          <input className="btn filter-reset" type="radio" name="metaframeworks" aria-label="All" />
          <input onClick={handleStatus} className="btn text-white bg-[#8264FF]" type="radio" name="metaframeworks" aria-label="approved" />
          <input onClick={handleType} className="btn text-white bg-[#8264FF]" type="radio" name="metaframeworks" aria-label="Returnable" />
        </div>
      </div>


      <div className="flex justify-center items-center gap-10 flex-wrap">

        {
          myRequested.length > 0 && myRequested.map((asset, idx) => <div key={idx} className="block w-96 p-6  shadow-xl space-y-2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{asset.productName}</h5>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Type: </span> {asset.productType}</p>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Request Date: </span> {asset.requestedDate}</p>
            {
              asset?.approvalDate && <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Approval Date: </span> {asset?.approvalDate}</p>
           }
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Request Status: </span> {asset.status}</p>
            <div className="flex items-center justify-center gap-x-4 mt-4 text-white">
              {
                asset.status === 'pending' ? <button onClick={() => handleDelete(asset)} className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer">Cancel Request</button> : <>
                  {
                    asset.status === 'Approved' && <Link to={`/printDocument/${asset.productId}`}><button className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer">Print</button></Link>
                  }
                  {
                    asset.productType === 'Returnable' && <button disabled={asset.status === "returned "} onClick={()=>handleReturn(asset)} className="bg-[#8264FF] text-white btn flex items-center gap-x-2 px-4 py-2 cursor-pointer">Return</button>
                }
                </>
              }
            </div>

          </div>
          )
        }

        {
          myRequested.length === 0 && <h2 className="text-center font-bold text-xl">No Asets Found</h2>
        }

      </div>
    </div>
  );
};

export default MyRequestedAssets;