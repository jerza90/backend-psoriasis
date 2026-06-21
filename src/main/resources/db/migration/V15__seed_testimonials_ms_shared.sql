-- Backfill Malay-language community success stories.
-- The Malay landing page fetches lang=ms, so these rows make Razak, Siti, Mei Ling, and Hafiz visible there too.

-- MS: Razak
INSERT INTO testimonials (id, name, location, condition_duration, categories, summary, initial_quote, result_quote, featured, avatar_url, lang, sort_order, status, created_at, updated_at)
VALUES (7, 'Razak', 'Penang', '12 tahun',
  '["Plaque Psoriasis"]',
  'Plak besar pada siku dan lutut berkurang 80% selepas fokus pada kesihatan usus dan suplemen omega-3.',
  'Saya sudah lama tak pakai baju lengan pendek. Orang suka memandang.',
  'Minggu lepas saya pakai t-shirt ke pasar. Isteri saya menangis.',
  true, 'https://i.pravatar.cc/150?u=razak@psoriasis', 'ms', 2, 'active', NOW(), NOW());

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(7, 'Nov 2025', 'Penilaian awal',
  'Plak tebal berwarna keperakan pada kedua-dua siku (8cm) dan lutut (6cm). Gatal sederhana. Pesakit pernah cuba steroid topikal dengan kelegaan sementara.',
  'Plak jelas kelihatan dengan ketebalan yang ketara. Tindak balas terhadap rawatan terdahulu sangat terhad.',
  '["Ambil gambar plak setiap minggu untuk jejak perubahan","Lembapkan kulit terus selepas mandi","Elakkan sabun keras pada kawasan terjejas"]',
  '[]', '[]', 1);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(7, 'Dis 2025', 'Penyesuaian pemakanan',
  'Mengurangkan makanan diproses dan menambah makanan kaya omega-3. Mula ambil minyak ikan 2000mg setiap hari. Ketebalan plak berkurang 30% dalam 4 minggu.',
  'Pesakit melaporkan kurang kemerahan. Plak terasa kurang timbul.',
  '["Omega-3 biasanya ambil 4-8 minggu untuk nampak kesan","Kurangkan makanan bergoreng dan lemak trans","Minum air secukupnya — kulit perlukan kelembapan dari dalam"]',
  '[]', '[]', 2);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(7, 'Feb 2026', 'Fokus kesihatan usus',
  'Tambah probiotik dan L-glutamine. Saiz plak berkurang 60%. Gatal hampir tiada. Pesakit melaporkan penghadaman dan tenaga lebih baik.',
  'Peningkatan ketara selari dengan intervensi kesihatan usus.',
  '["Probiotik lebih baik diambil semasa perut kosong","L-glutamine sebelum tidur untuk sokong pemulihan usus","Pantau penghadaman bersama kulit — kedua-duanya saling berkait"]',
  '[]', '[]', 3);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(7, 'Apr 2026', 'Terus bertambah baik',
  'Plak berkurang 80%. Tinggal tompok kecil tanpa sisik. Pesakit kembali memakai lengan pendek dan berenang.',
  'Ini hasil terbaik yang pernah dicapai pesakit dalam 12 tahun. Penjagaan susulan masih diteruskan.',
  '["Teruskan omega-3 walaupun kulit sudah bersih","Ada pelan untuk pencetus flare seperti stres, perjalanan, atau sakit","Sertai kumpulan sokongan — kesihatan mental juga penting"]',
  '[]', '[]', 4);

-- MS: Siti
INSERT INTO testimonials (id, name, location, condition_duration, categories, summary, initial_quote, result_quote, featured, avatar_url, lang, sort_order, status, created_at, updated_at)
VALUES (8, 'Siti', 'Johor Bahru', '3 tahun',
  '["Guttate Psoriasis"]',
  'Lesi kecil seperti titisan pada badan pulih dalam 3 bulan selepas kenal pasti pencetus strep dan sokong pemulihan imun.',
  'Bintik merah kecil asyik muncul. Saya takut ia akan merebak.',
  'Kulit saya kini 90% jelas. Saya tahu apa perlu dibuat bila bintik mula muncul.',
  false, 'https://i.pravatar.cc/150?u=siti@psoriasis', 'ms', 3, 'active', NOW(), NOW());

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(8, 'Jan 2026', 'Penilaian wabak',
  'Muncul papul merah kecil pada badan dan lengan atas selepas jangkitan tekak. Lebih 40 lesi dikira.',
  'Corak guttate klasik selepas jangkitan streptokokus. Kebimbangan kerana ia merebak sangat tinggi.',
  '["Semak jika ada sakit tekak atau demam baru-baru ini","Jangan panik — guttate selalunya respons baik","Cukupkan rehat untuk sokong pemulihan imun"]',
  '[]', '[]', 1);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(8, 'Feb 2026', 'Sokongan imun',
  'Fokus pada rehat, hidrasi, dan suplemen zink. Lesi berhenti merebak pada minggu ke-2. Pudar bermula pada minggu ke-4.',
  'Tiada lesi baru muncul. Lesi lama bertukar dari merah ke merah jambu.',
  '["Ambil zink bersama makanan untuk elak loya","Vitamin C membantu fungsi imun","Elakkan senaman berat sehingga keadaan stabil"]',
  '[]', '[]', 2);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(8, 'Mac 2026', 'Fasa pulih',
  '80% lesi hilang sepenuhnya. Tinggal hiperpigmentasi ringan yang semakin pudar. Pesakit rasa lebih lega.',
  'Respons sangat baik. Pesakit lebih yakin tentang kemungkinan flare pada masa depan.',
  '["Guna sunscreen pada bahagian yang sedang pulih untuk elak kesan gelap","Eksfoliasi lembut boleh membantu bila kulit sudah rata","Catat pencetus untuk rujukan akan datang"]',
  '[]', '[]', 3);

-- MS: Mei Ling
INSERT INTO testimonials (id, name, location, condition_duration, categories, summary, initial_quote, result_quote, featured, avatar_url, lang, sort_order, status, created_at, updated_at)
VALUES (9, 'Mei Ling', 'Ipoh', '20+ tahun',
  '["Chronic Plaque"]',
  'Psoriasis teruk jangka panjang pada 40% badan mendapat kelegaan melalui rutin konsisten, kurang stres, dan suplemen terpilih.',
  'Saya sudah cuba semuanya. Herba, krim, suntikan. Tiada yang beri kelegaan kekal.',
  'Saya masih ada psoriasis, tapi ia tidak lagi mengawal hidup saya. Itu pun sudah cukup.',
  true, 'https://i.pravatar.cc/150?u=mei.ling@psoriasis', 'ms', 4, 'active', NOW(), NOW());

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(9, 'Dis 2025', 'Semakan menyeluruh',
  'Plak meluas pada kaki, tangan, badan, dan kulit kepala meliputi kira-kira 40% permukaan badan. Banyak rawatan sebelum ini hanya memberi respons separa.',
  'Keletihan dan mood rendah dikesan. Ada trauma daripada rawatan yang tidak berkesan.',
  '["Tetapkan jangkaan yang realistik — kes kronik perlukan sabar","Sokong kesihatan mental bersama kesihatan kulit","Cari seorang doktor yang mendengar dan kekal dengannya"]',
  '[]', '[]', 1);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(9, 'Feb 2026', 'Rutin asas',
  'Rutin kulit yang lembut dibina, magnesium untuk tidur, dan vitamin D dimulakan. Kelegaan sederhana pada kulit dan tidur lebih baik.',
  'Kulit kurang reaktif. Pesakit tidur lebih lena dan mood bertambah baik.',
  '["Ambil magnesium glycinate sebelum tidur untuk bantu rehat","Sebaiknya buat ujian vitamin D dahulu","Konsistensi rutin lebih penting daripada jenama produk"]',
  '[]', '[]', 2);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(9, 'Apr 2026', 'Kerja stres',
  'Sertai kumpulan sokongan mingguan. Mula yoga ringan. Ketebalan plak berkurang dengan ketara. Pesakit rasa ada harapan semula.',
  'Peningkatan emosi sama penting dengan peningkatan fizikal.',
  '["Sokongan komuniti sangat bernilai — cari orang yang faham","Pergerakan ringan bantu stres dan peredaran","Raikan perubahan kecil, bukan hanya kesembuhan penuh"]',
  '[]', '[]', 3);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(9, 'Jun 2026', 'Pengurusan mampan',
  'Liputan berkurang kepada kira-kira 20%. Plak lebih nipis, kurang merah. Pesakit mengekalkan rutin tanpa rasa terbeban.',
  'Pesakit menggambarkan dirinya kini lebih "mengawal" keadaan berbanding sebelum ini.',
  '["Pengurusan jangka panjang lebih baik daripada jalan pintas","Kongsi kisah anda — ia bantu orang lain dan menguatkan diri anda sendiri"]',
  '[]', '[]', 4);

-- MS: Hafiz
INSERT INTO testimonials (id, name, location, condition_duration, categories, summary, initial_quote, result_quote, featured, avatar_url, lang, sort_order, status, created_at, updated_at)
VALUES (10, 'Hafiz', 'Shah Alam', '2 tahun',
  '["Scalp & Face"]',
  'Psoriasis pada kulit kepala dan muka berkurang 85% selepas buang makanan pencetus dan guna rutin penjagaan kulit yang disasarkan.',
  'Saya tak boleh cukur atau simpan janggut. Kepingan pada muka memalukan.',
  'Saya bercukur buat pertama kali dalam 2 tahun. Tukang gunting pun tak perasan apa-apa.',
  true, 'https://i.pravatar.cc/150?u=hafiz@psoriasis', 'ms', 5, 'active', NOW(), NOW());

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(10, 'Mac 2026', 'Konsultasi awal',
  'Psoriasis pada kulit kepala, garis rambut, kening, dan kawasan janggut. Kemerahan, menggelupas, dan gatal. Mengelak bercukur dan situasi sosial.',
  'Psoriasis muka memberi kesan emosi yang besar. Pesakit menjadi lebih tertutup.',
  '["Kulit muka lebih nipis — guna produk yang sangat lembut","Uji produk baru pada kawasan kecil dahulu","Penjagaan janggut perlu berhati-hati — elakkan alat yang kasar"]',
  '[]', '[]', 1);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(10, 'Apr 2026', 'Kenal pasti pencetus',
  'Buang susu dan makanan pedas selama 3 minggu. Kemerahan muka berkurang 50%. Kulit kepala masih ada flare tetapi lebih ringan.',
  'Produk tenusu nampak seperti pencetus utama. Pesakit sanggup meneruskan eliminasi.',
  '["Cuba eliminasi sekurang-kurangnya 3 minggu","Buat diari makanan-kulit untuk kesan corak","Masukkan semula satu makanan pada satu masa untuk sahkan"]',
  '[]', '[]', 2);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(10, 'Mei 2026', 'Rutin penjagaan kulit',
  'Memperkenalkan pencuci lembut, pelembap tanpa pewangi, dan krim berasaskan zink untuk muka. Sampo coal tar digunakan 2x seminggu.',
  'Kulit muka banyak bertambah baik. Pesakit mula lebih yakin bersosial.',
  '["Untuk psoriasis muka, kurang itu lebih baik","Krim zink boleh menenangkan tompok merah","Elakkan krim steroid pada muka untuk jangka panjang"]',
  '[]', '[]', 3);
