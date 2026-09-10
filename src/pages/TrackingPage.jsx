import { Link, useParams } from 'react-router-dom'
import { CircleCheck } from 'lucide-react'
import Header from '../Header/Header'
import { getDeliveryProgress } from '../utils/delivery'
import dayjs from 'dayjs'


import './TrackingPage.css'
export function TrackingPage({ like, orders }) {

  const { orderId, productId } = useParams();

  const currentOrder = orders?.find(o => o.orderId === orderId);
  
  const currentProduct = currentOrder?.items.find(p => p.productId === Number(productId));

  const result=getDeliveryProgress(currentOrder.date);

  const{ percent,deliveryDate }=result;
  
  const deliveryDateText=deliveryDate.format('dddd, MMMM D')

  
  let deliveryStatus;

  if(percent>=100){
    deliveryStatus= <h2 className='delivery-date delivered-status'>Delivered on <span>{deliveryDateText}</span></h2>
  }else if(dayjs().isSame(deliveryDate,'day')){
    deliveryStatus= <h2 className='delivery-date tracking-arriving-today-status'>Arriving today</h2>
  }
  else {
    deliveryStatus= <h2 className='delivery-date'>Arriving on <span>{deliveryDateText}</span></h2>
  }

  return (
    <div className="tracking-page-container">
      <Header
        like={like}
      />
      <div className="tracking-content">
        <Link to={'/Orders'}>
          <button className='view-orders'>View all Orders</button>
        </Link>

        {deliveryStatus}

        <div className='tracking-product-name'>{currentProduct.productName}</div>
        <div className='tracking-product-quantity'>Quantity: <span>{currentProduct.productQuantity}</span></div>
        <div className='tracking-product-img'>
          <img src={currentProduct.productImg} />
        </div>
        <div className='tracking-status-container'>
          <div className='tracking-status-names'>
            <div className='tracking-status-name'>{percent>10? 
              (<><CircleCheck fill='green' color='#fff' /><span>Prepared</span></>)
              :(<span>Preparing</span>)}</div>
            <div className='tracking-status-name'>{percent>=40? 
              (<><CircleCheck fill='green' color='#fff' /> <span>Shipped</span></>)
              :('Shipped')}</div>
            <div className='tracking-status-name'>{percent>75? 
              (<><CircleCheck fill='green' color='#fff' /> <span>Out for delivery</span></>)
              :('Out for delivery')}</div>
            <div className='tracking-status-name'>{percent>=100? 
              (<><CircleCheck fill='green' color='#fff' /> <span>Delivered</span></>)
              :('Delivered')}</div>
          </div>
          <div className='tracking-status'>
            <div className="progress-bar" style={{width:`${percent}%`}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}