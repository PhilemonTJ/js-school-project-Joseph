
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './EventModal.module.css';
import type { Event } from '../types';

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
  isOpen: boolean;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, isOpen }) => {
  if (!isOpen || !event) return null;
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {event.imageURL && (
          <img src={event.imageURL} alt={event.title} className={styles.image} />
        )}
        <button className={styles.close} onClick={onClose} aria-label="Close">&times;</button>
        <h2 className={styles.title}>{event.title}</h2>
        <div className={styles.year}>{event.year}</div>
        <div className={styles.desc}>{event.description}</div>
        <span className={styles.category}>{event.category}</span>
      </div>
    </div>,
    document.body
  );
};

export default EventModal;
