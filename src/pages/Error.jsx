import { useNavigate } from 'react-router-dom';
import notFound from '../assets/error.png';

const Error = () => {
  const navigate = useNavigate();

  const homeHandelar = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-7">
     
      <h2 className="text-7xl font-bold text-blue-600">SORRY</h2>
      <h4 className="text-4xl font-bold">We couldn&apos;t find that page</h4>
      <p className="text-2xl font-medium">
        Try searching or go to{' '}
        <span className="text-blue-500 cursor-pointer" onClick={homeHandelar}>
          home page
        </span>
      </p>
      <img src={notFound} className="max-w-sm" alt="" />
    </div>
  );
};

export default Error;
