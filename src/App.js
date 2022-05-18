import { Route, Routes } from 'react-router-dom';
import Hero from './components/Hero';
import RequireAuth from './components/RequireAuth';
import Signup from './components/Signup';
import ToDoAPP from './components/ToDoAPP';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="to_do_app"
          element={
            <RequireAuth>
              <ToDoAPP />
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
