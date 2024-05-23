import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill out both fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      if (response.data.success) {
        console.log('Login successful, storing email:', response.data.email);
        window.sessionStorage.setItem('isLoggedIn', 'true');
        window.sessionStorage.setItem('userEmail',formData.email);
       
       
        console.log('Login successful');
        window.location.href = '/'; 
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } 
      catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setError('Bad Request: Please check your input.');
        } else if (error.response.status === 401) {
          setError('Incorrect email or password. Please try again.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-300">
        <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Sign in
        </h4>
        <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          Nice to meet you! Enter your details to login.
        </p>
        <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 mb-1">
            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Your Email
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>

            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Password
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>

          <div className="inline-flex items-center">
            <label className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3" htmlFor="remember">
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id="remember"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="remember">
              <p className="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                Remember me
              </p>
            </label>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          
          >
            Sign In
          </button>
          <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
            Don't have an account?
            <Link to={"/register"}>
            <a href="#" className="font-medium text-gray-900">
              Sign Up
            </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
