import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../shared/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { Helmet } from "react-helmet-async";


const Payment = () => {
  const stripePromize = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY)
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">

      <Helmet>
        <title>Assets | Payment</title>
      </Helmet>

      <SectionTitle heading={'Payment'}></SectionTitle>
      <div className='w-[500px] my-4'>
        <Elements stripe={stripePromize}>
          <CheckOutForm>

          </CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;