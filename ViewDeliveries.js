import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewDeliveries() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/deliveries', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDeliveries(response.data);
      } catch (err) {
        console.error(err);
        alert('Error fetching deliveries');
      }
    };

    fetchDeliveries();
  }, []);

  return (
    <div>
      <h1>Your Deliveries</h1>
      <ul>
        {deliveries.map((delivery) => (
          <il key={delivery.id}>
            {delivery.address} - {delivery.deliveryDate} - ${delivery.tip}
          </il>
        ))}
      </ul>
    </div>
  );
}

export default ViewDeliveries;