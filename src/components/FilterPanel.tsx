import React from 'react';
import styles from './FilterPanel.module.css';

interface FilterPanelProps {
  categories: string[];
  years: number[];
  selectedCategory: string;
  selectedYear: number | 'All';
  onCategoryChange: (cat: string) => void;
  onYearChange: (year: number | 'All') => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ categories, years, selectedCategory, selectedYear, onCategoryChange, onYearChange }) => (
  <div className={styles.filterPanel}>
    <label>
      Category:
      <select value={selectedCategory} onChange={e => onCategoryChange(e.target.value)}>
        <option value="All">All Categories</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
    </label>
    <label>
      Year:
      <select value={selectedYear} onChange={e => onYearChange(e.target.value === 'All' ? 'All' : Number(e.target.value))}>
        <option value="All">All Years</option>
        {years.map(year => <option key={year} value={year}>{year}</option>)}
      </select>
    </label>
  </div>
);

export default FilterPanel;
