import { Link, NavLink } from 'react-router-dom';

import { Container } from '../Container';
import { UserWidget } from '../UserWidget';

import logoImage from './assets/logo.png';
import styles from './Header.module.scss';

export const Header = () => {
  const navLinkClassnames = ({ isActive }) => (
    isActive ? styles.activeLink : undefined
  );

  const menu = [
    {
      to: '/',
      label: 'Inbox'
    },
    {
      to: '/scheduler',
      label: 'Scheduler'
    },
    {
      to: '/completed',
      label: 'Completed'
    },
  ];

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>
            <img src={logoImage} alt="Perfecta" />
          </Link>
          <ul className={styles.menu}>
            {menu.map(({ to, label }) => (
              <li key={to} className={styles.menuItem}>
                <NavLink to={to} className={navLinkClassnames}>{label}</NavLink>
              </li>
            ))}
          </ul>
          <UserWidget />
        </nav>
      </Container>
      <nav className={styles.mobileNav}>
        <ul className={styles.mobileMenu}>
          {menu.map(({ to, label }) => (
            <li key={to} className={styles.mobileMenuItem}>
              <NavLink to={to} className={navLinkClassnames}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
