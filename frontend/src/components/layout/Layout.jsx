import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={styles.main}>
        <Navbar setIsOpen={setIsOpen} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;