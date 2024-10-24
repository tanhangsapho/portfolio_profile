import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  CV_URL: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, CV_URL }) => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            YN
          </Link>
          <div className="flex items-center space-x-8">
            {['Projects', "About Me",'Skills', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.toLowerCase()
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item}
              </Link>
            ))}
            <button
              onClick={() => window.open(CV_URL, '_blank')}
              className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              View CV
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};