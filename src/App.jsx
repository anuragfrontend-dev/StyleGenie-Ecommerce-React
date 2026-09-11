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
    localStorage.setItem('orders',JSON.stringify(orders));
  },[orders])
  
  
  return(
    <Routes>
      <Route path='/' element={<HomePage 
        products={products} 
        setProducts={setProducts} 
        displayProducts={displayProducts}
        setDisplayProducts={setDisplayProducts}
        setQuantity={setQuantity}
        quantity={quantity}
        addedMessageId={addedMessageId}
        setAddedMessageId={setAddedMessageId}
        setSearch={setSearch}
        search={search}
        />}
         />
      <Route path='/Favourites' element={<FavouritesPage 
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
        orders={orders}
        setOrders={setOrders}
      />} 
      />
      <Route path='/Orders' element={<OrderPage
        orders={orders}
        setOrders={setOrders}
      />} 
      />
      <Route path='/Orders/:orderId/track/:productId' element={ <TrackingPage
        orders={orders}
      />}
      />

    </Routes>
  )
}