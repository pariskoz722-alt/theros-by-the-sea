-- ============================================================
-- Theros By The Sea — Supabase Schema
-- Εκτέλεσε αυτό το αρχείο στο Supabase SQL Editor
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ── TABLES ────────────────────────────────────────────────

create table if not exists reservations (
  id           uuid default gen_random_uuid() primary key,
  name         text not null,
  phone        text not null,
  email        text,
  date         date not null,
  time_slot    text not null,
  guests       integer not null check (guests between 1 and 20),
  notes        text,
  status       text not null default 'pending'
               check (status in ('pending', 'confirmed', 'cancelled')),
  created_at   timestamptz default now()
);

create table if not exists gallery_images (
  id             uuid default gen_random_uuid() primary key,
  url            text not null,
  storage_path   text,
  alt_el         text default '',
  alt_en         text default '',
  display_order  integer default 0,
  visible        boolean default true,
  created_at     timestamptz default now()
);

create table if not exists reviews (
  id             uuid default gen_random_uuid() primary key,
  text_el        text not null,
  text_en        text,
  author         text not null,
  stars          integer default 5 check (stars between 1 and 5),
  visible        boolean default true,
  display_order  integer default 0,
  created_at     timestamptz default now()
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────

alter table reservations  enable row level security;
alter table gallery_images enable row level security;
alter table reviews        enable row level security;

-- Reservations: public can insert, admin can do everything
create policy "public_insert_reservations" on reservations
  for insert to anon with check (true);

create policy "admin_all_reservations" on reservations
  for all to authenticated using (true) with check (true);

-- Gallery: public reads visible, admin does everything
create policy "public_read_gallery" on gallery_images
  for select to anon using (visible = true);

create policy "admin_all_gallery" on gallery_images
  for all to authenticated using (true) with check (true);

-- Reviews: public reads visible, admin does everything
create policy "public_read_reviews" on reviews
  for select to anon using (visible = true);

create policy "admin_all_reviews" on reviews
  for all to authenticated using (true) with check (true);

-- ── INITIAL REVIEWS DATA ──────────────────────────────────

insert into reviews (text_el, text_en, author, stars, display_order) values
  ('Απολύτως καταπληκτικό! Αν θέλεις να περάσεις μια cozy, κλασσική στιγμή με υπέροχη ατμόσφαιρα, αυτή είναι η διεύθυνση. Ο χώρος είναι ξεχωριστός, οι άνθρωποι φιλικοί.',
   'Absolutely amazing! If you want to spend a cozy, classy moment in a great vibe, this is the absolute address to visit.',
   'Adel Ghezri', 5, 0),
  ('Το Theros by the Sea είναι ένα απόλυτο διαμάντι. Τα dumplings ξεχώρισαν, το tartare ήταν σχεδόν άψογο, και η μπριζόλα ήταν στο medium — σπανιότητα στην Ελλάδα.',
   'Theros by the Sea is an absolute gem. The dumplings were a standout, the tartare was nearly flawless, and the ribeye was grilled exactly to medium.',
   'Evangelina Exarhoulias-Lampsas', 5, 1),
  ('Πολύ ωραίο μέρος — εκπληκτική επιλογή κρασιών, εξαιρετικές πίτσες. Εντυπωσιαστήκαμε και σίγουρα θα ξανάρθουμε.',
   'Very nice place — amazing selection of wines, very good pizza menu. We will definitely come back.',
   'Peter Diseris', 5, 2),
  ('Η ποιότητα φαγητού και εξυπηρέτησης ήταν πραγματικά εξαιρετική! Υπέροχο μέρος για πρωινό, μεσημεριανό και βραδινό.',
   'The food and service quality was truly exceptional! An amazing place for breakfast, lunch and dinner.',
   'A.M – S.Y.K', 5, 3),
  ('Έχοντας περάσει ολόκληρη την καριέρα μου στη φιλοξενία, μπορώ με σιγουριά να συστήσω αυτό το μέρος. Φιλικό προσωπικό, ποικίλο μενού.',
   'Having spent my entire career in hospitality, I can confidently recommend this place. The staff were incredibly friendly.',
   'Barry O''Neill', 5, 4),
  ('Εκπληκτικός καφές! Ίσως ο καλύτερος στην περιοχή. Φιλικό προσωπικό και νόστιμο μεσογειακό φαγητό και πίτσα.',
   'Amazing coffee! If not the best in the region. Friendly staff and delicious Mediterranean food and pizza.',
   'Marc Wagner', 5, 5),
  ('Συστήνω ανεπιφύλακτα αυτό το εστιατόριο. Η ποιότητα είναι σταθερά εξαιρετική και το προσωπικό επαγγελματικό.',
   'I highly recommend this restaurant. The product quality is consistently outstanding.',
   'Gillian Martin', 5, 6),
  ('Cozy χώρος, ωραία μουσική, live μουσική σε ειδικές περιστάσεις, ευγενική εξυπηρέτηση και υπέροχη θέα στη θάλασσα.',
   'Cozy place, nice music on the decks, live music on special occasions, kind service with a beautiful view to the sea.',
   'Χρήστος Κοπανάρης', 5, 7),
  ('Εξαιρετικό κατάστημα με καλή εξυπηρέτηση, πολλές επιλογές σε cocktails, snacks και ποιοτικό καφέ. Ο εξωτερικός χώρος υπέροχος!',
   'Excellent with good service and several choices of cocktails, snacks and quality coffee. The outside area is very beautiful!',
   'Κωνσταντίνος Βαστάκης', 5, 8),
  ('Υπέροχη ανακάλυψη! Ο χώρος, chic και ζεστός, προσφέρει ευχάριστη ατμόσφαιρα. Η πίτσα είναι νόστιμη με καλοφτιαγμένη ιταλική ζύμη.',
   'A great find! The setting, both chic and cozy, offers a pleasant atmosphere. The pizza is delicious with a well-crafted Italian-style dough.',
   'Amaria Oudjdi', 5, 9);

-- ── STORAGE BUCKET ────────────────────────────────────────
-- Εκτέλεσε αυτό χειροκίνητα στο Supabase Dashboard:
-- Storage → New bucket → Name: "gallery" → Public: ON
--
-- Ή μέσω SQL (αν έχεις πρόσβαση στο storage schema):
-- insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true);
--
-- Storage Policy για public read:
-- create policy "public_read_gallery_storage" on storage.objects
--   for select to anon using (bucket_id = 'gallery');
--
-- create policy "admin_upload_gallery_storage" on storage.objects
--   for insert to authenticated with check (bucket_id = 'gallery');
--
-- create policy "admin_delete_gallery_storage" on storage.objects
--   for delete to authenticated using (bucket_id = 'gallery');
