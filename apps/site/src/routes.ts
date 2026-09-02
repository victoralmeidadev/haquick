export type Route = 'home' | 'docs';

export type AppLocation = { route: Route; section?: string; anchor?: string };

export function readRoute(): AppLocation {
  const partes = window.location.hash.replace(/^#\/?/, '').split('/');
  if (partes[0] !== 'docs') return { route: 'home' };
  return { route: 'docs', section: partes[1] || undefined, anchor: partes[2] || undefined };
}

export function writeRoute({ route, section, anchor }: AppLocation) {
  if (route !== 'docs') {
    window.location.hash = '#/';
    return;
  }
  window.location.hash = `#/docs${section ? `/${section}` : ''}${anchor ? `/${anchor}` : ''}`;
}
