import axios from 'axios';
import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Payement() {

    const {cartId,setCartProducts,setTotalCartPrice,setNumOfCartItems} = useContext(cartContext);

    async function confirmCashPayment(){

        const phoneValue= document.querySelector("#phone").value;

        const cityValue= document.querySelector("#city").value;

        const detailsValue= document.querySelector("#details").value;

        const shippingAddress={
        "shippingAddress":{
            "details": detailsValue,
            "phone": phoneValue,
            "city": cityValue
            }
    }

    try {

        const {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,
        {
            headers:{token:localStorage.getItem('tkn')}

        }
        )
        if(data.status==="success"){
            toast.success("Order succssfully initalized");

            setCartProducts([]);
            setNumOfCartItems(0);
            setTotalCartPrice(0);
            
        }
        else{
            toast.error("Error On creating order")

        }

        
    } catch (error) {
        console.log("Error",error);
    }
    
        
    }

    async function confirmOnlinePayment(){
        const phoneValue= document.querySelector("#phone").value;

        const cityValue= document.querySelector("#city").value;

        const detailsValue= document.querySelector("#details").value;

        const shippingAddress={
        "shippingAddress":{
            "details": detailsValue,
            "phone": phoneValue,
            "city": cityValue
            }
    }
        try {

           const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
            shippingAddress,
            {
                headers: {token:localStorage.getItem('tkn')},

                params:{url:"http://localhost:3000"}
            }
            );
            window.open(data.session.url,"_blank");
        } catch (error) {

            console.log("Error",error);
            
        }

    }





    return <>

        <Helmet>
            <title>Payment</title>
        </Helmet>



    <div className="container py-5">

        <form>

            <label htmlFor="">Phone: </label>
            <input id='phone' type='tel' placeholder='Phone' className=' mb-3 form-control'/>

            <label htmlFor="">City: </label>
            <input id='city' type='text' placeholder='City' className=' mb-3 form-control'/>

            <label htmlFor="">Details: </label>
            <textarea id='details' type='text' placeholder='Details' className=' mb-3 form-control'></textarea>

            <button type='button' onClick={confirmCashPayment} className="btn btn-primary">Confirm Cash Payment</button> 
            <button type='button'  onClick={confirmOnlinePayment} className="btn btn-primary mx-5">Confirm Online Payment</button>



        </form>


    </div>
    
    </>
}
