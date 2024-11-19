import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/Footer/Footer';
import men_banner from './components/assets/banner_mens.png'
import women_banner from './components/assets/banner_women.png'
import kids_banner from './components/assets/banner_kids.png'

function App() {

  const routes = (
    <>
    <Routes>
      {/* Shop links */}
      <Route path='/' exact element={<Shop/>}/>
      <Route path='/mens' exact element={<ShopCategory banner={men_banner} category="men"/>}/>
      <Route path='/womens' exact element={<ShopCategory banner={women_banner} category="women"/>}/>
      <Route path='/kids' exact element={<ShopCategory banner={kids_banner} category="kid"/>}/>

      {/* Products links */}
      <Route path='/product' exact element={<Product/>}>
        <Route path=':productId' exact element={<Product/>}/>
      </Route>

      {/* Cart page */}
      <Route path='/cart' exact element={<Cart/>}/>

      {/* Login and sign up page */}
      <Route path='/login' exact element={<LoginSignup/>}/>
      
    </Routes>
    </>
  )
  return (
    <>
      <Router>
        <Navbar/>
        <div>{routes}</div>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
