
import { useJobs } from '@/contexts/JobContext';
import JobCard from '@/components/JobCard';
import { useMemo, useRef } from 'react';

const DashboardPage = () => {
  const { jobs, savedJobs } = useJobs();
  // Memoize the savedJobs list
  const savedJobsList = useMemo(
    () => jobs.filter(job => savedJobs.includes(job.id)),
    [jobs, savedJobs]
  );
  // Ref to the jobs grid container
  const jobsGridRef = useRef(null);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Saved Jobs</h1>
      {savedJobsList.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600">You haven't saved any jobs yet.</p>
        </div>
      ) : (
        <div
          ref={jobsGridRef}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {savedJobsList.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
