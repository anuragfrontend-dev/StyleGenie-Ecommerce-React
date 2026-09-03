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
  const [isLoading,setIsLoading]=useState(true);
  const[like,setlike]=useState(JSON.parse(localStorage.getItem('like'))||[]);
  const[quantity,setQuantity]=useState({});
  const[cart,setCart]=useState(JSON.parse(localStorage.getItem('cart'))||[]);
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
    } finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    getData()
  },[])

   const handleCart=(id,thumbnail,title,price)=>{
    const qty=quantity[id]||1;
    const newCart={
      productId:id,
      productImg:thumbnail,
      productName:title,
      productPrice:price,
      productQuantity:qty
    }
    setCart(prev=>{
      const existing = prev.find((cartItem)=>{
        return(cartItem.productId===id)
      })

      if(existing){
        return prev.map((cartItem)=>(
          cartItem.productId===id?
          {...cartItem,productQuantity:cartItem.productQuantity+qty}:cartItem
        ))
      }
      return [...prev,newCart]
    })

  }

  useEffect(()=>{
    localStorage.setItem('like',JSON.stringify(like));
  },[like])

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart));
  })

  useEffect(()=>{
    localStorage.setItem('orders',JSON.stringify(orders));
  })
  
  
  return(
    <Routes>
      <Route path='/' element={<HomePage 
        products={products} 
        setProducts={setProducts} 
        displayProducts={displayProducts}
        setDisplayProducts={setDisplayProducts}
        like={like}
        setlike={setlike}
        setCart={setCart}
        cart={cart}
        onCart={handleCart}
        setQuantity={setQuantity}
        quantity={quantity}
        cart={cart}
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
        cart={cart}
        onCart={handleCart}
        quantity={quantity}
        setQuantity={setQuantity}
        setAddedMessageId={setAddedMessageId}
        addedMessageId={addedMessageId}
        setSearch={setSearch}
        search={search}
      />} 
      />

      <Route path='/Cart' element={<CartPage 
        cart={cart}
        setCart={setCart}
        like={like}
        orders={orders}
        setOrders={setOrders}
      />} 
      />
      <Route path='/Orders' element={<OrderPage
        like={like} 
        cart={cart}
        orders={orders}
        setOrders={setOrders}
        onCart={handleCart}
      />} 
      />
      <Route path='/Orders/:orderId/track/:productId' element={ <TrackingPage
        like={like} 
        cart={cart}
        orders={orders}
      />}
      />

    </Routes>
  )
}