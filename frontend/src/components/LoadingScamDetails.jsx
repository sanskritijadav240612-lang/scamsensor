import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';

const AI_MESSAGES = [
  "AI is analyzing scam patterns…",
  "Scanning selected category and tags…",
  "AI is studying your selected scam type…",
  "Extracting risk clues from tags…",
  "Predicting possible scam tricks…",
  "Preparing your scam explanation…"
];

const LoadingScamDetails = ({ onComplete, apiFinished = false }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % AI_MESSAGES.length);
    }, 2500);

    return () => {
      clearInterval(messageInterval);
    };
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (apiFinished) {
            setTimeout(() => onComplete && onComplete(), 300);
          }
          return 100;
        }

        if (apiFinished && prev >= 80) {
          const remaining = 100 - prev;
          return Math.min(prev + Math.ceil(remaining / 3), 100);
        }

        if (apiFinished) {
          const increment = prev < 30 ? 4 : prev < 60 ? 3 : 2;
          return Math.min(prev + increment, 100);
        }

        const increment = prev < 30 ? 3 : prev < 70 ? 2 : prev < 90 ? 1 : 0.5;
        return Math.min(prev + increment, 95);
      });
    }, 300);

    return () => {
      clearInterval(progressInterval);
    };
  }, [apiFinished, onComplete]);

  return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #E2E8F0 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white border-2 border-[#E2E8F0] p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32">
              <Lottie
                animationData={loadingAnimation}
                loop={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Analyzing Scam Details
          </h2>

          <div className="mb-6 h-12 flex items-center justify-center">
            <p className="text-[#0B5ED7] font-medium text-center animate-fade-in">
              {AI_MESSAGES[currentMessage]}
            </p>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Processing</span>
              <span className="text-sm font-bold text-[#0B5ED7]">{Math.floor(progress)}%</span>
            </div>
            <div className="w-full h-3 bg-[#F7F9FC] border-2 border-[#E2E8F0] overflow-hidden">
              <div
                className="h-full bg-[#0B5ED7] transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-scan" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-4 border-t-2 border-[#E2E8F0]">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-[#0B5ED7] animate-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-[#0B5ED7] animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-[#0B5ED7] animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs font-medium text-gray-600">AI Processing Active</span>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          ScamSense AI is preparing comprehensive fraud analysis...
        </p>
      </div>
    </div>
  );
};

export default LoadingScamDetails;

