import React from 'react';
import EventMarker from './EventMarker';
import styles from './Timeline.module.css';
import type { Event } from '../types';

interface TimelineProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onEventClick }) => {
  if (events.length === 0) {
    return (
      <div className={styles.timelineContainer}>
        <div className={`${styles.timeline} ${styles.noLine}`} style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className={styles.emptyState}>No events found matching your filters</div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timeline}>
        {events.map((event, idx) => (
          <EventMarker
            key={event.id}
            event={event}
            onClick={() => onEventClick(event)}
            isLeft={idx % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
