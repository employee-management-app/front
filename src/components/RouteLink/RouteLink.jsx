import React from 'react';

import { ReactComponent as DirectionIcon } from '../../assets/icons/direction.svg';

import styles from './RouteLink.module.scss';

export const RouteLink = ({ href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={styles.routeLink}
  >
    <span>Show route</span>
    <DirectionIcon />
  </a>
);
