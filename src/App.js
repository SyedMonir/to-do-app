import { Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/to_do_app" element={<Hero />} />
      </Routes>
    </>
  );
}

export default App;
