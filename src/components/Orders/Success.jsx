import React, { useState, useEffect } from 'react';

function Success() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Automatically show modal when the component mounts
    setShowModal(true);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div id="successModal" className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
          <div className="relative bg-white rounded-lg shadow-lg p-4 sm:p-5">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="w-12 h-12 rounded-full bg-green-100 p-2 flex items-center justify-center mx-auto mb-3.5">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Success</span>
            </div>
            <p className="mb-4 text-lg font-semibold text-gray-900">
              Order Placed Successfully
            </p>
            <button
              onClick={handleCloseModal}
              type="button"
              className="py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Success;
