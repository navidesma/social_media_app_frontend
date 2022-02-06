import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from "react-redux";

function Navbar() {
  // const ctx = useContext(UsersContext);
  const {mainUserId} = useSelector(state => state.ui);
  return (
    <div className={styles.navbarContainer}>
      <NavLink
        to="/home"
        className={(navData) => (navData.isActive ? styles.activeLink : "")}
      >
        <HomeIcon sx={{color: 'white'}}/>
      </NavLink>
      <NavLink
        to={`/user/${mainUserId}`}
        className={(navData) => (navData.isActive ? styles.activeLink : "")}
      >
        <PersonIcon sx={{color: 'white'}}/>
      </NavLink>
    </div>
  );
}

export default Navbar;
