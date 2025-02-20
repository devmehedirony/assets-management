import { useQuery, useQueryClient } from "@tanstack/react-query";
import SectionTitle from "../../shared/SectionTitle";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const RequestAssets = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('')
  const { user } = useAuth()
  const [text, setText] = useState('')


  const { data: allAssets = [] } = useQuery({
    queryKey: ['allAssets'],
    queryFn: async() => {
      const res = await axiosSecure.get('/assets')
      return res.data
    }
  })

  useEffect(() => {
      axiosSecure.get(`/assets?search=${search}`)
        .then(res => {
          const searchItem = res.data
        
          queryClient.setQueryData(["allAssets"], searchItem);
      })
    },[axiosSecure, queryClient, search])
    
  
    const handleStatus = async() => {
      const res = await axiosSecure.get(`/assets?available=Available`)
      const filterdData = res.data; 
    
      queryClient.setQueryData(["allAssets"], filterdData);
    }
  
    const handleType = async() => {
      const res = await axiosSecure.get(`/assets?type=Returnable`)
      const filterdData = res.data;
  
      queryClient.setQueryData(["allAssets"], filterdData);
  }
  
  
  const handleRequest = async (asset) => {
    const requestedData = {
      productName: asset.productName,
      productType: asset.productType,
      requesterMail: user?.email,
      requesterName: user?.displayName,
      requestedDate: moment().format('dddd, MMMM Do YYYY'),
      additionalNote: text,
      productId: asset._id,
      status: 'pending',
    }
    const res = await axiosSecure.post('/requests', requestedData)
    if (res.data.insertedId) {
      Swal.fire("Your Request is pending");
    }
    if (res.data.modifiedCount > 0) {
      Swal.fire("Your Request is pending");
    }
  }


  
  
  return (
    <div className="min-h-screen w-11/12 lg:w-10/12 mx-auto my-20">
      <Helmet>
        <title>Requests Assets</title>
      </Helmet>
      <SectionTitle heading={'All Assets'}></SectionTitle>
      <div className="flex justify-center  flex-col lg:flex-row  gap-x-32 gap-y-10 items-center  my-10">

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
          allAssets.length > 0 && allAssets.map((asset, idx) => <div key={idx} className="block w-96 p-6  shadow-xl space-y-2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight  dark:text-white">{asset.productName}</h5>
            <p className="font-normal "><span className="text-lg text-[#3085d6] font-bold">Type: </span> {asset.productType}</p>
            <p className="font-normal "><span className="text-lg text-[#3085d6] font-bold">Availability: </span> {asset.availability}</p>
            <div className="flex items-center justify-center gap-x-4 mt-4 text-white">

              {/* Open the modal using document.getElementById('ID').showModal() method */}
              {
                asset.availability === 'Available' && <button className="bg-[#8264FF] flex items-center gap-x-2 btn px-4 py-2 text-white cursor-pointer" onClick={() => document.getElementById(`modal_${asset._id}`).showModal()} >Request</button>
            }
              <dialog id={`modal_${asset._id}`} className="modal">
                <div className="modal-box place-items-center">
                  <h3 className="font-bold text-lg text-black mb-3">Additional notes</h3>
                  <textarea onChange={e => setText(e.target.value)} className="textarea text-black w-96" placeholder="Additional Note"></textarea>
                  <div className="modal-action justify-center">
                    <form method="dialog" className="flex items-center gap-2">

                      {/* if there is a button in form, it will close the modal */}
                      <button className="bg-red-500 flex items-center gap-x-2 px-4 py-2 cursor-pointer">cancel</button>
                      <button onClick={() => handleRequest(asset)} className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer">Confirm Request</button>
                     
                    </form>
                  </div>
                </div>
              </dialog>
            </div>

          </div>
          )
        }

        {
          allAssets.length === 0 && <h2 className="text-center my-4 font-bold text-xl">No Asets Found</h2>
        }

      </div>
    </div>
  );
};

export default RequestAssets;