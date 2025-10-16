import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/main/HomePage';

function App() {
  return (
    <>
      {/* (SPA 라우팅의 컨테이너) 라우터 상위에서 BrowserRouter로 관리 */}
      <BrowserRouter>
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
