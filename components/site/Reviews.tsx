'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Review } from '@/lib/types'
import { useLang } from './LanguageContext'
import { copy, tr } from '@/lib/i18n'

const FALLBACK_REVIEWS = {
  en: [
    { text: "Absolutely amazing! If you want to spend a cozy, classy moment in a great vibe, this is the absolute address to visit.", author: "Adel Ghezri" },
    { text: "Theros by the Sea is an absolute gem. The dumplings were a standout, the tartare was nearly flawless, and the ribeye was grilled exactly to medium — a rarity in Greece.", author: "Evangelina Exarhoulias-Lampsas" },
    { text: "Very nice place — amazing selection of wines, very good pizza menu. We were very pleasantly surprised with the level of the pizza.", author: "Peter Diseris" },
    { text: "The food and service quality was truly exceptional! An amazing place for breakfast, lunch and dinner.", author: "A.M – S.Y.K" },
    { text: "Having spent my entire career in hospitality, I can confidently recommend this place. The staff were incredibly friendly, the menu diverse.", author: "Barry O'Neill" },
    { text: "Amazing coffee! If not the best in the region. Friendly staff and delicious Mediterranean food and pizza.", author: "Marc Wagner" },
    { text: "I highly recommend this restaurant. The product quality is consistently outstanding.", author: "Gillian Martin" },
    { text: "Cozy place, nice music on the decks, live music on special occasions, kind service with a beautiful view to the sea.", author: "Christos Copanaris" },
    { text: "Excellent with good service and several choices of cocktails, snacks and quality coffee. The outside area is very beautiful!", author: "Κωνσταντίνος Βαστάκης" },
    { text: "A great find! The setting, both chic and cozy, offers a pleasant atmosphere. The pizza is delicious.", author: "Amaria Oudjdi" },
  ],
  el: [
    { text: "Απολύτως καταπληκτικό! Αν θέλεις να περάσεις μια cozy, κλασσική στιγμή με υπέροχη ατμόσφαιρα, αυτή είναι η διεύθυνση.", author: "Adel Ghezri" },
    { text: "Το Theros by the Sea είναι ένα απόλυτο διαμάντι. Τα dumplings ξεχώρισαν, το tartare ήταν σχεδόν άψογο, και η μπριζόλα ήταν στο medium.", author: "Evangelina Exarhoulias-Lampsas" },
    { text: "Πολύ ωραίο μέρος — εκπληκτική επιλογή κρασιών και εξαιρετικές πίτσες. Σίγουρα θα ξανάρθουμε.", author: "Peter Diseris" },
    { text: "Η ποιότητα φαγητού και εξυπηρέτησης ήταν πραγματικά εξαιρετική! Το συστήνω ανεπιφύλακτα.", author: "A.M – S.Y.K" },
    { text: "Έχοντας περάσει ολόκληρη την καριέρα μου στη φιλοξενία, μπορώ με σιγουριά να συστήσω αυτό το μέρος.", author: "Barry O'Neill" },
    { text: "Εκπληκτικός καφές! Ίσως ο καλύτερος στην περιοχή. Φιλικό προσωπικό και νόστιμο μεσογειακό φαγητό.", author: "Marc Wagner" },
    { text: "Συστήνω ανεπιφύλακτα αυτό το εστιατόριο. Η ποιότητα είναι σταθερά εξαιρετική.", author: "Gillian Martin" },
    { text: "Cozy χώρος, ωραία μουσική, live μουσική σε ειδικές περιστάσεις, ευγενική εξυπηρέτηση και υπέροχη θέα.", author: "Χρήστος Κοπανάρης" },
    { text: "Εξαιρετικό κατάστημα με καλή εξυπηρέτηση, πολλές επιλογές σε cocktails και ποιοτικό καφέ.", author: "Κωνσταντίνος Βαστάκης" },
    { text: "Υπέροχη ανακάλυψη! Ο χώρος, chic και ζεστός, προσφέρει ευχάριστη ατμόσφαιρα. Η πίτσα είναι νόστιμη.", author: "Amaria Oudjdi" },
  ],
}

export default function Reviews() {
  const { lang } = useLang()
  const [dbReviews, setDbReviews] = useState<Review[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('reviews')
      .select('*')
      .eq('visible', true)
      .order('display_order')
      .then(({ data }) => { if (data?.length) setDbReviews(data) })
  }, [])

  const items = dbReviews.length > 0
    ? dbReviews.map(r => ({ text: lang === 'el' ? r.text_el : (r.text_en || r.text_el), author: r.author }))
    : FALLBACK_REVIEWS[lang]

  const doubled = [...items, ...items]

  return (
    <div id="reviews">
      <div className="reviews-header fade-up">
        <p className="section-label">{tr(copy.reviews.label, lang)}</p>
        <h2 className="section-title">
          {tr(copy.reviews.title1, lang)}<em>{tr(copy.reviews.titleEm, lang)}</em>{tr(copy.reviews.title2, lang)}
        </h2>
      </div>
      <div className="reviews-track-wrap">
        <div className="reviews-track" key={lang}>
          {doubled.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">&ldquo;{r.text}&rdquo;</p>
              <div className="review-author">— {r.author}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
