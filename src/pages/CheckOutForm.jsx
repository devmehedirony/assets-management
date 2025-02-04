import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useAxiosSecure } from "../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [transectionId, setTransectionId] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const { data: paymentAmount ,refetch} = useQuery({
    queryKey: ['paymentAmount'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/manager/${user?.email}`)
      return res.data
    }
  })

  useEffect(() => {
    if (paymentAmount) {
      axiosSecure.post('/create-payment-intent', { package: paymentAmount?.selectedPackage })
        .then(res => {
         
          setClientSecret(res.data.clientSecret)
        })
    }
  }, [axiosSecure, paymentAmount, paymentAmount?.selectedPackage])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)

    if (card === null) {
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if (error) {
   
      setError(error.message)
    }
    else {
   
      setError('')
    }

    // payment confirm
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        }


      }
    })

    if (confirmError) {
    
    }

    else {

      if (paymentIntent.status === 'succeeded') {
        setTransectionId(paymentIntent.id)

       const amountConvert = paymentIntent.amount / 100 
        
        // now save the payment to the database

        const payment = {
          amount: amountConvert,
          transectionId: paymentIntent.id,
          role: 'manager',
          addLimit: amountConvert === 5 ? 5 : amountConvert === 8 ? 10 : amountConvert === 15 ? 20 : 0,
         
        }

        const res = await axiosSecure.patch(`/payment/manager/${user.email}`, payment)
       
     
      
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            title: `${user.displayName}`,
            text: "Payment SuccessFull",
            icon: "success"
          });
          navigate('/')
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />

      <div className="text-center">
        <button className='bg-[#8264FF] py-2 px-8 mt-8 text-white btn' type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </div>

      <p className='text-red-500 mt-2'>{error}</p>
      {transectionId && <p className='text-green-500 mt-2'>your transection id {transectionId}</p>}
    </form>
  );
};

export default CheckOutForm;