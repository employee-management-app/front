import { Link, NavLink } from 'react-router-dom';

import { ReactComponent as InboxIcon} from '../../assets/icons/inbox.svg';
import { ReactComponent as SchedulerIcon} from '../../assets/icons/scheduler.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow-right.svg';
import { useAuth } from '../../hooks/useAuth';

import { Container } from '../Container';
import { UserWidget } from '../UserWidget';

import logoImage from './assets/logo.png';
import styles from './Header.module.scss';

export const Header = () => {
  const { isLoggedIn, isManager } = useAuth();

  const navLinkClassnames = ({ isActive }) => (
    isActive ? styles.activeLink : undefined
  );

  const menu = isLoggedIn ? [
    {
      to: '/',
      label: 'Inbox',
      Icon: InboxIcon,
    },
    ...(isManager ? [
      {
        to: '/scheduler',
        label: 'Scheduler',
        Icon: SchedulerIcon,
      },
      {
        to: '/completed',
        label: 'Completed',
        Icon: InboxIcon,
      },
    ] : [
      {
        to: '/anytime',
        label: 'Anytime',
        Icon: ArrowRightIcon,
      },
      {
        to: '/scheduled',
        label: 'Scheduled',
        Icon: SchedulerIcon,
      },
    ]),
  ] : [];

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
          {isLoggedIn && <UserWidget />}
        </nav>
      </Container>
      <nav className={styles.mobileNav}>
        <ul className={styles.mobileMenu}>
          {menu.map(({ to, label, Icon }) => (
            <li key={to} className={styles.mobileMenuItem}>
              <NavLink to={to} className={navLinkClassnames}>
                <Icon />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
