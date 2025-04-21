
import React, { createContext, useContext, useState, useEffect } from 'react';

// The given job titles list
const JOB_TYPES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile App Developer",
  "Game Developer",
  "Embedded Systems Developer",
  "DevOps Engineer",
  "Software Engineer in Test",
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI/Deep Learning Engineer",
  "Data Engineer",
  "Cloud Engineer",
  "Site Reliability Engineer (SRE)",
  "Network Engineer",
  "Cybersecurity Analyst",
  "Security Engineer",
  "Penetration Tester",
  "Manual QA Tester",
  "QA Automation Engineer",
  "Performance Tester",
  "Product Manager",
  "Project Manager",
  "Scrum Master",
  "Technical Program Manager",
  "UI/UX Designer",
  "Interaction Designer",
  "Graphic Designer",
  "AR/VR Developer",
  "Blockchain Developer",
  "Systems Software Engineer",
  "CRM Developer",
  "ERP Developer"
];

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // On mount, load savedJobs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('savedJobs');
    if (stored) setSavedJobs(JSON.parse(stored));
  }, []);

  // When savedJobs changes, update localStorage
  useEffect(() => {
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    // No API call, just setup jobs from JOB_TYPES with dummy data
    setLoading(true);
    const dummyJobs = JOB_TYPES.map((title, idx) => ({
      id: idx + 1,
      title: title,
      company: 'TechCorp',
      location: 'Remote',
      type: 'Full-time',
      description: `${title} at TechCorp. This is a sample job description and requirements for a ${title}.`,
      requirements: [
        '5+ years of experience',
        'Strong problem-solving skills',
        'Team player with excellent communication',
      ],
      postedDate: new Date(Date.now() - Math.random() * 604800000).toLocaleDateString(),
    }));
    setJobs(dummyJobs);
    setLoading(false);
  }, []);

  const saveJob = (jobId) => {
    setSavedJobs(prev => prev.includes(jobId) ? prev : [...prev, jobId]);
  };

  const unsaveJob = (jobId) => {
    setSavedJobs(prev => prev.filter(id => id !== jobId));
  };

  return (
    <JobContext.Provider value={{ jobs, savedJobs, loading, saveJob, unsaveJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

