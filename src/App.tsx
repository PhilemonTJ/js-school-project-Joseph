import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import EventModal from './components/EventModal';
import FilterPanel from './components/FilterPanel';
import type { Event } from './types';
import './App.css';

const fetchEvents = async (): Promise<Event[]> => {
  const res = await fetch('/src/data/events.json');
  return res.json();
};

const getUnique = <T,>(arr: T[]): T[] => Array.from(new Set(arr));

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filtered, setFiltered] = useState<Event[]>([]);
  const [modalEvent, setModalEvent] = useState<Event | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [category, setCategory] = useState<string>('All');
  const [year, setYear] = useState<number | 'All'>('All');



  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  useEffect(() => {
    let filtered = events;
    if (category !== 'All') filtered = filtered.filter(e => e.category === category);
    if (year !== 'All') filtered = filtered.filter(e => e.year === year);
    setFiltered(filtered);
  }, [events, category, year]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const categories = getUnique(events.map(e => e.category));
  const years = getUnique(events.map(e => e.year)).sort((a, b) => a - b);

  return (
    <div>
      <Header theme={theme} onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
      <FilterPanel
        categories={categories}
        years={years}
        selectedCategory={category}
        selectedYear={year}
        onCategoryChange={setCategory}
        onYearChange={setYear}
      />
      <Timeline events={filtered} onEventClick={setModalEvent} />
      <EventModal event={modalEvent} isOpen={!!modalEvent} onClose={() => setModalEvent(null)} />
    </div>
  );
};

export default App;
