import { money } from "../utiles/money"
import './CartProducts.css'

export function CartProducts({setCart,cart}) {

  const updateQuantity=(id,newQuantity)=>{
    setCart(prevCart=> prevCart.map((cartItem)=>(
      cartItem.productId===id ? {...cartItem,productQuantity:Number(newQuantity)}: cartItem
    )))
  }

  const handleRemoveItem=(id)=>{
    const filtered=cart.filter((cartItem)=>{
      return(cartItem.productId!==id)
    })
    setCart(filtered);
  }

  return (
    <div className="cart-items">
      {cart.map((cartItem) => (
        <div className="cart-item" key={cartItem.productId}>
          <img src={cartItem.productImg} className='cart-item-img' />
          <div className="cart-item-details">
            <div className='cart-item-name'>{cartItem.productName}</div>
            <div className='cartItem-price'>₹{money(cartItem.productPrice).toLocaleString()}</div>
            <div className='details'>
              <div>Quantity:{cartItem.productQuantity}
                <select value={cartItem.productQuantity} onChange={(e) => {
                  updateQuantity(cartItem.productId, e.target.value)
                }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <button className='remove-buttom'
                onClick={() => {
                  handleRemoveItem(cartItem.productId)
                }}>remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}