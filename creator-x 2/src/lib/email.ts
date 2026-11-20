import { createElement, Fragment, type ReactNode } from 'react';

/**
 * Exibe um e-mail permitindo quebra de linha só logo após o "@"
 * (evita cortes como "gmail.co / m" em telas pequenas).
 */
export function renderEmail(email: string): ReactNode {
  const at = email.indexOf('@');
  if (at < 0) return email;
  return createElement(Fragment, null, email.slice(0, at + 1), createElement('wbr'), email.slice(at + 1));
}
