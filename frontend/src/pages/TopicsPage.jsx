import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  CreditCardIcon, 
  ChatBubbleLeftRightIcon,
  ShoppingCartIcon,
  TruckIcon,
  ComputerDesktopIcon,
  BriefcaseIcon,
  HeartIcon,
  GiftIcon,
  HomeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import TopicCard from '../components/TopicCard';
import { categories } from '../data/categories';

const iconMap = {
  "Personal Identity & Documents": ShieldCheckIcon,
  "Finance & Banking": CreditCardIcon,
  "Communication & Social Platforms": ChatBubbleLeftRightIcon,
  "Shopping, Services & Online Marketplaces": ShoppingCartIcon,
  "Travel & Transportation": TruckIcon,
  "Devices, Tech & Smart Homes": ComputerDesktopIcon,
  "Work, Education & Career": BriefcaseIcon,
  "Health & Medical": HeartIcon,
  "Products, Rewards & Lotteries": GiftIcon,
  "Home Visitors, Field Agents & Public Services": HomeIcon
};

const TopicsPage = () => {
  const topics = Object.keys(categories);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 left-10">
          <ShieldCheckIcon className="w-32 h-32 text-blue-600" />
        </div>
        <div className="absolute top-40 right-20">
          <ComputerDesktopIcon className="w-40 h-40 text-indigo-600" />
        </div>
        <div className="absolute bottom-40 left-1/4">
          <CreditCardIcon className="w-36 h-36 text-emerald-600" />
        </div>
        <div className="absolute bottom-20 right-1/3">
          <ShoppingCartIcon className="w-28 h-28 text-orange-600" />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ShieldCheckIcon className="w-64 h-64 text-gray-600" />
        </div>
        <div className="absolute top-32 right-1/4">
          <HomeIcon className="w-36 h-36 text-red-600" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 pb-32 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 mb-8 transition-all hover:shadow-lg"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-600 border-2 border-blue-700">
              <ShieldCheckIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                ScamSense - Fraud Awareness Hub
              </h1>
              <p className="text-gray-600 mt-1">
                Stay informed about common scams and frauds. Learn how to identify and protect yourself.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-16">
          {topics.map((topic) => (
            <TopicCard
              key={topic}
              title={topic}
              icon={iconMap[topic]}
              itemCount={categories[topic].length}
              topicId={encodeURIComponent(topic)}
              subtopics={categories[topic]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;

