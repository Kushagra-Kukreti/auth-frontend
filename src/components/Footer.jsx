import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} AuthApp. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            GitHub
          </a>
          <a href="mailto:support@example.com" className="hover:text-blue-600">
            Contact
          </a>
          <a href="/privacy" className="hover:text-blue-600">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
