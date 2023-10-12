import axios from "axios";
import React, { useContext, useState } from "react";
import { Bars, ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { addProductToCart,addProducutoWishList } = useContext(cartContext);
  const  [toggleHeart, setToggleHeart] = useState(false);
  const [sendingLoader, setsendingLoader] = useState(false);


  const { id } = useParams();

  async function addProduct(id) {
    setsendingLoader(true);
    //API => logic
    const res = await addProductToCart(id);
    if (res.status === "success") {
      toast.success(res.message, {
        duration: 2000,
      });
    } else {
      toast.error("Error happenned");
    }
    setsendingLoader(false);
  }

  async function aadprtowishList(id){
    await addProducutoWishList(id);
    setToggleHeart(!toggleHeart)
   }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, isLoading } = useQuery("productDetails", getProductDetails);

  if (isLoading) {
    return (
      <div className="w-100 d-flex justify-content-center align-items-center">
        <ColorRing
          visible={true}
          height="40"
          width="40"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return <>

    <Helmet>
      <h1>ProductDetails</h1>
    </Helmet>
  
    <div className="container py-5">

      <div className="row align-items-center">

        <div className="col-md-3">

          <figure>

            <img className="w-100" src={data.data.data.imageCover} alt={data.data.data.title}/>

          </figure>



        </div>

        <div className="col-md-9 text-center">

          <div className="details">

            <h1>{data.data.data.title}</h1>
            <button onClick={()=>aadprtowishList(data?.data.data.id)} className='btn border-0 float-end'> 
            <i className={toggleHeart!==false ? 'fa fa-heart active' : 'fa fa-heart'}></i></button>
            <p className="text-muted">{data.data.data.description}</p>
            <h5>Price: {data.data.data.price} EGP</h5>
            <button onClick={()=>addProduct(data.data.data.id)} className="w-100 p-3 mb-3 rounded-3 main-bg-color border-white text-white">+ ADD TO CART</button>


          </div>


        </div>


      </div>
    
  </div>
  </>
}