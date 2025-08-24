
import React, { forwardRef } from 'react';
import styles from './EventMarker.module.css';
import type { Event } from '../types';

interface EventMarkerProps {
  event: Event;
  onClick: () => void;
  isLeft: boolean;
  isActive?: boolean;
  onKeyNav?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}


const EventMarker = forwardRef<HTMLDivElement, EventMarkerProps>(
  ({ event, onClick, isLeft, isActive, onKeyNav }, ref) => {
    return (
      <div className={styles.eventWrapper}>
        <div className={styles.marker}
          aria-current={isActive ? "step" : undefined}
          aria-label={`Timeline marker for ${event.title}`}
        ></div>
        <div
          className={`${styles.eventCard} ${isLeft ? styles.left : styles.right}`}
          onClick={onClick}
          tabIndex={0}
          role="button"
          aria-pressed={isActive ? "true" : "false"}
          ref={ref}
          onKeyDown={onKeyNav}
          aria-label={`${event.title}, ${event.year}, ${event.category}`}
        >
          <div className={styles.year}>{event.year}</div>
          <div className={styles.title}>{event.title}</div>
          <div className={styles.desc}>{event.description.slice(0, 150)}...</div>
          <span className={styles.category}>{event.category}</span>
        </div>
      </div>
    );
  }
);

export default EventMarker;
