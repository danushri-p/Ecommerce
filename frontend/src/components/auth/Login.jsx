import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import { setUserEmail } from '../../Redux/User/UserActions';
import { setEmail } from '../../Redux/User/UsersSlice';
function LoginPage() {
  const dispatch = useDispatch();
  const [credentials, setCreds] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setCreds({
      ...credentials,
      [name]: value,
    });
  };
  const handleClickLogin = async (e) => {
    // axios request to backend
    e.preventDefault();
    const response = await axios.post(
      'http://localhost:8080/user/login',
      credentials
    );
    console.log(credentials);
    dispatch(setUserEmail(credentials.email));

    localStorage.setItem('token', response.data.token);
    // console.log(data);
    navigate('/');
  };

  const inputClass =
    'mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <ShoppingBag className="w-9 h-9 text-blue-600 mx-auto" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-5" onSubmit={handleClickLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                value={credentials.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors"
            >
              Sign in
            </button>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to={'/signup'}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
