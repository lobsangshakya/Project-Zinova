import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../hooks/useAuth';
import { DocumentTextIcon, PencilIcon, TrophyIcon } from '../components/icons';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useToast } from '../context/ToastContext';
import { User } from '../types';

const FacultyProfilePage = () => {
    const { facultyId } = useParams<{ facultyId: string }>();
    const { users, updateUser } = useData();
    const { user: loggedInUser, isAuthenticated } = useAuth();
    const { addToast } = useToast();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const faculty = facultyId ? users.find(u => u.id === facultyId) : undefined;
    
    // Form state for editing
    const [editData, setEditData] = useState<Partial<User>>({});

    useEffect(() => {
        if (faculty) {
            setEditData({
                description: faculty.description || '',
                researchInterests: faculty.researchInterests || [],
                achievements: faculty.achievements || [],
            });
        }
    }, [faculty, isEditModalOpen]);
    
    if (!faculty || faculty.role !== 'FACULTY') {
        return <Navigate to="/coe" replace />;
    }

    const canEdit = isAuthenticated && loggedInUser?.id === faculty.id;

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!faculty) return;

        if (!editData.description?.trim()) {
            addToast('Biography cannot be empty.', 'error');
            return;
        }

        updateUser(faculty.id, editData);
        addToast('Changes saved locally (not synced with backend)', 'success');
        setIsEditModalOpen(false);
    };

    return (
        <div style={{ backgroundColor: '#0A1A40' }} className="min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Profile Header */}
                <Card className="p-8 bg-white rounded-xl shadow-lg mb-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <img 
                            src={faculty.avatarUrl} 
                            alt={faculty.name}
                            className="h-40 w-40 rounded-full object-cover border-4 border-orange-500 shadow-md"
                        />
                        <div className="text-center md:text-left flex-grow">
                            <h1 className="text-4xl font-extrabold text-gray-900">{faculty.name}</h1>
                            <p className="mt-2 text-xl text-orange-600 font-semibold">{faculty.title}</p>
                            <a href={`mailto:${faculty.email}`} className="text-gray-600 hover:text-orange-500 transition-colors">{faculty.email}</a>
                        </div>
                         {canEdit && (
                            <Button 
                                onClick={() => setIsEditModalOpen(true)}
                                className="bg-[#1E3A8A] hover:bg-[#2563EB] focus:ring-[#1E3A8A]"
                            >
                                <PencilIcon className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Biography */}
                        <Card className="p-8 bg-white rounded-xl shadow-lg">
                            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-4 flex items-center">
                                <PencilIcon className="h-7 w-7 mr-3 text-orange-500" />
                                About Me
                            </h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{faculty.description}</p>
                        </Card>

                        {/* Publications */}
                        {faculty.publications && faculty.publications.length > 0 && (
                            <Card className="p-8 bg-white rounded-xl shadow-lg">
                                <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6 flex items-center">
                                    <DocumentTextIcon className="h-7 w-7 mr-3 text-orange-500" />
                                    Publications
                                </h2>
                                <div className="space-y-4">
                                    {faculty.publications.map((pub, index) => (
                                        <div key={index} className="bg-gray-100 p-4 rounded-md border border-gray-200">
                                            <h3 className="font-semibold text-gray-800">{pub.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Journal: {pub.journal}</p>
                                            {pub.doi && <p className="text-sm text-gray-500">DOI: {pub.doi}</p>}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            {faculty.researchInterests && faculty.researchInterests.length > 0 && (
                                 <Card className="p-6 bg-white rounded-xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Research Interests</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {faculty.researchInterests.map((interest, index) => (
                                            <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            )}
                             {faculty.patents && faculty.patents.length > 0 && (
                                <Card className="p-6 bg-white rounded-xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Patents</h2>
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {faculty.patents.map((patent, index) => <li key={index}>{patent}</li>)}
                                    </ul>
                                </Card>
                            )}
                             {faculty.achievements && faculty.achievements.length > 0 && (
                                <Card className="p-6 bg-white rounded-xl shadow-lg">
                                    <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4 flex items-center">
                                        <TrophyIcon className="h-6 w-6 mr-3 text-orange-500" />
                                        Achievements
                                    </h2>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        {faculty.achievements.map((achievement, index) => <li key={index}>{achievement}</li>)}
                                    </ul>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
                {faculty.lastUpdated && (
                    <div className="mt-12 text-center text-sm text-gray-400">
                        Profile last updated: {new Date(faculty.lastUpdated).toLocaleString()}
                    </div>
                )}
            </div>

             <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Profile">
                <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Biography / Description</label>
                        <textarea 
                            id="description" 
                            rows={6}
                            value={editData.description || ''}
                            onChange={(e) => setEditData({...editData, description: e.target.value})}
                            className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="researchInterests" className="block text-sm font-medium text-gray-300">Research Interests (comma-separated)</label>
                        <input
                            type="text"
                            id="researchInterests"
                            value={(editData.researchInterests || []).join(', ')}
                            onChange={(e) => setEditData({...editData, researchInterests: e.target.value.split(',').map(i => i.trim())})}
                            className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="achievements" className="block text-sm font-medium text-gray-300">Achievements (one per line)</label>
                        <textarea
                            id="achievements"
                            rows={4}
                            value={(editData.achievements || []).join('\n')}
                            onChange={(e) => setEditData({...editData, achievements: e.target.value.split('\n').filter(a => a.trim() !== '')})}
                            className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            placeholder="First place in Hackathon...&#10;Published paper in XYZ..."
                        />
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        <Button type="submit" className="bg-[#1E3A8A] hover:bg-[#2563EB] focus:ring-[#1E3A8A]">Save Changes</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default FacultyProfilePage;
