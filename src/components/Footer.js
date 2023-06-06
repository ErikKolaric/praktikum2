import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer bg-white text-center py-3">
      <div className="footer-contact">
        <p>Molkereistraße 8, 1020 Wien, Austrija</p>
        <p>Email: salonreo@gmail.com</p>
        <p>Phone: 948372990</p>
      </div>
      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/barbers">Book</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="footer-social">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
      <div className="footer-info">
        <p>&copy; {new Date().getFullYear()} REO salon. All rights reserved.</p>
        <p>
          <a href="/privacy">Privacy Policy</a> |{" "}
          <a href="/terms">Terms of Service</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
