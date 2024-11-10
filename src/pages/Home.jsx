import React, { useState } from 'react';

const Home = () => {
  const [userText, setUserText] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');

  // Simple encryption logic (for demonstration purposes)
  const encryptText = () => {
    if (userText && encryptionKey) {
      let encrypted = '';
      for (let i = 0; i < userText.length; i++) {
        encrypted += String.fromCharCode(userText.charCodeAt(i) + encryptionKey.length); // Simple shift cipher
      }
      setEncryptedText(encrypted);
    }
  };

  return (
    <div>
      <section
        className="contact relative min-h-screen p-12 flex justify-center items-center flex-col bg-cover bg-center bg-gray-900"
        style={{ backgroundImage: 'url(bg.jpg)' }}
      >
        <div className="container flex justify-center items-center mt-12 space-x-12">
          <div className="contactForm w-1/2 p-10 bg-gray-800 flex flex-col space-y-6 rounded-lg shadow-xl">
            {/* Form Header */}
            <h2 className="text-2xl text-gray-100 font-medium mb-6">Text Encryption</h2>

            {/* Input Section */}
            <div className="flex flex-col space-y-6">
              {/* Input Box for User Text */}
              <div className="inputBox relative w-full">
                <input
                  type="text"
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
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

              {/* Input Box for Encryption Key */}
              <div className="inputBox relative w-full">
                <input
                  type="text"
                  value={encryptionKey}
                  onChange={(e) => setEncryptionKey(e.target.value)}
                  className="w-full p-2 text-base border-b-2 border-gray-600 outline-none focus:border-teal-400 
                           bg-transparent text-gray-100 peer"
                  id="encryptionKey"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="encryptionKey"
                  className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all duration-200 ease-in-out 
                           peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
                           peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-teal-400"
                >
                  Enter Encryption Key
                </label>
              </div>
            </div>

            {/* Button to Trigger Encryption */}
            <div className="inputBox w-full mt-4">
              <button
                onClick={encryptText}
                className="w-24 bg-teal-600 hover:bg-teal-500 text-white py-2 px-4 text-lg cursor-pointer 
                         rounded transition-colors duration-200"
              >
                Encrypt
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="w-1/2 p-10 bg-gray-800 flex flex-col space-y-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-medium text-gray-100">Encrypted Text:</h3>
            <textarea
              className="w-full mt-2 p-2 text-base border-2 border-gray-600 outline-none rounded 
                       bg-gray-700 text-gray-100 focus:border-teal-400"
              value={encryptedText}
              readOnly
              rows="8"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;