import { Link, NavLink } from 'react-router-dom';

import { Container } from '../Container';
import { UserWidget } from '../UserWidget';

import logoImage from './assets/logo.png';
import styles from './Header.module.scss';

export const Header = () => {
  const navLinkClassnames = ({ isActive }) => (
    isActive ? styles.activeLink : undefined
  );

  return (
    <header className={styles.header}>
      <Container>
        <nav>
          <Link to="/" className={styles.logo}>
            <img src={logoImage} alt="Perfecta" />
          </Link>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <NavLink to="/" className={navLinkClassnames}>Inbox</NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink to="/scheduler" className={navLinkClassnames}>Scheduler</NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink to="/completed" className={navLinkClassnames}>Completed</NavLink>
            </li>
          </ul>
          <UserWidget />
        </nav>
      </Container>
    </header>
  );
};
