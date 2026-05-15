import React, {type ReactNode} from 'react';
import A from '@theme-original/MDXComponents/A';
import type AType from '@theme/MDXComponents/A';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof AType>;

export default function AWrapper(props: Props): ReactNode {
  const href = props.href || '';
  if (!href || href.startsWith('#')) {
    return <A {...props} />;
  }
  return <A {...props} target="_blank" rel="noopener noreferrer" />;
}
