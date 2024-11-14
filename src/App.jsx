import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VigenerePage from "./pages/Vigenere_page";
import PlayfairPage from "./pages/Playfair_page"; // Ensure this import is correct
import NavBarComponent from "./components/GlobalComponents/NavBarComponent";
import FooterComponent from "./components/GlobalComponents/FooterComponent";
import Loader from "./components/GlobalComponents/LoaderComponent"; 
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Router>
        {loading ? (
          <Loader />
        ) : (
          <>
            <NavBarComponent />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vigenere" element={<VigenerePage />} />
                <Route path="/playfair" element={<PlayfairPage />} /> {/* Added PlayfairPage route */}
              </Routes>
            </div>
            <FooterComponent />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
