import { Link } from 'react-router-dom';
import { Heart,Lock } from 'lucide-react';
import logo from '../assets/icon/logo.png';
import { useCart } from '../context/CartContext';
import './CartHeader.css'


export function CartHeader({ like }){

  const { cart }=useCart();
  
  const totalLikeProducts=like.length;

  const totalQuantity=cart.reduce((sum,cartItems)=>(sum+cartItems.productQuantity),0)

  return(
    <div className="cart-header">
      <div className="left-cart-section">
        <Link to="/" className='cart-nav-link'>
          <img src={logo} className='cart-logo' />
          <div className='cart-title'>StyleGenie</div>
        </Link>
      </div>
      <div className="middle-cart-section">
        <Link to="/">
          <div className='checkout'>Checkout(<span>{totalQuantity} items</span>)</div>
        </Link>
      </div>
      <div className="right-cart-section">
        <Link to='/Favourites' className='cart-likes  cart-nav-link'>
           <Heart height={20}/>
           <div className="cart-likes-count">{totalLikeProducts}</div>
           <div className='cart-fav-text'>Favourites</div>
        </Link>
        <Lock height={20} />
      </div>
    </div>
  )
}