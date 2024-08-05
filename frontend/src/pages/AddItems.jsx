import React, { useState } from 'react';
import axios from 'axios';

const AddItems = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_path:'',
    quantity: '',
    costPrice: '',
    sellingPrice: '',
    supplier: '',
    createdBy:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/create-item', formData)
      .then(response => {
        console.log(response.data);
        alert('Item added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the item!', error);
      });
  };

  return (
    <form className="row g-3 m-4" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">Item Name *</label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="inputEmail4"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputPassword4" className="form-label">Item Description *</label>
        <input
          type="text"
          className="form-control"
          name="description"
          id="inputPassword4"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputAddress" className="form-label">Quantity*</label>
        <input
          type="number"
          className="form-control"
          name="quantity"
          id="inputAddress"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputAddress2" className="form-label">Cost Price*</label>
        <input
          type="number"
          className="form-control"
          id="inputAddress2"
          name="costPrice"
          value={formData.costPrice}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputCity" className="form-label">Selling price *</label>
        <input
          type="number"
          className="form-control"
          id="inputCity"
          name="selling_price"
          value={formData.selling_price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-2">
        <label htmlFor="inputZip" className="form-label">Supplier name</label>
        <input
          type="text"
          className="form-control"
          name="supplier"
          id="inputZip"
          value={formData.supplier}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">Add Item</button>
      </div>
    </form>
  );
};

export default AddItems;
