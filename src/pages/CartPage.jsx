import { Link } from 'react-router-dom';
import { CartHeader } from '../cartHeader/CartHeader';
import { CartProducts } from '../components/CartProducts';
import { PaymentSummary } from '../components/PaymentSummary';

import './CartPage.css';

export function CartPage({ cart, setCart , like,setOrders }) {


  return (
    <div className='cart-page-container'>
      <CartHeader cart={cart} like={like}/>

      <div className="cart-page">
        {cart.length > 0 ?
          '':
          <div>
            <div className='empty-text'>Your cart is empty.</div>
            <Link to="/">
              <button className='view-product'>View Products</button>
            </Link>
          </div>
        }
        <div className='review-text'>Review your order</div>
        <div className="cart-items-container">
          <CartProducts setCart={setCart} cart={cart} />
          <PaymentSummary setCart={setCart} cart={cart} setOrders={setOrders} />
        </div>
      </div>
    </div>
  )
}

