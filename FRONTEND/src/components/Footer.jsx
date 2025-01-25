import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-12">
      <div className="container mx-auto grid md:grid-cols-4 gap-8 px-4">
        {/* About Section */}
        <div>
          <h4 className="font-bold mb-4">About Us</h4>
          <p className="text-sm text-gray-300">
            Empowering rural communities through transparent governance and efficient complaint management.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-green-300">Home</Link></li>
            <li><Link to="/submitComplaint" className="hover:text-green-300">Register Complaint</Link></li>
            <li><Link to="/track" className="hover:text-green-300">Track Complaint</Link></li>
            <li><Link to="/about" className="hover:text-green-300">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin size={20} />
              <span>Gram Panchayat Office, Rural District</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={20} />
              <span>+91 6371317325</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={20} />
              <span>support@gramseva.org</span>
            </div>
          </div>
        </div>

        {/* Social MediLink */}
        <div>
          <h4 className="font-bold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <Link to="#" className="hover:text-green-300"><Facebook /></Link>
            <Link to="#" className="hover:text-green-300"><Twitter /></Link>
            <Link to="#" className="hover:text-green-300"><Instagram /></Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-green-700 mt-8 py-4 text-center">
        <p className="text-sm">
          © 2025 ଜନ ସହାୟକ | Jana Sahayak. All Rights Reserved. <br /> <a href="https://linkedin.com/in/jeebanjyoti" className='text-white font-medium '>Jeebanjyoti</a> | <a href="https://www.linkedin.com/in/abhijitsahu570/" className='text-white font-medium'>Abhijit</a> | <a href="https://www.linkedin.com/in/fitendra-kumar-nayak/" className='text-white font-medium'>Fitendra</a> | <a href="https://www.linkedin.com/in/prabhuprasad-panda-" className='text-white font-medium'>Prabhu</a> | <a href="https://www.linkedin.com/in/rasmiranjansahoo702" className='text-white font-medium'>Rashmi</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;