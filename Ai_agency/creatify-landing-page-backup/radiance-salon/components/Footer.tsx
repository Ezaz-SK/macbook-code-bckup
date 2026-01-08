
import React from 'react';
import { InstagramIcon, FacebookIcon, PinterestIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Radiance</h3>
            <p className="text-sm">&copy; {new Date().getFullYear()} Radiance Salon. All Rights Reserved.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-white transition-colors"><InstagramIcon className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><FacebookIcon className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><PinterestIcon className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
