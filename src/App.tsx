import { useState } from 'react';
import LandingPage from './components/LandingPage';
import ToolView from './components/ToolView';

function App() {
  const [view, setView] = useState<'landing' | 'tool'>('landing');
  const [initialUrl, setInitialUrl] = useState('');

  const handleStartTest = (url: string) => {
    setInitialUrl(url);
    setView('tool');
  };

  const handleBack = () => {
    setView('landing');
    setInitialUrl('');
  };

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onStartTest={handleStartTest} />
      ) : (
        <ToolView initialUrl={initialUrl} onBack={handleBack} />
      )}
    </>
  );
}

export default App;
