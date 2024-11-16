import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import { base_url } from '../config/index.js';
import 'react-toastify/dist/ReactToastify.css';

const RsaPage = () => {
  const [userText, setUserText] = useState('');
  const [d, setD] = useState('');
  const [n, setN] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [mode, setMode] = useState('Encrypt');

  const processText = async () => {
    if (mode === 'Encrypt') {
      if (!userText.trim()) {
        toast.error("Please provide text to encrypt.", {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }
    } else if (mode === 'Decrypt') {
      if (!userText.trim() || !d.trim() || !n.trim() || isNaN(d) || isNaN(n)) {
        toast.error("Please provide valid ciphertext, d, and n for decryption.", {
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
        ? { text: userText.trim() }
        : { cipherText: userText.trim().split(','), d: d.trim(), n: n.trim() };
  
      const endpoint = mode === 'Encrypt' ? '/rsa-encrypt' : '/rsa-decrypt';
      const response = await axios.post(`${base_url}${endpoint}`, payload);
  
      if (response.data.status) {
        if (mode === 'Encrypt') {
          setEncryptedText(response.data.encryptedMessage.join(','));
          setD(response.data.secretKey.d);
          setN(response.data.secretKey.n);
        } else {
          setDecryptedText(response.data.decryptedMessage);
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
      console.error('Error during RSA operation:', error);
      toast.error("Error occurred while processing text.", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  

  const handleUserTextChange = (e) => setUserText(e.target.value);
  const handleDChange = (e) => setD(e.target.value);
  const handleNChange = (e) => setN(e.target.value);
  const handleModeChange = (e) => setMode(e.target.value);

  return (
    <div>
      <ToastContainer />
      <section className="bg-custom-image bg-cover bg-center bg-gray-900 min-h-screen flex items-center justify-center p-8">
        <div className="grid grid-cols-2 gap-6 w-full max-w-6xl">
          {/* Left Section (Input) */}
          <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl text-gray-100 mb-6">RSA Input</h2>

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
              <>
                <div className="mb-4">
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
                <div className="mb-4">
                  <label htmlFor="d" className="block text-gray-400 mb-2">
                    Decryption Key (d):
                  </label>
                  <input
                    type="text"
                    id="d"
                    value={d}
                    onChange={handleDChange}
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="n" className="block text-gray-400 mb-2">
                    Modulus (n):
                  </label>
                  <input
                    type="text"
                    id="n"
                    value={n}
                    onChange={handleNChange}
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                  />
                </div>
              </>
            )}

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
            <h2 className="text-2xl text-gray-100 mb-6">RSA Result</h2>

            {/* Display ciphertext, d, and n after encryption */}
            {mode === 'Encrypt' ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">Encrypted Text (Ciphertext):</label>
                  <textarea
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                    value={encryptedText}
                    readOnly
                    rows="5"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">Decryption Key (d):</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                    value={d}
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">Modulus (n):</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                    value={n}
                    readOnly
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2">Decrypted Text:</label>
                  <textarea
                    className="w-full p-2 bg-gray-700 text-gray-100 rounded focus:border-teal-400"
                    value={decryptedText}
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

export default RsaPage;
