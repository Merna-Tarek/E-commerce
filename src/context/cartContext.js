import axios from "axios";
import toast from "react-hot-toast";
import { createContext, useEffect, useState } from "react";

export const cartContext=createContext();

export function CartContextProvider({children}){

    const[cartProducts,setCartProducts]=useState(null);
    const[totalCartPrice,setTotalCartPrice]=useState(0);
    const[numOfCartItems,setNumOfCartItems]=useState(0);
    const[cartId,setCartID]=useState(null);


    async function addProductToCart(productId){
        try{
            const {data} =await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
        "productId": productId},
        {
            headers:{token:localStorage.getItem('tkn')}
        });

        getUserCart();

        // setNumOfCartItems(data.numOfCartItems);
        // setTotalCartPrice(data.data.totalCartPrice);
        // setCartProducts(data.data.products);

        return data;
        }

        catch(e){
            console.log("error",e);
        }
    }

    async function getUserCart(){

        try{
            const {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token:localStorage.getItem('tkn')
            }
        });
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);
        setCartProducts(data.data.products);
        setCartID(data.data._id)
        }
        catch(e){
            console.log("error",e);
        }

    }

    async function removeCartData(){

        try{
            const {data}=await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token:localStorage.getItem('tkn')
            }
        });
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setCartProducts([]);
        }
        catch(e){
            console.log("error",e);
        }

    }

    async function updateCount(productId,count){
        try {
        const{data} =await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
            "count":count
        },{
            headers:{token:localStorage.getItem('tkn')}
        });

        setCartProducts(data.data.products);
        setNumOfCartItems(data.numOfCartItems);
        setTotalCartPrice(data.data.totalCartPrice);

        return data;
            
        } catch (error) {
            
        }
    }

    async function deleteProduct(productId){
        try {
            const{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers:{token:localStorage.getItem('tkn')}
            })
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setCartProducts(data.data.products);

            return data;
            
        } catch (error) {
            console.log("Error",error);
            
        }
    }

    useEffect(() => {
        if(cartProducts!==null){
            getUserCart()
        }
      }, []);

      function getWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {headers:{token: localStorage.getItem("tkn")}})
        .then((res)=>res
            ).catch((err)=>err)
    }

      function addProducutoWishList(id){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
        {
            productId:id
        },
        {headers:{token: localStorage.getItem("tkn")}}
        ).then((res)=> toast.success(res.data.message)
        ).catch((err)=>toast.error(err.data.message))  
    }

    function deletProductInWishList(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {headers:{token: localStorage.getItem("tkn")}})
    .then((res)=>{toast.success(res.data.message)}
        ).catch((err)=>toast.error(err.data.message))
}






      
    

    return<cartContext.Provider value={{
        getUserCart,
        addProductToCart,
        cartProducts,
        totalCartPrice,
        numOfCartItems,
        deleteProduct,
        updateCount,
        removeCartData,
        cartId,
        setCartProducts,
        setTotalCartPrice,
        setNumOfCartItems,
        deletProductInWishList,
        getWishList,
        addProducutoWishList
        }}>
    
    {children}
    
    </cartContext.Provider>
}