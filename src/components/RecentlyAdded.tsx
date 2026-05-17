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
  guides: 'Guide',
  'case-studies': 'Case Study',
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

// A file is "new" if its first commit and most recent commit are the same.
// Once it has been edited again after creation, the dates diverge and we
// show "updated" instead. This is exact because git commit timestamps are
// second-precision and a single commit produces identical first/last dates.
function isNew(f: RecentFile): boolean {
  return f.creationDate === f.lastModifiedDate;
}

interface Props {
  limit?: number;
  showSectionLabels?: boolean;
}

const NEW_BADGE_STYLE: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '0.7em',
  fontWeight: 700,
  letterSpacing: '0.04em',
  padding: '0.05rem 0.4rem',
  borderRadius: '0.2rem',
  background: 'rgba(34, 197, 94, 0.18)',
  color: 'rgb(22, 163, 74)',
  border: '1px solid rgba(34, 197, 94, 0.45)',
  textTransform: 'uppercase',
  verticalAlign: 'middle',
};

const UPDATED_BADGE_STYLE: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '0.7em',
  fontWeight: 700,
  letterSpacing: '0.04em',
  padding: '0.05rem 0.4rem',
  borderRadius: '0.2rem',
  background: 'rgba(59, 130, 246, 0.16)',
  color: 'rgb(37, 99, 235)',
  border: '1px solid rgba(59, 130, 246, 0.4)',
  textTransform: 'uppercase',
  verticalAlign: 'middle',
};

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
      {top.map((f) => {
        const fileIsNew = isNew(f);
        return (
          <li
            key={f.docKey}
            style={{ marginBottom: '0.5rem', lineHeight: 1.55 }}
          >
            <span style={fileIsNew ? NEW_BADGE_STYLE : UPDATED_BADGE_STYLE}>
              {fileIsNew ? 'New' : 'Updated'}
            </span>{' '}
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
        );
      })}
    </ul>
  );
}
