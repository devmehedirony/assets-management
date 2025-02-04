
import employee from '../assets/JoinEmployee.jpg'
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import SocialLogin from '../shared/SocialLogin';
import { useAxiosPublic } from '../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';



const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

const JoinEpoyee = () => {

  const { createUser , updatedUser } = useAuth()
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()

  
 
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    
    const imageFile = { image: data.photo[0] }
    const res = await axiosPublic.post(imageHostingApi, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    const photo = res.data.data.display_url

    if (res.data.success) { 
      createUser(data.email, data.password)
        .then(res => {
        

          // update user
          updatedUser(data.name, photo)
            .then(res => {
             
              const userInfo = {
                email: data.email,
                name: data.name,
                role: 'employee',
                image: photo,
                team: 'none'
              }
              axiosPublic.post('/roles', userInfo)
                .then(res => {
                  // successful msg
                  Swal.fire("REGISTRATION COMPLETE");
                  navigate('/')
                })

            })
        })
        .catch(err => {
         
        })
    }

    
  }


  
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <Helmet>
        <title>Join Employee</title>
      </Helmet>

      <div>
        {/* name */}
        <form className='xl:w-lg flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset text-base">
            <legend className="fieldset-legend gap-0 text-base">your Name<span className='text-red-500'>*</span></legend>
            <input type="text" {...register("name", { required: true })} className="input w-72 md:w-96 py-6 border-none bg-gray-400 text-white" placeholder="Enter Your Name" />
            {errors.name && <span className='text-red-500 mt-1'>This field is required</span>}
          </fieldset>

          {/* photo */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend gap-0 text-base">photo<span className='text-red-500'>*</span></legend>
            <input {...register("photo", { required: true })} type="file" className="file-input w-72 md:w-96" />
            {errors.photo && <span className='text-red-500 mt-1'>photo is required</span>}
          </fieldset>

          {/* email */}

          <fieldset className="fieldset">
            <legend className="fieldset-legend gap-0 text-base">your email<span className='text-red-500'>*</span></legend>
            <input type="text" {...register("email", { required: true })} className="input w-72 md:w-96 py-6 border-none bg-gray-400 text-white" placeholder="Enter Mail" />
            {errors.email && <span className='text-red-500 mt-1'>This field is required</span>}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend gap-0 text-base">Password<span className='text-red-500'>*</span></legend>
            <input {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} type="text" className="input w-72 md:w-96 py-6 border-none bg-gray-400 text-white" placeholder="Enter Password" />
            {errors.password && <span className='text-red-500 mt-1'>This field is required</span>}
            {errors.password?.type === "pattern" && (
              <p className='text-red-500 mt-2 font-medium'>Minimun 6 langth Upcase,LowCase,useNum</p>
            )}
          </fieldset>


          <fieldset className="fieldset">
            <legend className="fieldset-legend gap-0 text-base">Date Of Birth<span className='text-red-500'>*</span></legend>
            <input type="date" {...register("dateofBirth", { required: true })} className="input w-72 md:w-96 py-6 border-none bg-gray-400 text-white" />
            {errors.dateofBirth && <span className='text-red-500 mt-1'>This field is required</span>}
          </fieldset>
         

          <div className='mt-4'>
            <button className='bg-[#8264FF] text-white py-3 px-6 text-xl w-72 md:w-96 cursor-pointer'>SignUp</button>
          </div>
        </form>

        {/* social  */}
      <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default JoinEpoyee;