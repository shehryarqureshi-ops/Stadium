/* Absolute http(s) URLs leave the site → open in a new tab. Spread onto <a>. */
export const isExternalHref = (href?: string) => !!href && /^https?:\/\//i.test(href);

export const externalLinkProps = (href?: string) =>
  isExternalHref(href) ? ({ target: "_blank", rel: "noopener noreferrer" } as const) : {};
