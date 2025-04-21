
import { useJobs } from '@/contexts/JobContext';
import JobCard from '@/components/JobCard';
import { Search } from 'lucide-react';
import { useState, useMemo, useRef } from 'react';

const HomePage = () => {
  const { jobs, loading } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  // Memoize filtering
  const filteredJobs = useMemo(() => {
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [jobs, searchTerm]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div>
        <h1 className="m-6 text-3xl font-bold text-gray-900">
          Find Your Next Developer Role
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search jobs by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
