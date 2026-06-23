export const defaultLang = 'ro';

export const ui = {
  ro: {
    'nav.home': 'Pagina principală',
    'nav.catalog': 'Catalog',
    'nav.onboarding': 'Onboarding',
    'nav.mentors': 'Mentori',
    'nav.resources': 'Resurse',
    'nav.getInvolved': 'Implică-te',

    // Footer
    'footer.rights': 'Academia peViitor. Toate drepturile rezervate.',
    'footer.description':
      'Academia peViitor © 2026 Dedicați excelenței academice și accesibilității universale în educație.',
    'footer.contact': 'Contactează-ne',
    'footer.links': 'Linkuri utile',

    //  Mentori
    'mentors.title': 'Mentorii Noștri',
    'mentors.description':
      'Aici vei găsi lista mentorilor dedicați care te vor ajuta să îți dezvolți abilitățile și să îți atingi obiectivele.',
  },
  en: {
    'nav.home': 'Home',
    'nav.catalog': 'Catalog',
    'nav.onboarding': 'Onboarding',
    'nav.mentors': 'Mentors',
    'nav.resources': 'Resources',
    'nav.getInvolved': 'Get Involved',

    // Footer
    'footer.rights': 'peViitor Academy. All rights reserved.',
    'footer.description':
      'peViitor Academy © 2026 Dedicated to academic excellence and universal accessibility in education.',
    'footer.contact': 'Contact us',
    'footer.links': 'Usefull links',

    //  Mentors
    'mentors.title': 'Our Mentors',
    'mentors.description':
      'Here you will find the list of dedicated mentors who will help you develop your skills and reach your goals.',
  },
} as const;

export const routes = {
  ro: {
    home: '',
    catalog: 'catalog',
    onboarding: 'onboarding',
    mentors: 'mentori',
    resources: 'resurse',
    'get-involved': 'implica-te',
  },
  en: {
    home: '',
    catalog: 'catalog',
    onboarding: 'onboarding',
    mentors: 'mentors',
    resources: 'resources',
    'get-involved': 'get-involved',
  },
} as const;
