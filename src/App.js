import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import Navbar from './UI/Navbar/Navbar';
import UserPage from './Pages/UserPage/UserPage';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import PostsPage from './Pages/PostsPage/PostsPage';
import FollowPage from './Pages/FollowPage/FollowPage';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to='/home' />}/>
      <Route path='home' element={<HomePage/>}/>
      <Route path="user" element={<UserPage/>}/>
      <Route path="user/:userId" element={<UserPage/>}/>
      <Route path='posts/:userId/:postId' element={<PostsPage/>} />
      <Route path='follow' element={<FollowPage/>} />
      <Route path='follow/:userId/:which' element={<FollowPage/>} />
      <Route path="*" element={<ErrorPage />}/>
    </Routes>
      <Navbar/>
    </>
  );
}

export default App;
