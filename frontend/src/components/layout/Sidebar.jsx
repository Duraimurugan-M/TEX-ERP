import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <h2 className={styles.logo}>Textile ERP</h2>

      <nav className={styles.nav}>
        <NavLink to="/dashboard" className={styles.link}>
          Dashboard
        </NavLink>

        <NavLink to="/products" className={styles.link}>
          Product Master
        </NavLink>
      </nav>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;