import type { MDXComponents } from 'mdx/types'

import {
  A,
  Blockquote,
  Code,
  H2,
  H3,
  H4,
  HR,
  LI,
  OL,
  P,
  Strong,
  Table,
  TD,
  TH,
  UL,
} from './app/components/page/mdx'

/* Markdown → Stadium static-page typography. Only the StaticPage template
   consumes MDX today (app/components/page/StaticPage.tsx). */
const components: MDXComponents = {
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  strong: Strong,
  a: A,
  blockquote: Blockquote,
  hr: HR,
  table: Table,
  th: TH,
  td: TD,
  code: Code,
}

export function useMDXComponents(): MDXComponents {
  return components
}
