import styles from './ErrorPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector } from 'react-redux';

export default function ErrorPage() {
  const {loggedIn} = useSelector(state => state.ui);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (loggedIn) {
        navigate('/');
      } else {
        navigate('/login')
      }
    }, 500);
  });
  return (
      <div className={styles.container}>
        {loggedIn && <>
        <h1>Page Not Found</h1>
        <br/>
        <p>redirecting to home...</p>
        </>}
        {!loggedIn && <>
        <h1>Not Authenticated</h1>
        <br/>
        <p>redirecting to login page...</p>
        </>}
      </div>
  );
}