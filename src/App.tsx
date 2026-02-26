import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/new" element={<Dashboard />} />
        <Route path="/app/history" element={<Dashboard />} />
        <Route path="/app/settings" element={<Dashboard />} />
        <Route path="/app/check/:id" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
