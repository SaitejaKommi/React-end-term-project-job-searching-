
import { useParams, Link } from 'react-router-dom';
import { useJobs } from '@/contexts/JobContext';
import { useState } from 'react';
import { BookmarkIcon } from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { jobs, savedJobs, saveJob, unsaveJob } = useJobs();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    coverLetter: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const job = jobs.find(j => j.id === Number(id));
  const isSaved = savedJobs.includes(Number(id));

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
        <Link to="/" className="mt-4 text-purple-600 hover:text-purple-700">
          Return to job listings
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulated form submission
      alert('Application submitted successfully!');
      setFormData({ name: '', email: '', experience: '', coverLetter: '' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-xl text-gray-600 mt-2">{job.company}</p>
            <div className="flex items-center mt-4 space-x-4">
              <span className="text-gray-500">{job.location}</span>
              <span className="text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                {job.type}
              </span>
              <span className="text-gray-500">Posted {job.postedDate}</span>
            </div>
          </div>
          <button
            onClick={() => isSaved ? unsaveJob(job.id) : saveJob(job.id)}
            className={`p-2 rounded-full ${
              isSaved ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <BookmarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="prose max-w-none mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
          <p className="mt-4 text-gray-700">{job.description}</p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8">Requirements</h2>
          <ul className="mt-4 space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">{req}</li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply for this position</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`mt-1 block w-full rounded-md border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`mt-1 block w-full rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className={`mt-1 block w-full rounded-md border ${
                  errors.experience ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
              />
              {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                rows={6}
                className={`mt-1 block w-full rounded-md border ${
                  errors.coverLetter ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 focus:border-purple-500 focus:ring-purple-500`}
              />
              {errors.coverLetter && <p className="mt-1 text-sm text-red-500">{errors.coverLetter}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
