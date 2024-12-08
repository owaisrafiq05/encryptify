import React, { useRef } from 'react';
import 'animate.css';

const FooterComponent = () => {
  const footerRef = useRef(null);

  return (
    <div>
      <footer
        ref={footerRef}
        className="bg-opacity-50 shadow-lg shadow-black sm:pl-20 py-12 rounded-t-[100px]"
      >
        <div className="flex flex-wrap justify-between px-6">
          {/* First Column: Logo with Anchor */}
          <div className="w-full sm:w-1/4 p-6 flex flex-col items-center">
            <a href="/" className="flex items-center justify-center">
            <span className="self-center text-4xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  ENCRYPTIFY
            </span>
            <p className='text-white'>web-based application focused on encryption, decryption, and data conversion tools. It provides users with an interactive platform to explore various cryptographic algorithms and hashing techniques, inspired by the functionality of CyberChef.</p>
            </a>
          </div>

          {/* Third Column: Links */}
          <div className="w-full sm:w-1/4 p-6">
            <h3 className="text-2xl font-semibold text-gray-100">Useful Links</h3>
            <div className="mt-4">
              <ul className="space-y-4">
                <li>
                  <a
                    href="index.html"
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 transform hover:scale-105"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="about.html"
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-200 transform hover:scale-105"
                  >
                    About the Developers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Fourth Column: Developer Information */}
          <div className="w-full sm:w-1/4 p-6">
            <h3 className="text-2xl font-semibold text-gray-100">Developer</h3>
            <div className="mt-4">
              <p className="text-gray-300 mt-4">
                <a
                  href="https://www.linkedin.com/in/abubakar-hassan-0554bb2ab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors duration-200"
                >
                  Abubakar Bin Hassan (23K-2025)
                </a>
              </p>
              <p className="text-gray-300 mt-4">
                <a
                  href="https://pk.linkedin.com/in/owais-rafiq-639494253"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors duration-200"
                >
                  Owais Rafiq (23K-2042)
                </a>
              </p>
              <p className="text-gray-300 mt-4">
                <a
                  href="https://www.linkedin.com/in/muhib-ali-3825822a1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors duration-200"
                >
                  Muhib Ali (23K-2030)
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-gray-600 h-0.5 ml-5 mt-8 mb-3 mr-5"></div>
        {/* Footer Text */}
        <h2 className="text-sm text-center text-gray-400">
          "2024" "ENCRYPTIFY" . All Rights Reserved."
        </h2>
      </footer>
    </div>
  );
};

export default FooterComponent;
