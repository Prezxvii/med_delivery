import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/prescriptions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrescriptions(response.data);
      } catch (err) {
        console.error(err);
        alert('Error fetching prescriptions');
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div>
      <h1>Prescriptions</h1>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription.id}>
            {prescription.medication} - {prescription.dosage} - {prescription.instructions}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewPrescriptions;
