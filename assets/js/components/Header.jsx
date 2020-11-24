import React from "react";
//import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header id="banner">
      <div className="banner-title">
        <h1 className="banner-text">security Company</h1>
        <div className="banner-underline"></div>
        <div className="banner-btn">
          <button type="button">L'écoute est notre devise</button>
          <button type="button">Vous satisfaire est Notre priorité</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
