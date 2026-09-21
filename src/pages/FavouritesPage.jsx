import Header from '../Header/Header'
import { FavouritesProducts } from '../components/FavouritesProducts';
import './FavouritesPage.css'

export function FavouritesPage({ products,quantity,setQuantity,
  addedMessageId,setAddedMessageId,search,setSearch }) {

  return (
    <main className='container'>
      <Header
        search={search}
        setSearch={setSearch}
      />

      <section className='like-cart'>
        <FavouritesProducts 
          products={products}
          quantity={quantity}
          setQuantity={setQuantity}
          addedMessageId={addedMessageId} 
          setAddedMessageId={setAddedMessageId}
          search={search}
        />
      </section>
    </main>
  )
}