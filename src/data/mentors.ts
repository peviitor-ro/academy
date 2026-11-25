/**
 * Lista mentorilor afisata pe pagina Mentori.
 * Se completeaza doar cu persoane care si-au dat acordul sa apara public.
 * Adauga un obiect nou in lista; pagina il afiseaza singura, impreuna cu filtrul pe etichete.
 */
export interface Mentor {
  name: string;
  /** Rolul sau domeniul, ex. „Frontend”. */
  role: string;
  /** Doua-trei propozitii despre ce poate ajuta. */
  bio: string;
  /** Etichete folosite si pentru filtrare, ex. ['React', 'Accesibilitate']. */
  tags: string[];
  /** Link public optional (LinkedIn, GitHub). */
  url?: string;
}

export const mentors: Mentor[] = [];
