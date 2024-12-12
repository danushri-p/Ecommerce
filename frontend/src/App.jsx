import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './components/Login'; 
import SignupForm from './components/Signup'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
