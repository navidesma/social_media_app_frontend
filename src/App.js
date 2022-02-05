import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />}/>
      <Route path='home' element={<HomePage/>}/>
    </Routes>
  );
}

export default App;
