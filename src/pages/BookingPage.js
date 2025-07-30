import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/resources')
      .then(res => setResources(res.data));
  }, []);

  const handleBook = (resourceId, slot) => {
    // Save booking info to localStorage and redirect to payment
    localStorage.setItem('booking', JSON.stringify({ resourceId, slot }));
    navigate('/payment');
  };

  return (
    <div>
      <Typography variant="h4">Book a Resource</Typography>
      {resources.map(resource => (
        <Card key={resource._id} style={{ margin: 16, padding: 16 }}>
          <Typography variant="h6">{resource.name}</Typography>
          <Typography>{resource.description}</Typography>
          <div>
            {resource.availableSlots.map(slot => (
              <Button
                key={slot}
                variant="contained"
                style={{ margin: 8 }}
                onClick={() => handleBook(resource._id, slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BookingPage; 