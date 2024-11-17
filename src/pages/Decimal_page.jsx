import React, { useState } from "react";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DecimalPage = () => {
  const [inputType, setInputType] = useState("Binary"); // State to hold input type (Binary, Octal, Hexadecimal)
  const [inputValue, setInputValue] = useState(""); // State to hold user input
  const [convertedValue, setConvertedValue] = useState(""); // State to hold converted value

  // Validation patterns for different input types
  const validationPatterns = {
    Binary: /^[01]+$/, // Binary should only contain 0 and 1
    Octal: /^[0-7]+$/, // Octal should only contain digits 0-7
    Hexadecimal: /^[0-9A-Fa-f]+$/, // Hexadecimal should contain 0-9 and A-F/a-f
  };

  // Handle input changes
  const handleInputChange = (e) => setInputValue(e.target.value);

  // Handle input type change
  const handleInputTypeChange = (e) => {
    setInputType(e.target.value);
    setInputValue(""); // Clear input when type changes
    setConvertedValue(""); // Clear output when type changes
  };

  // Conversion function
  const convertToDecimal = () => {
    // Validate input based on selected type
    if (!validationPatterns[inputType].test(inputValue)) {
      toast.error(`Invalid ${inputType} input!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    let decimalValue;

    // Convert input to decimal based on its type
    switch (inputType) {
      case "Binary":
        decimalValue = parseInt(inputValue, 2);
        break;
      case "Octal":
        decimalValue = parseInt(inputValue, 8);
        break;
      case "Hexadecimal":
        decimalValue = parseInt(inputValue, 16);
        break;
      default:
        toast.error("Invalid input type selected!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
        return;
    }

    // Set the converted value
    setConvertedValue(decimalValue.toString());
  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-custom-image bg-cover bg-center min-h-screen p-12 flex flex-col items-center bg-gray-900">
        <div className="mt-[36px] w-3/4 max-w-xl bg-opacity-80 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl text-white font-bold mb-4 text-center">
            Decimal Conversion
          </h2>

          {/* Input Type Dropdown */}
          <div className="mb-4">
            <label htmlFor="inputType" className="block text-gray-300 mb-2">
              Select Input Type:
            </label>
            <select
              id="inputType"
              value={inputType}
              onChange={handleInputTypeChange}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            >
              <option value="Binary">Binary</option>
              <option value="Octal">Octal</option>
              <option value="Hexadecimal">Hexadecimal</option>
            </select>
          </div>

          {/* User Input */}
          <div className="mb-4">
            <label htmlFor="inputValue" className="block text-gray-300 mb-2">
              Enter {inputType} Value:
            </label>
            <input
              id="inputValue"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>

          {/* Convert Button */}
          <button
            onClick={convertToDecimal}
            className="w-full py-2 bg-teal-600 text-white font-bold rounded hover:bg-teal-500"
          >
            Convert to Decimal
          </button>

          {/* Display Result */}
          {convertedValue && (
            <div className="mt-4 bg-gray-700 text-white p-4 rounded">
              <strong>Decimal:</strong> {convertedValue}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DecimalPage;
