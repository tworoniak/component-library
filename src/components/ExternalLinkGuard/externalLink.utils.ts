export function openLink(href: string, target?: string, rel?: string) {
  const a = document.createElement('a');
  a.href = href;
  if (target) a.target = target;

  // Security: ensure noopener/noreferrer for new tabs/windows
  a.rel = rel ?? (target === '_blank' ? 'noopener noreferrer' : '');

  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function isExternalUrl(href: string) {
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return true;

  try {
    const url = new URL(href, window.location.href);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}
