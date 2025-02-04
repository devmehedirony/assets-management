import {  useParams } from "react-router-dom";
import SectionTitle from "../../shared/SectionTitle";
import { useForm } from "react-hook-form";
import moment from "moment";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const UpdateAssets = () => {
  const { user } = useAuth()
 const axiosSecure = useAxiosSecure()

  const { id } = useParams()
  
  const { data: updateAssets } = useQuery({
    queryKey: ['updateAssets', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets/individual/${id}`)
      return res.data
    }
  })

  

   const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm()
  
  const onSubmit = async (data) => { 
   

    const assetUpdate = {
          productName: data.productName,
          productType: data.productType,
          productQuantity: parseInt(data.productQuantity),
          email: user?.email,
          date: moment().format('dddd, MMMM Do YYYY'),
          availability: 'Available' 
    }
    
     axiosSecure.patch(`/assets/individual/${updateAssets._id}`, assetUpdate)
          .then(res => {
         
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: `${data.productName}`,
                text: "Updated SuccessFull",
                icon: "success"
              });
            }
        })
  }
  return (
    <div className="min-h-screen my-20">
      <Helmet>
        <title>Update Assets</title>
      </Helmet>
      <SectionTitle heading={'Update Assets'}></SectionTitle>


      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-4">
        <div className="flex items-center gap-x-10 flex-col md:flex-row">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Product Name</legend>
            <input type="text" {...register("productName", { required: true })} defaultValue={updateAssets?.productName} className="input  w-72 md:80" placeholder="Type Product Name" />
            {errors.productName && <span className='text-red-500 mt-1'>Product Name is required</span>}
          </fieldset>

          <fieldset className="fieldset">
            <div className='fieldset-legend  gap-0 flex-col md:flex-row'> <legend className="">Select A Package<span className='text-red-500'>*</span></legend></div>
            <select  {...register("productType", { required: true })} defaultValue={updateAssets?.productType} className="select w-72 md:80">
              <option value='Returnable'>Returnable</option>
              <option value='Non-returnable'>Non-returnable</option>
            </select>
            {errors.productType && <span className='text-red-500 mt-1'>Product Type is required</span>}
          </fieldset>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-x-20">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Product Quantity</legend>
            <input type="number" {...register("productQuantity", { required: true })} defaultValue={updateAssets?.productQuantity} className="input  w-72 md:80 [&::-webkit-inner-spin-button]:appearance-none" placeholder="Type Product Quantity" />
            {errors.productQuantity && <span className='text-red-500 mt-1'>Product Quantity is required</span>}
          </fieldset>
          <div className="mt-6">
            <button className="bg-[#8264FF] text-white py-5 px-14 cursor-pointer">UPDATE ASSETS</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateAssets;