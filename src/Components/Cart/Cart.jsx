import React, { useContext } from "react";
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";



export default function Cart() {
    const {removeCartData,updateCount,cartProducts,totalCartPrice,numOfCartItems,deleteProduct}=useContext(cartContext);

    async function incrementCount(id,count){
        const res  = await updateCount(id,count);
        
        if(res.status==="success"){
            toast.success("Updated successfully")

        }
        else{
            toast.error("Error on updating")

        }


    }

    async function decrementCount(id,count){
        const res  = await updateCount(id,count);
        
        if(res.status==="success"){
            toast.success("Updated successfully")

        }
        else{
            toast.error("Error on updating")

        }


    }

    if(cartProducts===null){
        return (
            <div className="container p-5 my-5 rounded-1" >
                <div className="lightColorBg rounded-3 d-flex flex-column align-items-center justify-content-center p-5">
                <i className="fa-solid fa-cart-plus fa-5x mainColor mb-3"></i>
                <h3>Your Card Is Empty</h3>
                <p>Browse our categories and discover our best deals!</p>
                <Link to={"/Products"} className="btn btn-success text-white">
                    Browse
                </Link>
                </div>
                </div>
            );

    }

    if(numOfCartItems===0){
        return (
            <div className="container p-5 my-5 rounded-1" >
                <div className="lightColorBg rounded-3 d-flex flex-column align-items-center justify-content-center p-5">
                <i className="fa-solid fa-cart-plus fa-5x mainColor mb-3"></i>
                <h3>Your Card Is Empty</h3>
                <p>Browse our categories and discover our best deals!</p>
                <Link to={"/Products"} className="btn btn-success text-white">
                    Browse
                </Link>
                </div>
                </div>
            );
    }
    
    
    
    async function deleteElement(id){

        const res=await deleteProduct(id);
        if(res.status==="success"){
            toast.success("Product Removed")
        }
        else{
            toast.error("Error Occurded")

        }
    }

    async function deleteCart(){
        await removeCartData();
    }

    return <>

    

    <div style={{backgroundColor:"#eee"}}className="container py-5">
    <h2>Shop Cart:</h2>    
    <h5>Total Price: {totalCartPrice}</h5>
    <h5>Total Items: {numOfCartItems}</h5>

    <div className="d-flex justify-content-between">

    <button onClick={deleteCart} className="btn btn-outline-danger">Clear Cart</button>
    <Link to="/payment" className="btn btn-primary">Confirm Payment</Link> 

    </div>

    {cartProducts.map( function (product,idx) 
    {return <div key={idx} className="row my-2 border-bottom border-3 p-2 align-items-center ">
        <div className="col-sm-1">
            <img src={product.product.imageCover} className="w-100" alt={product.product.title}/>

        </div>

        <div className="col-sm-9">
            <h2 className="h6">{product.product.title}</h2>
            <title>{product.product.title}</title>
            <h5 className="h6">Price: {product.price}</h5>
            <button onClick={()=>deleteElement(product.product.id)} className="btn btn-outline-danger">Remove</button>
        </div>

        <div className="col-sm-2">
            <div className="d-flex align-items-center">
                <button onClick={()=>incrementCount(product.product.id , product.count+1)} className="btn btn-outline-success">+</button>
                <span className="mx-2">{product.count}</span>
                <button onClick={()=>decrementCount(product.product.id , product.count-1)} className="btn btn-outline-success">-</button>
            </div>
        </div>

    </div> })}

    </div>
    </>
}
