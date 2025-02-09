import React from 'react';
import '../style.css';
function index() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">[Logo]</div>
        <ul className="navbar-links">
          <li>[Home]</li>
          <li>[Categories ▼]</li>
          <li>[Popular Recipes]</li>
          <li>[World Cuisines]</li>
          <li>[Ingredients]</li>
          <li>[About Us]</li>
        </ul>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div>
        <ul className="navbar-actions">
          <li>[Submit Recipe]</li>
          <li>[Profile ▼]</li>
        </ul>
      </nav>
    </>
  );
}

export default index;
