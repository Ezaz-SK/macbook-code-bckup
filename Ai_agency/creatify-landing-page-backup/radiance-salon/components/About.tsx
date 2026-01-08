
import React from 'react';
import type { TeamMember } from '../types';

const teamMembers: TeamMember[] = [
  { name: 'Jessica Radiance', role: 'Founder & Master Stylist', imageUrl: 'https://picsum.photos/seed/jessica/400/400' },
  { name: 'Anna Belle', role: 'Master Colorist', imageUrl: 'https://picsum.photos/seed/anna/400/400' },
  { name: 'Mike Stylus', role: 'Extension Specialist', imageUrl: 'https://picsum.photos/seed/mike/400/400' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800">Meet the Artists Behind the Craft</h2>
           <div className="w-24 h-1 bg-stone-800 mx-auto mt-4"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 w-full">
            <img src="https://picsum.photos/seed/team/800/600" alt="Salon Team" className="rounded-lg shadow-2xl w-full" />
          </div>
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">Our Philosophy</h3>
            <p className="text-lg text-stone-600 leading-relaxed">
              Founded by Jessica Radiance, our salon is built on a passion for artistry and genuine client care. We believe that great hair is a form of self-expression, and our mission is to help you find the look that makes you feel your most confident self. We are dedicated to continuous education and using the finest products to achieve stunning, healthy results.
            </p>
          </div>
        </div>
        
        <div className="mt-20 text-center">
            <h3 className="text-3xl font-bold text-stone-800 mb-10">Our Stylists</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img src={member.imageUrl} alt={member.name} className="w-48 h-48 object-cover rounded-full shadow-lg mb-4 border-4 border-white"/>
                        <h4 className="text-xl font-bold text-stone-800">{member.name}</h4>
                        <p className="text-stone-600">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
