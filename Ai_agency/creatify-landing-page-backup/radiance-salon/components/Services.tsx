
import React from 'react';
import type { Service } from '../types';

const servicesData: Service[] = [
  {
    title: 'Precision Cuts & Styling',
    description: 'Bespoke haircuts tailored to your face shape and lifestyle, from timeless bobs to modern layers.',
    imageUrl: 'https://picsum.photos/seed/cut/600/800',
  },
  {
    title: 'Expert Color & Balayage',
    description: 'Masterful color, from rich, natural tones to sun-kissed balayage and vibrant transformations.',
    imageUrl: 'https://picsum.photos/seed/color/600/800',
  },
  {
    title: 'Luxury Hair Treatments',
    description: 'Revitalize your hair with deep conditioning, keratin, and bond-building treatments.',
    imageUrl: 'https://picsum.photos/seed/treatment/600/800',
  },
  {
    title: 'Special Occasion & Bridal',
    description: 'Elegant updos and styling for your most memorable events.',
    imageUrl: 'https://picsum.photos/seed/bridal/600/800',
  },
];

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="group relative overflow-hidden rounded-lg shadow-lg">
    <img src={service.imageUrl} alt={service.title} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6 text-white">
      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
      <p className="text-stone-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-40 overflow-hidden">{service.description}</p>
    </div>
  </div>
);


const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800">Our Signature Services</h2>
          <div className="w-24 h-1 bg-stone-800 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
        <div className="text-center mt-16">
          <a href="#pricing" className="text-stone-800 font-semibold hover:underline">
            View Full Service Menu & Pricing
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
