import styles from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from "react-redux";

function Navbar() {
  // const ctx = useContext(UsersContext);
  const { mainUserId } = useSelector((state) => state.ui);

  const location = useLocation();

  return (
    <div className={styles.navbarContainer}>
      <NavLink
        to="/home"
        className={(navData) => (navData.isActive ? styles.activeLink : "")}
      >
        <HomeIcon sx={{ color: "white" }} />
      </NavLink>
      <NavLink
        to="/search-users"
        className={(navData) => (navData.isActive ? styles.activeLink : "")}
      >
        <SearchIcon sx={{ color: "white" }} />
      </NavLink>
      <NavLink
        to="/add-post"
        className={(navData) => (navData.isActive ? styles.activeLink : "")}
      >
        <AddIcon sx={{ color: "white" }} />
      </NavLink>
      <NavLink
        to={`/user`}
        // only show the link as activated if the user is on the page: /user or /user/mainUserId not /user/some_id so it is only activated
        // if you are in the main user page
        className={(navData) =>
          navData.isActive &&
          (location.pathname.split("/")[2] == null ||
            location.pathname.split("/")[2] === mainUserId)
            ? styles.activeLink
            : ""
        }
      >
        <PersonIcon sx={{ color: "white" }} />
      </NavLink>
    </div>
  );
}

export default Navbar;
