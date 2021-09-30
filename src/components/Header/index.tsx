import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <div className={styles.title}>
          <span>Just</span>
          <span>Enjoy!</span>
        </div>
      </Link>
      <nav className={styles.menu}>
        <ul>
          <li>
            <NavLink exact to="/meme-generator" activeClassName={styles.active} className={styles.item}>
              짤방 생성기
            </NavLink>
            <NavLink exact to="/every" activeClassName={styles.active} className={styles.item}>
              잡동사니
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
