// Global variables
let events = [];
let filteredEvents = [];

// DOM elements
const timelineContainer = document.getElementById('timeline');
const modal = document.getElementById('modal');
const modalBody = document.querySelector('.modal-body');
const modalClose = document.getElementById('modalClose');
const themeToggle = document.getElementById('themeToggle');
const categoryFilter = document.getElementById('categoryFilter');
const yearFilter = document.getElementById('yearFilter');

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await loadEvents();
    setupEventListeners();
    renderTimeline();
    populateFilters();
});

// Load events from JSON file
async function loadEvents() {
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        events = await response.json();
        filteredEvents = [...events];
    } catch (error) {
        console.error('Error loading events:', error);
        timelineContainer.innerHTML = '<div class="loading">Error loading timeline events. Please try again later.</div>';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Modal close functionality
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Filter functionality
    categoryFilter.addEventListener('change', applyFilters);
    yearFilter.addEventListener('change', applyFilters);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Render timeline events
function renderTimeline() {
    if (filteredEvents.length === 0) {
        timelineContainer.innerHTML = '<div class="loading">No events found matching your filters.</div>';
        return;
    }

    // Sort events by year
    const sortedEvents = [...filteredEvents].sort((a, b) => a.year - b.year);

    const timelineHTML = sortedEvents.map(event => `
        <article class="timeline-event" data-event-id="${event.id}">
            <div class="timeline-marker" onclick="openModal(${event.id})"></div>
            <div class="timeline-content" onclick="openModal(${event.id})">
                <div class="timeline-year">${event.year}</div>
                <h3 class="timeline-title">${event.title}</h3>
                <p class="timeline-description">${truncateDescription(event.description, 100)}</p>
                <span class="timeline-category">${event.category}</span>
            </div>
        </article>
    `).join('');

    timelineContainer.innerHTML = timelineHTML;
}

// Open modal with event details
function openModal(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const modalHTML = `
        ${event.imageURL ? `<img src="${event.imageURL}" alt="${event.title}" class="modal-image" onerror="this.style.display='none'">` : ''}
        <h2 class="modal-title">${event.title}</h2>
        <div class="modal-year">${event.year}</div>
        <p class="modal-description">${event.description}</p>
        <span class="modal-category">${event.category}</span>
    `;

    modalBody.innerHTML = modalHTML;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme icon
    updateThemeIcon(newTheme);
}

// Update theme icon based on current theme
function updateThemeIcon(theme) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    if (theme === 'dark') {
        themeIcon.innerHTML = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        `;
    } else {
        themeIcon.innerHTML = `
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        `;
    }
}

// Populate filter options
function populateFilters() {
    // Get unique categories and years
    const categories = [...new Set(events.map(event => event.category))].sort();
    const years = [...new Set(events.map(event => event.year))].sort((a, b) => a - b);

    // Populate category filter
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Populate year filter
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Apply filters
function applyFilters() {
    const selectedCategory = categoryFilter.value;
    const selectedYear = yearFilter.value;

    filteredEvents = events.filter(event => {
        const categoryMatch = !selectedCategory || event.category === selectedCategory;
        const yearMatch = !selectedYear || event.year === parseInt(selectedYear);
        return categoryMatch && yearMatch;
    });

    renderTimeline();
}

// Utility function to truncate description
function truncateDescription(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Initialize theme on page load
initializeTheme(); 