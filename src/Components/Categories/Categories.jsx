import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Circles } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
export default function Categories() {
  function getAllCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let { isLoading, data, isError, error } = useQuery("allcategories", getAllCategories, {
    cacheTime: 3000

  })
  console.log(data);
  if (isError) {
    return <h1>{error.response.data.message}</h1>
  }


  return (
    <>

    <Helmet>
    <title>Categories</title>
    </Helmet>

      <div className="container">

        {isLoading === false ? <div className="row ">
          {data?.data.data.map((cat) => <div className="col-md-4 text-center" key={cat._id}>

            <div className="">
              <img src={cat.image
              } alt="" height={200} className='w-75  p-2' />
              <p className='text-main'>{cat.name}</p>



            </div>
          </div>
          )}

        </div> : <div className=' d-flex justify-content-center  '> <Circles
          height="50%"
          width="50%"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /></div>}

      </div>

    </>)
}
