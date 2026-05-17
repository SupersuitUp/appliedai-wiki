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

function isoDay(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

interface Props {
  limit?: number;
  showSectionLabels?: boolean;
}

export default function RecentlyAdded({
  limit = 7,
  showSectionLabels = true,
}: Props) {
  const globalData = useGlobalData() as
    | Record<string, Record<string, unknown>>
    | undefined;
  const data = globalData?.['creation-date-plugin']?.default as
    | CreationDatePluginContent
    | undefined;

  const files = data?.recentFiles ?? [];
  if (files.length === 0) {
    return null;
  }

  const top = files.slice(0, limit);

  return (
    <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
      {top.map((f) => (
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
            {isoDay(f.lastModifiedDate)}
          </code>{' '}
          {showSectionLabels && (
            <span style={{ opacity: 0.6, fontSize: '0.85em' }}>
              ({sectionLabel(f.section)})
            </span>
          )}{' '}
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
  );
}
