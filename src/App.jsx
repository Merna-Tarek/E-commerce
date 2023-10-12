import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from './Components/Layout/Layout'
import Products from './Components/Products/Products';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import { AuthProvider } from './context/authrntication';
import ProtectedRoute from './Components/Test/Test';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { CartContextProvider } from './context/cartContext';
import { Toaster } from 'react-hot-toast';
import Cart from './Components/Cart/Cart';
import Payement from './Components/Payment/Payement';
import AllOrders from './Components/AllOrders/AllOrders';
import { Offline } from 'react-detect-offline';
import VerfiyCode from './Components/VerfiyCode/VerfiyCode';
import GetPassword from './Components/GetPassword/GetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import WishList from './Components/Wishlist/Wishlist';







const myRouter=createHashRouter([
  {path:'/',element:<Layout/>,children:[

    {index:true,element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'login',element:<Login/>},
    {path:'profile',element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'payment',element:<ProtectedRoute><Payement/></ProtectedRoute>},
    {path:'allorders',element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    { path: "wishList", element: <ProtectedRoute><WishList/></ProtectedRoute> },
    {path:'register',element:<Register/>},
    { path: 'VerfiyCode', element: <VerfiyCode /> },
    { path: 'GetPassword', element: <GetPassword/> },
    { path: 'ResetPassword', element: <ResetPassword/> },
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'*',element:<NotFound/>}

  ]}
])


export default function App() {
  
  let clientQuery=new QueryClient();

  return<>
  
  <QueryClientProvider client={clientQuery}>
    
    <CartContextProvider>
    <AuthProvider>
      <RouterProvider router={myRouter}/>
    </AuthProvider>
    </CartContextProvider>

    <Toaster/>

  </QueryClientProvider>

  <Offline>
    <div className="position-fixed bottom-0 start-0 bg-dark text-white p-3 rounded-3">

      oops you are offline...

    </div>
  </Offline>
 

  </>
}

