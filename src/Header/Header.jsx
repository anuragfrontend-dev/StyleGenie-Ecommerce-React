import { Search,Heart } from 'lucide-react';
import { Link,useLocation} from 'react-router-dom';
import './Header.css'
import logo from '../assets/icon/logo.png'
import order from '../assets/icon/order.png'
import cartIcon from '../assets/icon/cart-icon.png'
import { useCart } from '../context/CartContext';
import { useFavourites } from '../context/FavouritesContext';



export default function Header({ search,setSearch }){
  
  const { cart }=useCart();
  const { like }=useFavourites();

  let totalLikeProducts=like.length;

  const location=useLocation();
  const isOnFavourites = location.pathname==='/Favourites';
  const isOnOrders = location.pathname==='/Orders'

  let totalQuantity=cart?.reduce((sum,item)=>sum+item.productQuantity,0)
  
  const handleSearch=(event)=>{
    setSearch(event.target.value);
  }

  return(
    <header className='header'>
      <div className="left-section">
        <Link to="/" className='nav-links'>
          <img src={logo} className='logo' />
          <div className='title-text'>StyleGenie</div>
        </Link>
      </div>
      <div className="middle-section">
        <span className='search-icon'><Search height={22} width={22} color='#9ca3af' /></span>
        <input 
          type="text" 
          placeholder='Search' 
          className='search-bar'
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="right-section">
        <Link to={isOnOrders? '/':'/Orders'} className='nav-links'>
          <img src={order} className='order-icon' />
          <div className='order-text'>Orders</div>
        </Link>
        <Link  to={isOnFavourites? '/':'/Favourites'} className='nav-links counter' >
          <Heart height={20} />
          <div className='fav-text'>Favourites</div>
          {totalLikeProducts >0 && 
          (<div className="likes-count">{totalLikeProducts}</div>)}
        </Link>
        <Link to="/Cart" className='nav-links counter'>
          <div>
            <img src={cartIcon} className='cart-icon' />
            {totalQuantity>0 && 
            (<div className="cart-count">{totalQuantity}</div>)}
          </div>
           <div className='cart-text'>Cart</div>
        </Link>
        <img src={logo} className='profile-pic' />
      </div>
    </header>
  )
}