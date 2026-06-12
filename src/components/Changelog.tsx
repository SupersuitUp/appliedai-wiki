import React from 'react';
import { ChangeRow, useChangeEvents } from './ChangelogWidget';

function monthHeading(d: Date): string {
  return d.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
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
    const d = new Date(e.date);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(e);
  }

  const sortedKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      {sortedKeys.map((key) => {
        const eventsInGroup = groups[key];
        const heading = monthHeading(new Date(eventsInGroup[0].date));
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
