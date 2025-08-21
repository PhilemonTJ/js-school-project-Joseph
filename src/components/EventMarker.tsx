import React from 'react';
import styles from './EventMarker.module.css';
import type { Event } from '../types';

interface EventMarkerProps {
  event: Event;
  onClick: () => void;
  isLeft: boolean;
}

const EventMarker: React.FC<EventMarkerProps> = ({ event, onClick, isLeft }) => (
  <div className={`${styles.eventCard} ${isLeft ? styles.left : styles.right}`} onClick={onClick} tabIndex={0} role="button" aria-pressed="false">
    <div className={styles.year}>{event.year}</div>
    <div className={styles.title}>{event.title}</div>
    <div className={styles.desc}>{event.description.slice(0, 100)}...</div>
    <span className={styles.category}>{event.category}</span>
  </div>
);

export default EventMarker;
