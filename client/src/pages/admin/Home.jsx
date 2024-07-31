import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentTable from '../../components/admin/PaymentTable';
import Divider from '@mui/material/Divider';
import { apiUrl } from '../../utils/Constants';


const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`${apiUrl}/card/all`);
      setCards(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setLoading(false);
    }
    

  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
  <h1 className="text-3xl font-semibold mb-4 text-center">All Payment Methods of Customers</h1>
  <Divider/>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <PaymentTable cards={cards} />
      )}
    </div>
  );
};

export default Home;

