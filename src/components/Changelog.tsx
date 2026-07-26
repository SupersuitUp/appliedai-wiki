import React from 'react';
import { ChangeRow, useChangeEvents } from './ChangelogWidget';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Group and label by the date in the commit's own timezone (the leading
// YYYY-MM of the ISO string), so an evening commit does not land in the next
// day, or the next month, the way a UTC conversion would.
function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

function monthHeading(key: string): string {
  const [year, month] = key.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

// The full event log. Every git change to a doc is a row (New / Updated /
// Removed), grouped by the month it happened, newest first. The home-page
// Changelog widget renders the same event stream, so it is exactly the
// top N rows of this list.
export default function Changelog() {
  const events = useChangeEvents();

  if (events.length === 0) {
    return (
      <p>
        <em>No entries available yet.</em>
      </p>
    );
  }

  const groups: Record<string, typeof events> = {};
  for (const e of events) {
    const key = monthKey(e.date);
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  }

  const sortedKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      {sortedKeys.map((key) => {
        const eventsInGroup = groups[key];
        const heading = monthHeading(key);
        return (
          <section key={key} style={{ marginBottom: '2.25rem' }}>
            <h2 style={{ marginBottom: '0.75rem' }}>{heading}</h2>
            <ul style={{ paddingLeft: '1.25rem' }}>
              {eventsInGroup.map((e) => (
                <ChangeRow key={e.id} event={e} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
