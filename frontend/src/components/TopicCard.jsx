import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const colorMap = {
  "Personal Identity & Documents": {
    bg: "bg-blue-50",
    border: "border-blue-300",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    hover: "hover:border-blue-400"
  },
  "Finance & Banking": {
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    hover: "hover:border-emerald-400"
  },
  "Communication & Social Platforms": {
    bg: "bg-purple-50",
    border: "border-purple-300",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
    hover: "hover:border-purple-400"
  },
  "Shopping, Services & Online Marketplaces": {
    bg: "bg-orange-50",
    border: "border-orange-300",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
    hover: "hover:border-orange-400"
  },
  "Travel & Transportation": {
    bg: "bg-cyan-50",
    border: "border-cyan-300",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-700",
    hover: "hover:border-cyan-400"
  },
  "Devices, Tech & Smart Homes": {
    bg: "bg-indigo-50",
    border: "border-indigo-300",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-700",
    hover: "hover:border-indigo-400"
  },
  "Work, Education & Career": {
    bg: "bg-violet-50",
    border: "border-violet-300",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    hover: "hover:border-violet-400"
  },
  "Health & Medical": {
    bg: "bg-rose-50",
    border: "border-rose-300",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-700",
    hover: "hover:border-rose-400"
  },
  "Products, Rewards & Lotteries": {
    bg: "bg-amber-50",
    border: "border-amber-300",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    hover: "hover:border-amber-400"
  },
  "Home Visitors, Field Agents & Public Services": {
    bg: "bg-red-50",
    border: "border-red-300",
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
    hover: "hover:border-red-400"
  }
};

const TopicCard = ({ title, icon: Icon, itemCount, topicId, subtopics = [] }) => {
  const [isHovered, setIsHovered] = useState(false);

  const colors = colorMap[title] || {
    bg: "bg-gray-50",
    border: "border-gray-300",
    iconBg: "bg-gray-100",
    iconColor: "text-gray-700",
    hover: "hover:border-gray-400"
  };

  return (
    <Link to={`/topics/${topicId}`}>
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`${colors.bg} border-2 ${colors.border} ${colors.hover} p-6 transition-all duration-300 hover:shadow-xl cursor-pointer`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 ${colors.iconBg} border ${colors.border}`}>
              <Icon className={`w-6 h-6 ${colors.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600">
                {itemCount} common {itemCount === 1 ? 'scam' : 'scams'}
              </p>
            </div>
          </div>
        </div>

        {isHovered && (
          <div className="absolute left-0 right-0 top-full z-50 animate-fade-in">
            <div className={`bg-white border-2 border-t-0 ${colors.border} shadow-xl`}>
              <div className="p-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                  Includes
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {subtopics.slice(0, 4).map((subtopic, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <ChevronRightIcon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <span className="leading-tight">{subtopic.name}</span>
                    </div>
                  ))}
                  {subtopics.length > 4 && (
                    <div className="text-xs text-gray-500 italic pt-2">
                      +{subtopics.length - 4} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default TopicCard;

