import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => (
  <header className={styles.header}>
    <div className={styles.logo}>Timeline</div>
    <button className={styles.themeSwitch} onClick={onToggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? (
        <span role="img" aria-label="Light mode">🌞</span>
      ) : (
        <span role="img" aria-label="Dark mode">🌙</span>
      )}
    </button>
  </header>
);

export default Header;
