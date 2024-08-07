import React from "react";

const Header = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" style={{ color: '#0D6EFD' }} href="/">
            Inventory system
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" style={{ color: '#0D6EFD' }} aria-current="page" href="/">
                  All items
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" style={{ color: '#0D6EFD' }} href="/add-item">
                  Add Item
                </a>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
