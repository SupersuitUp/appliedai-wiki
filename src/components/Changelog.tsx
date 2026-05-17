import React from 'react';
import Link from '@docusaurus/Link';
import useGlobalData from '@docusaurus/useGlobalData';

interface RecentFile {
  docKey: string;
  routePath: string;
  section: string;
  title: string;
  description?: string;
  creationDate: string;
  lastModifiedDate: string;
}

interface CreationDatePluginContent {
  recentFiles: RecentFile[];
}

const SECTION_LABELS: Record<string, string> = {
  concepts: 'Concept',
  disciplines: 'Discipline',
  'engagement-patterns': 'Engagement Pattern',
  foundations: 'Foundation',
  onboarding: 'Onboarding',
  'people-to-follow': 'Person',
  playbooks: 'Playbook',
  reference: 'Reference',
  roles: 'Role',
  'start-here': 'Start Here',
};

function sectionLabel(section: string): string {
  return (
    SECTION_LABELS[section] ||
    section.charAt(0).toUpperCase() + section.slice(1)
  );
}

function monthHeading(d: Date): string {
  return d.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function isoDay(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

interface Props {
  sortBy?: 'created' | 'updated';
}

export default function Changelog({
  sortBy = 'created',
}: Props) {
  const globalData = useGlobalData() as
    | Record<string, Record<string, unknown>>
    | undefined;
  const data = globalData?.['creation-date-plugin']?.default as
    | CreationDatePluginContent
    | undefined;

  const files = data?.recentFiles ?? [];
  if (files.length === 0) {
    return (
      <p>
        <em>No entries available yet.</em>
      </p>
    );
  }

  const dateField = (f: RecentFile) =>
    sortBy === 'updated' ? f.lastModifiedDate : f.creationDate;

  const sorted = [...files].sort(
    (a, b) => new Date(dateField(b)).getTime() - new Date(dateField(a)).getTime(),
  );

  const groups: Record<string, RecentFile[]> = {};
  for (const f of sorted) {
    const d = new Date(dateField(f));
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(f);
  }

  const sortedKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      {sortedKeys.map((key) => {
        const filesInGroup = groups[key];
        const heading = monthHeading(new Date(dateField(filesInGroup[0])));
        return (
          <section key={key} style={{ marginBottom: '2.25rem' }}>
            <h2 style={{ marginBottom: '0.75rem' }}>{heading}</h2>
            <ul style={{ paddingLeft: '1.25rem' }}>
              {filesInGroup.map((f) => (
                <li
                  key={f.docKey}
                  style={{ marginBottom: '0.5rem', lineHeight: 1.55 }}
                >
                  <code
                    style={{
                      fontSize: '0.85em',
                      opacity: 0.7,
                      padding: '0 0.25rem',
                      background: 'transparent',
                      border: 'none',
                    }}
                  >
                    {isoDay(dateField(f))}
                  </code>{' '}
                  <span style={{ opacity: 0.6, fontSize: '0.85em' }}>
                    ({sectionLabel(f.section)})
                  </span>{' '}
                  <Link to={f.routePath}>
                    <strong>{f.title}</strong>
                  </Link>
                  {f.description && (
                    <>
                      :{' '}
                      <span style={{ opacity: 0.85 }}>{f.description}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
