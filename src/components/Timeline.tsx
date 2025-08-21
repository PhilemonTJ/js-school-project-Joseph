import React from 'react';
import EventMarker from './EventMarker';
import styles from './Timeline.module.css';
import type { Event } from '../types';

interface TimelineProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onEventClick }) => (
  <div className={styles.timelineContainer}>
    <div className={styles.timeline}>
      {events.map((event, idx) => (
        <EventMarker key={event.id} event={event} onClick={() => onEventClick(event)} isLeft={idx % 2 === 0} />
      ))}
    </div>
  </div>
);

export default Timeline;
