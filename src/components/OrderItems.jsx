import { RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getDeliveryProgress } from '../utils/delivery';
import dayjs from "dayjs"
import './OrderItems.css'

export function OrderItems({orderItems,onCart,handleCancelOrder}){

  const navigate=useNavigate();

  const { percent, deliveryDate }=getDeliveryProgress(orderItems.date);

  let deliveryStatus;

  if(percent>=100){
    deliveryStatus=<div className='status'>Delivered on: <span>{deliveryDate.format('MMMM D')}</span></div>
  }
  else if(dayjs().isSame(deliveryDate,'day')){
    deliveryStatus=<div className='status order-arriving-today-status'>Arriving today</div>
  }
  else{
    deliveryStatus=<div className='status'>Arriving on: <span>{deliveryDate.format('MMMM D')}</span></div>
  }

  return(
    <>
    {orderItems.items.map((cartItem=>(
        <div className="order-item" key={cartItem.productId}>
        <img src={cartItem.productImg} className="product-img" />
        <div className="orderItem-details">
          <div className="order-item-name">{cartItem.productName}</div>
          
          {deliveryStatus}

          <div className="order-quantity">Quantity:
            <span>{cartItem.productQuantity}</span></div>
          <button className="buy-it-again" onClick={()=>{
            onCart(
              cartItem.productId,
              cartItem.productImg,
              cartItem.productName,
              cartItem.productPrice,
            )
          }}>
            <RefreshCcw color='#FFF' height='20px' />
          Buy it again
          </button>
        </div>
        <div className="tracking-cancel-items-button">
          <button className='tracking-btn' onClick={()=>{
            navigate(`/orders/${orderItems.orderId}/track/${cartItem.productId}`)
          }}>Track package</button>
          {percent>=100?
            (null):<button className='order-btn' onClick={()=>handleCancelOrder(cartItem.productId)}>Cancel order</button>}
        </div>
      </div>
      )))}
    </>
  )
}