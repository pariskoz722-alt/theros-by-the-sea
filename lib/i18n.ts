export type Lang = 'el' | 'en'

type B = { el: string; en: string }
const b = (el: string, en: string): B => ({ el, en })
export const tr = (obj: B, lang: Lang) => obj[lang]

export const copy = {
  nav: {},
  hero: {
    eyebrow: b('Ανάβυσσος · Αττική', 'Anavissos · Attica'),
    sub:     b('Γεύσεις, ατμόσφαιρα και ήλιος δίπλα στη θάλασσα', 'Flavours, atmosphere and sunshine by the sea'),
    cta1:    b('Τηλεφωνήστε μας', 'Call Us'),
    cta2:    b('Δείτε μας', 'Explore'),
  },
  about: {
    label:    b('Σχετικά', 'About'),
    title1:   b('Ένα μέρος', 'A place'),
    title2:   b('που ', 'that '),
    titleEm:  b('νιώθεις', 'feels like'),
    title3:   b(' το καλοκαίρι', ' summer'),
    p1: b(
      'Το Theros By The Sea είναι μια εμπειρία πέρα από ένα απλό γεύμα. Ζεστά χρώματα, rattan φωτιστικά και ξύλινες λεπτομέρειες δημιουργούν μια ατμόσφαιρα που σε ταξιδεύει από την πρώτη στιγμή.',
      'Theros By The Sea is an experience beyond a simple meal. Warm colours, rattan lights and wooden details create an atmosphere that transports you from the very first moment.'
    ),
    p2: b(
      'Κάθε λεπτομέρεια του χώρου έχει σχεδιαστεί για να φέρνει κοντά τους ανθρώπους — από τον παραθαλάσσιο lounge χώρο μέχρι το bar με άρωμα καλοκαιριού.',
      'Every detail of the space has been designed to bring people together — from the beachside lounge area to the bar with its summer fragrance.'
    ),
    stat1: b('Βαθμολογία Google', 'Google Rating'),
    stat2: b('Κριτικές', 'Reviews'),
    stat3: b('Ανά άτομο', 'Per person'),
    cta:   b('Τηλεφωνήστε μας', 'Call us'),
  },
  quote: {
    text: b('Κάθε γεύμα, μια ανάμνηση καλοκαιριού.', 'Every meal, a summer memory.'),
  },
  gallery: {
    label:   b('Gallery', 'Gallery'),
    title1:  b('Αφήστε τις ', 'Let the '),
    titleEm: b('εικόνες', 'images'),
    title2:  b('\nνα μιλήσουν', '\nspeak for themselves'),
  },
  reviews: {
    label:   b('Google Reviews', 'Google Reviews'),
    title1:  b('Τι λένε οι ', 'What our '),
    titleEm: b('επισκέπτες', 'guests'),
    title2:  b('', ' say'),
  },
  info: {
    label:   b('Επισκεφθείτε μας', 'Visit Us'),
    hours:   b('Ώρες', 'Hours'),
    days:    b('Δευτέρα – Κυριακή', 'Monday – Sunday'),
    address: b('Διεύθυνση', 'Address'),
    phone:   b('Τηλέφωνο', 'Phone'),
  },
  cta: {
    label:   b('Επικοινωνήστε μαζί μας', 'Get in touch'),
    title1:  b('Σας περιμένουμε', 'We look forward'),
    titleEm: b('δίπλα στη θάλασσα', 'to seeing you by the sea'),
  },
  footer: {
    privacy:  b('Πολιτική Απορρήτου', 'Privacy Policy'),
    terms:    b('Όροι Χρήσης', 'Terms of Use'),
    tagline:  b('Δίπλα στη θάλασσα, Ανάβυσσος', 'By the sea, Anavissos'),
    follow:   b('Ακολουθήστε μας', 'Follow us'),
  },
}
