import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AllItems = () => {
    const [items,setItems]= useState([])
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/items')
          .then(response => {
            setItems(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the items!', error);
          });
      }, []);

      const handleEdit = (id) =>{
        ///define edit file
            navigate(`/edit-item/${id}`)
      }

      const handleDelete = (id) =>{
            axios.delete(`http://127.0.0.1:5000/delete-item/${id}`)
            .then(
                response =>{
                    alert("Item deleted successfully")
                    setItems(items.filter(item => item.id !== id));
                }
            )
            .catch(error => {
                console.error('There was an error deleting the item!', error);
              });
      }




  return (
    <table className="table table-hover table-striped m-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Item name</th>
      <th scope="col">Description</th>
      <th scope="col">Quantity</th>
      <th scope="col">Item buying price</th>
      <th scope="col">Selling price</th>
      <th scope="col">Supplier</th>
      <th scope="col">CreatedBy</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {items.map((item)=>(
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.quantity}</td>
      <td>{item.cost_price}</td>
      <td>{item.selling_price}</td>
      <td>{item.supplier}</td>
      <td>{item.created_by}</td>
      <td className='justify-center'>
      <button type="button" onClick={()=> handleEdit(item.id)}  class="btn btn-success m-2">Edit</button>
      <button type="button" onClick={()=> handleDelete(item.id)} class="btn btn-danger m-2">Delete</button>
      </td>
    </tr>
  ))}
    
   
  </tbody>
</table>
  )
}

export default AllItems