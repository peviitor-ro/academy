import { ui, routes, defaultLang } from './ui';

export function getLangFromURL(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) {
    return lang as keyof typeof ui;
  }
  return defaultLang;
}

export function useTranslation(lang: keyof typeof ui) {
  return function translate(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function TranslatePath(path: keyof typeof routes.ro) {
    const route = routes[lang][path];
    return lang === 'ro' ? `/${route}` : `/en/${route}`;
  };
}

export function getRouteFromPath(pathname: string) {
  const cleanPath = pathname.replace(/^\/en/, '').replace(/^\//, '').replace(/\/$/, '');

  const keys = Object.keys(routes.ro) as Array<keyof typeof routes.ro>;
  for (const key of keys) {
    if (routes.ro[key] === cleanPath || routes.en[key] === cleanPath) {
      return key;
    }
  }

  return 'home';
}
