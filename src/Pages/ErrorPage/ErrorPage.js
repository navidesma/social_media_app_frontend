import styles from './ErrorPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function ErrorPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  });
  return (
      <div className={styles.container}>
        <h1>Page Not Found</h1>
        <br/>
        <p>redirecting to home...</p>
      </div>
  );
}