import { useState } from 'react';
import Header from '../components/Header';
import { DisplayProduct } from '../components/DisplayProduct';
import { DisplayRange } from '../components/DisplayRange';
import { SideBar } from '../components/SideBar';

export function HomePage({products,setProducts,displayProducts,setDisplayProducts,
  like,setlike,onCart,setQuantity,quantity,cart,addedMessageId,setAddedMessageId,search,setSearch}) {
  
  const[categoriesActive,setCategoriesActive]=useState('');
  
  const handleCategories=(categorie)=>{
    if(categorie==='all'){
      setDisplayProducts(products);
    }
    else{
      const filtered = products.filter((product)=>{
        return(product.category===categorie)
      })
      setDisplayProducts(filtered)
    }
  }
  
  const handleRange=(min,max)=>{
    const filtered= products.filter((product)=>{
      const priceInINR=product.price*95;
      return(
       priceInINR>=min && priceInINR<=max
      )
    });
    setDisplayProducts(filtered);
  }

  const handleAllFilter=()=>{
    setDisplayProducts(products);
  }

  return (
    <div className='container'>
      <Header 
        like={like}
        cart={cart}
        search={search}
        setSearch={setSearch}
      />
      <DisplayRange 
        handleAllFilter={handleAllFilter}
        handleRange={handleRange}
        handleCategories={handleCategories}
        setCategoriesActive={setCategoriesActive}
      />
      <SideBar 
        handleCategories={handleCategories}
        categoriesActive={categoriesActive} 
        setCategoriesActive={setCategoriesActive}
      />
      <div className="cart-container">
        <DisplayProduct 
          displayProducts={displayProducts}
          like={like} 
          setlike={setlike}
          onCart={onCart}
          setQuantity={setQuantity}
          quantity={quantity}
          setAddedMessageId={setAddedMessageId}
          addedMessageId={addedMessageId}
          search={search}
        />
      </div>
    </div>
  )
}