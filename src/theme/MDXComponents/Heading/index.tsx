import React, { type ReactNode } from 'react';
// @theme-original: this lives in the site's own src/theme, which shadows theme-classic.
import MDXHeading from '@theme-original/MDXComponents/Heading';
import type HeadingType from '@theme/MDXComponents/Heading';
import type { WrapperProps } from '@docusaurus/types';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocMetaRow, { useDocMetaPlacement } from '@theme/DocMetaRow';

type Props = WrapperProps<typeof HeadingType>;

/** The heading's text, the way Docusaurus's remark plugin read it for contentTitle. */
export function headingText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(headingText).join('');
  if (React.isValidElement<{ children?: ReactNode }>(node)) return headingText(node.props.children);
  return '';
}

const collapse = (s: string) => s.replace(/\s+/g, ' ').trim();

// A page that writes its own `# Title` gets the meta row from here, after that
// H1. It is the FIRST h1 that is the title: matched by text against the
// contentTitle Docusaurus extracted, which is rerender-safe where a "first
// seen" flag is not.
export default function HeadingWrapper(props: Props): ReactNode {
  const placement = useDocMetaPlacement();
  if (props.as !== 'h1' || placement !== 'after-content-h1') return <MDXHeading {...props} />;
  return <DocH1 {...props} />;
}

// Its own component so useDoc() only ever runs inside a doc: the placement
// context is provided by DocItem/Content and nowhere else, and an MDX page
// under src/pages has no DocProvider to read from.
function DocH1(props: Props): ReactNode {
  const { contentTitle } = useDoc();
  const isTitle =
    typeof contentTitle === 'string' && collapse(headingText(props.children)) === collapse(contentTitle);
  if (!isTitle) return <MDXHeading {...props} />;
  return (
    <>
      <MDXHeading {...props} />
      <DocMetaRow />
    </>
  );
}
