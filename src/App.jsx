import Err from "./assets/Erro-404-1-1.jpg"


// react router 
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

// components 
import Home from './Components/Home/Home';
import Cart from "./Components/Cart/Cart.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";

// i18 next 
import "./i18n";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";

// cart
import { CartProvider } from "./contexts/CartContext.jsx";


import "./index.css"
import Thanks from "./Components/Thanks/Thanks.jsx";


const router = createBrowserRouter([

  { element: <Home />, path: '' },
  { element: <Home />, path: '/' },
  { element: <Home />, path: 'home' },


  { element: <Cart />, path: '/cart' },
  { element: <Cart />, path: '/cart/cart' },
  { element: <Thanks />, path: '/successfull' },
  { element: <Thanks />, path: '/successfull/:id' },
  {
    path: "*",
    element: <>
      <Navbar />
      <div className="img w-full ">
        <img
          className="object-cover "
          src={Err}
          alt="not found"
        />
      </div>
    </>,
  },
])


function App() {

  return (
    <>
      <CartProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </CartProvider>
    </>
  )
}

export default App
