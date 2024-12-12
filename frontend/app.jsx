import LoginPage from './component/auth/Login';
import SignupForm from './component/auth/Signup';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      {/* <LoginPage /> */}
      {/* <SignupForm /> */}
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;