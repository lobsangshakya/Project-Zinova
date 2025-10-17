import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { ResearchPaper, Event, UserRole, PaperStatus, Project, User, EventStatus, ProjectProgress } from '../types';
import { mockPapers, mockEvents, mockProjects, mockUsersById } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';

// Helper to initialize state from sessionStorage or fall back to mock data
const initializeState = <T,>(key: string, defaultValue: T): T => {
    try {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
        console.error(`Failed to parse ${key} from sessionStorage`, error);
        return defaultValue;
    }
};

interface DataContextType {
  papers: ResearchPaper[];
  events: Event[];
  projects: Project[];
  users: User[];
  submitPaper: (paper: Omit<ResearchPaper, 'id' | 'status' | 'fileUrl' | 'submittedBy' | 'submissionDate'>) => void;
  updatePaperStatus: (paperId: string, status: PaperStatus) => void;
  createApprovedEvent: (event: Omit<Event, 'id' | 'status' | 'submittedBy' | 'coeId'>, coeId: string) => void;
  proposeEvent: (event: Omit<Event, 'id' | 'status' | 'submittedBy' | 'coeId'>, coeId: string) => void;
  updateEventStatus: (eventId: string, status: EventStatus) => void;
  registerForEvent: (eventId: string) => void;
  addProject: (project: Omit<Project, 'id' | 'imageUrl' | 'status' | 'progress' | 'proposerId' | 'assignedStudentIds' | 'team'>) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  addUser: (user: Omit<User, 'id' | 'avatarUrl' | 'coeId'>, coeId: string) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const [papers, setPapers] = useState<ResearchPaper[]>(() => initializeState('jain_coe_papers', mockPapers));
  const [events, setEvents] = useState<Event[]>(() => initializeState('jain_coe_events', mockEvents));
  const [projects, setProjects] = useState<Project[]>(() => initializeState('jain_coe_projects', mockProjects));
  const [users, setUsers] = useState<User[]>(() => initializeState('jain_coe_users', Object.values(mockUsersById)));

  // Persist state to sessionStorage whenever it changes
  useEffect(() => { sessionStorage.setItem('jain_coe_papers', JSON.stringify(papers)); }, [papers]);
  useEffect(() => { sessionStorage.setItem('jain_coe_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { sessionStorage.setItem('jain_coe_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { sessionStorage.setItem('jain_coe_users', JSON.stringify(users)); }, [users]);


  const submitPaper = (paperData: Omit<ResearchPaper, 'id' | 'status' | 'fileUrl' | 'submittedBy' | 'submissionDate'>) => {
    if (!user) return;
    const newPaper: ResearchPaper = {
      ...paperData,
      id: `paper-${Date.now()}`,
      status: PaperStatus.PENDING,
      submittedBy: user.id,
      fileUrl: '#', // Mock URL
      submissionDate: new Date().toISOString(),
    };
    setPapers(prevPapers => [newPaper, ...prevPapers]);
  };

  const updatePaperStatus = (paperId: string, newStatus: PaperStatus) => {
    setPapers(prevPapers =>
        prevPapers.map(p => (p.id === paperId ? { ...p, status: newStatus } : p))
    );
  };
  
  const createApprovedEvent = (eventData: Omit<Event, 'id' | 'status' | 'submittedBy' | 'coeId'>, coeId: string) => {
      const newEvent: Event = {
          ...eventData,
          id: `evt-${Date.now()}`,
          status: EventStatus.APPROVED,
          submittedBy: user?.id || 'user-3', // Default to admin
          coeId,
      };
      setEvents(prevEvents => [newEvent, ...prevEvents]);
  };
  
  const proposeEvent = (eventData: Omit<Event, 'id' | 'status' | 'submittedBy' | 'coeId'>, coeId: string) => {
    if (!user) return;
    const newEvent: Event = {
        ...eventData,
        id: `evt-${Date.now()}`,
        status: EventStatus.PENDING,
        submittedBy: user.id,
        coeId,
    };
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };
  
  const updateEventStatus = (eventId: string, newStatus: EventStatus) => {
    setEvents(prevEvents =>
        prevEvents.map(e => (e.id === eventId ? { ...e, status: newStatus } : e))
    );
  };

  const registerForEvent = (eventId: string) => {
    if (!user) return;
    setEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId) {
          const registeredUsers = event.registeredUsers || [];
          if (!registeredUsers.includes(user.id)) {
            return { ...event, registeredUsers: [...registeredUsers, user.id] };
          }
        }
        return event;
      })
    );
  };

  const addProject = (projectData: Omit<Project, 'id' | 'imageUrl' | 'status' | 'progress' | 'proposerId' | 'assignedStudentIds' | 'team'>) => {
    if(!user) return;
    const newProject: Project = {
        ...projectData,
        id: `proj-${Date.now()}`,
        status: 'Ongoing',
        progress: 'Proposed',
        proposerId: user.id,
        assignedStudentIds: [],
        team: [user.name],
        imageUrl: `https://picsum.photos/seed/project${Date.now()}/600/400`,
    };
    setProjects(prevProjects => [newProject, ...prevProjects]);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prevProjects =>
        prevProjects.map(p => p.id === projectId ? { ...p, ...updates } : p)
    );
  };

  const addUser = (userData: Omit<User, 'id' | 'avatarUrl' | 'coeId'>, coeId: string) => {
    const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        avatarUrl: `https://picsum.photos/seed/user${Date.now()}/100/100`,
        coeId,
    };
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prevUsers =>
      prevUsers.map(u => (u.id === userId ? { ...u, ...updates, lastUpdated: new Date().toISOString() } : u))
    );
  };

  return (
    <DataContext.Provider value={{ papers, events, projects, users, submitPaper, updatePaperStatus, createApprovedEvent, proposeEvent, updateEventStatus, registerForEvent, addProject, updateProject, addUser, updateUser }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
