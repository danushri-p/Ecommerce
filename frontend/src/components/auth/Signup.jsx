import React, { useState } from 'react';
import axios from 'axios';
import ValidationFormObject from '../../validation';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

function SignupForm() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    file: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setData({
        ...data,
        [name]: files[0],
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const NameV = ValidationFormObject.validateName(data.name);
    const EmailV = ValidationFormObject.validateEmail(data.email);
    const PassV = ValidationFormObject.validatePass(data.password);

    if (typeof NameV === 'string') {
      return setError(NameV);
    }
    if (typeof EmailV === 'string') {
      return setError(EmailV);
    }
    if (typeof PassV === 'string') {
      return setError(PassV);
    }

    const formDataBody = new FormData();
    formDataBody.append('name', data.name);
    formDataBody.append('email', data.email);
    formDataBody.append('password', data.password);
    formDataBody.append('file', data.file);

    try {
      await axios.post('http://localhost:8080/user/signup', formDataBody, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/login');
    } catch (er) {
      setError(er.response?.data?.message || er.message);
    }
  };

  const inputClass =
    'mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600';
  const labelClass = 'block text-sm font-medium text-gray-700';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <ShoppingBag className="w-9 h-9 text-blue-600 mx-auto" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label htmlFor="file" className={labelClass}>
                Profile Picture
              </label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleChange}
                className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white file:text-sm file:font-medium hover:file:bg-blue-700"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition-colors"
            >
              Sign up
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
