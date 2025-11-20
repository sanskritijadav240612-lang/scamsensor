import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  CursorArrowRaysIcon,
  DocumentMagnifyingGlassIcon,
  SparklesIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';

const LandingPage = () => {
  const howItWorksSteps = [
    {
      icon: CursorArrowRaysIcon,
      title: "Choose your scam category",
      description: "Browse through 10+ fraud categories"
    },
    {
      icon: DocumentMagnifyingGlassIcon,
      title: "Pick subtopics and tags",
      description: "Select specific scam types to learn about"
    },
    {
      icon: SparklesIcon,
      title: "Gemini AI analyzes patterns",
      description: "AI processes fraud signals and behaviors"
    },
    {
      icon: CheckBadgeIcon,
      title: "Get simple, friendly guidance",
      description: "Receive clear explanations anyone can understand"
    }
  ];

  const categories = [
    {
      icon: ShieldCheckIcon,
      name: "Personal Identity & Documents",
      count: "4 scams"
    },
    {
      icon: CreditCardIcon,
      name: "Finance & Banking",
      count: "4 scams"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      name: "Communication & Social Platforms",
      count: "4 scams"
    },
    {
      icon: ComputerDesktopIcon,
      name: "Devices, Tech & Smart Homes",
      count: "4 scams"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <section className="relative overflow-hidden border-b-2 border-[#E2E8F0] min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-[0.04]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #0B5ED7 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
          <div className="absolute top-20 right-20">
            <ShieldCheckIcon className="w-64 h-64 text-[#0B5ED7]" />
          </div>
          <div className="absolute bottom-20 left-20">
            <LockClosedIcon className="w-48 h-48 text-[#0B5ED7]" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ShieldCheckIcon className="w-96 h-96 text-[#0B5ED7]" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 w-full">
          <div className="text-center">
              <div className="inline-flex items-center justify-center mb-8">
                <img 
                  src={logo} 
                  alt="ScamSense Logo" 
                  className="h-48 w-auto"
                />
              </div>

              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                ScamSense - Your Gemini AI<br />Powered Fraud Awareness Guide
              </h1>

            <p className="text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Learn, detect, and understand online scams with simple, clear AI explanations.
            </p>

            <Link 
              to="/topics"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#0B5ED7] border-2 border-[#0B5ED7] text-white font-semibold text-xl hover:bg-[#094ba8] transition-all hover:shadow-xl hover:scale-105"
            >
              <span>Explore Scam Categories</span>
              <ShieldCheckIcon className="w-7 h-7" />
            </Link>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white border-2 border-[#E2E8F0] p-6 text-center">
                <div className="text-3xl font-bold text-[#0B5ED7] mb-2">10+</div>
                <div className="text-sm font-medium text-gray-700">Scam Categories</div>
              </div>
              <div className="bg-white border-2 border-[#E2E8F0] p-6 text-center">
                <div className="text-3xl font-bold text-[#0B5ED7] mb-2">40+</div>
                <div className="text-sm font-medium text-gray-700">Fraud Types Covered</div>
              </div>
              <div className="bg-white border-2 border-[#E2E8F0] p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <SparklesIcon className="w-6 h-6 text-[#0B5ED7]" />
                </div>
                <div className="text-sm font-medium text-gray-700">Gemini AI Powered</div>
              </div>
            </div>

            <div className="mt-12">
              <div className="inline-flex flex-col items-center gap-2 text-gray-400">
                <span className="text-xs font-medium">Scroll to learn more</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-gray-600">
              Simple steps to understand and protect yourself from scams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border-2 border-[#E2E8F0] p-6 hover:border-[#0B5ED7] transition-all hover:shadow-lg"
                >
                  <div className="mb-4">
                    <div className="inline-flex p-3 bg-[#0B5ED7] bg-opacity-10 border border-[#0B5ED7]">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Supported Scam Categories
            </h2>
            <p className="text-gray-600">
              Explore comprehensive coverage across multiple fraud types
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {categories.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border-2 border-[#E2E8F0] p-6 hover:border-[#0B5ED7] transition-all hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 border border-blue-300">
                      <CategoryIcon className="w-6 h-6 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-600">{category.count}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link 
              to="/topics"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#E2E8F0] hover:border-[#0B5ED7] text-gray-700 font-medium transition-all hover:shadow-md"
            >
              <span>View All 10 Categories</span>
              <ShieldCheckIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#E2E8F0] bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-start gap-6 bg-[#F7F9FC] border-2 border-[#E2E8F0] p-8">
            <div className="p-4 bg-[#0B5ED7] border-2 border-[#0B5ED7] shrink-0">
              <SparklesIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Powered by Google Gemini AI
              </h2>
              <p className="text-gray-700 leading-relaxed">
                ScamSense uses Gemini AI to explain scams in simple language so anyone students, elders, and beginners can understand and stay safe. Every explanation is tailored to be clear, actionable, and easy to follow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-start gap-6 bg-amber-50 border-2 border-amber-300 p-8">
            <div className="p-4 bg-amber-100 border-2 border-amber-400 shrink-0">
              <ExclamationTriangleIcon className="w-10 h-10 text-amber-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Your Privacy is Protected
              </h2>
              <p className="text-gray-700 leading-relaxed">
                ScamSense never asks for personal details like Aadhaar, PAN, bank numbers, or OTP. We are here to educate, not collect. Your data stays with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <img 
                  src={logo} 
                  alt="ScamSense Logo" 
                  className="h-12 w-auto"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">ScamSense</h3>
                  <p className="text-xs text-gray-600">Gemini AI Powered</p>
                </div>
              </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#0B5ED7] transition-colors">
              </a>
              <span className="text-gray-400">•</span>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#0B5ED7] transition-colors">
              </a>
              <span className="text-gray-400">•</span>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-[#0B5ED7] transition-colors">
              </a>
              <span className="text-gray-400">•</span>
            </div>

            <div className="text-sm text-gray-600">
              © 2025 ScamSense. All rights reserved.
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2E8F0] text-center">
            <p className="text-xs text-gray-500">
              Built to spread awareness and help everyone stay safe from online fraud.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

