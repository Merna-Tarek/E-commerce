import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { Circles } from 'react-loader-spinner';

export default function CategorySlider() {

    function getAllCategories(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    const{data,isLoading}=useQuery("categorySlider", getAllCategories,{
        refetchOnMount:false
    });

    const settings = {
        dots: true,
        infinite: true,
        autoplay:true,
        autoplayspeed: 1000,
        slidesToShow: 7,
        slidesToScroll: 1
};

if(isLoading){
    return <div className='w-100 d-flex justify-content-center align-items-center'>
    <Circles
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    />
    </div>
}

    return <>
    <div className='my-5'>
    <h2>Categories Slider</h2>
    <Slider {...settings}>

    {data?.data.data.map( function(category,idx) {

        return <div key={idx}>
        <img style={{width:"100%",height:"200px"}} src={category.image} alt="slider"/>
        <h6 className='mt-2'>{category.name}</h6>
        </div>
} )}


    </Slider>
    </div>
    </>
}
