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

// Renders inline markdown link syntax `[text](url)` in description strings.
// Descriptions come from doc frontmatter and sometimes contain links to
// related concepts; without parsing, the brackets render literally.
function renderDescription(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <Link key={key++} to={match[2]}>
        {match[1]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

// A file is "new" if its first commit and most recent commit are the same.
// When sortBy='updated', a row may appear because the file was edited; in
// that case the badge should read "Updated" even though the file may have
// been created earlier in the same month. When sortBy='created', the badge
// always reads "New" because the row is anchored to the creation event.
function isNew(f: RecentFile, sortBy: 'created' | 'updated'): boolean {
  if (sortBy === 'created') return true;
  return f.creationDate === f.lastModifiedDate;
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
              {filesInGroup.map((f) => {
                const fileIsNew = isNew(f, sortBy);
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
                        <span style={{ opacity: 0.85 }}>
                          {renderDescription(f.description)}
                        </span>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
