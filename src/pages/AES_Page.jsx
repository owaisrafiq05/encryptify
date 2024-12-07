import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url } from '../config/index.js';

const AESPage = () => {
  const [userText, setUserText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [mode, setMode] = useState('Encrypt');

  const processText = async () => {
    if (mode === 'Encrypt') {
      if (!userText.trim() || !secretKey.trim()) {
        toast.error("Please provide text and secret key to encrypt.", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }
    } else if (mode === 'Decrypt') {
      if (!userText.trim() || !secretKey.trim()) {
        toast.error("Please provide ciphertext and secret key for decryption.", {
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
        ? { text: userText.trim(), secretKey: secretKey.trim() }
        : { cipherText: userText.trim(), secretKey: secretKey.trim() };

      const endpoint = mode === 'Encrypt' ? '/aes-encrypt' : '/aes-decrypt';
      const response = await axios.post(`${base_url}${endpoint}`, payload);

      if (response.data.status) {
        if (mode === 'Encrypt') {
          setEncryptedData(response.data.encryptedText);
        } else {
          setDecryptedData(response.data.decryptedText);
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
      console.error('Error during AES operation:', error);
      toast.error("Error occurred while processing text.", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleUserTextChange = (e) => setUserText(e.target.value);
  const handleSecretKeyChange = (e) => setSecretKey(e.target.value);
  const handleModeChange = (e) => setMode(e.target.value);

  return (
    <div>
      <ToastContainer />
      <section className="bg-custom-image bg-cover bg-center bg-gray-900 min-h-screen flex items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-6 w-full max-w-6xl">
          {/* Left Section (Input) */}
          <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-gray-100 mb-6">AES Input</h2>

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
                <label htmlFor="text" className="block text-gray-400 mb-2">
                  Enter Text to Encrypt:
                </label>
                <input
                  type="text"
                  id="text"
                  value={userText}
                  onChange={handleUserTextChange}
                  className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                />
              </div>
            ) : (
              <div className="mb-6">
                <label htmlFor="cipherText" className="block text-gray-400 mb-2">
                  Ciphertext:
                </label>
                <input
                  type="text"
                  id="cipherText"
                  value={userText}
                  onChange={handleUserTextChange}
                  className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                />
              </div>
            )}

            {/* Secret Key Field */}
            <div className="mb-6">
              <label htmlFor="secretKey" className="block text-gray-400 mb-2">
                Enter Secret Key (16 characters):
              </label>
              <input
                type="text"
                id="secretKey"
                value={secretKey}
                onChange={handleSecretKeyChange}
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
            <h2 className="text-2xl text-gray-100 mb-6">AES Result</h2>

            {/* Display Results */}
            {mode === 'Encrypt' ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">Encrypted Data:</label>
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

export default AESPage;
