import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/home/activities" element={<CreateActivity/>} />
    </Routes>
  );
}

export default App;
