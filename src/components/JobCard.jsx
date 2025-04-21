
import { useJobs } from '@/contexts/JobContext';
import { BookmarkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ id, title, company, location, type, postedDate }) => {
  const { savedJobs, saveJob, unsaveJob } = useJobs();
  const isSaved = savedJobs.includes(id);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/job/${id}`} className="text-xl font-semibold text-gray-900 hover:text-purple-600">
              {title}
            </Link>
            <p className="text-gray-600">{company}</p>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-sm text-gray-500">{location}</span>
              <span className="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                {type}
              </span>
            </div>
          </div>
          <button
            onClick={() => isSaved ? unsaveJob(id) : saveJob(id)}
            className={`p-2 rounded-full ${
              isSaved ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:bg-gray-50'
            }`}
            aria-label={isSaved ? "Unsave Job" : "Save Job"}
            type="button"
          >
            <BookmarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <span className="text-sm text-gray-500">Posted {postedDate}</span>
        <Link
          to={`/job/${id}`}
          className="text-sm font-medium text-purple-600 hover:text-purple-700"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
