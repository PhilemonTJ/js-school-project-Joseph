
# Accessibility Statement for Timeline App

This project is designed to be accessible to all users, including those with disabilities. The following accessibility features and best practices have been implemented:

## Modal Dialog Accessibility
- The event modal uses `role="dialog"` and `aria-modal="true"` for assistive technology support.
- The modal is focus-trapped: keyboard navigation (Tab/Shift+Tab) stays within the modal while open.
- The modal can be closed with the Escape key (`Esc`).
- When the modal closes, focus returns to the timeline marker (event card) that opened it.
- The close button has an `aria-label` for screen readers.
- Modal content uses semantic headings and labels (`aria-labelledby`, `aria-describedby`).

## Timeline Markers (Event Cards)
- Each event card is a keyboard-accessible button (`role="button"`, `tabIndex=0`).
- Markers are reachable via Tab and Arrow keys (left/right/up/down).
- The currently active marker (corresponding to the open modal) uses `aria-current="step"`.
- Markers have descriptive `aria-label`s for screen readers.

## Keyboard Navigation
- All interactive elements (timeline markers, modal, close button) are reachable and operable via keyboard.
- Timeline markers support navigation with Tab and Arrow keys.

## Colour Contrast
- All text and interactive elements meet or exceed WCAG AA contrast ratio (≥4.5:1).
- Accessible color variables are used for backgrounds, text, and focus indicators.

## General WCAG Compliance
- Semantic HTML is used throughout the app.
- ARIA roles and attributes are applied where needed for clarity and assistive technology support.
- Focus management and keyboard navigation are implemented for all interactive components.

## Testing and Recommendations
- Accessibility features have been tested with keyboard navigation and screen readers.
- For further improvements, use automated accessibility testing tools (axe, Lighthouse) and conduct user testing with assistive technologies.

---

For questions or suggestions about accessibility in this project, please open an issue or contact the maintainers.
