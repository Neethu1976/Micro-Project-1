import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [busSchedules, setBusSchedules] = useState([]);
    const [form, setForm] = useState({shoe_name:'',date: '', size: '' });
    const [message, setMessage] = useState('');
    const [busBookings, setBusbookings] = useState([]);

    useEffect(() => {
        // Fetch bus schedules on component mount
        axios.get('http://localhost:4000/api/ordering-schedules')
            .then(response => setBusSchedules(response.data))
            .catch(error => console.error('Error fetching ordering schedules:', error));
    }, []);

    useEffect(() => {
        // Fetch bus schedules on component mount
        axios.get('http://localhost:4000/api/ordering-bookings')
            .then(response => setBusbookings(response.data))
            .catch(error => console.error('Error fetching ordering shoe:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/ordering-schedules', form)
            .then(response => {
                setMessage(response.data.message);
                setBusSchedules([...busSchedules, form]); // Add new bus schedule to list
                setForm({ shoe_name: '', date: '', size: '' });
            })
            .catch(error => setMessage('Error adding shoe.'));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/api/ordering-schedules/${id}`)
            .then(response => {
                setMessage(response.data.message);
                setBusSchedules(busSchedules.filter(schedule => schedule.id !== id)); // Remove deleted bus schedule from list
            })
            .catch(error => setMessage('Error deleting shoe.'));
    };

    return (
        <div>
            <h2 className="centered-heading">Admin Dashboard</h2>
            <h3>Add New Shoe Order</h3>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="input-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <input type="text" placeholder="Shoe Name" value={form.shoe_name} onChange={(e) => setForm({ ...form, shoe_name: e.target.value })} required />
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                    <input type="number" placeholder="Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} required />
                    <button type="submit" style={{ backgroundColor: '#0044cc', color: '#ffffff', width: '100%', padding: '12px', borderRadius: '5px' }}>Add Shoe Order</button>
                </div>
            </form>
            {message && <p>{message}</p>}

            <h3>Available Shoe</h3>
            <table>
                <thead>
                    <tr>
                        <th>Shoe Name</th>
                        <th>Date</th>
                        <th>Size</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {busSchedules.map((schedule, index) => (
                        <tr key={index}>
                            <td className="table-cell">{schedule.shoe_name}</td>
                            <td className="table-cell">{schedule.date}</td> 
                            <td className="table-cell">{schedule.size}</td>
                            <td>
                                <button onClick={() => handleDelete(schedule.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Ordering Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Shoe Name</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {busBookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{booking.User_name}</td>
                            <td>{booking.shoe_name}</td>
                            <td>{booking.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
