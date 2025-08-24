
import React, { useState, useRef } from 'react';
import EventMarker from './EventMarker';
import styles from './Timeline.module.css';
import type { Event } from '../types';

interface TimelineProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onEventClick }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const markerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keyboard navigation for timeline markers
  const handleKeyNav = (idx: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onEventClick(events[idx]);
      setActiveIdx(idx);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (idx + 1) % events.length;
      markerRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (idx - 1 + events.length) % events.length;
      markerRefs.current[prev]?.focus();
    }
  };

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
            onClick={() => {
              onEventClick(event);
              setActiveIdx(idx);
            }}
            isLeft={idx % 2 === 0}
            isActive={activeIdx === idx}
            onKeyNav={handleKeyNav(idx)}
            ref={(el: HTMLDivElement | null) => { markerRefs.current[idx] = el; }}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
