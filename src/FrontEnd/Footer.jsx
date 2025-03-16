import React from 'react';
import '../style.css';

function Footer() {
  return (
    <div className="Footer">
        <div className="logo2">
            <div className="top">
                <img src="*" alt="*" />
                <h1>TheKulinaryRealm</h1>
            </div>
            <p>Get fresh recipes, cooking tips, deal alerts, and more!</p>
            <div className="EmailInput">
                <input type="email" placeholder="Enter email"></input>
                <button>→</button>
            </div>
            <div className="social-icons">
                <img src="*" alt="Instagram "></img>
                <img src="*" alt="Pinterest "></img>
                <img src="*" alt="Facebook "></img>
                <img src="*" alt="YouTube "></img>
                <img src="*" alt="Reddit "></img>
            </div>
        </div>
        <div className="NavBar1">
            <div className="n1">Recipes</div>
            <div className="n2">How-Tos</div>
            <div className="n3">World Cuisines</div>
            <div className="n4">Ingredients</div>
            <div className="n5">Equipment</div>
            <div className="n6">Features</div>
        </div>
        <div className="NavBar2">
            <div className="n7">About Us</div>
            <div className="n8">Terms of Service</div>
            <div className="n9">Guidelines</div>
            <div className="n10">Contact</div>
        </div>
        <div className="NavBar3">
            <div className="n11">Advertise</div>
            <div className="n12">Careers</div>
            <div className="n13">SweepStakes</div>
            <div className="n14">Privacy Policy</div>
        </div>
    </div>
  );
}

export default Footer;
