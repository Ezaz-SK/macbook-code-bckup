
import React, { useState, useEffect, useCallback } from 'react';
import type { Testimonial } from '../types';

const testimonialsData: Testimonial[] = [
  {
    quote: "This was the best salon experience I've ever had. My stylist listened to exactly what I wanted and my color is flawless. I've already booked my next appointment!",
    author: 'Sarah K.',
  },
  {
    quote: 'Absolutely in love with my new haircut! The atmosphere is so chic and relaxing. Highly recommend to anyone looking for a high-end salon experience.',
    author: 'Emily R.',
  },
  {
    quote: 'The team at Radiance is incredibly talented and professional. They transformed my hair and gave me amazing advice on how to maintain it. I feel like a new person!',
    author: 'Jessica L.',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  },[]);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-stone-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">What Our Clients Are Saying</h2>
          <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
        </div>
        <div className="relative max-w-3xl mx-auto h-64 flex items-center justify-center">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute w-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <p className="text-2xl italic text-center mb-6">"{testimonial.quote}"</p>
              <p className="text-xl font-bold text-center">- {testimonial.author}</p>
            </div>
          ))}
          <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors">
            &lt;
          </button>
          <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors">
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
