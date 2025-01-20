import React, { useState, useEffect } from 'react';

function OrderTracker() {
  const [orderStatus, setOrderStatus] = useState('Preparing your order...');
  const [estimatedTime, setEstimatedTime] = useState('15 minutes');

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderStatus('Out for delivery!');
      setEstimatedTime('10 minutes');
    }, 5000);

    const secondTimer = setTimeout(() => {
      setOrderStatus('Delivered!');
      setEstimatedTime('N/A');
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Order Tracker</h1>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Status: {orderStatus}</p>
      <p style={{ fontSize: '16px', color: '#555' }}>Estimated Time: {estimatedTime}</p>
    </div>
  );
}

export default OrderTracker;
