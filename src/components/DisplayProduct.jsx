import { Star, CircleCheck,Heart } from 'lucide-react';
import { money } from '../utiles/money';
import './DisplayProduct.css'
import { useState } from 'react';

export function DisplayProduct({displayProducts,like,setlike,onCart,
  setQuantity,quantity,addedMessageId,setAddedMessageId,search}){

  const handleAddedMessage=(id)=>{
    setAddedMessageId(id);
    setTimeout(()=>{
      setAddedMessageId(null);
    },1000);

  }
  
  const handleSelector=(e,id)=>{
    const val=+e.target.value;
    setQuantity(prev=>({...prev,[id]:val}));
  }

  const handleLike=(id)=>{
    if(like.includes(id)){
      setlike(like.filter((likeId)=>(
        likeId!==id
      )))
    }
    else{
      setlike([...like,id])
    }
  }

  const searchData=displayProducts.filter((displayItem)=>
    displayItem?.title?.toLowerCase().includes(search.toLowerCase())
  )

  return(
    <>
     {searchData.map((product)=>(
        <div className="cart" key={product.id}>
          <img src={product.thumbnail} className='product-img' />
           <Heart height={24} 
              fill={like.includes(product.id)? '#ef4444':'none'}
              color={like.includes(product.id)? '#ef4444':'#dcdcdc'}
              className='heart-icon'
              onClick={()=>{
                handleLike(product.id)
              }}
            />
          <div className="product-details">
            <div className='product-name'>{product.title}</div>
            <div className="content">
              <div className='product-rating'style={{
                background: product.rating>4? '#10b981'
                :product.rating>3? '#f59e0b' :'#ef4444'
                }}>
                {product.rating?.toFixed(1)} <Star color='white' height={18}/>
              </div>
              <select className='product-selector' 
                value={quantity[product.id]||1} 
                onChange={(e)=>handleSelector(e,product.id)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <div className='flex-content'>
              <div className='product-price'>₹{money(product.price).toLocaleString()}</div>
              {product.id===addedMessageId &&(
                <div className='product-added'>
                <CircleCheck height={24} color='#fff' fill='#10b981' />
                Added
              </div>
              )}
            </div>
            <button className='add-to-cart-button' 
              onClick={()=>{
                onCart(
                  product.id,
                  product.thumbnail,
                  product.title,
                  product.price,
                  handleAddedMessage(product.id)
              )}}>
                Add to Cart
            </button>
          </div>
        </div>
      ))}
    </>
  )
}