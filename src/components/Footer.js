// Footer.jsx
import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Links */}
        <div className="footer-links">
          <a href="#about">About</a>
          <span>|</span>
          <a href="#contact">Contact</a>
          <span>|</span>
          <a href="#privacy">Privacy</a>
        </div>

        {/* Social icons */}
        <div className="footer-social">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
