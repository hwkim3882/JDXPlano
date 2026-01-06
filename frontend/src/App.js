import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Gallery from './pages/Gallery';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import FreeEstimatePage from './pages/FreeEstimatePage';
import BlindsPage from './pages/BlindsPage';
import GalleryCategoryPage from './pages/GalleryCategoryPage';
import WhyJDX from './pages/WhyJDX';
import AdminPage from './pages/AdminPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/estimate" element={<FreeEstimatePage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:category" element={<GalleryCategoryPage />} />
          <Route path="/blinds" element={<BlindsPage />} />
          <Route path="/whyjdx" element={<WhyJDX />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

// function App() {
//     return (
//       <div className="bg-blue-500 text-white p-4 rounded-lg text-center mt-10">
//         Tailwind가 적용된다면 파란색 박스가 보입니다!
//       </div>
//     );
//   }

export default App;
