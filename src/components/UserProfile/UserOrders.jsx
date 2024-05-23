import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const userEmail = sessionStorage.getItem('userEmail');
        const response = await axios.get('http://localhost:5000/orders', {
          params: { email: userEmail },
        });
        if (response.data.orders) {
          setOrders(response.data.orders);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        setError('Error fetching user orders');
        console.error('Error fetching user orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${orderId}`);
      setOrders(orders.filter(order => order.order_id !== orderId));
    } catch (error) {
      console.error('Error canceling order:', error);
      setError('Error canceling order');
    } finally {
      setShowCancelDialog(false);
    }
  };

  const handleDialogClose = () => {
    setShowCancelDialog(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">My Orders</h2>
      {orders.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">Total Price</th>
              <th className="py-2">Order Date</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td className="py-2 px-4 border">{order.order_id}</td>
                <td className="py-2 px-4 border">₹{order.total_price}</td>
                <td className="py-2 px-4 border">{new Date(order.order_date).toLocaleString()}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setSelectedOrderId(order.order_id);
                      setShowCancelDialog(true);
                    }}
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}

      <Dialog open={showCancelDialog} handler={setShowCancelDialog}>
        <DialogBody>
          <p>Are you sure you want to cancel this order?</p>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => handleCancelOrder(selectedOrderId)}>
            Yes, Cancel Order
          </Button>
          <Button color="blue" onClick={handleDialogClose}>
            No, Keep Order
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default UserOrders;
