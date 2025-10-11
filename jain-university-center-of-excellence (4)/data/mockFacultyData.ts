
export interface FacultyProject {
    title: string;
    description: string;
}

export interface FacultyPublication {
    title: string;
    citations: string;
    link: string;
    doi: string;
    pdfUrl: string; // Placeholder
}

export interface FacultyProfile {
    id: string; // URL-friendly unique ID
    name: string;
    title: string;
    imageUrl: string;
    description: string;
    projects: FacultyProject[];
    publications: FacultyPublication[];
    researchInterests: string[];
}

export const mockFacultyProfiles: FacultyProfile[] = [
    {
        id: 'swati-gupta',
        name: 'Dr. Swati Gupta',
        title: 'Assistant Professor | AI & ML CoE Lead',
        imageUrl: 'https://i.pravatar.cc/200?u=swati',
        description: "Dr. Swati Gupta is currently serving as an Assistant Professor in the Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning) at Jain University. She earned her Ph.D. in Computer Science and Engineering from the Indian Institute of Technology (IIT) Roorkee in 2019 and completed her M.Tech. in Information Technology from the Indian Institute of Information Technology (IIIT) Allahabad in 2014. Her research interests span across Text Mining, Natural Language Processing (NLP), Computer Vision, Machine Learning, and Deep Learning. She has disseminated her research findings through publications in reputed international journals and conferences, including NeurIPS, HyperText, and Knowledge and Information Systems (KAIS).",
        projects: [
            {
                title: 'Ethical AI Framework for Autonomous Systems',
                description: 'Researching and defining a comprehensive ethical framework and decision-making model for autonomous vehicles and drones to ensure public safety and trust.'
            },
            {
                title: 'Federated Learning for Medical Image Analysis',
                description: 'Creating a decentralized machine learning model that allows multiple hospitals to collaboratively train an AI for disease detection without sharing sensitive patient data.'
            }
        ],
        publications: [
            {
                title: 'A Novel Approach to Sentiment Analysis in Low-Resource Languages',
                citations: 'NeurIPS 2022',
                link: '#',
                doi: '10.1109/NEURIPS.2022.01234',
                pdfUrl: '#'
            },
            {
                title: 'Deep Transfer Learning for Early Stage Disease Detection in Medical Imaging',
                citations: 'KAIS Journal, 2021',
                link: '#',
                doi: '10.1007/s10115-021-01567-8',
                pdfUrl: '#'
            }
        ],
        researchInterests: ['Text Mining', 'Natural Language Processing', 'Computer Vision', 'Machine Learning', 'Deep Learning', 'Ethical AI']
    },
    {
        id: 'sunanda-das',
        name: 'Dr. Sunanda Das',
        title: 'Professor | Cyber & Systems Security CoE Lead',
        imageUrl: 'https://i.pravatar.cc/200?u=sunanda',
        description: "Dr. Sunanda Das is a leading expert in cybersecurity with a focus on blockchain technology and network forensics. With over 15 years of experience in both academia and industry, her work aims to build resilient and secure digital infrastructures. She is a frequent speaker at international security conferences and holds several patents related to secure multi-party computation.",
        projects: [
            {
                title: 'Decentralized Digital Identity using Blockchain',
                description: 'A successful implementation of a self-sovereign identity system on a permissioned blockchain, giving users full control over their digital credentials.'
            },
            {
                title: 'AI-Powered Threat Intelligence Platform',
                description: 'Developing a platform that uses machine learning to predict and identify emerging cybersecurity threats from various data sources in real-time.'
            }
        ],
        publications: [
            {
                title: 'Scalable and Secure Voting Systems Using Blockchain',
                citations: 'IEEE Security & Privacy, 2020',
                link: '#',
                doi: '10.1109/MSP.2020.2989761',
                pdfUrl: '#'
            }
        ],
        researchInterests: ['Blockchain Security', 'Network Forensics', 'Cryptography', 'Threat Intelligence', 'Digital Identity']
    },
    {
        id: 'vikram-neerugatti',
        name: 'Dr. Vikram Neerugatti',
        title: 'Associate Professor | IoT, Robotics & Emerging Tech CoE Lead',
        imageUrl: 'https://i.pravatar.cc/200?u=vikram',
        description: "Dr. Vikram Neerugatti, an Associate Professor at JAIN (Deemed-to-be University)'s School of Computer Science and Engineering, brings over 14 years of teaching experience and a strong academic background. With a Ph.D. in Computer Science and Engineering from Sri Venkateshwara University, his research areas encompass the Internet of Things, Augmented Reality and Virtual Reality, Fog/Edge Computing, Machine Learning, Artificial Intelligence, and Data Science. Dr. Neerugatti boasts an impressive research track record, including 21 patents (including 3 granted), four published textbooks, and over 30 publications in international conferences and SCI/Scopus-indexed journals.",
        projects: [
            {
                title: 'AI-Powered Predictive Maintenance for IoT',
                description: 'Leveraging machine learning models to analyze real-time sensor data from industrial machinery, predicting failures before they occur to minimize downtime.'
            },
            {
                title: 'VR Simulation for Surgical Training',
                description: 'Building an immersive virtual reality environment that allows medical students to practice complex surgical procedures in a safe and repeatable setting.'
            }
        ],
        publications: [
            {
                title: 'Energy-Efficient Routing Protocols for Wireless Sensor Networks',
                citations: 'ACM Transactions on Sensor Networks, 2019',
                link: '#',
                doi: '10.1145/3310328',
                pdfUrl: '#'
            }
        ],
        researchInterests: ['Internet of Things (IoT)', 'Augmented & Virtual Reality', 'Fog/Edge Computing', 'Machine Learning', 'Data Science']
    },
    {
        id: 'nishant-tripathi',
        name: 'Dr. Nishant Tripathi',
        title: 'Associate Professor | Networking & HPC CoE Lead',
        imageUrl: 'https://i.pravatar.cc/200?u=nishant',
        description: "Dr. Nishant Tripathi is an academician and researcher with over 16 years of experience in engineering education, research, and academic leadership. I possess a Ph.D. in Wireless Communication (Wireless Sensor Networks) and have authored over 40 peer-reviewed articles [SCOPUS/WoS/UGC], three books, and two patents. My research spans distributed systems, scalable networks, wireless communication, IoT, cloud security, image processing, and high-performance computing (HPC). I aim to make impactful contributions to networking and high-performance computing through collaborative CoE initiatives.",
        projects: [
            {
                title: 'High-Performance Computing for Genomic Sequencing',
                description: 'Utilizing parallel computing and advanced algorithms on HPC clusters to accelerate the process of DNA sequencing and analysis for personalized medicine.'
            }
        ],
        publications: [
            {
                title: 'Performance Analysis of Load Balancing Algorithms in Cloud Computing',
                citations: 'IEEE Transactions on Parallel and Distributed Systems, 2021',
                link: '#',
                doi: '10.1109/TPDS.2021.3061412',
                pdfUrl: '#'
            }
        ],
        researchInterests: ['Distributed Systems', 'Scalable Networks', 'Wireless Communication', 'IoT', 'Cloud Security', 'High-Performance Computing (HPC)']
    }
];

export const mockFacultyDataById = mockFacultyProfiles.reduce((acc, faculty) => {
    acc[faculty.id] = faculty;
    return acc;
}, {} as { [key: string]: FacultyProfile });
