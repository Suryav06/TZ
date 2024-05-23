import React, { useState, useEffect } from 'react';
import { Radio } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const TShirtControls = ({
  color,
  onColorChange,
  onImageUpload,
  onImageRemove,
  onFabricChange,
}) => {
  const [fabric, setFabric] = useState({ name: '', price: 0 });
  const [totalPrice, setTotalPrice] = useState(0);
  const [imageAdded, setImageAdded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [useremail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = window.sessionStorage.getItem('isLoggedIn') === 'true';
    const email = window.sessionStorage.getItem('userEmail');
    console.log('Retrieved email from session storage:', email);
    setIsLoggedIn(loggedIn);
    setUserEmail(email);
  }, []);

  const handleFabricChange = (selectedFabric) => {
    const fabricObj = JSON.parse(selectedFabric);
    setFabric(fabricObj);
    setTotalPrice(fabricObj.price + (imageAdded ? 50 : 0));
    onFabricChange(fabricObj);
  };

  const handleImageUpload = (e) => {
    onImageUpload(e);
    if (!imageAdded) {
      setTotalPrice((prevPrice) => prevPrice + 50);
      setImageAdded(true);
    }
  };

  const handleImageRemove = () => {
    onImageRemove();
    if (imageAdded) {
      setTotalPrice((prevPrice) => prevPrice - 50);
      setImageAdded(false);
    }
  };

  const getSeasonRecommendation = () => {
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= 3 && currentMonth <= 6) {
      return 'It\'s springtime! Consider lighter fabrics like cotton or linen in pastel shades to stay cool.';
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      return 'Welcome to the monsoon season! Opt for quick-dry fabrics like polyester or nylon to stay comfortable during rainy days.';
    } else if (currentMonth >= 10 && currentMonth <= 12) {
      return 'Autumn is here! Choose breathable fabrics like cotton or blends in earthy tones to enjoy the cooler weather.';
    } else {
      return 'Winter has arrived! Stay warm with cozy fabrics like wool or fleece in darker hues to beat the cold.';
    }
  };

  const handleOrderClick = () => {
    if (isLoggedIn) {
      const orderData = {
        color,
        fabric,
        imageAdded,
        totalPrice,
        userEmail: useremail 
      };
      console.log('Order data to send:', orderData);

      navigate('/order', { state: orderData });
    } else {
      alert('Please log in to place an order.');
    }
  };

  return (
    <div className="w-full lg:w-1/2 p-4 bg-white shadow-lg rounded">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
          Choose Color
        </label>
        <input
          type="color"
          id="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-10 p-1 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-1 border border-gray-300 rounded"
        />
        <button
          onClick={handleImageRemove}
          className="mt-2 px-2 py-1 bg-black text-white rounded text-xs"
        >
          Remove Image
        </button>
      </div>
      <label className="block text-gray-700 text-sm font-bold " htmlFor="size">
        Choose Size
      </label>
      <div className="flex gap-10 mb-3">
        <Radio name="size" label="S" />
        <Radio name="size" label="M" />
        <Radio name="size" label="L" />
        <Radio name="size" label="XL" />
      </div>
      <div className="mb-4">
        <h3 className="mb-5 text-sm font-medium text-gray-900">Choose Fabric</h3>
        <ul className="grid w-full gap-2">
          <li>
            <input
              type="radio"
              id="fabric-cotton"
              name="fabric"
              value={JSON.stringify({ name: 'Cotton', price: 200 })}
              className="hidden peer"
              checked={fabric.name === 'Cotton'}
              onChange={(e) => handleFabricChange(e.target.value)}
            />
            <label
              htmlFor="fabric-cotton"
              className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <div className="block">
                <div className="text-sm font-semibold">Cotton - ₹200</div>
                <div className="text-xs">Soft and comfortable</div>
              </div>
              <svg className="w-4 h-4 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="fabric-polyester"
              name="fabric"
              value={JSON.stringify({ name: 'Polyester', price: 150 })}
              className="hidden peer"
              checked={fabric.name === 'Polyester'}
              onChange={(e) => handleFabricChange(e.target.value)}
            />
            <label
              htmlFor="fabric-polyester"
              className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <div className="block">
                <div className="text-sm font-semibold">Polyester - ₹150</div>
                <div className="text-xs">Durable and wrinkle-resistant</div>
              </div>
              <svg className="w-4 h-4 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="fabric-silk"
              name="fabric"
              value={JSON.stringify({ name: 'Silk', price: 300 })}
              className="hidden peer"
              checked={fabric.name === 'Silk'}
              onChange={(e) => handleFabricChange(e.target.value)}
            />
            <label
              htmlFor="fabric-silk"
              className="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
            >
              <div className="block">
                <div className="text-sm font-semibold">Silk - ₹300</div>
                <div className="text-xs">Luxurious and smooth</div>
              </div>
              <svg className="w-4 h-4 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </label>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 text-lg">Total Price: ₹{totalPrice}</p>
        <p className="text-sm text-gray-700 mt-2">{getSeasonRecommendation()}</p>
        <button
          onClick={handleOrderClick}
          className="mt-4 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-black text-white shadow-md hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85]"
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default TShirtControls;
