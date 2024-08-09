import React, { useEffect,useState } from "react";
import axios from 'axios';

const Header = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:5000/protected', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data.logged_in_as);
        } catch (error) {
          console.error('Failed to fetch user details', error);
          setUser(null); 
        }
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    if (user) {
      console.log('User state:', user);
    }else{
      console.error('No user')
    }
  }, [user]);

  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" style={{ color: '#0D6EFD' }} href="/">
          Inventory system
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" style={{ color: '#0D6EFD' }} aria-current="page" href="/">
                All items
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{ color: '#0D6EFD' }} href="/add-item">
                Add Item
              </a>
            </li>
            <li className="nav-item dropdown ms-auto">
              <a
                className="nav-link dropdown-toggle "
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: '#0D6EFD' }}
              >
                {user}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" style={{ color: '#0D6EFD' }} href="/profile">Profile</a></li>
                <li><a className="dropdown-item" style={{ color: '#0D6EFD' }} href="/settings">Settings</a></li>
                <li><a className="dropdown-item" style={{ color: '#0D6EFD' }} href="/logout">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  
  );
};

export default Header;
