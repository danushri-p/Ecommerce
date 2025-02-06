import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Signup from './Pages/Signup.jsx';
import Login from './Login.jsx';
import ProductEntryPage from './ProductEntryPage.jsx';
import UpdateForm from './UpdateForm.jsx';
import Navbar from './component/Navbar/navbar';
import SinglePageProduct from './SingleProductPage.jsx';

function App() {
  return (
    <Router> {/* Wrap everything in BrowserRouter */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-entry-page" element={<ProductEntryPage />} />
        <Route path="/update-form/:id" element={<UpdateForm />} />
        <Route path="/product-details/:id" element={<SinglePageProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
