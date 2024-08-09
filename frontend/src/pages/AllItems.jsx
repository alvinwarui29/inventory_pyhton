import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const theme = useTheme(getTheme());

  
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleEdit = (id) => {
    navigate(`/edit-item/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/delete-item/${id}`)
      .then(response => {
        alert('Item deleted successfully');
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the item!', error);
      });
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const sort = useSort(
    { nodes: filteredItems },
    { onChange: onSortChange },
    {
      sortFns: {
        ID: (array) => array.sort((a, b) => a.id - b.id),
        NAME: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DESCRIPTION: (array) => array.sort((a, b) => a.description.localeCompare(b.description)),
        QUANTITY: (array) => array.sort((a, b) => a.quantity - b.quantity),
        COST_PRICE: (array) => array.sort((a, b) => a.cost_price - b.cost_price),
        SELLING_PRICE: (array) => array.sort((a, b) => a.selling_price - b.selling_price),
        SUPPLIER: (array) => array.sort((a, b) => a.supplier.localeCompare(b.supplier)),
        CREATED_BY: (array) => array.sort((a, b) => a.created_by.localeCompare(b.created_by)),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const pagination = usePagination(
    { nodes: filteredItems },
    {
      state: {
        page: 0,
        size: 5, // Set the number of items per page
      },
      onChange: onPaginationChange,
    }
  );

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  const COLUMNS = [
    { label: '#', renderCell: (item) => item.id, sort: { sortKey: 'ID' } },
    { label: 'Item name', renderCell: (item) => item.name, sort: { sortKey: 'NAME' } },
    { label: 'Description', renderCell: (item) => item.description, sort: { sortKey: 'DESCRIPTION' } },
    { label: 'Quantity', renderCell: (item) => item.quantity, sort: { sortKey: 'QUANTITY' } },
    { label: 'Item buying price', renderCell: (item) => item.cost_price, sort: { sortKey: 'COST_PRICE' } },
    { label: 'Selling price', renderCell: (item) => item.selling_price, sort: { sortKey: 'SELLING_PRICE' } },
    { label: 'Supplier', renderCell: (item) => item.supplier, sort: { sortKey: 'SUPPLIER' } },
    { label: 'CreatedBy', renderCell: (item) => item.created_by, sort: { sortKey: 'CREATED_BY' } },
    {
      label: 'Actions',
      renderCell: (item) => (
        <div className='justify-center'>
          <button type="button" onClick={() => handleEdit(item.id)} className="btn btn-success m-2">Edit</button>
          <button type="button" onClick={() => handleDelete(item.id)} className="btn btn-danger m-2">Delete</button>
        </div>
      )
    },
  ];

  return (
    <div className='m-5 border border-success p-3'>
      <label htmlFor="search" className='mt-2'>
        Search by Item name:&nbsp;
        <input id="search" type="text" value={search} onChange={handleSearch} />
      </label>
      <br />

      <CompactTable
        columns={COLUMNS}
        data={{ nodes: filteredItems }}
        theme={theme}
        sort={sort}
        pagination={pagination}
      />

      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span>
          Page:{" "}
          {pagination.state.getPages(filteredItems).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>

      <br />
    </div>
  );
};

export default AllItems;
