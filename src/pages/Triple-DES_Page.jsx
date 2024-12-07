import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url } from '../config/index.js';

// Utility function to convert hex to text (ASCII or UTF-8)
const hexToText = (hex) => {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
};

const TripleDesPage = () => {
  const [userText, setUserText] = useState('');
  const [key1, setKey1] = useState('');
  const [key2, setKey2] = useState('');
  const [key3, setKey3] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [mode, setMode] = useState('Encrypt');

  const processText = async () => {
    if (mode === 'Encrypt') {
      if (!userText.trim() || !key1.trim() || !key2.trim() || !key3.trim()) {
        toast.error("Please provide message and all three keys to encrypt.", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }
    } else if (mode === 'Decrypt') {
      if (!userText.trim() || !key1.trim() || !key2.trim() || !key3.trim()) {
        toast.error("Please provide ciphertext and all three keys for decryption.", {
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
        ? { message: userText.trim(), key1: key1.trim(), key2: key2.trim(), key3: key3.trim() }
        : { ciphertext: userText.trim(), key1: key1.trim(), key2: key2.trim(), key3: key3.trim() };

      const endpoint = mode === 'Encrypt' ? '/3des-encrypt' : '/3des-decrypt';
      const response = await axios.post(`${base_url}${endpoint}`, payload);

      if (response.data.status) {
        if (mode === 'Encrypt') {
          // Set encrypted data as hex (no conversion needed for encryption)
          setEncryptedData(response.data.encryptedText);
        } else {
          // Convert the hex decrypted data to text and display
          setDecryptedData(hexToText(response.data.decryptedText));
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
      console.error('Error during 3DES operation:', error);
      toast.error("Error occurred while processing text.", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const handleUserTextChange = (e) => setUserText(e.target.value);
  const handleKey1Change = (e) => setKey1(e.target.value);
  const handleKey2Change = (e) => setKey2(e.target.value);
  const handleKey3Change = (e) => setKey3(e.target.value);
  const handleModeChange = (e) => setMode(e.target.value);

  return (
    <div>
      <ToastContainer />
      <section className="bg-custom-image bg-cover bg-center bg-gray-900 min-h-screen flex items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-6 w-full max-w-6xl">
          {/* Left Section (Input) */}
          <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-gray-100 mb-6">Triple DES Input</h2>

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

            {/* Key Fields */}
            <div className="mb-6">
              <label htmlFor="key1" className="block text-gray-400 mb-2">
                Enter Key 1 (16 characters):
              </label>
              <input
                type="text"
                id="key1"
                value={key1}
                onChange={handleKey1Change}
                className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="key2" className="block text-gray-400 mb-2">
                Enter Key 2 (16 characters):
              </label>
              <input
                type="text"
                id="key2"
                value={key2}
                onChange={handleKey2Change}
                className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="key3" className="block text-gray-400 mb-2">
                Enter Key 3 (16 characters):
              </label>
              <input
                type="text"
                id="key3"
                value={key3}
                onChange={handleKey3Change}
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
            <h2 className="text-2xl text-gray-100 mb-6">Triple DES Result</h2>

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

export default TripleDesPage;
