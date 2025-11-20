import { useState, useEffect } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  DocumentTextIcon,
  EyeIcon,
  CheckCircleIcon,
  UserGroupIcon,
  LifebuoyIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';
import { categories } from '../data/categories';
import LoadingScamDetails from '../components/LoadingScamDetails';

const DetailPage = () => {
  const { topicId, subtopicId } = useParams();
  const location = useLocation();
  const decodedTopicId = decodeURIComponent(topicId);
  const decodedSubtopicId = decodeURIComponent(subtopicId);

  const [data, setData] = useState(null);
  const [apiFinished, setApiFinished] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(null);
  const [showFullDetails, setShowFullDetails] = useState(false);

  const topicData = categories[decodedTopicId];
  const subtopicData = topicData?.find(item => item.name === decodedSubtopicId);

  useEffect(() => {
    if (!subtopicData) return;

    const fetchData = async () => {
      try {
        setApiFinished(false);
        setShowContent(false);
        const response = await fetch('http://localhost:3000/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic: decodedTopicId,
            sub_topic: decodedSubtopicId,
            tags: subtopicData.tag.join(', ')
          })
        });

        if (!response.ok) {
          throw new Error('Go back and try again');
        }

        const result = await response.json();
        setData(result);
        setApiFinished(true);
      } catch (err) {
        setError(err.message);
        setShowContent(true);
      }
    };

    fetchData();
  }, [decodedTopicId, decodedSubtopicId, subtopicData]);

  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  if (!topicData || !subtopicData) {
    return <Navigate to="/topics" replace />;
  }

  if (!showContent && !error) {
    return (
      <LoadingScamDetails 
        apiFinished={apiFinished} 
        onComplete={handleLoadingComplete}
      />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-red-100 border-2 border-red-300 mb-4">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-600" />
          </div>
          <p className="text-red-700 font-medium">Go back and try again</p>
          <Link to={`/topics/${topicId}`} className="inline-block mt-4 px-4 py-2 bg-white border-2 border-gray-300 hover:border-blue-400 text-blue-600 font-medium">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  if (!showFullDetails) {
    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute top-10 left-10">
            <ExclamationTriangleIcon className="w-48 h-48 text-red-600" />
          </div>
          <div className="absolute bottom-10 right-10">
            <ShieldCheckIcon className="w-48 h-48 text-blue-600" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
          <Link 
            to={`/topics/${topicId}`} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 mb-8 transition-all hover:shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to {decodedTopicId}</span>
          </Link>

          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-4 bg-red-600 border-2 border-red-700">
                <ExclamationTriangleIcon className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {data.sub_topic}
                </h1>
                <p className="text-gray-600 mb-3">{data.topic}</p>
                <div className="flex flex-wrap gap-2">
                  {data.tags_used.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-50 border border-red-300 text-xs font-medium text-red-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-16 h-16 bg-blue-100 border-2 border-blue-300" />
              <div className="relative bg-white border-2 border-blue-600 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-600 border border-blue-700">
                    <DocumentTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Understanding The Scam</div>
                    <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                  </div>
                </div>
                <div className="ml-14">
                  <p className="text-gray-700 text-base leading-relaxed">{data.overview}</p>
                </div>
              </div>
            </div>

            {data.real_world_examples && data.real_world_examples.length > 0 && (
              <div className="relative">
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-600 border-2 border-purple-700 mb-2">
                    <UserGroupIcon className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold text-white">Real World Examples</h2>
                  </div>
                  <p className="text-gray-600 text-xs">These scenarios have actually happened</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {data.real_world_examples.map((example, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-purple-300" />
                      <div className="absolute -left-6 top-4 w-5 h-5 bg-purple-600 border-2 border-white shadow-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <div className="ml-4 bg-white border-2 border-purple-300 p-4 hover:border-purple-500 transition-all hover:shadow-lg">
                        <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Example {index + 1}</div>
                        <p className="text-gray-700 text-sm leading-relaxed">{example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.what_to_do_if_you_are_a_victim && data.what_to_do_if_you_are_a_victim.length > 0 && (
              <div className="relative">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 border-2 border-orange-700 p-1">
                  <div className="bg-white p-6">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-orange-200">
                      <div className="p-2 bg-orange-600 border border-orange-700">
                        <LifebuoyIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Emergency Response</div>
                        <h2 className="text-2xl font-bold text-gray-900">If You're a Victim</h2>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.what_to_do_if_you_are_a_victim.map((action, index) => (
                        <div key={index} className="relative group">
                          <div className="absolute -top-2 -left-2 w-7 h-7 bg-orange-600 border border-orange-700 flex items-center justify-center z-10">
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div className="bg-orange-50 border-2 border-orange-300 p-4 pt-6 hover:border-orange-500 transition-all">
                            <p className="text-gray-700 text-sm leading-relaxed">{action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => setShowFullDetails(true), 400);
              }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 border-2 border-blue-700 text-white font-bold text-lg hover:bg-blue-700 transition-all hover:shadow-xl"
            >
              <span>KNOW MORE</span>
              <ShieldCheckIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-10 left-10">
          <ExclamationTriangleIcon className="w-48 h-48 text-red-600" />
        </div>
        <div className="absolute bottom-10 right-10">
          <ShieldCheckIcon className="w-48 h-48 text-blue-600" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <Link 
          to={`/topics/${topicId}`} 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 mb-8 transition-all hover:shadow-lg"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Back to {decodedTopicId}</span>
        </Link>

        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-4 bg-red-600 border-2 border-red-700">
              <ExclamationTriangleIcon className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {data.sub_topic}
              </h1>
              <p className="text-gray-600 mb-3">{data.topic}</p>
              <div className="flex flex-wrap gap-2">
                {data.tags_used.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-50 border border-red-300 text-xs font-medium text-red-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-300 p-6 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <DocumentTextIcon className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{data.overview}</p>
        </div>

        {data.important_tips && data.important_tips.length > 0 && (
          <div className="bg-amber-50 border-2 border-amber-300 p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <LightBulbIcon className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900">Important Tips</h2>
            </div>
            <ul className="space-y-3">
              {data.important_tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-200 border border-amber-400 text-amber-800 font-bold text-xs shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.how_it_works && data.how_it_works.length > 0 && (
          <div className="bg-white border-2 border-gray-300 p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <DocumentTextIcon className="w-6 h-6 text-gray-700 shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
            </div>
            <div className="space-y-4">
              {data.how_it_works.map((item, index) => (
                <div key={index} className="bg-gray-50 border border-gray-300 p-4">
                  <p className="text-gray-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.red_flags && data.red_flags.length > 0 && (
          <div className="bg-red-50 border-2 border-red-300 p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <EyeIcon className="w-6 h-6 text-red-600 shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900">Red Flags to Watch For</h2>
            </div>
            <ul className="space-y-3">
              {data.red_flags.map((flag, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.prevention_steps && data.prevention_steps.length > 0 && (
          <div className="bg-emerald-50 border-2 border-emerald-300 p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <ShieldCheckIcon className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900">Prevention Steps</h2>
            </div>
            <ul className="space-y-3">
              {data.prevention_steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.real_world_examples && data.real_world_examples.length > 0 && (
          <div className="bg-purple-50 border-2 border-purple-300 p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <UserGroupIcon className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900">Real World Examples</h2>
            </div>
            <div className="space-y-4">
              {data.real_world_examples.map((example, index) => (
                <div key={index} className="bg-white border border-purple-300 p-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-200 border border-purple-400 text-purple-800 font-bold text-sm shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.what_to_do_if_you_are_a_victim && data.what_to_do_if_you_are_a_victim.length > 0 && (
          <div className="bg-orange-50 border-2 border-orange-300 p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <LifebuoyIcon className="w-6 h-6 text-orange-600 shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900">What to Do If You Are a Victim</h2>
            </div>
            <ul className="space-y-3">
              {data.what_to_do_if_you_are_a_victim.map((action, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-200 border border-orange-400 text-orange-800 font-bold text-xs shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.safe_checklist && data.safe_checklist.length > 0 && (
          <div className="bg-cyan-50 border-2 border-cyan-300 p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircleIcon className="w-6 h-6 text-cyan-600 shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900">Safety Checklist</h2>
            </div>
            <ul className="space-y-3">
              {data.safe_checklist.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 mt-0.5 shrink-0 accent-cyan-600 cursor-pointer"
                  />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.legal_help_and_reporting && data.legal_help_and_reporting.length > 0 && (
          <div className="bg-indigo-50 border-2 border-indigo-300 p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <ScaleIcon className="w-6 h-6 text-indigo-600 shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900">Legal Help and Reporting</h2>
            </div>
            <ul className="space-y-3">
              {data.legal_help_and_reporting.map((info, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-200 border border-indigo-400 text-indigo-800 font-bold text-xs shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{info}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between items-center pt-6 border-t-2 border-gray-300">
          <Link 
            to={`/topics/${topicId}`} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 transition-all hover:shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Category</span>
          </Link>
          <Link 
            to="/topics" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 border-2 border-blue-700 hover:bg-blue-700 text-white font-medium transition-all hover:shadow-lg"
          >
            <span>All Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

