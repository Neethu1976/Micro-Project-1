import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';

function UserDashboard() {
  const [busSchedules, setBusSchedules] = useState([]); // State for bus schedules
  const [message, setMessage] = useState(''); // State for user messages
  const [address, setAddress] = useState({ street: '', city: '', state: '', zipCode: '' }); // State for address

  const location = useLocation();
  const email = location.state?.email;

  // Fetch bus schedules from the server
  useEffect(() => {
    // Fetch bus schedules on component mount
    axios.get('http://localhost:4000/api/ordering-schedules')
        .then(response => setBusSchedules(response.data))
        .catch(error => console.error('Error fetching order:', error));
}, []);

  // Handle booking a bus
  const handleBookNow = async (orderId) => {
    axios.post('http://localhost:4000/api/order-shoe',{email:email,orderId:orderId}).then((response)=>{
        console.log('done');
        setMessage('Shoe orded successfully');
    })
  };

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      {message && <p className="message">{message}</p>}

      <h2>Available Shoes</h2>
      {busSchedules.length > 0 ? (
        <table className="ordering-schedule">
          <thead>
            <tr>
              <th>Shoe Name</th>

              <th>Date</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
                    {busSchedules.map((schedule, index) => (
                        <tr key={index}>
                            <td>{schedule.shoe_name}</td>
                           
                            <td>{schedule.date}</td>
                            <td>{schedule.size}</td>
                            <td>
                                <button onClick={() => handleBookNow(schedule.id)}>ORDER NOW</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
      ) : (
        <p>Loading ordering schedules...</p>
      )}
    </div>
  );
}

export default UserDashboard;
