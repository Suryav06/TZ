import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    terms: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }

    if (!formData.termsAccepted) {
      setErrors((prev) => ({ ...prev, terms: 'You must accept the terms and conditions' }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, terms: '' }));
    }

    if (!valid) return;

    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data);
      // handle successful registration (e.g., redirect, show success message, etc.)
    } catch (error) {
      console.error(error);
      // handle error (e.g., show error message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mb-9 mt-7">
      <div className="relative bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-300">
        <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Sign Up
        </h4>
        <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          Nice to meet you! Enter your details to register.
        </p>
        <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 mb-1">
            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Your Name
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
            <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Your Email
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@mail.com"
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
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
            <label className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3" htmlFor="termsAccepted">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id="termsAccepted"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              </span>
            </label>
            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="termsAccepted">
              <p className="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                I agree to the
                <a href="#" className="font-medium transition-colors hover:text-gray-900">
                  &nbsp;Terms and Conditions
                </a>
              </p>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
          )}
          <button
            className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit">
            Sign Up
          </button>
          <p className="block mt-4 font-sans text-base antialiased font-normal leading-relaxed text-center text-gray-700">
            Already have an account?
            <Link to={"/login"}>
            <a href="#" className="font-medium text-gray-900">
              &nbsp;Sign In
            </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
 
);
}

export default Register;