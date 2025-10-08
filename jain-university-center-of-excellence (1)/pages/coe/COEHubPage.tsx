import React from 'react';
import { NavLink } from 'react-router-dom';
import { mockCOEs } from '../../data/mockData';
import { COE } from '../../types';

const coeLogoMap: { [key: string]: string } = {
    'ai-ml': 'https://i.postimg.cc/BZ71Rf5t/image.png',
    'cyber-security': 'https://i.postimg.cc/vZrTYJn9/image.png',
    'iot-robotics': 'https://i.postimg.cc/J0H79vm0/image.png',
    'networking-hpc': 'https://i.postimg.cc/XNt9p0rg/image.png',
    'theoretical-cs': 'https://i.postimg.cc/fbH9Z44d/image.png',
    'emerging-tech': 'https://i.postimg.cc/qqZ1M2QG/image.png',
};

const COECard: React.FC<{ coe: COE }> = ({ coe }) => {
    return (
        <NavLink 
            to={`/coe/${coe.id}`} 
            className="group block bg-black/20 backdrop-blur-md border border-white/20 rounded-lg p-8 text-center transition-all duration-300 hover:bg-black/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
        >
            <div className="mb-4 inline-block bg-orange-500/10 rounded-full p-5 border border-orange-500/30 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:border-orange-500/50">
                <img 
                    src={coeLogoMap[coe.id] || coe.logoUrl}
                    alt={`${coe.name} Logo`}
                    className="h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <h3 className="text-2xl font-bold text-white">{coe.name}</h3>
            <p className="mt-2 text-gray-300">{coe.tagline}</p>
            <span className="mt-4 inline-block text-orange-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore &rarr;
            </span>
        </NavLink>
    );
};

const COEHubPage = () => {
    return (
        <div className="bg-transparent min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Centers of Excellence</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                        Pioneering research and innovation across key technological domains. Explore our specialized centers.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {mockCOEs.map(coe => (
                        <COECard key={coe.id} coe={coe} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default COEHubPage;