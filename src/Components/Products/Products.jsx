import axios from 'axios'
import React, { useContext,  useState } from 'react'
import { useQuery } from 'react-query'
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';


export default function Products() {

  const {addProductToCart,addProducutoWishList}=useContext(cartContext);
  const [isClick, setIsClick] = useState({});



  async function addProduct(id){
    //API => logic
    const res=await addProductToCart(id);
    if(res.status==='success'){
      toast.success(res.message,
        {
          duration:2000,

        });
  
    }
    else{
      toast.error(res.message,
        {
          duration:2000,

        });
    }
  }

  function getAllProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  async function aadprtowishList(id){
    let res= await addProducutoWishList(id)
       setIsClick({ ...isClick, [id]: !isClick[id]})
     }

const {data,isLoading} = useQuery("allProducts",getAllProducts);


  return <>
      <Helmet>
            <title>Products</title>
      </Helmet>



  <div className="container py-5"> 
    <div className="row gx-0 mb-5">
      <div className="col-sm-9">
      <HomeSlider/>
      </div>
      <div className="col-sm-3">
        <img style={{width:"100%",height:"200px"}} src={require("../../images/blog-img-1.jpeg")} alt='grocery'/>
        <img style={{width:"100%",height:"200px"}} src={require("../../images/blog-img-2.jpeg")} alt='grocery'/>

      </div>
    </div>

    <CategorySlider/>
    
    <div className="row gy-4">

      {data?.data.data.map( function(product,idx) {

        return <div  key={idx} className="col-md-2">
            <button  onClick={()=>aadprtowishList(product._id,idx)}  className=' border-0 p-2 float-end'>
        
                  <i className= {isClick[product._id] ? 'fa fa-heart active float-end':'fa fa-heart text-main float-end main-color' }  ></i>
                  
            </button>

        <Link to={`/ProductDetails/${product.id}`}>
        <div className="product">
          <img src={product.imageCover} alt="product" className='w-100'/>
          <h6 className='main-color text-center'>{product.category.name}</h6>
          <h5 className='text-center'>{product.title.split(' ').slice(0,2).join("-")}</h5>

          <div className="d-flex justify-content-between align-items-center">
          <p>{product.price} EGP</p>
          <p><span><i className="fa-solid fa-star rating-color"></i></span>{product.ratingsAverage}</p>
          </div>
          

        </div> 
        </Link>
        <button onClick={()=>addProduct(product.id)} className='w-100 p-3 rounded-3 main-bg-color border-white text-white'>+ADD To cart</button>

      </div>
      } )}

    </div>
  </div>

        
  
  
  </>
}
