import './SideBar.css'

export function SideBar({ handleCategories, setCategoriesActive,categoriesActive }) {
  

  return (
    <div className="side-bar">
      <div className='popular-text'>Popular</div>
      <div className="categorie-items">
        <button className={`side-bar-categorie ${categoriesActive==='toys'? 'categoryActive':''}`} 
        onClick={() => {
          handleCategories('sports-accessories');
          setCategoriesActive('toys');
        }}>
          <div className='side-bar-profile'>
            <img src="toy.webp" />
          </div>
          Kids & Toys
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='smartphones'? 'categoryActive':''}`}
          onClick={() => {
            handleCategories('smartphones');
            setCategoriesActive('smartphones');
        }}>
          <div className='side-bar-profile'>
            <img src="smart-phone.webp" />
          </div>
          Smartphone
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='mens'? 'categoryActive':''}`}
          onClick={() => {
            handleCategories('mens-shirts');
            setCategoriesActive('mens');
        }}>
          <div className='side-bar-profile'>
            <img src="men.webp" className='side-bar-profile' />
          </div>
          Men
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='laptops'? 'categoryActive':''}`}
          onClick={() => {
            handleCategories('laptops');
            setCategoriesActive('laptops');
        }}>
          <div className='side-bar-profile'>
            <img src="laptop.webp" />
          </div>
          Laptop
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='watches'? 'categoryActive':''}`} 
          onClick={()=>{
            handleCategories('mens-watches');
            setCategoriesActive('watches');
          }}>
          <div className='side-bar-profile'>
            <img src="watch.webp" />
          </div>
          Watch
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='womens'? 'categoryActive':''}`} 
          onClick={()=>{
            handleCategories('womens-dresses');
            setCategoriesActive('womens');
        }}>
          <div className='side-bar-profile'>
            <img src="women.webp" />
          </div>
          Women
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='kitchen'? 'categoryActive':''}`}
          onClick={()=>{
            handleCategories('kitchen-accessories');
            setCategoriesActive('kitchen');
        }}>
          <div className='side-bar-profile'>
            <img src="kitchen.webp" />
          </div>
          Kitchen
        </button>
        <button className={`side-bar-categorie ${categoriesActive==='groceries'? 'categoryActive':''}`}
          onClick={()=>{
            handleCategories('groceries');
            setCategoriesActive('groceries')
        }}>
          <div className='side-bar-profile'>
            <img src="food.webp" />
          </div>
          Foods
        </button>
      </div>
    </div>
  )
}