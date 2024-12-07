import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { base_url } from '../config/index.js';
import 'react-toastify/dist/ReactToastify.css';

const SHA512 = () => {
  const [userText, setUserText] = useState(''); // State to hold user input text
  const [hash, setHash] = useState(''); // State to hold generated hash
  const [copyStatus, setCopyStatus] = useState(false); // State to track if text is copied
  const [loading, setLoading] = useState(false); // State to track loading status

  const processText = async () => {
    // Validate that user text is provided
    if (!userText) {
      setHash('');
      toast.error("Please provide text to hash.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    try {
      setLoading(true); // Set loading to true when API call is in progress

      const payload = {
        text: userText
      };

      const response = await axios.post(`${base_url}/sha-512Hash`, payload);

      setLoading(false); // Set loading to false once the response is received

      if (response.data.status) {
        setHash(response.data.hash); // Set generated hash
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        setHash('');
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      setLoading(false); // Set loading to false if an error occurs
      setHash('');
      toast.error("Error occurred while generating hash!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      console.error("API Error:", error);
    }
  };

  const handleUserTextChange = (e) => setUserText(e.target.value);

  // Handle copy to clipboard functionality
  const handleCopy = () => {
    if (hash) {
      navigator.clipboard.writeText(hash);
      setCopyStatus(true); // Change button text to "Copied"
      setTimeout(() => setCopyStatus(false), 2000); // Reset to "Copy" after 2 seconds
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-custom-image bg-cover bg-center contact relative min-h-screen p-12 flex justify-center items-center flex-col bg-cover bg-center bg-gray-900">
        
        <div className="container flex justify-center items-center mt-12 space-x-12">
          <div className="contactForm w-1/2 p-6 bg-gray-800 bg-opacity-80 flex flex-col space-y-4 rounded-lg shadow-xl">
            <h2 className="text-2xl text-gray-100 font-medium mb-2">SHA-512 Hash Generator</h2>

            <div className="flex flex-col space-y-4">
              <div className="inputBox relative w-full">
                <textarea
                  value={userText}
                  onChange={handleUserTextChange}
                  className="w-full p-2 text-base border-b-2 border-gray-600 outline-none focus:border-teal-400 
                           bg-transparent text-gray-100 peer resize-none h-20"  // Reduced height from h-32 to h-20
                  id="userText"
                  placeholder=" "
                  rows="3"  // Reduced rows from 4 to 3
                  required
                />
                <label
                  htmlFor="userText"
                  className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all duration-200 ease-in-out 
                           peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                           peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-teal-400"
                >
                  Enter Text to Hash
                </label>
              </div>
            </div>

            <div className="inputBox w-full mt-2">
              <button
                onClick={processText}
                className="w-20 bg-teal-600 hover:bg-teal-500 text-white py-1 px-2 text-base cursor-pointer 
                         rounded transition-colors duration-200"
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Processing...' : 'Hash'}
              </button>
            </div>
          </div>

          <div className="w-1/2 p-10 bg-gray-800 bg-opacity-80 flex flex-col space-y-6 rounded-lg shadow-xl relative">
            <h3 className="text-xl font-medium text-gray-100">Result:</h3>

            <textarea
              className="w-full mt-2 p-2 text-base border-2 border-gray-600 outline-none rounded 
                       bg-gray-700 text-gray-100 focus:border-teal-400 resize-none"
              value={hash}
              readOnly
              rows="8"
              placeholder="Generated hash will appear here"
            />

            {/* Copy Button - Positioned at the top right, moved slightly left with fade effect */}
            <button
              onClick={handleCopy}
              className={`absolute top-4 right-8 py-1 px-2 text-sm cursor-pointer rounded transition-all duration-500 ${
                copyStatus ? 'bg-teal-700 text-gray-100' : 'bg-teal-600 text-white'
              }`}
              disabled={!hash}
            >
              {copyStatus ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SHA512;
