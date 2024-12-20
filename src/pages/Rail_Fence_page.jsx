import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { base_url } from '../config/index.js'; // Update this path if necessary
import 'react-toastify/dist/ReactToastify.css';

const RailFencePage = () => {
  const [userText, setUserText] = useState(''); // State to hold user input text
  const [numRows, setNumRows] = useState(3); // State to hold number of rows for Rail-Fence Cipher
  const [encryptedText, setEncryptedText] = useState(''); // State to hold encrypted text
  const [decryptedText, setDecryptedText] = useState(''); // State to hold decrypted text
  const [mode, setMode] = useState('Encrypt'); // State to handle encryption/decryption mode selection

  // Process the text (Encrypt or Decrypt based on mode)
  const processText = async () => {
    // Validate that user text is provided and numRows is valid
    if (!userText || !numRows || numRows < 2) {
      setEncryptedText('');
      setDecryptedText('');
      toast.error("Please provide valid text and number of rows (greater than 1).", {
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
      const payload = {
        text: userText,
        numRows: numRows, // Pass the number of rows for Rail-Fence Cipher
      };

      const endpoint = mode === 'Encrypt' ? '/rail-fence-encrypt' : '/rail-fence-decrypt'; // Choose endpoint based on mode
      const response = await axios.post(`${base_url}${endpoint}`, payload);

      // Log the entire response object to check structure
      console.log(response.data);

      if (response.data.status) {
        if (mode === 'Encrypt') {
          setEncryptedText(response.data.data.encryptedText); // Set encrypted text
          setDecryptedText(''); // Clear decrypted text
        } else {
          setDecryptedText(response.data.data.decryptedText); // Set decrypted text
          setEncryptedText(''); // Clear encrypted text
        }

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
        setEncryptedText('');
        setDecryptedText('');
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
      setEncryptedText('');
      setDecryptedText('');
      toast.error("Error occurred while processing text!", {
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
  };

  // Handle changes to text and number of rows
  const handleUserTextChange = (e) => setUserText(e.target.value);
  const handleNumRowsChange = (e) => setNumRows(Number(e.target.value)); // Ensure numRows is a number
  const handleModeChange = (e) => setMode(e.target.value);

  return (
    <div>
      <ToastContainer />
      <section
        className="bg-custom-image bg-cover bg-center contact relative min-h-screen p-12 flex justify-center items-center flex-col bg-cover bg-center bg-gray-900"
      >
        <div className="container flex justify-center items-center mt-12 space-x-12">
          <div className="contactForm w-1/2 p-10 bg-gray-800 bg-opacity-80 flex flex-col space-y-6 rounded-lg shadow-xl">
            <h2 className="text-2xl text-gray-100 font-medium mb-6">Rail-Fence Cipher</h2>

            {/* Mode Dropdown */}
            <div className="inputBox w-full mb-6">
              <select
                value={mode}
                onChange={handleModeChange}
                className="w-full p-2 text-base border-b-2 border-gray-600 outline-none focus:border-teal-400 
                         bg-gray-700 text-gray-100 rounded cursor-pointer"
              >
                <option value="Encrypt" className="text-gray-900 bg-gray-200">Encrypt</option>
                <option value="Decrypt" className="text-gray-900 bg-gray-200">Decrypt</option>
              </select>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="inputBox relative w-full">
                <input
                  type="text"
                  value={userText}
                  onChange={handleUserTextChange}
                  className="w-full p-2 text-base border-b-2 border-gray-600 outline-none focus:border-teal-400 
                           bg-transparent text-gray-100 peer"
                  id="userText"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="userText"
                  className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all duration-200 ease-in-out 
                           peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                           peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-teal-400"
                >
                  Enter Text
                </label>
              </div>

              <div className="inputBox relative w-full">
                <input
                  type="number"
                  value={numRows}
                  onChange={handleNumRowsChange}
                  className="w-full p-2 text-base border-b-2 border-gray-600 outline-none focus:border-teal-400 
                           bg-transparent text-gray-100 peer"
                  id="numRows"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="numRows"
                  className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all duration-200 ease-in-out 
                           peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                           peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-teal-400"
                >
                  Number of Rows
                </label>
              </div>
            </div>

            <div className="inputBox w-full mt-4">
              <button
                onClick={processText}
                className="w-24 bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 text-lg cursor-pointer 
                         rounded transition-colors duration-200"
              >
                {mode}
              </button>
            </div>
          </div>

          <div className="w-1/2 p-10 bg-gray-800 bg-opacity-80 flex flex-col space-y-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-medium text-gray-100">Result:</h3>

            {/* Display Encrypted or Decrypted Text */}
            {mode === 'Encrypt' ? (
              <textarea
                className="w-full mt-2 p-2 text-base border-2 border-gray-600 outline-none rounded 
                         bg-gray-700 text-gray-100 focus:border-teal-400"
                value={encryptedText}  // Display encrypted text
                readOnly
                rows="8"
              />
            ) : (
              <textarea
                className="w-full mt-2 p-2 text-base border-2 border-gray-600 outline-none rounded 
                         bg-gray-700 text-gray-100 focus:border-teal-400"
                value={decryptedText}  // Display decrypted text
                readOnly
                rows="8"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RailFencePage;
