import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ProductEntryPage from './Pages/ProductEntryPage';
import UpdateForm from './Pages/UpdateForm';
// import Navbar from './component/Navbar/navbar';
import SinglePageProduct from './Pages/SingleProductPage';
import CartPage from './Pages/CartPage';
import ProfilePage from './Pages/Profile';
import Navbar from './component/Navbar/Navbar';
import AddressCard from './component/AddressComp/AddressCard';
import SelectAddres from './Pages/SelectAddresspage';
import OrderConfirmation from './Pages/OrderConformationPage';
import OrderHistory from './Order-history';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-entry-page" element={<ProductEntryPage />} />
        <Route path="/update-form/:id" element={<UpdateForm />} />
        <Route path="/product-details/:id" element={<SinglePageProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-address" element={<AddressCard />} />
        <Route path="/select-address" element={<SelectAddres />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
    </>
  );
}

export default App;