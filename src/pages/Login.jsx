import { useForm } from "react-hook-form";
import SocialLogin from "../shared/SocialLogin";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation();
  const {
      register,
      handleSubmit,
      formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then(res => {
        navigate('/');
      }).catch(err => {
     
    })
  }
  
  return (
    <div className='min-h-screen  '>
      <Helmet>
        <title>Login</title>
      </Helmet>
       
    
          <div className="flex justify-center flex-col items-center min-h-screen">
           <h2 className="text-center font-black text-4xl my-10">Login</h2>
            <form className='xl:w-lg flex flex-col items-center' onSubmit={handleSubmit(onSubmit)}>
             
              {/* email */}
    
              <fieldset className="fieldset">
                <legend className="fieldset-legend gap-0 text-base">your email<span className='text-red-500'>*</span></legend>
            <input type="text" {...register("email", { required: true })} className="input  w-72 md:w-96 py-6 border-none bg-gray-400 text-white" placeholder="Enter Mail" />
                {errors.email && <span className='text-red-500 mt-1'>This field is required</span>}
          </fieldset>
          
          {/* password */}
    
              <fieldset className="fieldset">
                <legend className="fieldset-legend gap-0 text-base">Password<span className='text-red-500'>*</span></legend>
            <input {...register("password", { required: true })} type="text" className="input  w-72 md:w-96 py-6 border-none bg-gray-400 text-white" placeholder="Enter Password" />
                {errors.password && <span className='text-red-500 mt-1'>This field is required</span>}
              </fieldset>
    
    
              
             
    
              <div className='mt-4'>
            <button className='bg-[#8264FF] text-white py-3 px-6 text-xl  w-72 md:w-96 cursor-pointer'>Login</button>
              </div>
            </form>
    
            {/* social  */}
           <SocialLogin></SocialLogin>
          </div>
        </div>
  );
};

export default Login;