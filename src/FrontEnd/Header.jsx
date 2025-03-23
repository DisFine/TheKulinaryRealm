import React, { useState } from 'react';
import '../style.css';
import myImage from "../img/image.png";

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className='Header'>
        <div className="logo1">
            <img src={myImage} alt="*" width='30px' height='30px'/>
            <h1>TheKulinaryRealm</h1>
        </div>
        <div className="NavBar">
            <div className="n1">Home</div>
            <div className="n2">Recipe</div>
            <div className="n3">How-Tos</div>
            <div className="n4">Equipment</div>
            <div className="n5">About Us</div>
        </div>
        <div className="Search">
            <div className="search-container">
                <div className="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
        </div>
    </div>
  );
}

export default Header;
