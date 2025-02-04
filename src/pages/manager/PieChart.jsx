
import { Pie } from 'react-chartjs-2'; // Pie component from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // ChartJS element registration
import SectionTitle from '../../shared/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { useAxiosSecure } from '../../hooks/useAxiosSecure';
import { useAuth } from '../../hooks/useAuth';

// ChartJS রেজিস্টার করুন
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const axiosSecure = useAxiosSecure()
  const {  loading } = useAuth()
  const { data: returnable } = useQuery({
    queryKey: ['returnable'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get('/returnableItem')
      return res.data
    }
  })
   
  const { data: nonReturnable } = useQuery({
    queryKey: ['nonReturnable'],
    queryFn: async () => {
      const res = await axiosSecure.get('/nonReturnableItem')
      return res.data
    }
  })


 

  const returnableItems = returnable?.length;  
  const nonReturnableItems = nonReturnable?.length; 

 
  const totalItems = returnableItems + nonReturnableItems;

  
  const returnablePercentage = (returnableItems / totalItems) * 100;
  const nonReturnablePercentage = (nonReturnableItems / totalItems) * 100;

  
  const data = {
    labels: ['Returnable Items', 'Non-Returnable Items'], 
    datasets: [
      {
        data: [returnablePercentage, nonReturnablePercentage], 
        backgroundColor: ['#ff9999', '#66b3ff'],  
        hoverBackgroundColor: ['#ff6666', '#3399ff'], 
      }
    ]
  };

  return (


    <div className='w-[300px] lg:w-[800px] mx-auto my-20'>
      <SectionTitle heading={'Pie Chart'} subHeading={'pie chart for the total percentage of returnable items and non-returnable items requested by the employee.'}></SectionTitle>
     
      <Pie data={data} /> 
    </div>
  );
};

export default PieChart;
