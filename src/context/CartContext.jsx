import { createContext, useContext, useEffect, useReducer } from "react";

export const CartContext=createContext();

const initialState={
  cart:JSON.parse(localStorage.getItem('cart'))||[]
}

function cartReducer(state,action){
  switch (action.type){
    case 'ADD_TO_CART':
      const qty=action.payload.qty||1;
      const newCart={
        productId:action.payload.id,
        productImg:action.payload.thumbnail,
        productName:action.payload.title,
        productPrice:action.payload.price,
        productQuantity:qty
      }
      const existing=state.cart.find(cartItem=>cartItem.productId === action.payload.id);
      if(existing){
        return {
          cart:state.cart.map(cartItem=>
            cartItem.productId===action.payload.id? 
          {...cartItem,productQuantity:cartItem.productQuantity+qty}:cartItem)}
      }
      return {cart:[...state.cart,newCart]}
    
    case 'UPDATE_QUANTITY':
      return{
        cart:state.cart.map(cartItem=>
          cartItem.productId===action.payload.id?
          {...cartItem,productQuantity:Number(action.payload.qty)}:cartItem
        )
      }

    case 'REMOVE_FROM_CART':
      return {
        cart:state.cart.filter((cartItem)=>cartItem.productId!==action.payload.id)
      }
    
    case 'CLEAR_CART':
      return {...state,cart:[]}
    
    default:
      return state;
    
  }
}

export function CartProvider({children}){
  const[state,dispatch]=useReducer(cartReducer,initialState);
  
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(state.cart));
  },[state.cart]);


  return(
    <CartContext.Provider value={{cart:state.cart,dispatch}}>
    {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  const context=useContext(CartContext);
  if(!context){
    throw new Error('Please write all components inside CartProvider');
  }
  return context;
}