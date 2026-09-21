import { Link } from 'react-router-dom';
import { CartHeader } from '../cartHeader/CartHeader';
import { CartProducts } from '../components/CartProducts';
import { PaymentSummary } from '../components/PaymentSummary';
import { useCart } from '../context/CartContext';
import './CartPage.css';


export function CartPage({ setOrders }) {
  const { cart }=useCart()

  return (
    <main className='cart-page-container'>
      <CartHeader />

      <section className="cart-page">
        {cart?.length === 0 ?(
          <div>
            <div className='empty-text'>Your cart is empty.</div>
            <Link to="/">
              <button className='view-product'>View Products</button>
            </Link>
          </div>
        ):(
        <>
          <div className='review-text'>Review your order</div>
          <section className="cart-items-container">
            <CartProducts  />
            <PaymentSummary  setOrders={setOrders} />
          </section>
        </>
        )}
      </section>
    </main>
  )
}

