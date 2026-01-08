
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}></div>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 p-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>
          Define Your Style. Discover Your Radiance.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-stone-200">
          An elevated salon experience in Your City dedicated to personalized hair artistry, color, and luxury treatments.
        </p>
        <a href="#contact" className="bg-white text-stone-900 font-bold py-3 px-10 rounded-full text-lg hover:bg-stone-200 transform hover:scale-105 transition-all duration-300 shadow-xl">
          Book Your Experience
        </a>
      </div>
    </section>
  );
};

export default Hero;
