import { Link } from 'react-router-dom';

const SubtopicCard = ({ name, tags, icon: Icon, topicId }) => {
  return (
    <Link to={`/topics/${topicId}/${encodeURIComponent(name)}`}>
      <div className="bg-white border-2 border-gray-300 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-red-400 cursor-pointer">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-50 border border-red-300">
            <Icon className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-50 border border-orange-300 text-xs font-medium text-orange-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubtopicCard;

