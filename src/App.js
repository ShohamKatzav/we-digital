import './App.css';
import './AddToCart.css'
import './Footer.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home"
import About from "./Pages/About"
import Login from './Pages/Login';
import ProductDetails from './Pages/ProductDetails';
import ManageCategories from './Pages/ManageCategories';
import ManageProducts from './Pages/ManageProducts';
import Category from './Pages/Category';
import Customers from './Pages/Customers'
import UserDetails from './Pages/UserDetails';
import Navigation from './Components/Navigation';
import OrderDetails from './Pages/OrderDetails';
import MyOrders from './Pages/MyOrders';
import CreateOrder from './Pages/CreateOrder';
import ProtectedRoute from './Auth/ProtectedRouth';
import ChangeProductsInOrder from './Pages/ChangeProductsInOrder';
import ChangeCustomerInOrder from './Pages/ChangeCustomerInOrder';
import ManageOrders from './Pages/ManageOrders';
import EditOrder from './Pages/EditOrder';
import Logo from './Images/Logo.png';
import Footer from './Components/Footer';

export default function App() {

  return (
    <div>
      <div className='Page'>
        <BrowserRouter>
          <Navigation />
          <div className="HeaderSpace">
            <h1 className="HomeHeader">We-Digital</h1>
            <h2 className="HomeHeader">Welcome to our online computers store</h2>
            <img className="Logo" src={Logo} alt="Logo"></img>
          </div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/Home" element={<Home />} />
              <Route path="/Home/:Category" element={<Category />} />
              <Route path="/Home/:Category/:ProductName" element={<ProductDetails />} />
              <Route path="/About" element={<About />} />
              <Route path="/ManageCategories" element={<ManageCategories />} />
              <Route path="/ManageProducts" element={<ManageProducts />} />
              <Route path="/Customers" element={<Customers />} />
              <Route path="/Customers/:UserName" element={<UserDetails />} />
              <Route path="/Customers/:UserName/Orders" element={<MyOrders />} />
              <Route path="/ManageOrders" element={<ManageOrders />} />
              <Route path="/ManageOrders/:OrderID" element={<EditOrder />} />
              <Route path="/ChangeProducts" element={<ChangeProductsInOrder />} />
              <Route path="/ChangeCustomer" element={<ChangeCustomerInOrder />} />
              <Route path="/Orders" element={<MyOrders />} />
              <Route path="/Orders/:OrderID" element={<OrderDetails />} />
              <Route path="/CreateOrder/:OrderID" element={<CreateOrder />} />
            </Route>
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </div>
      <div className='clear'></div>
      <Footer />
    </div>
  );
}

