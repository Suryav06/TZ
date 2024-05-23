import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import "../styles/footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <ul className="social-icon">
          <li className="social-icon__item"><a className="social-icon__link" href="#"><FaInstagram /></a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><FaFacebookF /></a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><FaTwitter /></a></li>
          <li className="social-icon__item"><a className="social-icon__link" href="#"><FaLinkedinIn /></a></li>
          
        </ul>
        <ul className="menu">
          <li className="menu__item"><a className="menu__link" href="#">Home</a></li>
          <li className="menu__item"><a className="menu__link" href="#">Design</a></li>
          <li className="menu__item"><a className="menu__link" href="#">About</a></li>
          
        </ul>
        <p>&copy;2024 Surya V | All Rights Reserved</p>
      </footer>
    </>
  );
};

export default Footer;
