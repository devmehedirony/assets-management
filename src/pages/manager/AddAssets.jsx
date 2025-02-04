import { useForm } from "react-hook-form";
import SectionTitle from "../../shared/SectionTitle";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import moment from "moment";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const AddAssets = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => { 

    const assetPost = {
      productName: data.productName,
      productType: data.productType,
      productQuantity: parseInt(data.productQuantity),
      email: user?.email,
      date: moment().format('dddd, MMMM Do YYYY'),
      availability: 'Available' 
    }
    
    axiosSecure.post('/assets', assetPost)
      .then(res => {
        
        if (res.data.insertedId) {
          Swal.fire({
            title: `${user.displayName}`,
            text: "Assets Added",
            icon: "success"
          });
        }
    })
  }
  return (
    <div className="min-h-screen my-20">
      <Helmet>
        <title>Add Assets</title>
      </Helmet>
      <SectionTitle heading={'Add Aseets'}></SectionTitle>


      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-4">
        <div className="flex items-center gap-x-10 flex-col md:flex-row">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Product Name</legend>
            <input type="text" {...register("productName", { required: true })} className="input w-72 md:w-80" placeholder="Type Product Name" />
            {errors.productName && <span className='text-red-500 mt-1'>Product Name is required</span>}
          </fieldset>

          <fieldset className="fieldset">
            <div className='fieldset-legend  gap-0'> <legend className="">Select A Package<span className='text-red-500'>*</span></legend></div>
            <select  {...register("productType", { required: true })} className="select  w-72 md:w-80">
              <option value='' selected>select product type</option>
              <option value='Returnable'>Returnable</option>
              <option value='Non-returnable'>Non-returnable</option>
            </select>
            {errors.productType && <span className='text-red-500 mt-1'>Product Type is required</span>}
          </fieldset>
        </div>
        <div className="flex items-center flex-col md:flex-row gap-x-20">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Product Quantity</legend>
            <input type="number" {...register("productQuantity", { required: true })} className="input  w-72 md:w-80 [&::-webkit-inner-spin-button]:appearance-none" placeholder="Type Product Quantity" />
            {errors.productQuantity && <span className='text-red-500 mt-1'>Product Quantity is required</span>}
          </fieldset>
          <div className="mt-6">
            <button className="bg-[#8264FF] text-white py-5 px-14  cursor-pointer">ADD ASSETS</button>
     </div>
        </div>
      </form>
    </div>
  );
};

export default AddAssets;