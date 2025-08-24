

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './EventModal.module.css';
import type { Event } from '../types';

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
  isOpen: boolean;
  triggerRef?: React.RefObject<HTMLElement>;
}

// Focus trap utility
function trapFocus(modalNode: HTMLElement) {
  const focusable = modalNode.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  let first = focusable[0];
  let last = focusable[focusable.length - 1];
  function handle(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  }
  modalNode.addEventListener('keydown', handle);
  return () => modalNode.removeEventListener('keydown', handle);
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose, isOpen, triggerRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const node = modalRef.current;
    if (node) {
      // Focus the first focusable element in modal
      setTimeout(() => {
        const focusable = node.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable) focusable.focus();
      }, 0);
      // Trap focus
      const cleanup = trapFocus(node);
      // Esc to close
      const esc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', esc);
      return () => {
        if (cleanup) cleanup();
        window.removeEventListener('keydown', esc);
      };
    }
  }, [isOpen, onClose]);

  // Return focus to trigger
  useEffect(() => {
    if (!isOpen && triggerRef && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen, triggerRef]);

  if (!isOpen || !event) return null;
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-desc"
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
      >
        {event.imageURL && (
          <img src={event.imageURL} alt={event.title} className={styles.image} />
        )}
        <button className={styles.close} onClick={onClose} aria-label="Close">&times;</button>
        <h2 className={styles.title} id="event-modal-title">{event.title}</h2>
        <div className={styles.year}>{event.year}</div>
        <div className={styles.desc} id="event-modal-desc">{event.description}</div>
        <span className={styles.category}>{event.category}</span>
      </div>
    </div>,
    document.body
  );
};

export default EventModal;
