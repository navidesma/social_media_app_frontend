import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Navbar from './UI/Navbar/Navbar';
import UserPage from './Pages/UserPage/UserPage';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to='/home' />}/>
      <Route path='home' element={<HomePage/>}/>
      <Route path="user/:userId" element={<UserPage/>}/>
    </Routes>
      <Navbar/>
    </>
  );
}

export default App;
