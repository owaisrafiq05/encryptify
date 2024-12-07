import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { base_url } from '../config/index.js';
import 'react-toastify/dist/ReactToastify.css';

// Utility function to convert hex to text (ASCII or UTF-8)
const hexToText = (hex) => {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
};

const DesPage = () => {
  const [userText, setUserText] = useState('');
  const [key, setKey] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [mode, setMode] = useState('Encrypt');

  const processText = async () => {
    if (mode === 'Encrypt') {
      if (!userText.trim() || !key.trim()) {
        toast.error("Please provide both message and key to encrypt.", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }
    } else if (mode === 'Decrypt') {
      if (!userText.trim() || !key.trim()) {
        toast.error("Please provide both ciphertext and key for decryption.", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }
    }

    try {
      const payload = mode === 'Encrypt'
        ? { message: userText.trim(), key: key.trim() }
        : { message: userText.trim(), key: key.trim() };

      const endpoint = mode === 'Encrypt' ? '/des-encrypt' : '/des-decrypt';
      const response = await axios.post(`${base_url}${endpoint}`, payload);

      if (response.data.success) {
        if (mode === 'Encrypt') {
          // Set encrypted data as hex (no conversion needed for encryption)
          setEncryptedData(response.data.encryptedData);
        } else {
          // Convert the hex decrypted data to text and display
          setDecryptedData(hexToText(response.data.decryptedData));
        }
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error during DES operation:', error);
      toast.error("Error occurred while processing text.", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleUserTextChange = (e) => setUserText(e.target.value);
  const handleKeyChange = (e) => setKey(e.target.value);
  const handleModeChange = (e) => setMode(e.target.value);

  return (
    <div>
      <ToastContainer />
      <section className="bg-custom-image bg-cover bg-center bg-gray-900 min-h-screen flex items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-6 w-full max-w-6xl">
          {/* Left Section (Input) */}
          <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-gray-100 mb-6">DES Input</h2>

            {/* Mode Selector */}
            <div className="mb-6">
              <select
                value={mode}
                onChange={handleModeChange}
                className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
              >
                <option value="Encrypt">Encrypt</option>
                <option value="Decrypt">Decrypt</option>
              </select>
            </div>

            {/* Input Fields */}
            {mode === 'Encrypt' ? (
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  Enter Message to Encrypt:
                </label>
                <input
                  type="text"
                  id="message"
                  value={userText}
                  onChange={handleUserTextChange}
                  className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                />
              </div>
            ) : (
              <div className="mb-6">
                <label htmlFor="ciphertext" className="block text-gray-400 mb-2">
                  Ciphertext:
                </label>
                <input
                  type="text"
                  id="ciphertext"
                  value={userText}
                  onChange={handleUserTextChange}
                  className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                />
              </div>
            )}
            <div className="mb-6">
              <label htmlFor="key" className="block text-gray-400 mb-2">
                Enter Key (16 characters):
              </label>
              <input
                type="text"
                id="key"
                value={key}
                onChange={handleKeyChange}
                className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
              />
            </div>

            {/* Process Button */}
            <button
              onClick={processText}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 rounded transition-colors"
            >
              {mode}
            </button>
          </div>

          {/* Right Section (Results) */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg bg-opacity-80">
            <h2 className="text-2xl text-gray-100 mb-6">DES Result</h2>

            {/* Display Results */}
            {mode === 'Encrypt' ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">Encrypted Data (Hex):</label>
                  <textarea
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                    value={encryptedData}
                    readOnly
                    rows="5"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">Decrypted Data:</label>
                  <textarea
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                    value={decryptedData}
                    readOnly
                    rows="5"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesPage;
