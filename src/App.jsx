import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home  from "./pages/Home"
import AboutDevelopers from "./pages/About_Developers";
import VigenerePage from "./pages/Vigenere_page"
import VernamPage from "./pages/Vernam_page";
import RailFencePage from "./pages/Rail_Fence_page";
import PlayfairPage from "./pages/Playfair_page";
import HexadecimalPage from "./pages/Hexadecimal_page";
import DecimalPage from "./pages/Decimal_page";
import OctalPage from "./pages/Octal_page";
import BinaryPage from "./pages/Binary_page";
import RsaPage from "./pages/Rsa_page";
import DesPage from "./pages/DES_page"
import TripleDesPage from "./pages/Triple-DES_Page"
import AESPage from "./pages/AES_Page"
import NavBarComponent from "./components/GlobalComponents/NavBarComponent";
import FooterComponent from "./components/GlobalComponents/FooterComponent";
import Loader from "./components/GlobalComponents/LoaderComponent"; 
import { useState, useEffect } from 'react';
import SHA0 from "./pages/SHA-0";
import SHA1 from "./pages/SHA-1";
import SHA512 from "./pages/SHA-512";
import SHA224 from "./pages/SHA-224";
import SHA384 from "./pages/SHA-384"
import SHA256 from "./pages/SHA-256";
import SHA3 from "./pages/SHA-3";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

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
                <Route path="/vernam" element={<VernamPage />} />
                <Route path="/railfence" element={<RailFencePage />} />
                <Route path="/play-fair" element={<PlayfairPage/>} />
                <Route path="/Rsa" element={<RsaPage/>} />
                <Route path="/Des" element={<DesPage/>} />
                <Route path="/Triple-Des" element={<TripleDesPage/>} />
                <Route path="/Aes" element={<AESPage/>} />
                <Route path="/Hexadecimal" element={<HexadecimalPage/>} />
                <Route path="/Decimal" element={<DecimalPage/>} />
                <Route path="/Octal" element={<OctalPage/>} />
                <Route path="/Binary" element={<BinaryPage/>} />
                <Route path="/Sha0" element={<SHA0/>}/>
                <Route path="/Sha1" element={<SHA1/>}/>
                <Route path="/Sha3" element={<SHA3/>}/>
                <Route path="/Sha512" element={<SHA512/>}/>
                <Route path="/Sha224" element={<SHA224/>}/>
                <Route path="/Sha384" element={<SHA384/>}/>
                <Route path="/Sha256" element={<SHA256/>}/>
                <Route path="/About" element={<AboutDevelopers/>}/>
               
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