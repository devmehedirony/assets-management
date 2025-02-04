import { useForm } from 'react-hook-form';
import manager from '../assets/JoinManager.jpg'
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAxiosPublic } from '../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';


const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const JoinManager = () => {
  const { createUser, updatedUser } = useAuth()
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async(data) => {
    const imageFile = { image: data.company_logo[0]}
    const res = await axiosPublic.post(imageHostingApi, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    const company_logo = res.data.data.display_url
    

    if (res.data.success) {
      createUser(data.email, data.password)
        .then(res => {
         

          // update user
          updatedUser(data.name, company_logo)
            .then(res => {

              // now saved data in db
              const userInfo = {
                email: data.email,
                name: data.name,
                company_logo: company_logo,
                selectedPackage: data.selected_package.split('$')[1]
              }
              axiosPublic.post('/roles', userInfo)
                .then(res => {
                
                  if (res.data.
                    insertedId) {
                    Swal.fire({
                      title: "Please Confirm The Payment",
                      text: "RegistraTion Complete",
                      icon: "success"
                    });
                    navigate('/payment')
                  }
                })


            })
        })

    }
   
  }


  

  return (
    <div className='flex items-center  justify-center min-h-screen'>

      <Helmet>
        <title>Join Manager</title>
      </Helmet>
     
      <div>
        {/* name */}
        <form className='xl:w-lg flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset text-base">
            <legend className="fieldset-legend gap-0">your name<span className='text-red-500'>*</span></legend>
            <input type="text" {...register("name", { required: true })} className="input w-72 md:w-96 py-6 border-none bg-gray-400 text-white" placeholder="Enter Your Name" />
            {errors.name && <span className='text-red-500 mt-1'>This field is required</span>}
          </fieldset>
         
          {/* company name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend gap-0 text-base">Company name<span className='text-red-500'>*</span></legend>
            <input type="text" {...register("company_name", { required: true })} className="input  w-72 md:w-96 py-6 border-none bg-gray-400 text-white" placeholder="Enter Mail" />
            {errors.company_name && <span className='text-red-500 mt-1'>This field is required</span>}
          </fieldset>

          {/* your company logo */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend gap-0 text-base">Company Logo<span className='text-red-500'>*</span></legend>
            <input {...register("company_logo", { required: true })} type="file" className="file-input  w-72 md:w-96" />
            {errors.company_logo && <span className='text-red-500 mt-1'>Company Logo required</span>}
          </fieldset>

          {/* email */}

          <fieldset className="fieldset">
            <legend className="fieldset-legend gap-0 text-base">your email<span className='text-red-500'>*</span></legend>
            <input type="text" {...register("email", { required: true })} className="input  w-72 md:w-96 py-6 border-none bg-gray-400 text-white" placeholder="Enter Mail" />
            {errors.email && <span className='text-red-500 mt-1'>This field is required</span>}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend gap-0 text-base">Password<span className='text-red-500'>*</span></legend>
            <input {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} type="text" className="input  w-72 md:w-96 py-6 border-none bg-gray-400 text-white" placeholder="Enter Password" />
            {errors.password && <span className='text-red-500 mt-1'>This field is required</span>}
            {errors.password?.type === "pattern" && (
              <p className='text-red-500 mt-2 font-medium'>Minimun 6 langth Upcase,LowCase,useNum</p>
            )}
          </fieldset>


          <fieldset className="fieldset">
            <legend className="fieldset-legend gap-0 text-base">Date Of Birth<span className='text-red-500'>*</span></legend>
            <input type="date" {...register("dateofBirth", { required: true })} className="input  w-72 md:w-96 py-6 border-none bg-gray-400 text-white" />
            {errors.dateofBirth && <span className='text-red-500 mt-1'>This field is required</span>}
          </fieldset>

          <fieldset className="fieldset">
            <div className='fieldset-legend  gap-0'> <legend className="text-base">Select A Package<span className='text-red-500'>*</span></legend>
            
              {/* modal to details view */}
              {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <button type='button' className="btn bg-[#8264FF] text-white" onClick={() => document.getElementById('my_modal_4').showModal()}>Package Details</button>
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box md:w-11/12 w-64 md:max-w-3xl">
                <div className='flex items-center flex-col md:flex-row justify-center gap-6'>
                   <div className="block  p-6   shadow-xl space-y-2">
                               <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900 ">$5</h5>
                      <p className="font-normal text-gray-700 text-xl">Members <span className="text-lg text-[#3085d6] font-bold"> 5</span></p>
                    </div>
                    
                    <div className="block  p-6   shadow-xl space-y-2">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900  text-center">$8</h5>
                      <p className="font-normal text-gray-700 text-xl">Members <span className="text-lg text-[#3085d6] font-bold"> 10</span></p>
                    </div>

                    <div className="block  p-6   shadow-xl space-y-2">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">$15</h5>
                      <p className="font-normal text-gray-700  text-xl">Members <span className="text-lg text-[#3085d6] font-bold"> 20</span></p>
                    </div>
                </div>



                  <div className="modal-action justify-center ">
                    <form method="dialog">
                      {/* if there is a button, it will close the modal */}
                      <button  className="btn bg-[#8264FF] text-white">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            
            </div>
            <select  {...register("selected_package", { required: true })} className="select w-72 md:w-96">
              <option>$5</option>
              <option>$8</option>
              <option>$15</option>
            </select>
          </fieldset>


          <div className='mt-4'>
            <button type='submit' className='bg-[#8264FF] text-white py-3 px-6 text-xl w-72 md:w-96   cursor-pointer'>SignUp</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinManager;