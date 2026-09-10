import Header from "../Header/Header";
import dayjs from 'dayjs'
import { money } from '../utils/money';
import { OrderItems } from '../components/OrderItems';
import './OrderPage.css'


export function OrderPage({like,orders,setOrders}){

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
          <OrderItems 
            orderItems={orderItems} 
            handleCancelOrder={handleCancelOrder}
          />
        </div>
        ))}
      </div>
    </div>
  )
}