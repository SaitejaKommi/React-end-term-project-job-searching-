
import { BookOpen } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900">About DevHire</h1>
        <p className="mt-4 text-xl text-gray-600">
          Connecting talented developers with innovative companies
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
