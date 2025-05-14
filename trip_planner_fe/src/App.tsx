// App.tsx
import Index from './pages/Index';
import About from './pages/About';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;