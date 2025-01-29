import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import ProductEntryPage from './pages/ProductEntryPage';
import UpdateForm from './pages/UpdateForm';
import SinglePageProduct from './pages/SingleProductPage';
import CartPage from './pages/CartPage';
import ProfilePage from './components/Profile/ProfileCard.jsx';
import Navbar from './components/Navbar/Navbar';
import AddressCard from './components/AddressComp/AddressCard';

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
        <Route path="/add-address"element={<AddressCard/>}/>
        <Route path="select-address" element={<SelectAddress/>}/>
      </Routes>
    </>
  );
}

export default App;