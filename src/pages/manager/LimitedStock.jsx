import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { useAxiosSecure } from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineBrowserUpdated } from 'react-icons/md';
import Swal from 'sweetalert2';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LimitedStock = () => {
  const {  loading } = useAuth()
  const axiosSecure = useAxiosSecure()
  const { data: limited, refetch } = useQuery({
    queryKey: ['limited'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get('/limitedQuantity')
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
  
  return (
    <div className='my-20'>
      <SectionTitle heading={'Limited Stock'}></SectionTitle>

      <div className="flex justify-center items-center gap-10 flex-wrap">

        {
          limited?.length > 0 && limited.map((asset, idx) => <div key={idx} className="block w-96 p-6  shadow-xl space-y-2">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{asset.productName}</h5>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Type: </span> {asset.productType}</p>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">Quantity: </span> {asset.productQuantity}</p>
            <p className="font-normal text-gray-700 "><span className="text-lg text-[#3085d6] font-bold">date: </span> {asset.date}</p>
            <div className="flex items-center justify-center gap-x-4 mt-4 text-white">
              <Link to={`/assets-list/update/${asset._id}`}><button className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer">  Update <MdOutlineBrowserUpdated className="text-xl" /></button></Link>

              <button onClick={() => handleDelete(asset)} className="bg-[#8264FF] flex items-center gap-x-2 px-4 py-2 cursor-pointer">  Delete <RxCross2 className="text-xl" /></button>
            </div>

          </div>
          )
        }

        {
          limited?.length === 0 && <h2 className="text-center font-bold text-xl">No Asets Found</h2>
        }

      </div>
    </div>
  );
};

export default LimitedStock;