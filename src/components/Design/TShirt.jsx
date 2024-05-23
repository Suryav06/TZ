import React, { useState } from 'react';
import TShirtDisplay from './Display';
import TShirtControls from './Controls';

function Tshirt() {
  const [isFront, setIsFront] = useState(true);
  const [color, setColor] = useState('#FFFFFF');
  const [image, setImage] = useState(null);
  const [fabric, setFabric] = useState({ name: 'Cotton', price: 20 });
  const [fabricPrice, setFabricPrice] = useState(20);

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  const handleImageUpload = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setImage(file);
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleFabricChange = (fabric) => {
    setFabric(fabric);
    setFabricPrice(fabric.price);
  };

  const toggleView = () => {
    setIsFront(!isFront);
  };

  const totalPrice = 200 + fabricPrice;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-start p-4 bg-gray-100">
      <TShirtDisplay
        isFront={isFront}
        color={color}
        image={image}
        toggleView={toggleView}
      />
      <TShirtControls
        color={color}
        onColorChange={handleColorChange}
        onImageUpload={handleImageUpload}
        onImageRemove={handleImageRemove}
        fabric={fabric}
        onFabricChange={handleFabricChange}
        totalPrice={totalPrice}
      />
    </div>
  );
}

export default Tshirt;
