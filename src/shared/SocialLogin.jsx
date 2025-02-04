
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useAxiosPublic } from '../hooks/useAxiosPublic';

const SocialLogin = () => {
  const { createUserWithGoogle } = useAuth()
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()

  const handleGoogle = () => {
      createUserWithGoogle()
        .then(res => {
          const userInfo = {
            email: res?.user?.email,
            name: res?.user?.displayName,
            role: 'employee',
            team: 'none'
          }
          axiosPublic.post('/roles' , userInfo)
            .then(res => {
              navigate('/')
            
          })
         
        })
  }
  
  return (
    <div className='xxl:w-lg flex flex-col items-center justify-center mt-6'>
      <button onClick={handleGoogle} className='flex items-center gap-2 border border-gray-300 py-3 px-6 w-80 justify-center rounded-2xl cursor-pointer'><FcGoogle />Continue With Google</button>
   
      <Link to='/joinAsHrManager' className='text-blue-600 underline font-sm mt-2'>Go To Join As A Hr Manager</Link>

    </div>
  );
};

export default SocialLogin;