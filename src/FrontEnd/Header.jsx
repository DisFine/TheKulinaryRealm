import React from 'react';
import '../style.css';

function Header() {
  return (
    <div className='Header'>
        <div className="logo1">
            <img src="*" alt="*"/>
            <h1>TheKulinaryRealm</h1>
        </div>
        <div className="NavBar">
            <div className="n1">Recipes</div>
            <div className="n2">How-Tos</div>
            <div className="n3">World Cuisines</div>
            <div className="n4">Ingredients</div>
            <div className="n5">Equipment</div>
            <div className="n6">Features</div>
            <div className="n7">About Us</div>
            <div className="n8">NewsLetter</div>
        </div>
        <div className="Search"></div>
    </div>
  );
}

export default Header;
