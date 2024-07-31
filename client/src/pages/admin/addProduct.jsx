import React, { useState } from 'react';
import { apiUrl } from '../../utils/Constants';
import axios from 'axios';

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/items`, product);
      // Optionally, add a success message or redirect to another page
    } catch (error) {
      console.error('Error adding product:', error);
      // Optionally, handle errors gracefully
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" name="name" value={product.name} onChange={handleInputChange} />
        </label>
        {/* Add more input fields for description, price, category, etc. */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
