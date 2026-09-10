import Header from '../Header/Header'
import { FavouritesProducts } from '../components/FavouritesProducts';
import './FavouritesPage.css'

export function FavouritesPage({ like,setlike, products,quantity,setQuantity,
  addedMessageId,setAddedMessageId,search,setSearch }) {

  return (
    <div className='container'>
      <Header
        like={like}
        search={search}
        setSearch={setSearch}
      />

      <div className='like-cart'>
        <FavouritesProducts 
          products={products}
          like={like}
          setlike={setlike}
          quantity={quantity}
          setQuantity={setQuantity}
          addedMessageId={addedMessageId} 
          setAddedMessageId={setAddedMessageId}
          search={search}
        />
      </div>
    </div>
  )
}