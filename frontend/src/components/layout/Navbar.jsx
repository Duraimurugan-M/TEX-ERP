import styles from "./Navbar.module.css";

const Navbar = ({ setIsOpen }) => {
  return (
    <div className={styles.navbar}>
      <button
        className={styles.menuBtn}
        onClick={() => setIsOpen(prev => !prev)}
      >
        ☰
      </button>

      <div className={styles.title}>
        Textile ERP
      </div>
    </div>
  );
};

export default Navbar;