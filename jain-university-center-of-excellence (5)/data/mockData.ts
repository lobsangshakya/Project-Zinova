
import { Project, ResearchPaper, Announcement, Event, PaperStatus, Achievement, User, CommunityPost, UserRole, EventStatus, COE, FacultyPublication } from '../types';
import { rawStudentData } from './mockStudents';

// --- NEW VERIFIED & EXPANDED FACULTY DATA ---
interface FacultyData {
    name: string;
    email: string;
    title: string;
    coes: string[];
    description: string;
    researchInterests: string[];
    publications: FacultyPublication[];
    patents?: string[];
}

const facultyData: { [key: string]: FacultyData } = {
    'swati-gupta': {
        name: 'Dr. Swati Gupta',
        email: 'swati.gupta@jain.com',
        title: 'Assistant Professor',
        coes: ['ai-ml'],
        description: "Dr. Swati Gupta is currently serving as an Assistant Professor in the Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning) at Jain University. She earned her Ph.D. in Computer Science and Engineering from the Indian Institute of Technology (IIT) Roorkee in 2019 and completed her M.Tech. in Information Technology from the Indian Institute of Information Technology (IIIT) Allahabad in 2014.",
        researchInterests: ['Text Mining', 'Natural Language Processing', 'Computer Vision', 'Machine Learning', 'Deep Learning'],
        publications: [
            { title: 'Research published in NeurIPS', journal: 'NeurIPS' },
            { title: 'Research published in HyperText', journal: 'HyperText' },
            { title: 'Research published in Knowledge and Information Systems (KAIS)', journal: 'KAIS' }
        ]
    },
    'm-kumaresan': {
        name: 'Dr. M. Kumaresan',
        email: 'm.kumaresan@jain.com',
        title: 'Associate Professor',
        coes: ['iot-robotics'],
        description: "With over a decade of teaching experience, Dr. Kumaresan has a deep understanding of the subject matter. His research interests lie in Cloud Computing, IoT, Big Data, and Networks. He has published over 25 international journal papers and conference proceedings in these areas.",
        researchInterests: ['Cloud Computing', 'IoT', 'Big Data', 'Networks'],
        publications: [{ title: '25+ international journal and conference papers', journal: 'Various' }]
    },
    'ambili-kn': {
        name: 'Ms. Ambili K N',
        email: 'ambili.kn@jain.com',
        title: 'Assistant Professor',
        coes: ['cyber-security', 'theoretical-cs'],
        description: "Holds an M.Tech in Cybersecurity and is pursuing a PhD in Cryptography. Interested in quantum computing and its implications for security.",
        researchInterests: ['Cryptography', 'Quantum Computing', 'Cybersecurity'],
        publications: []
    },
    's-santhosh': {
        name: 'Dr. Santhosh S',
        email: 's.santhosh@jain.com',
        title: 'Professor',
        coes: ['networking-hpc'],
        description: "Completed his Ph.D in Computer Science and Engineering from Jain Deemed-to-be University, Bangalore. He has overall 16 years of experience in teaching, administration, and industry. He has published seven articles in peer-reviewed journals.",
        researchInterests: ['Networking', 'High-Performance Computing', 'Peer-to-Peer Systems'],
        publications: [{ title: '7 articles in peer-reviewed journals', journal: 'Various' }]
    },
    'b-swaminathan': {
        name: 'Dr. B. Swaminathan',
        email: 'b.swaminathan@jain.com',
        title: 'Professor',
        coes: ['networking-hpc', 'ai-ml'],
        description: "His areas of interest are Cloud Computing. He extensively published papers in multi-attribute decision making mechanism for peer selection in collaborative peer-to-peer systems and papers in Artificial Engineering.",
        researchInterests: ['Cloud Computing', 'Artificial Engineering', 'Decision Making Mechanisms'],
        publications: []
    },
    'm-sayeekumar': {
        name: 'Dr. M. Sayeekumar',
        email: 'sayeekumar.m@jain.com',
        title: 'Associate Professor',
        coes: ['ai-ml', 'cyber-security', 'iot-robotics'],
        description: "An Associate Professor with more than 23 years of academic experience. His research spans Network Security, Machine Learning, and the Internet of Things (IoT). He is dedicated to publishing high-quality research in reputed indexed journals.",
        researchInterests: ['Network Security', 'Machine Learning', 'Internet of Things (IoT)'],
        publications: []
    },
     'v-manikandan': {
        name: 'Dr. V. Manikandan',
        email: 'v.manikandan@jain.com',
        title: 'Assistant Professor',
        coes: ['ai-ml'],
        description: "An Assistant Professor with over 14+ years of experience in teaching. He has completed PG (M. E-CSE) in Anna University, Chennai and Ph.D. Awarded in Computer science and Engineering, Shri Venkateshwara University.",
        researchInterests: ['Computer Science', 'Artificial Intelligence'],
        publications: []
    },
    'ks-arvind': {
        name: 'Dr. K S Arvind',
        email: 'ks.arvind@jain.com',
        title: 'Associate Professor',
        coes: ['ai-ml', 'cyber-security'],
        description: "Dr. Arvind's research centers around critical areas such as Cloud Security & Privacy, Network Security, and Software Engineering. His research findings have been published in renowned journals indexed in Scopus, Web of Science (WoS), and SCIE.",
        researchInterests: ['Cloud Security & Privacy', 'Network Security', 'Software Engineering'],
        publications: []
    },
    'vairavel-chenniyappan': {
        name: 'Dr. Vairavel Chenniyappan',
        email: 'c.vairavel@jain.com',
        title: 'Assistant Professor',
        coes: ['ai-ml', 'cyber-security'],
        description: "With over 18 years of teaching experience, his research interests encompass a wide range of areas, including Information Security, Big Data Privacy, Computer Network Security, IoT, and Big Data Analytics. He has authored and co-authored more than 10 research papers.",
        researchInterests: ['Information Security', 'Big Data Privacy', 'IoT', 'Big Data Analytics'],
        publications: [{ title: '10+ research papers in reputed international journals', journal: 'Various' }]
    },
    'sugumar-ramaiyan': {
        name: 'Dr. Sugumar Ramaiyan',
        email: 'sugumar.ramaiyan@jain.com',
        title: 'Associate Professor',
        coes: ['ai-ml', 'cyber-security'],
        description: "A distinguished professional with over 17 years of experience in Artificial Intelligence, Data Science Applications, Big Data, Software Engineering, Cloud Computing, and Cyber Security. He is working as an Associate Professor in CSE Department in FET-Jain University.",
        researchInterests: ['Artificial Intelligence', 'Data Science', 'Big Data', 'Cloud Computing', 'Cyber Security'],
        publications: []
    },
    'tv-raman': {
        name: 'Dr. T V Raman',
        email: 'tv.raman@jain.com',
        title: 'Professor',
        coes: ['ai-ml', 'iot-robotics'],
        description: "A distinguished Professor with over 19 years of academic and research experience. Dr. Raman's current research primarily focuses on the Internet of Things (IoT) and Machine Learning. He has published extensively in reputed SCI-indexed journals, including IEEE Transactions and ACM Transactions.",
        researchInterests: ['Internet of Things (IoT)', 'Machine Learning', 'Disruptive Technologies'],
        publications: [{ title: 'Multiple textbooks with SIP International', journal: 'SIP International' }],
        patents: ['Patents filed and granted across India, Australia, and Germany']
    },
     's-saravanakumar': {
        name: 'Dr. S Saravanakumar',
        email: 's.saravanakumar@jain.com',
        title: 'Associate Professor',
        coes: ['ai-ml', 'theoretical-cs'],
        description: "Dr. Saravanakumar specializes in Big Data Analytics, Image Processing, medical image processing, Data Mining, and Internet of Things. His research contributions include 50 international journal papers and he has presented 60 research papers at international conferences.",
        researchInterests: ['Big Data Analytics', 'Image Processing', 'Data Mining', 'IoT'],
        publications: [{ title: '50 international journal papers (SCI, SCOPUS, etc.)', journal: 'Various Journals' }, { title: '60 research papers at international conferences', journal: 'Various Conferences' }]
    },
    // Add more faculty here from parsing...
};


const createFacultyUser = (id: string, data: FacultyData): User => ({
    id: `faculty-${id}`,
    name: data.name,
    email: data.email,
    role: UserRole.FACULTY,
    avatarUrl: `https://i.pravatar.cc/100?u=${id}`,
    department: 'Computer Science & Engineering',
    coeId: data.coes[0], // Primary COE
    coes: data.coes,
    description: data.description,
    title: data.title,
    researchInterests: data.researchInterests,
    publications: data.publications,
    patents: data.patents,
});

const newFacultyPool: User[] = Object.entries(facultyData).map(([id, data]) => createFacultyUser(id, data));

// --- STUDENT DATA PROCESSING ---
const associationToCoeIdMap: { [key: string]: string } = {
    'AI & ML': 'ai-ml',
    'Cyber & Systems Security': 'cyber-security',
    'IoT, Robotics & Emerging Tech': 'iot-robotics',
    'Networking & HPC': 'networking-hpc',
    'Theoretical CS': 'theoretical-cs',
};

const newStudentPool: User[] = rawStudentData
    .filter(student => associationToCoeIdMap[student.association]) // Filter out students from removed COEs
    .map(student => {
        const id = student.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        return {
            id: `student-${id}`,
            name: student.name,
            email: `${id}@jain.com`,
            role: UserRole.STUDENT,
            avatarUrl: student.imageUrl,
            department: student.year,
            coeId: associationToCoeIdMap[student.association],
            description: student.role, 
        };
    });


const getFacultyIdsForCOE = (coeId: string): string[] => {
    return Object.entries(facultyData)
        .filter(([, data]) => data.coes.includes(coeId))
        .map(([id]) => `faculty-${id}`);
};

const allUsers: User[] = [
    { id: 'user-3', name: 'Admin', email: 'admin@jain.com', role: UserRole.ADMIN, avatarUrl: 'https://i.pravatar.cc/100?u=admin', coeId: 'ai-ml' },
    { ...createFacultyUser('swati-gupta', facultyData['swati-gupta']) },
    {
        id: 'faculty-sunanda-das', name: 'Dr. Sunanda Das', email: 'sunanda-das@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=sunanda', coeId: 'cyber-security',
        description: "Profile URL provided, direct description not available in the source data: https://scholar.google.com/citations?user=o2bbeFEAAAAJ&hl=en&oi=ao", title: 'Professor', coes: ['cyber-security']
    },
    {
        id: 'faculty-vikram-neerugatti', name: 'Dr. Vikram Neerugatti', email: 'vikram-neerugatti@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=vikram', coeId: 'iot-robotics',
        description: "Dr. Vikram Neerugatti, an Associate Professor at JAIN (Deemed-to-be University)'s School of Computer Science and Engineering, brings over 14 years of teaching experience and a strong academic background. With a Ph.D. in Computer Science and Engineering from Sri Venkateshwara University, his research areas encompass the Internet of Things, Augmented Reality and Virtual Reality, Fog/Edge Computing, Machine Learning, Artificial Intelligence, and Data Science. Dr. Neerugatti boasts an impressive research track record, including 21 patents (including 3 granted), four published textbooks, and over 30 publications in international conferences and SCI/Scopus-indexed journals.", title: 'Associate Professor', coes: ['iot-robotics']
    },
    {
        id: 'faculty-nishant-tripathi', name: 'Dr. Nishant Tripathi', email: 'nishant-tripathi@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=nishant', coeId: 'networking-hpc',
        description: "Dr. Nishant Tripathi is an academician and researcher with over 16 years of experience in engineering education, research, and academic leadership. I possess a Ph.D. in Wireless Communication (Wireless Sensor Networks) and have authored over 40 peer-reviewed articles [SCOPUS/WoS/UGC], three books, and two patents. My research spans distributed systems, scalable networks, wireless communication, IoT, cloud security, image processing, and high-performance computing (HPC). I aim to make impactful contributions to networking and high-performance computing through collaborative CoE initiatives.", title: 'Associate Professor', coes: ['networking-hpc']
    },
    {
        id: 'faculty-subhankar-ghosal', name: 'Dr. Subhankar Ghosal', email: 'subhankar-ghosal@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=subhankar', coeId: 'theoretical-cs',
        description: "I am Dr. Subhankar Ghosal, currently working as an Assistant Professor in the Department of Computer Science and Engineering at Jain University. My research focuses on randomized algorithms and their applications. These algorithms use random numbers to make decisions at different steps of computation to improve complexity. Unlike traditional heuristics, randomized algorithms provide provable performance guarantees, ensuring correctness, reliability, and efficiency. My research emphasizes both theoretical rigor and applied relevance, aiming to bridge fundamental computer science with practical innovation.", title: 'Assistant Professor', coes: ['theoretical-cs']
    },
    ...newFacultyPool,
    ...newStudentPool
];


export const mockUsersById = allUsers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {} as { [key: string]: User });

export const mockCOEs: COE[] = [
    {
        id: 'ai-ml',
        name: 'AI & ML',
        longName: 'Artificial Intelligence & Machine Learning',
        logoUrl: 'https://via.placeholder.com/128/FF951C/0A192F?text=AI%26ML',
        leader: {
            name: 'Dr. Swati Gupta',
            title: 'CoE Leader, AI & ML',
            imageUrl: 'https://i.pravatar.cc/200?u=swati',
            description: "Dr. Swati Gupta is currently serving as an Assistant Professor in the Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning) at Jain University. She earned her Ph.D. in Computer Science and Engineering from the Indian Institute of Technology (IIT) Roorkee in 2019 and completed her M.Tech. in Information Technology from the Indian Institute of Information Technology (IIIT) Allahabad in 2014. Her research interests span across Text Mining, Natural Language Processing (NLP), Computer Vision, Machine Learning, and Deep Learning. She has disseminated her research findings through publications in reputed international journals and conferences, including NeurIPS, HyperText, and Knowledge and Information Systems (KAIS)."
        },
        facultyIds: ['faculty-swati-gupta', ...getFacultyIdsForCOE('ai-ml')].filter((v, i, a) => a.indexOf(v) === i),
        studentIds: newStudentPool.filter(s => s.coeId === 'ai-ml').map(s => s.id),
        tagline: 'Led by Dr. Swati Gupta'
    },
    {
        id: 'cyber-security',
        name: 'Cyber & Systems Security',
        longName: 'Cyber & Systems Security',
        logoUrl: 'https://via.placeholder.com/128/FF951C/0A192F?text=Cyber',
        leader: {
            name: 'Dr. Sunanda Das',
            title: 'CoE Leader, Cyber Security',
            imageUrl: 'https://i.pravatar.cc/200?u=sunanda',
            description: 'Profile URL provided, direct description not available in the source data: https://scholar.google.com/citations?user=o2bbeFEAAAAJ&hl=en&oi=ao'
        },
        facultyIds: ['faculty-sunanda-das', ...getFacultyIdsForCOE('cyber-security')].filter((v, i, a) => a.indexOf(v) === i),
        studentIds: newStudentPool.filter(s => s.coeId === 'cyber-security').map(s => s.id),
        tagline: 'Led by Dr. Sunanda Das'
    },
    {
        id: 'iot-robotics',
        name: 'IoT, Robotics & Embedded Systems',
        longName: 'IoT, Robotics & Embedded Systems',
        logoUrl: 'https://via.placeholder.com/128/FF951C/0A192F?text=IoT',
        leader: {
            name: 'Dr. Vikram Neerugatti',
            title: 'CoE Leader, IoT & Robotics',
            imageUrl: 'https://i.pravatar.cc/200?u=vikram',
            description: "Dr. Vikram Neerugatti, an Associate Professor at JAIN (Deemed-to-be University)'s School of Computer Science and Engineering, brings over 14 years of teaching experience and a strong academic background. With a Ph.D. in Computer Science and Engineering from Sri Venkateshwara University, his research areas encompass the Internet of Things, Augmented Reality and Virtual Reality, Fog/Edge Computing, Machine Learning, Artificial Intelligence, and Data Science. Dr. Neerugatti boasts an impressive research track record, including 21 patents (including 3 granted), four published textbooks, and over 30 publications in international conferences and SCI/Scopus-indexed journals."
        },
        facultyIds: ['faculty-vikram-neerugatti', ...getFacultyIdsForCOE('iot-robotics')].filter((v, i, a) => a.indexOf(v) === i),
        studentIds: newStudentPool.filter(s => s.coeId === 'iot-robotics').map(s => s.id),
        tagline: 'Led by Dr. Vikram Neerugatti'
    },
    {
        id: 'networking-hpc',
        name: 'Networking & HPC',
        longName: 'Networking & High-Performance Computing',
        logoUrl: 'https://via.placeholder.com/128/FF951C/0A192F?text=HPC',
        leader: {
            name: 'Dr. Nishant Tripathi',
            title: 'CoE Leader, Networking & HPC',
            imageUrl: 'https://i.pravatar.cc/200?u=nishant',
            description: "Dr. Nishant Tripathi is an academician and researcher with over 16 years of experience in engineering education, research, and academic leadership. I possess a Ph.D. in Wireless Communication (Wireless Sensor Networks) and have authored over 40 peer-reviewed articles [SCOPUS/WoS/UGC], three books, and two patents. My research spans distributed systems, scalable networks, wireless communication, IoT, cloud security, image processing, and high-performance computing (HPC). I aim to make impactful contributions to networking and high-performance computing through collaborative CoE initiatives."
        },
        facultyIds: ['faculty-nishant-tripathi', ...getFacultyIdsForCOE('networking-hpc')].filter((v, i, a) => a.indexOf(v) === i),
        studentIds: newStudentPool.filter(s => s.coeId === 'networking-hpc').map(s => s.id),
        tagline: 'Led by Dr. Nishant Tripathi'
    },
    {
        id: 'theoretical-cs',
        name: 'Theoretical CS',
        longName: 'Theoretical Computer Science',
        logoUrl: 'https://via.placeholder.com/128/FF951C/0A192F?text=CS',
        leader: {
            name: 'Dr. Subhankar Ghosal',
            title: 'CoE Leader, Theoretical CS',
            imageUrl: 'https://i.pravatar.cc/200?u=subhankar',
            description: "I am Dr. Subhankar Ghosal, currently working as an Assistant Professor in the Department of Computer Science and Engineering at Jain University. My research focuses on randomized algorithms and their applications. These algorithms use random numbers to make decisions at different steps of computation to improve complexity. Unlike traditional heuristics, randomized algorithms provide provable performance guarantees, ensuring correctness, reliability, and efficiency. My research emphasizes both theoretical rigor and applied relevance, aiming to bridge fundamental computer science with practical innovation."
        },
        facultyIds: ['faculty-subhankar-ghosal', ...getFacultyIdsForCOE('theoretical-cs')].filter((v, i, a) => a.indexOf(v) === i),
        studentIds: newStudentPool.filter(s => s.coeId === 'theoretical-cs').map(s => s.id),
        tagline: 'Led by Dr. Subhankar Ghosal'
    }
];


export const mockProjects: Project[] = Array.from({ length: 120 }, (_, i) => {
    const coe = mockCOEs[i % mockCOEs.length];
    const levels: Project['level'][] = ['University', 'National', 'SIH', 'Internal'];
    const progresses: Project['progress'][] = ['Proposed', 'Assigned', 'Started', 'In Progress', 'Approval', 'Completed', 'Rejected'];
    const statuses: Project['status'][] = ['Ongoing', 'Completed'];
    
    const proposerId = coe.facultyIds.length > 0 ? coe.facultyIds[i % coe.facultyIds.length] : 'user-2';
    const proposer = mockUsersById[proposerId];
    
    const assignedStudents = (coe.studentIds.length > 2) ? [coe.studentIds[i % coe.studentIds.length], coe.studentIds[(i+1) % coe.studentIds.length]] : [];
    const team = [proposer?.name, ...assignedStudents.map(id => mockUsersById[id]?.name)].filter(Boolean);

    let progress = progresses[i % progresses.length];
    // Ensure some projects are in 'Proposed' state for admin approval demo
    if (i % 5 === 0) {
      progress = 'Proposed';
    }

    return {
        id: `proj-${i + 1}`,
        title: `Project Title ${i + 1}`,
        description: `This is a detailed description for project ${i + 1}. It focuses on solving a critical problem within the domain of ${coe.longName}, leveraging advanced techniques and collaborative efforts from students and faculty. The project aims to deliver a scalable and efficient solution with real-world impact.`,
        team: team as string[],
        status: progress === 'Completed' || progress === 'Rejected' ? 'Completed' : 'Ongoing',
        imageUrl: `https://picsum.photos/seed/project${i+1}/600/400`,
        coeId: coe.id,
        level: levels[i % levels.length],
        progress: progress,
        department: proposer?.department || 'Computer Science',
        proposerId: proposerId,
        assignedStudentIds: progress === 'Proposed' ? [] : assignedStudents,
    };
});


export const mockPapers: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Advancements in Neural Network Pruning',
    authors: ['Dr. Swati Gupta', 'Aarav Sharma'],
    publicationYear: 2023,
    department: 'Computer Science',
    abstract: 'This paper explores novel techniques for pruning deep neural networks to reduce computational cost without significant loss in accuracy.',
    fileUrl: '#',
    doi: '10.1109/CVPR.2023.01234',
    status: PaperStatus.APPROVED,
    submittedBy: 'faculty-swati-gupta',
  },
  {
    id: 'paper-2',
    title: 'A Study on Photovoltaic Cell Efficiency',
    authors: ['Sunita Patil', 'Dr. M. Kumaresan'],
    publicationYear: 2022,
    department: 'Electronics Engineering',
    abstract: 'An empirical study on improving the efficiency of silicon-based photovoltaic cells through surface texturing.',
    fileUrl: '#',
    doi: '10.1016/j.solener.2022.05.018',
    status: PaperStatus.APPROVED,
    submittedBy: 'faculty-m-kumaresan',
  },
  {
    id: 'paper-3',
    title: 'The Impact of Social Media on Political Discourse',
    authors: ['Rohan Gupta'],
    publicationYear: 2023,
    department: 'Humanities',
    abstract: 'An analysis of how major social media platforms have shaped political conversations and voter behavior in recent elections.',
    fileUrl: '#',
    doi: '10.1080/1369118X.2023.1234567',
    status: PaperStatus.PENDING,
    submittedBy: 'student-aaravsharma',
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Dr. Swati Gupta awarded "Innovator of the Year"',
    content: 'We are proud to announce that Dr. Swati Gupta from the Computer Science department has been awarded the "Innovator of the Year" by the National Tech Council for her work on AI.',
    date: '2024-07-20',
    category: 'Faculty Achievements',
    author: 'CoE Admin',
  },
  {
    id: 'ann-2',
    title: 'Student Team Wins National Hackathon "CodeStorm 2024"',
    content: 'Congratulations to Aarav Sharma and his team for securing first place at CodeStorm 2024, a national-level hackathon focused on sustainable development goals.',
    date: '2024-07-18',
    category: 'Student Achievements',
    author: 'CoE Admin',
  },
  {
    id: 'ann-3',
    title: 'Guest Lecture on "The Future of Quantum Computing"',
    content: 'Join us for an insightful guest lecture by Dr. Aruna Desai from MIT on the exciting advancements in quantum computing. The event will be held on August 5th in the main auditorium.',
    date: '2024-07-15',
    category: 'General',
    author: 'CoE Admin',
  },
];

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Workshop on Deep Learning with PyTorch',
    date: '2024-08-10',
    time: '09:00 AM - 04:00 PM',
    location: 'AI & Robotics Lab',
    description: 'A hands-on workshop covering the fundamentals of deep learning and practical implementation using the PyTorch framework.',
    type: 'Workshop',
    status: EventStatus.APPROVED,
    submittedBy: 'faculty-swati-gupta',
    coeId: 'ai-ml',
  },
  {
    id: 'evt-2',
    title: 'Jain Innovate Hackathon 2024',
    date: '2024-09-05',
    time: 'Starts 10:00 AM',
    location: 'Virtual',
    description: 'A 24-hour hackathon focused on creating innovative solutions for real-world problems. Exciting prizes to be won!',
    type: 'Hackathon',
    status: EventStatus.APPROVED,
    submittedBy: 'user-3',
    coeId: 'ai-ml',
  },
  {
    id: 'evt-3',
    title: 'Seminar on Intellectual Property Rights',
    date: '2024-08-22',
    time: '02:00 PM - 03:30 PM',
    location: 'Seminar Hall B',
    description: 'An essential seminar for all researchers and innovators on the importance of patents, copyrights, and trademarks.',
    type: 'Seminar',
    status: EventStatus.APPROVED,
    submittedBy: 'faculty-subhankar-ghosal',
    coeId: 'theoretical-cs',
  },
  {
    id: 'evt-4',
    title: 'Guest Lecture on 5G Technology',
    date: '2024-10-15',
    time: '11:00 AM - 12:30 PM',
    location: 'Main Auditorium',
    description: 'A guest lecture by an industry expert on the rollout and impact of 5G technology.',
    type: 'Guest Lecture',
    status: EventStatus.PENDING,
    submittedBy: 'faculty-nishant-tripathi',
    coeId: 'networking-hpc',
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Best Research Paper Award at IEEE Conference',
    recipient: 'Dr. Swati Gupta',
    category: 'Faculty',
    date: '2024-06-15',
    description: 'Dr. Gupta was recognized for her outstanding contribution to the field of artificial intelligence with her paper on efficient neural network architectures.',
    imageUrl: 'https://picsum.photos/seed/award1/600/400',
  },
  {
    id: 'ach-2',
    title: 'First Place at Smart India Hackathon 2024',
    recipient: 'Aarav Sharma & Team',
    category: 'Student',
    date: '2024-05-20',
    description: 'A team of students won the top prize for their innovative solution in the healthcare domain, developing an AI-powered diagnostic tool.',
    imageUrl: 'https://picsum.photos/seed/award2/600/400',
  },
  {
    id: 'ach-3',
    title: 'Ranked Top 5 in National Innovation Rankings',
    recipient: 'Jain University',
    category: 'University',
    date: '2024-04-30',
    description: 'The Center of Excellence played a key role in Jain University being recognized as one of the top 5 institutions for innovation and research output nationwide.',
    imageUrl: 'https://picsum.photos/seed/award3/600/400',
  },
   {
    id: 'ach-4',
    title: 'Young Scientist Fellowship',
    recipient: 'Anjali Gupta',
    category: 'Student',
    date: '2024-03-10',
    description: 'Anjali Gupta was awarded the prestigious Young Scientist Fellowship by the Department of Science and Technology for her promising research in renewable energy.',
    imageUrl: 'https://picsum.photos/seed/award4/600/400',
  },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'faculty-swati-gupta', // Dr. Swati Gupta
    content: 'Just published a new paper on advancements in neural network pruning. Exciting to see where this research leads! #AI #MachineLearning',
    timestamp: '2024-07-28T10:00:00Z',
    likes: ['student-aaravsharma', 'user-3'],
    comments: [
      {
        id: 'comment-1-1',
        authorId: 'student-aaravsharma', // Priya Sharma
        content: 'Congratulations, Dr. Gupta! That sounds fascinating.',
        timestamp: '2024-07-28T10:05:00Z',
      },
    ],
  },
  {
    id: 'post-2',
    authorId: 'student-aaravsharma', // Priya Sharma
    content: 'Our team is gearing up for the Jain Innovate Hackathon 2024! Any tips for last-minute preparations? 🚀 #Hackathon #Innovation',
    timestamp: '2024-07-27T15:30:00Z',
    likes: ['faculty-swati-gupta'],
    comments: [],
  },
];
