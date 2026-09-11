import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { FavouritesProvider } from './context/FavouritesContext.jsx';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <FavouritesProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </FavouritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
