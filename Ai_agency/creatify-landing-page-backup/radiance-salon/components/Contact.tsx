import React from 'react';
import { MailIcon, PhoneIcon, LocationMarkerIcon } from './Icons';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800">Book Your Appointment</h2>
          <div className="w-24 h-1 bg-stone-800 mx-auto mt-4"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 text-center">
          <div className="bg-stone-50 p-8 rounded-lg shadow-lg flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Book Online</h3>
            <p className="text-stone-600 mb-6">The easiest and fastest way to secure your spot.</p>
            <a href="#" className="bg-stone-800 text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-stone-900 transform hover:scale-105 transition-all duration-300 shadow-xl w-full">
              Book Online Now
            </a>
          </div>

          <div className="bg-stone-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Visit or Call Us</h3>
            <div className="space-y-4 text-stone-700">
              <div className="flex items-center justify-center gap-3">
                <LocationMarkerIcon className="w-6 h-6 text-stone-800" />
                <span>123 Main St, Your City, State</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <PhoneIcon className="w-6 h-6 text-stone-800" />
                <span>(123) 456-7890</span>
              </div>
               <div className="flex items-center justify-center gap-3">
                <MailIcon className="w-6 h-6 text-stone-800" />
                <span>hello@radiance.com</span>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Salon Hours</h3>
             <div className="space-y-2 text-stone-700">
                <p><strong>Tues - Fri:</strong> 9:00 AM - 7:00 PM</p>
                <p><strong>Saturday:</strong> 9:00 AM - 5:00 PM</p>
                <p><strong>Sun - Mon:</strong> Closed</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 h-80 rounded-lg shadow-lg overflow-hidden">
          <iframe
            title="Salon Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12094.51228229218!2d-74.00949214470823!3d40.72598382106311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259896b6b7829%3A0x1b326ac8f352885!2sSoHo%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;