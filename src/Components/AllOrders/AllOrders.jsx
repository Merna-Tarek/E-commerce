import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";




export default function AllOrders() {

    const [userOrders, setUserOrders] = useState(null);


    useEffect(() => {
    const { id } = jwtDecode(localStorage.getItem("tkn"));
    getOrders(id);
    }, []);


    async function getOrders(id) {
    try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        { headers: { token: localStorage.getItem("tkn") } }
        );
        console.log(data);
        setUserOrders(data);
        } catch (error) {
            console.log("Error");
    }
}

if(userOrders===null){

    return <div className='w-100 d-flex justify-content-center align-items-center'>
        <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        </div>


}

return <>

<Helmet>
    <title>AllOrders</title>
</Helmet>

<div className="container">
    <div className="row g-4">


        {userOrders.map(function(order,idx){

            return <div key={idx} className="col-md-6">

            <div className="order bg-info rounded-4 p-3">

                <div className="container">

                    <div className="row">

                    {order.cartItems?.map(function(item,index){
                    return <div key={index} className="col-sm-4">

                    <div key={index} className="bg-danger my-1">

                        
                    <img src={item.product.imageCover} className="w-100 item-center" alt="item.title"/>

                    <div className="detailes text-center">

                    <h6>{item.product.title.split(' ').slice(0,2).join(" ")}</h6>

                    <p>count: {item.count}</p>

                    <p>price: {item.price}</p>

                    </div>
                    </div>    

                    </div>
                })}

                    </div>

                </div>

                

                <p>Order sent to user with phone {order.shippingAddress.phone} and with details {order.shippingAddress.details} at {order.shippingAddress.city}
                </p>

                <h6>Payement method: {order.paymentMethodType}</h6>
                <h6>Total price: {order.totalOrderPrice}</h6>

            </div>

        </div>


        })}
        
    </div>
</div>


</>
}