
import React from 'react';
import type { GalleryImage } from '../types';

const images: GalleryImage[] = [
  { id: 1, src: 'https://picsum.photos/seed/gal1/500/700', alt: 'Blonde balayage hairstyle' },
  { id: 2, src: 'https://picsum.photos/seed/gal2/500/500', alt: 'Short pixie cut' },
  { id: 3, src: 'https://picsum.photos/seed/gal3/500/800', alt: 'Vibrant red hair color' },
  { id: 4, src: 'https://picsum.photos/seed/gal4/500/600', alt: 'Bridal updo with flowers' },
  { id: 5, src: 'https://picsum.photos/seed/gal5/500/750', alt: 'Long curly hairstyle' },
  { id: 6, src: 'https://picsum.photos/seed/gal6/500/550', alt: 'Men\'s modern haircut' },
  { id: 7, src: 'https://picsum.photos/seed/gal7/500/850', alt: 'Brunette with highlights' },
  { id: 8, src: 'https://picsum.photos/seed/gal8/500/650', alt: 'Elegant bob cut' },
];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800">Our Work. Your Inspiration.</h2>
          <div className="w-24 h-1 bg-stone-800 mx-auto mt-4"></div>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map(image => (
            <div key={image.id} className="overflow-hidden rounded-lg shadow-lg break-inside-avoid">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
