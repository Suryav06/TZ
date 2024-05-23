import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { Rnd } from 'react-rnd';

const TShirtDisplay = ({ color, image }) => {
  const [canvas, setCanvas] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const [imageSize, setImageSize] = useState({ width: 150, height: 150 });

  useEffect(() => {
    const newCanvas = new fabric.Canvas('tshirt-canvas', {
      width: 495,
      height: 595,
    });
    setCanvas(newCanvas);
    return () => {
      newCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      // Set canvas background color to transparent
      canvas.backgroundColor = 'rgba(0, 0, 0, 0)';
      canvas.renderAll();
  
      fabric.Image.fromURL('https://ourcodeworld.com/public-media/gallery/gallery-5d5afd3f1c7d6.png', (img) => {
        img.set({
          left: 0,
          top: 0,
          selectable: false,
        });
        img.scaleToWidth(500); // Adjust the width according to your needs
        img.scaleToHeight(600); // Adjust the height according to your needs
        canvas.add(img);
        canvas.sendToBack(img);
      });
    }
  }, [canvas]);
  

  useEffect(() => {
    if (canvas && color) {
      canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    }
  }, [canvas, color]);

  return (
    <div className="w-full lg:w-1/2 p-4 relative">
            <Rnd
  bounds="parent"
  size={{ width: imageSize.width, height: imageSize.height }}
  position={{ x: imagePosition.x, y: imagePosition.y }}
  onDragStop={(e, d) => {
    setImagePosition({ x: d.x, y: d.y });
  }}
  onResizeStop={(e, direction, ref, delta, position) => {
    setImageSize({
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
    });
    setImagePosition(position);
  }}
  className="z-10 relative  hover:border border-solid border-gray-500" // Ensure that the Rnd component is above the canvas and add border to create grid lines
  style={{
    boxShadow: 'none', // Remove default box shadow
  }}
>
  <img
    src={image}
    // alt="Custom Design"
    className="object-contain"
    style={{ width: '100%', height: '100%' }}
  />
</Rnd>

     

      <canvas id="tshirt-canvas" className="absolute top-0 left-0 w-full h-full z-0"></canvas>
    </div>
  );
};

export default TShirtDisplay;
