// App.js
import { AuthProvider } from './pages/common/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/common/Login'
import Signup from './pages/common/Signup'
import NotFound from './pages/common/NotFound'
import Dashboard from './pages/common/Dashboard';
import Guest from './pages/guest/Guest';
import CustomerCart from './pages/customer/Cart';
import Home from './pages/admin/Home';
import StoreItems from './pages/store/Items';
import ItemPage from './pages/store/ItemPage';
import Checkout from './pages/customer/Checkout';
import Orders from './pages/customer/Orders';
import UserProfile from './pages/common/UserProfile';
import UserMNG from './pages/admin/UserManagement';
import SocialMediaMNG from './pages/admin/SocialMediaMNG';
import NewsMNG from './pages/admin/MNGNews';
import News from './pages/admin/AddNews';
import DiscountNewsPoster from './pages/guest/DiscountNewsPoster';
import SingleNews from './pages/guest/News';
import AddSocialMedia from './pages/admin/AddSocial';
import SocialMedia from './pages/guest/SocialMedia';
import OrderSchedule from './pages/admin/Orders';
import DeliveryHome from './pages/DeliveryManager/Home';
import AddDriver from './pages/DeliveryManager/AddDriver';
import DriverDash from './pages/Driver/Home';
import Review from './pages/common/Review'; // Import the Review component

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <AuthProvider>
        <Routes>
          {/* Common Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<NotFound />} />
          
          {/* Inside dashboard layout */}
          <Route path='/' element={<Dashboard />}>
            <Route path='' element={<Guest />} />
            <Route path='items' element={<StoreItems />} />
            <Route path='itempage' element={<ItemPage />} />
            <Route path='news' element={<DiscountNewsPoster />} />
            <Route path='news/:id' element={<SingleNews />} />
            <Route path='social' element={<SocialMedia />} />

            {/* Admin Routes */}
            <Route path='admin' element={<Home />} />
            <Route path='payments' element={<Home />} />
            <Route path='admin/userMNG' element={<UserMNG />} />
            <Route path='admin/socialmedia' element={<SocialMediaMNG />} />
            <Route path='admin/addsocial' element={<AddSocialMedia />} />
            <Route path='admin/addNews' element={<News />} />
            <Route path='admin/newsMNG' element={<NewsMNG />} />
            <Route path='admin/orders' element={<OrderSchedule />} />

            {/* Customer Routes */}
            <Route path='cart' element={<CustomerCart />} />
            <Route path='store' element={<StoreItems />} />
            <Route path='itempage/:id' element={<ItemPage />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='transactions' element={<Orders />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='news' element={<DiscountNewsPoster />} />
            <Route path='news/:id' element={<SingleNews />} />
            <Route path='social' element={<SocialMedia />} />

            {/* Delivery manager Routes */}
            <Route path='delivery/home' element={<DeliveryHome />} />
            <Route path='delivery/addDriver' element={<AddDriver />} />

            {/* Driver Routes */}
            <Route path='driver/home' element={<DriverDash />} />

            {/* Review Route */}
            <Route path='review' element={<Review />} /> {/* Add this line */}
          </Route>
        </Routes>
        {/* <StickyFooter /> */}
      </AuthProvider>
    </BrowserRouter>
  )
}
