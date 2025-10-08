import React, { useState, useMemo } from 'react';

// --- NEW UNIFIED PROJECT DATA ---
const projects = [
    // Existing projects, refactored
    {
        id: 1,
        title: "Quantum-Resistant Cryptography Algorithms",
        description: "Developing and testing novel lattice-based cryptographic algorithms to secure communications against threats from future quantum computers.",
        category: "Quantum",
        status: "Ongoing",
        facultyLead: "Dr. Ananya Sharma",
        studentLead: "Tanvi Mehta",
    },
    {
        id: 2,
        title: "AI-Powered Predictive Maintenance for IoT",
        description: "Leveraging machine learning models to analyze real-time sensor data from industrial machinery, predicting failures before they occur to minimize downtime.",
        category: "IoT",
        status: "Ongoing",
        facultyLead: "Dr. Vikram Neerugatti",
        studentLead: "Diya Patel",
    },
    {
        id: 3,
        title: "Decentralized Digital Identity using Blockchain",
        description: "A successful implementation of a self-sovereign identity system on a permissioned blockchain, giving users full control over their digital credentials.",
        category: "Cybersecurity",
        status: "Completed",
        facultyLead: "Dr. Sunanda Das",
        studentLead: "Vikram Kumar",
    },
    {
        id: 4,
        title: "High-Performance Computing for Genomic Sequencing",
        description: "Utilizing parallel computing and advanced algorithms on HPC clusters to accelerate the process of DNA sequencing and analysis for personalized medicine.",
        category: "HPC",
        status: "Ongoing",
        facultyLead: "Dr. Nishant Tripathi",
        studentLead: "Karan Verma",
    },
    {
        id: 5,
        title: "Ethical AI Framework for Autonomous Systems",
        description: "Researching and defining a comprehensive ethical framework and decision-making model for autonomous vehicles and drones to ensure public safety and trust.",
        category: "Generative AI",
        status: "Ongoing",
        facultyLead: "Dr. Swati Gupta",
        studentLead: "Priya Singh",
    },
    {
        id: 6,
        title: "Next-Generation Wireless Network Protocols",
        description: "Designed and simulated a novel MAC protocol for 6G wireless networks, demonstrating significant improvements in latency and device density.",
        category: "HPC",
        status: "Completed",
        facultyLead: "Dr. Ramesh Kumar",
        studentLead: "Ishita Narayanan",
    },
    // New projects from prompt
    {
        id: 31,
        title: "AI-Powered Threat Intelligence Platform",
        description: "Developing a platform that uses machine learning to predict and identify emerging cybersecurity threats from various data sources in real-time.",
        category: "Cybersecurity",
        status: "Ongoing",
        facultyLead: "Dr. Sunanda Das",
        studentLead: "Ravi Shankar",
    },
    {
        id: 32,
        title: "Lightweight Cryptography for IoT Devices",
        description: "Researching and implementing cryptographic algorithms that provide robust security for resource-constrained IoT devices without significant performance overhead.",
        category: "IoT",
        status: "Ongoing",
        facultyLead: "Dr. Harinee. S",
        studentLead: "Gauri Patil",
    },
    {
        id: 33,
        title: "Federated Learning for Medical Image Analysis",
        description: "Creating a decentralized machine learning model that allows multiple hospitals to collaboratively train an AI for disease detection without sharing sensitive patient data.",
        category: "Generative AI",
        status: "Proposed",
        facultyLead: "Dr. Swati Gupta",
        studentLead: "Kavya Murthy",
    },
    {
        id: 34,
        title: "Parallel Computing for Genomic Sequencing",
        description: "Utilizing high-performance computing clusters to accelerate the process of genomic data analysis and sequence alignment, reducing processing time from days to hours.",
        category: "HPC",
        status: "Completed",
        facultyLead: "Dr. Nishant Tripathi",
        studentLead: "Karan Verma",
    },
    {
        id: 35,
        title: "VR Simulation for Surgical Training",
        description: "Building an immersive virtual reality environment that allows medical students to practice complex surgical procedures in a safe and repeatable setting.",
        category: "Vision",
        status: "Ongoing",
        facultyLead: "Dr. Vikram Neerugatti",
        studentLead: "Aarav Sharma",
    },
    {
        id: 36,
        title: "Formal Verification of Smart Contracts",
        description: "Applying principles of theoretical computer science to mathematically prove the correctness and security of blockchain-based smart contracts before deployment.",
        category: "Quantum",
        status: "Ongoing",
        facultyLead: "Dr. Subhankar Ghosal",
        studentLead: "Tanvi Mehta",
    }
];

// --- UPDATED ProjectCard Component ---
const ProjectCard: React.FC<{ project: typeof projects[0] }> = ({ project }) => {
    const statusColor = 
        project.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
        project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
        'bg-yellow-100 text-yellow-800'; // For 'Proposed'

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-gray-900 pr-4">{project.title}</h2>
                <span className={`flex-shrink-0 px-3 py-1 text-xs font-semibold rounded-full self-start ${statusColor}`}>
                    {project.status}
                </span>
            </div>
            <div className="text-sm text-gray-500 mb-4 space-y-1">
                <p>Faculty Lead: <span className="font-medium text-orange-600">{project.facultyLead}</span></p>
                <p>Student Lead: <span className="font-medium text-orange-600">{project.studentLead}</span></p>
            </div>
            <p className="text-gray-700 flex-grow">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-dark-blue text-white">{project.category}</span>
            </div>
        </div>
    );
};

const CurrentProjectsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Projects');
    
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(projects.map(p => p.category))];
        return ['All Projects', ...uniqueCategories];
    }, []);

    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'All Projects') {
            return projects;
        }
        return projects.filter(project => project.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="bg-white min-h-screen pt-20 text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">Current Projects</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                        A snapshot of the cutting-edge research and development happening at our Centers of Excellence.
                    </p>
                </div>

                {/* --- NEW Circular Category Filter --- */}
                <div className="mb-12">
                    <div className="flex items-center space-x-4 pb-4 overflow-x-auto">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex flex-col items-center justify-center flex-shrink-0 w-24 h-24 rounded-full transition-all duration-300 ease-in-out focus:outline-none transform hover:scale-105
                                    ${selectedCategory === category
                                        ? 'bg-dark-blue text-white shadow-lg border-2 border-orange-400'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`
                                }
                            >
                                <span className="text-sm font-semibold text-center px-1">{category}</span>
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CurrentProjectsPage;