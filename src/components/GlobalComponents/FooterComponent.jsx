import React from 'react';

const FooterComponent = () => {
  return (
    <div>
   <footer className="bg-gray-800 shadow-lg shadow-black sm:pl-20 py-12 rounded-t-[100px]">
        <div className="flex flex-wrap justify-between px-6">
          {/* First Column: Logo with Anchor */}
          <div className="w-full sm:w-1/4 p-6 flex flex-col items-center">
            <a href="/" className="flex items-center justify-center">
              <img
                src="Encrypt.png"
                alt="Logo"
                className="rounded-full h-32 w-32 object-cover border-2 border-teal-400"
              />
            </a>
          </div>

          {/* Second Column: Location and Contact */}
          <div className="w-full sm:w-1/4 p-6 text-center sm:text-left">
            <h3 className="text-2xl font-semibold text-gray-100">Location</h3>
            <div className="mt-4">
              <p className="text-gray-300">FAST-House</p>
              <p className="text-gray-300">Rohtas Road, G-9/4</p>
              <p className="text-gray-300">Islamabad - 44000</p>
              <p className="email-id text-teal-400 hover:text-teal-300">fast@nu.edu.pk</p>
              <h4 className="mt-2 text-gray-300">021-12345678</h4>
            </div>
          </div>

          {/* Third Column: Links */}
          <div className="w-full sm:w-1/4 p-6">
            <h3 className="text-2xl font-semibold text-gray-100">Links</h3>
            <div className="mt-4">
              <ul className="space-y-4">
                <li>
                  <a href="index.html" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="about.html" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="contact.html" className="text-gray-300 hover:text-teal-400 transition-colors duration-200">
                    Contact us
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
        <div className="border-t border-gray-600 h-0.5 ml-5 mt-8 mb-3"></div>

        {/* Footer Text */}
        <h2 className="text-sm text-center text-gray-400">
          "2024" "ENCRYPTIFY" . All Rights Reserved."
        </h2>
      </footer>
    </div>
  );
}

export default FooterComponent;