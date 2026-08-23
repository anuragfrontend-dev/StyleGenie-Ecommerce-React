import { RefreshCcw } from 'lucide-react';
import Header from "../components/Header";
import dayjs from 'dayjs'
import productImg from '../assets/product-img/cotton-bath-towels-teal.webp'
import './OrderPage.css'


export function OrderPage({like,cart,orders,setOrders}){
  console.log()
  return(
    <div className='order-page-container'>
      <Header 
        like={like} 
        cart={cart} 
      />
      <div className="orders-container">
        <h1 className="your-orders-text">Your Orders</h1>
        {orders.map((orderItems)=>(
          <div className="order" key={orderItems.id}>
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
            <div className="order-item">
            <img src={cartItem.productImg} className="product-img" />
            <div className="orderItem-details">
              <div className="order-item-name">{cartItem.productName}</div>
              <div className="arriving-on">Arriving on:
                <span>{dayjs(orderItems.date).add(3,'day').format('MMMM D')}</span></div>
              <div className="order-quantity">Quantity:
                <span>{cartItem.productQuantity}</span></div>
              <button className="buy-it-again">
                <RefreshCcw color='#FFF' height='20px' />
              Buy it again
              </button>
            </div>
            <div className="tracking-cancel-items-button">
              <button className='tracking-btn'>Track package</button>
              <button className='order-btn'>Cancel order</button>
            </div>
          </div>
          )))}
        </div>
        ))}
      </div>
    </div>
  )
}