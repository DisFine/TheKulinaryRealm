import React, { useState } from 'react';
import '../style.css';
import insta from '../img/instagram.png'
import pint from '../img/pinterest.png'
import face from '../img/facebook.png'
import yout from '../img/youtube.png'
import red from '../img/reddit.png'
import kul from '../img/image.png'

function Footer() {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <div className="Footer">
            <div className="logo2">
                <div className="top">
                    <img className='kuli' src={kul} alt="*" />
                    <h1>TheKulinaryRealm</h1>
                </div>
                <p>Get fresh recipes, cooking tips, deal alerts, and more!</p>
                <div className="EmailInput">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Email"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="social-icons">
                    <img className="Ins" src={insta} alt="Instagram "></img>
                    <img className="Ins" src={pint} alt="Pinterest "></img>
                    <img className="Ins" src={face} alt="Facebook "></img>
                    <img className="Ins" src={yout} alt="YouTube "></img>
                    <img className="Ins" src={red} alt="Reddit "></img>
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
