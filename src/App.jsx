import { Routes,Route } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { HomePage } from './pages/HomePage'
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { OrderPage } from './pages/OrderPage';
import { TrackingPage } from './pages/TrackingPage';

import './App.css'

export default function App() {
  const [products,setProducts]=useState([]);
  const[displayProducts,setDisplayProducts]=useState([]);
  const[like,setlike]=useState(JSON.parse(localStorage.getItem('like'))||[]);
  const[quantity,setQuantity]=useState({});
  const[addedMessageId,setAddedMessageId]=useState(null);
  const[orders,setOrders]=useState(JSON.parse(localStorage.getItem('orders'))||[]);
  const[search,setSearch]=useState('')

  async function getData(){
    try{
      const resopnse=await axios.get(`https://dummyjson.com/products?limit=200`);
      await setProducts(resopnse.data.products)
      await setDisplayProducts(resopnse.data.products);

    } catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  useEffect(()=>{
    localStorage.setItem('like',JSON.stringify(like));
  },[like])

  useEffect(()=>{
    localStorage.setItem('orders',JSON.stringify(orders));
  },[orders])
  
  
  return(
    <Routes>
      <Route path='/' element={<HomePage 
        products={products} 
        setProducts={setProducts} 
        displayProducts={displayProducts}
        setDisplayProducts={setDisplayProducts}
        like={like}
        setlike={setlike}
        setQuantity={setQuantity}
        quantity={quantity}
        addedMessageId={addedMessageId}
        setAddedMessageId={setAddedMessageId}
        setSearch={setSearch}
        search={search}
        />}
         />
      <Route path='/Favourites' element={<FavouritesPage 
        like={like}
        setlike={setlike}
        products={products}
        quantity={quantity}
        setQuantity={setQuantity}
        setAddedMessageId={setAddedMessageId}
        addedMessageId={addedMessageId}
        setSearch={setSearch}
        search={search}
      />} 
      />

      <Route path='/Cart' element={<CartPage 
        like={like}
        orders={orders}
        setOrders={setOrders}
      />} 
      />
      <Route path='/Orders' element={<OrderPage
        like={like} 
        orders={orders}
        setOrders={setOrders}
      />} 
      />
      <Route path='/Orders/:orderId/track/:productId' element={ <TrackingPage
        like={like} 
        orders={orders}
      />}
      />

    </Routes>
  )
}