import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import namer from 'color-namer';
import axios from 'axios'; // Import Axios
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from '@material-tailwind/react';
import { v4 as uuidv4 } from 'uuid';

const CheckoutForm = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showOrderPlacedDialog, setShowOrderPlacedDialog] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { color, fabric, imageAdded, totalPrice, userEmail } = location.state || {};

  const handleAddressChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async () => {
    const orderData = {
      color,
      fabric,
      imageAdded,
      totalPrice,
      userEmail,
      shippingAddress,
      paymentMethod,
    };

    try {
      const response = await axios.post('http://localhost:5000/orders', orderData);
      if (response.status === 200) {
        setIsOrderPlaced(true);
        setShowOrderPlacedDialog(true);
      } else {
        console.error('Error placing order:', response.data);
        
      }
    } catch (error) {
      console.error('Error placing order:', error);
      
    }
  };

  const handleCancelOrder = () => {
    navigate('/');
  };

  const getColorName = (colorCode) => {
    const colorNames = namer(colorCode);
    return colorNames.basic[0].name; 
  };

  const handleDialogClose = () => {
    setShowOrderPlacedDialog(false);
    navigate('/');
  };

  const generateOrderId = () => {
    return uuidv4();
  };

  return (
    <div className="flex w-full p-4 bg-gray-100">
      <div className="w-1/2 p-4">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <textarea
            value={shippingAddress}
            onChange={handleAddressChange}
            placeholder="Enter your shipping address"
            className="w-full p-2 mb-4 border rounded"
          ></textarea>

          <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="cashOnDelivery"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={paymentMethod === 'cashOnDelivery'}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="cashOnDelivery">Cash on Delivery</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="onlinePayment"
              name="paymentMethod"
              value="onlinePayment"
              checked={paymentMethod === 'onlinePayment'}
              onChange={handlePaymentMethodChange}
              className="mr-2"
            />
            <label htmlFor="onlinePayment">Online Payment</label>
          </div>

          <button onClick={handleSubmit} className="mt-8 bg-blue-500 text-white px-4 py-2 rounded">
            Place Order
          </button>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <div className="w-full lg:w-1/2 p-4 bg-white shadow-lg rounded">
          <h2 className="text-xl font-bold mb-4">Order Preview</h2>
          <p><strong>Email:</strong> {userEmail}</p>
          <p><strong>Order ID:</strong> {generateOrderId()}</p>
          <p><strong>Color:</strong> {getColorName(color)}</p>
          <p><strong>Fabric:</strong> {fabric.name} - ₹{fabric.price}</p>
          <p><strong>Image Added:</strong> {imageAdded ? 'Yes (₹50)' : 'No'}</p>
          <p><strong>Total Price:</strong> ₹{totalPrice}</p>
          <div className="mt-4">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-500 text-white shadow-md hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85] mt-2"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </button>
          </div>
        </div>
      </div>

      {isOrderPlaced && paymentMethod !== 'onlinePayment' && (
        <Dialog open={showOrderPlacedDialog} handler={setShowOrderPlacedDialog}>
          <DialogBody>
            <Typography variant="h6">Order Placed Successfully!</Typography>
          </DialogBody>
          <DialogFooter>
            <Button color="blue" onClick={handleDialogClose}>
              OK
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default CheckoutForm;
