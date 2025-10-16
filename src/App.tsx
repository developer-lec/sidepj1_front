import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/main/HomePage';
import PlaceReviewPage from './pages/main/components/PlaceReview/PlaceReviewPage';
import MyMapPage from './pages/main/components/MyMap/MyMapPage';

function App() {
  return (
    <>
      {/* (SPA 라우팅의 컨테이너) 라우터 상위에서 BrowserRouter로 관리 */}
      <BrowserRouter>
        <Routes>
          <Route path="/PlaceReviewPage" element={<PlaceReviewPage />} />
          <Route path="/MyMapPage" element={<MyMapPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
