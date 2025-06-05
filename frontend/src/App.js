import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FreeEstimatePage from './pages/FreeEstimatePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/estimate" element={<FreeEstimatePage />} />
        </Routes>
      </div>
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