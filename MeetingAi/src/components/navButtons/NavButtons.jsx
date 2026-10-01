import styles from "./NavButtons.module.css"
import { NavLink } from "react-router-dom";

function NavButtons() {
    return (
        <div className={styles.container}>
          <div className={styles.homeContainer}>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-link" : "")}
            >Home</NavLink>
          </div>
          <div className={styles.navContainer}>
            <NavLink
                to="/invite"
                className={({ isActive }) => (isActive ? "active-link" : "")}
            >Invitation</NavLink>
            <NavLink
                to="/sum"
                className={({ isActive }) => (isActive ? "active-link" : "")}
            >Summerize</NavLink>
            <NavLink
                to="/agenda"
                className={({ isActive }) => (isActive ? "active-link" : "")}
            >Agenda</NavLink>

          </div>
        </div>
    );
}

export default NavButtons;
