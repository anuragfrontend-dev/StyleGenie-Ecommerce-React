import { RefreshCcw } from 'lucide-react';
import Header from "../Header/Header";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'
import { money } from '../utils/money';
import './OrderPage.css'


export function OrderPage({like,cart,orders,setOrders,onCart}){

  const navigate=useNavigate();

  const handleCancelOrder = (id) => {

  const filtered = orders.map((orderItems) => {
    
    const remainingItems = orderItems.items.filter((item) => item.productId !== id);

    const totalAmount = remainingItems.reduce((sum, item) => {
      return sum + (item.productPrice * item.productQuantity)
    }, 0);

    const totalDeliveryCharge = remainingItems.reduce((sum, item) => {
      let deliveryCharge = 0;
      let price = money(item.productPrice);
      if (price <= 200) deliveryCharge = 20;
      else if (price < 1000) deliveryCharge = 40;
      else deliveryCharge = 0;
      
      return sum + (deliveryCharge * item.productQuantity);
    }, 0);

    const beforeTax = money(totalAmount) + totalDeliveryCharge;
    const estimatedTax = (beforeTax / 100) * 10;
    const newAmount = beforeTax + estimatedTax;

    return {
      ...orderItems,
      items: remainingItems,
      totalAmount: newAmount, 
    };
  })
  .filter((orderItems) => orderItems.items.length > 0); 

  setOrders(filtered);
  };

  return(
    <div className='order-page-container'>
      <Header 
        like={like} 
        cart={cart} 
      />
      <div className="orders-container">
        <h1 className="your-orders-text">Your Orders</h1>
        {orders.map((orderItems)=>(
          <div className="order" key={orderItems.orderId}>
          <div className="order-header">
            <div className="left-side">
              <div>
                <div className='order-placed'>Order Placed:</div>
                <div className='order-placed-date'>{dayjs(orderItems.date).format('MMMM D')}</div>
              </div>
              <div>
                <div className='order-total'>Total:</div>
                <div className='order-total-amount'>₹{Math.round(orderItems.totalAmount).toLocaleString()}</div>
              </div>
            </div>
            <div className="right-side">
              <div className="oredr-id-text">Order ID:</div>
              <div className="order-id">{orderItems.orderId}</div>
            </div>
          </div>
          {orderItems.items.map((cartItem=>(
            <div className="order-item" key={cartItem.productId}>
            <img src={cartItem.productImg} className="product-img" />
            <div className="orderItem-details">
              <div className="order-item-name">{cartItem.productName}</div>
             
              {
              dayjs().isSame(dayjs(orderItems.date).add(3,'day'),'day')?
              (<div className='status arrivig-today-status'>Arriving today</div>):
                dayjs().isAfter(dayjs(orderItems.date).add(3,'day'),'day')?
                (<div className='status delivered-status'>Delivered on: <span>{dayjs(orderItems.date).add(3,'day').format('MMMM D')}</span></div>)
                :(<div className='status arriving-today-status'>Arriving on: <span>{dayjs(orderItems.date).add(3,'day').format('MMMM D')}</span></div>)
              }

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
              {dayjs().isAfter(dayjs(orderItems.date).add(3,'day'),'day')?
                (null):<button className='order-btn' onClick={()=>handleCancelOrder(cartItem.productId)}>Cancel order</button>}
            </div>
          </div>
          )))}
        </div>
        ))}
      </div>
    </div>
  )
}