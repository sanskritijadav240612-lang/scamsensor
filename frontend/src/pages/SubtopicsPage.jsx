import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ServerIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import SubtopicCard from '../components/SubtopicCard';
import { categories } from '../data/categories';

const subtopicIcons = [
  ExclamationTriangleIcon,
  LockClosedIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ServerIcon,
  BuildingOfficeIcon
];

const SubtopicsPage = () => {
  const { topicId } = useParams();
  const decodedTopicId = decodeURIComponent(topicId);
  
  const subtopics = categories[decodedTopicId];

  if (!subtopics) {
    return <Navigate to="/topics" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-20">
          <ExclamationTriangleIcon className="w-40 h-40 text-red-600" />
        </div>
        <div className="absolute top-1/3 right-10">
          <LockClosedIcon className="w-36 h-36 text-orange-600" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <ExclamationTriangleIcon className="w-32 h-32 text-red-600" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ExclamationTriangleIcon className="w-72 h-72 text-gray-600" />
        </div>
        <div className="absolute bottom-1/3 right-1/4">
          <ServerIcon className="w-40 h-40 text-orange-600" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <Link to="/topics" className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 mb-8 transition-all hover:shadow-lg">
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Back to Topics</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-600 border-2 border-orange-700">
              <ExclamationTriangleIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {decodedTopicId}
              </h1>
              <p className="text-gray-600">
                Learn about common scams and how to protect yourself
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subtopics.map((subtopic, index) => (
            <SubtopicCard
              key={index}
              name={subtopic.name}
              tags={subtopic.tag}
              icon={subtopicIcons[index % subtopicIcons.length]}
              topicId={topicId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubtopicsPage;

