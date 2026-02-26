import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/history" element={<Dashboard />} />
        <Route path="/app/settings" element={<Dashboard />} />
        <Route path="/app/check/:id" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
