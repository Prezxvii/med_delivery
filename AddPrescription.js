import React, { useState } from 'react';
import axios from 'axios';

function AddPrescription() {
  const [prescription, setPrescription] = useState({
    customerEmail: '',
    medication: '',
    dosage: '',
    instructions: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/api/prescription', prescription, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Prescription added successfully!');
    } catch (err) {
      console.error(err);
      alert('Error adding prescription');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Customer Email" onChange={(e) => setPrescription({ ...prescription, customerEmail: e.target.value })} required />
      <input type="text" placeholder="Medication" onChange={(e) => setPrescription({ ...prescription, medication: e.target.value })} required />
      <input type="text" placeholder="Dosage" onChange={(e) => setPrescription({ ...prescription, dosage: e.target.value })} required />
      <input type="text" placeholder="Instructions" onChange={(e) => setPrescription({ ...prescription, instructions: e.target.value })} required />
      <button type="submit">Add Prescription</button>
    </form>
  );
}

export default AddPrescription;
