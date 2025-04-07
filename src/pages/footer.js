import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>We help you discover and create amazing local events.</p>
                </div>
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: support@example.com</p>
                    <p>Phone: +123 456 7890</p>
                    <div className="social-icons">
                        <a href="#" className="icon"><FaFacebook /></a>
                        <a href="#" className="icon"><FaTwitter /></a>
                        <a href="#" className="icon"><FaInstagram /></a>
                        <a href="#" className="icon"><FaWhatsapp /></a>
                    </div>
                </div>
            </div>
            <p className="footer-bottom">© 2025 YourEvent. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
