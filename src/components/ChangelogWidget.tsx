import React from 'react';
import Link from '@docusaurus/Link';
import useGlobalData from '@docusaurus/useGlobalData';

type ChangeType = 'new' | 'updated' | 'removed';

interface ChangeEvent {
  id: string;
  type: ChangeType;
  date: string;
  docKey: string;
  routePath: string;
  section: string;
  title: string;
  description?: string;
}

interface CreationDatePluginContent {
  changeEvents: ChangeEvent[];
}

// Section folder slug → display label. Tune this map to match the
// top-level folders under `docs/`. Operators forking this template
// should update this when they add or rename top-level sections.
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

const BADGE_BASE: React.CSSProperties = {
  display: 'inline-block',
  fontSize: '0.7em',
  fontWeight: 700,
  letterSpacing: '0.04em',
  padding: '0.05rem 0.4rem',
  borderRadius: '0.2rem',
  textTransform: 'uppercase',
  verticalAlign: 'middle',
};

const BADGES: Record<ChangeType, { label: string; style: React.CSSProperties }> = {
  new: {
    label: 'New',
    style: {
      ...BADGE_BASE,
      background: 'rgba(34, 197, 94, 0.18)',
      color: 'rgb(22, 163, 74)',
      border: '1px solid rgba(34, 197, 94, 0.45)',
    },
  },
  updated: {
    label: 'Updated',
    style: {
      ...BADGE_BASE,
      background: 'rgba(59, 130, 246, 0.16)',
      color: 'rgb(37, 99, 235)',
      border: '1px solid rgba(59, 130, 246, 0.4)',
    },
  },
  removed: {
    label: 'Removed',
    style: {
      ...BADGE_BASE,
      background: 'rgba(239, 68, 68, 0.14)',
      color: 'rgb(220, 38, 38)',
      border: '1px solid rgba(239, 68, 68, 0.4)',
    },
  },
};

// One changelog row. Shared shape with the Changelog page so the home-page
// widget is visually identical to the top of the full log. Removed pages and
// historical events for pages that no longer exist render without a link.
export function ChangeRow({ event }: { event: ChangeEvent }) {
  const badge = BADGES[event.type];
  const linkable = event.type !== 'removed' && event.routePath;
  const titleNode = linkable ? (
    <Link to={event.routePath}>
      <strong>{event.title}</strong>
    </Link>
  ) : (
    <strong
      style={
        event.type === 'removed'
          ? { textDecoration: 'line-through', opacity: 0.7 }
          : undefined
      }
    >
      {event.title}
    </strong>
  );

  return (
    <li style={{ marginBottom: '0.5rem', lineHeight: 1.55 }}>
      <span style={badge.style}>{badge.label}</span>{' '}
      <code
        style={{
          fontSize: '0.85em',
          opacity: 0.7,
          padding: '0 0.25rem',
          background: 'transparent',
          border: 'none',
        }}
      >
        {isoDay(event.date)}
      </code>{' '}
      <span style={{ opacity: 0.6, fontSize: '0.85em' }}>
        ({sectionLabel(event.section)})
      </span>{' '}
      {titleNode}
      {event.description && (
        <>
          :{' '}
          <span style={{ opacity: 0.85 }}>
            {renderDescription(event.description)}
          </span>
        </>
      )}
    </li>
  );
}

export function useChangeEvents(): ChangeEvent[] {
  const globalData = useGlobalData() as
    | Record<string, Record<string, unknown>>
    | undefined;
  const data = globalData?.['creation-date-plugin']?.default as
    | CreationDatePluginContent
    | undefined;
  return data?.changeEvents ?? [];
}

interface Props {
  limit?: number;
}

export default function ChangelogWidget({ limit = 7 }: Props) {
  const events = useChangeEvents();
  if (events.length === 0) {
    return null;
  }

  const top = events.slice(0, limit);

  return (
    <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
      {top.map((e) => (
        <ChangeRow key={e.id} event={e} />
      ))}
    </ul>
  );
}
