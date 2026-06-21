-- EN: Acachiaa
INSERT INTO testimonials (id, name, location, condition_duration, categories, summary, initial_quote, result_quote, featured, avatar_url, lang, sort_order, status, created_at, updated_at)
VALUES (1, 'Acachiaa', 'Selangor', '13 years',
  '["Psoriasis","Nail Psoriasis","Guttate Psoriasis"]',
  'From 13 years of painful flare-ups to psoriasis-free skin — through the DND Diet Protocol, 100% natural, no steroids.',
  'I tried various treatments and methods, but all failed because I didn''t have enough knowledge or preparation.',
  'Now I am free from Psoriasis and have started enjoying the life I had long dreamed of.',
  true, '/images/acacahiaa.jpg', 'en', 1, 'active', NOW(), NOW());

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(1, 'Year 1–5', 'Beginning — Didn''t Know What Was Happening',
  'Psoriasis signs started appearing on the skin. Tried various over-the-counter treatments and steroid creams to relieve inflammation, but the condition returned every time I stopped using them.',
  'Didn''t have enough knowledge about psoriasis at this stage. Treatments only focused on symptoms, not the root cause.',
  '["Don''t rely on steroid creams as a long-term solution","Start learning about the link between diet and autoimmune diseases","Track daily flare-up patterns in a simple diary"]',
  '[]',
  '[{"name":"Steroid Cream","slug":"steroid-cream"}]',
  1);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(1, 'Year 6–10', 'Worst Phase — Flare-Ups & Hopelessness',
  'Psoriasis was at its worst. Pain, burning sensation on the skin, and constant flare-ups. Almost gave up. At the same time, gave birth to a third child who also had eczema and needed intensive care.',
  'Life stress and caring for a child with eczema worsened the psoriasis. Stress was the biggest trigger for flare-ups.',
  '["Control stress — it''s the biggest trigger for flare-ups","Find a community that understands autoimmune skin conditions","Don''t go through this journey alone"]',
  '[]',
  '[]',
  2);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(1, '2021 — Month 1', 'Turning Point — Discovered DND Diet Protocol',
  'Started understanding the connection between diet and autoimmune psoriasis. Decided to stop using steroid creams completely. Began dietary restrictions following the DND Diet Protocol by Dr. Noordin Darus.',
  'Knowledge is key — only after clearly understanding the relationship between diet and psoriasis did the healing process become easier and more directed.',
  '["Understand the knowledge first before starting any diet","Stop steroids gradually, not abruptly","Start the DND Diet Protocol with full commitment"]',
  '[]',
  '[{"name":"DND Diet Protokol","slug":"dnd-diet-protokol"},{"name":"Sacha Inchi Oil","slug":"sacha-inchi-oil"}]',
  3);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(1, '2021 — Month 2–3', 'Healing Crisis — The Most Challenging Phase',
  'Experienced a ''healing crisis'' — a phase where the body is detoxing and healing from within. Skin may look worse before getting better. Only used organic moisturizer to reduce discomfort.',
  'Healing crisis is a sign the body is responding and healing. Many give up at this stage — don''t stop.',
  '["Healing crisis is a positive sign — the body is healing","Only use organic moisturizer during this phase","Continue dietary restrictions even if skin looks worse"]',
  '[]',
  '[{"name":"Organic Moisturizer","slug":"organic-moisturizer"},{"name":"DND D3K2 Plus","slug":"dnd-d3k2-plus"}]',
  4);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(1, '2021 — Month 3–4', 'Progress — Skin Started Healing',
  'After 3–4 months of full dietary compliance with the DND Diet Protocol, skin showed significant changes. Inflammation reduced, flare-ups became less frequent, and sleep quality improved.',
  'Consistency is key. There is no shortcut in natural psoriasis healing.',
  '["Be patient — natural healing takes 90–120 days","Stay consistent with diet even without visible changes in the first week","Add DND Wellness supplements to speed up healing"]',
  '[]',
  '[{"name":"DND Diet Protokol","slug":"dnd-diet-protokol"},{"name":"Sacha Inchi Oil","slug":"sacha-inchi-oil"},{"name":"DND D3K2 Plus","slug":"dnd-d3k2-plus"}]',
  5);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(1, '2021 — Psoriasis Free', 'Finally Free — A New Life Begins',
  'Psoriasis healed completely. Now maintaining a healthy lifestyle with the DND Diet Protocol and DND Wellness supplements as a daily routine. Started sharing experiences and knowledge through the Acachiaa – Bebas Psoriasis platform.',
  'Now helping many other psoriasis and eczema patients through ebooks, blogs, and the Acachiaa community.',
  '["Maintain diet and healthy lifestyle even after healing","Share your knowledge — help others who are still struggling","Get the complete guide in the Bebas Psoriasis E-Book"]',
  '[]',
  '[{"name":"Bebas Psoriasis E-Book","slug":"ebook-bebas-psoriasis"},{"name":"DND Diet Protokol","slug":"dnd-diet-protokol"}]',
  6);

-- MS: Acachiaa
INSERT INTO testimonials (id, name, location, condition_duration, categories, summary, initial_quote, result_quote, featured, avatar_url, lang, sort_order, status, created_at, updated_at)
VALUES (2, 'Acachiaa', 'Selangor', '13 tahun',
  '["Psoriasis","Psoriasis Kuku","Guttate Psoriasis"]',
  'Dari kesakitan flare-up selama 13 tahun kepada kulit bebas psoriasis — melalui DND Diet Protokol, 100% alami, tanpa steroid.',
  'Saya telah mencuba pelbagai rawatan dan kaedah, namun semuanya gagal kerana tiada ilmu dan persediaan yang mencukupi.',
  'Kini saya bebas dari Psoriasis dan mula menikmati hidup yang telah lama saya impikan.',
  true, '/images/acacahiaa.jpg', 'ms', 1, 'active', NOW(), NOW());

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(2, 'Tahun 1–5', 'Awal Perjalanan — Tidak Tahu Apa Yang Berlaku',
  'Mula muncul tanda-tanda psoriasis pada kulit. Mencuba pelbagai rawatan over-the-counter dan krim steroid untuk melegakan keradangan, namun keadaan berulang semula setiap kali berhenti menggunakannya.',
  'Tiada ilmu yang cukup tentang psoriasis pada peringkat ini. Rawatan hanya berfokus pada simptom, bukan punca sebenar.',
  '["Jangan bergantung pada krim steroid sebagai penyelesaian jangka panjang","Mula cari ilmu tentang kaitan diet dan penyakit autoimmune","Catat corak flare-up harian dalam diari mudah"]',
  '[]',
  '[{"name":"Steroid Cream","slug":"steroid-cream"}]',
  1);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(2, 'Tahun 6–10', 'Fasa Paling Teruk — Flare-Up & Rasa Putus Asa',
  'Psoriasis berada pada tahap paling parah. Kesakitan, rasa terbakar pada kulit, dan flare-up yang berterusan. Pernah hampir menyerah. Pada masa yang sama, melahirkan anak ke-3 yang juga mengidap ekzema dan memerlukan penjagaan rapi.',
  'Tekanan hidup dan cabaran penjagaan anak dengan ekzema memburukkan lagi keadaan psoriasis. Stress adalah pencetus utama flare-up.',
  '["Kawal stress — ia adalah pencetus terbesar flare-up","Cari sokongan komuniti yang faham penyakit kulit autoimmune","Jangan biarkan diri berseorangan dalam perjalanan ini"]',
  '[]',
  '[]',
  2);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(2, '2021 — Bulan 1', 'Titik Perubahan — Jumpa DND Diet Protokol',
  'Mula memahami kaitan antara diet pemakanan dan penyakit autoimmune psoriasis. Nekad berhenti mengambil steroid cream sepenuhnya. Bermula berpantang makanan mengikut DND Diet Protokol oleh Dr. Noordin Darus.',
  'Kefahaman ilmu adalah kunci — hanya setelah faham dengan jelas hubungan diet dan psoriasis, barulah proses penyembuhan menjadi lebih mudah dan terarah.',
  '["Fahami dulu ilmu sebelum mulakan sebarang diet","Berhenti steroid secara terancang, bukan mengejut","Mulakan DND Diet Protokol dengan komitmen penuh"]',
  '[]',
  '[{"name":"DND Diet Protokol","slug":"dnd-diet-protokol"},{"name":"Sacha Inchi Oil","slug":"sacha-inchi-oil"}]',
  3);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(2, '2021 — Bulan 2–3', 'Healing Crisis — Fasa Paling Mencabar',
  'Mengalami "healing crisis" — fasa di mana badan sedang membuang toksin dan menyembuhkan diri dari dalam. Kulit mungkin kelihatan lebih teruk sebelum menjadi lebih baik. Hanya menggunakan krim pelembap organik untuk mengurangkan kesakitan.',
  'Healing crisis adalah tanda badan sedang bertindak balas dan menyembuhkan diri. Ramai yang berputus asa di fasa ini — jangan berhenti.',
  '["Healing crisis adalah tanda positif — badan sedang sembuh","Gunakan krim pelembap organik sahaja semasa fasa ini","Teruskan berpantang walaupun keadaan nampak lebih teruk"]',
  '[]',
  '[{"name":"Krim Pelembap Organik","slug":"organic-moisturizer"},{"name":"DND D3K2 Plus","slug":"dnd-d3k2-plus"}]',
  4);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(2, '2021 — Bulan 3–4', 'Usaha Mula Berhasil — Kulit Mula Pulih',
  'Selepas 3–4 bulan berpantang sepenuhnya mengikut DND Diet Protokol, kulit mula menunjukkan perubahan yang ketara. Keradangan berkurangan, flare-up semakin jarang berlaku, dan kualiti tidur bertambah baik.',
  'Konsisten adalah kunci. Tiada jalan singkat dalam penyembuhan psoriasis secara semula jadi.',
  '["Sabar — penyembuhan alami mengambil masa 90–120 hari","Konsisten dengan diet walaupun tiada perubahan ketara pada minggu pertama","Tambah suplemen DND Wellness untuk mempercepatkan proses penyembuhan"]',
  '[]',
  '[{"name":"DND Diet Protokol","slug":"dnd-diet-protokol"},{"name":"Sacha Inchi Oil","slug":"sacha-inchi-oil"},{"name":"DND D3K2 Plus","slug":"dnd-d3k2-plus"}]',
  5);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(2, '2021 — Bebas Psoriasis', 'Akhirnya Bebas — Hidup Baru Bermula',
  'Psoriasis berjaya sembuh sepenuhnya. Kini mengamalkan gaya hidup sihat secara berterusan dengan DND Diet Protokol dan suplemen DND Wellness sebagai rutin harian. Mula berkongsi pengalaman dan ilmu melalui platform Acachiaa – Bebas Psoriasis.',
  'Kini membantu ramai pesakit psoriasis dan ekzema lain melalui e-book, blog, dan komuniti Acachiaa.',
  '["Kekalkan diet dan gaya hidup sihat walaupun sudah sembuh","Kongsi ilmu — bantu orang lain yang sedang berjuang","Dapatkan panduan lengkap dalam E-Book Bebas Psoriasis"]',
  '[]',
  '[{"name":"E-Book Bebas Psoriasis","slug":"ebook-bebas-psoriasis"},{"name":"DND Diet Protokol","slug":"dnd-diet-protokol"}]',
  6);

-- EN: Razak
INSERT INTO testimonials (id, name, location, condition_duration, categories, summary, initial_quote, result_quote, featured, avatar_url, lang, sort_order, status, created_at, updated_at)
VALUES (3, 'Razak', 'Penang', '12 years',
  '["Plaque Psoriasis"]',
  'Large plaques on elbows and knees reduced by 80% after focusing on gut health and omega-3 supplementation.',
  'I stopped wearing short sleeves years ago. People would stare.',
  'I wore a t-shirt to the market last week. My wife cried.',
  true, 'https://i.pravatar.cc/150?u=razak@psoriasis', 'en', 2, 'active', NOW(), NOW());

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(3, 'Nov 2025', 'Initial assessment',
  'Thick, silvery plaques on both elbows (8cm) and knees (6cm). Moderate itching. Patient had tried topical steroids with temporary relief.',
  'Plaques were well-defined with significant thickness. Minimal response to previous treatments.',
  '["Photograph plaques weekly to track objectively","Moisturise immediately after bathing","Avoid harsh soaps on affected areas"]',
  '[]', '[]', 1);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(3, 'Dec 2025', 'Dietary adjustments',
  'Reduced processed food and added omega-3 rich foods. Started 2000mg fish oil daily. Plaque thickness reduced by 30% in 4 weeks.',
  'Patient noted less redness. Plaques feeling less raised.',
  '["Omega-3 takes 4-8 weeks to show effect — be patient","Reduce deep-fried foods and trans fats","Stay hydrated — skin needs moisture from inside too"]',
  '[]', '[]', 2);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(3, 'Feb 2026', 'Gut health focus',
  'Added probiotic and L-glutamine. Plaque size reduced by 60%. Itching nearly gone. Patient reported improved digestion and energy.',
  'Significant improvement correlated with gut health intervention.',
  '["Probiotics work best on empty stomach","L-glutamine before bed for gut repair","Track digestion alongside skin — they are connected"]',
  '[]', '[]', 3);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(3, 'Apr 2026', 'Continued improvement',
  'Plaques reduced by 80%. Only small patches remain, no scaling. Patient returned to wearing short sleeves and swimming.',
  'Best result patient has achieved in 12 years. Maintenance ongoing.',
  '["Continue omega-3 even after skin clears","Have a plan for flare triggers (stress, travel, illness)","Join a support group — mental health matters too"]',
  '[]', '[]', 4);

-- EN: Siti
INSERT INTO testimonials (id, name, location, condition_duration, categories, summary, initial_quote, result_quote, featured, avatar_url, lang, sort_order, status, created_at, updated_at)
VALUES (4, 'Siti', 'Johor Bahru', '3 years',
  '["Guttate Psoriasis"]',
  'Small drop-like lesions all over torso cleared within 3 months after identifying strep trigger and supporting immune recovery.',
  'Small red dots kept appearing. I was scared it would spread everywhere.',
  'My skin is clear 90% of the time now. I know what to do when spots appear.',
  false, 'https://i.pravatar.cc/150?u=siti@psoriasis', 'en', 3, 'active', NOW(), NOW());

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(4, 'Jan 2026', 'Outbreak assessment',
  'Sudden onset of small red papules on torso and upper arms following a throat infection. 40+ lesions counted.',
  'Classic guttate presentation post-streptococcal infection. Stress about the sudden spread was high.',
  '["Check for recent sore throat or fever","Do not panic — guttate often responds well to support","Get enough sleep to support immune recovery"]',
  '[]', '[]', 1);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(4, 'Feb 2026', 'Immune support',
  'Focused on rest, hydration, zinc supplementation. Lesions stopped spreading by week 2. Fading started by week 4.',
  'No new lesions appearing. Existing ones turning pink from red.',
  '["Zinc with food to avoid nausea","Vitamin C helps immune function","Avoid intense exercise until outbreak stabilises"]',
  '[]', '[]', 2);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(4, 'Mar 2026', 'Clearance phase',
  '80% of lesions cleared completely. Mild hyperpigmentation remains but fading. Patient reports feeling relieved.',
  'Excellent response. Reassured about future outbreaks.',
  '["Use sunscreen on healing spots to prevent dark marks","Gentle exfoliation can help once skin is flat","Keep a note of the trigger for future reference"]',
  '[]', '[]', 3);

-- EN: Mei Ling
INSERT INTO testimonials (id, name, location, condition_duration, categories, summary, initial_quote, result_quote, featured, avatar_url, lang, sort_order, status, created_at, updated_at)
VALUES (5, 'Mei Ling', 'Ipoh', '20+ years',
  '["Chronic Plaque"]',
  'Long-term severe psoriasis on 40% of body. Found relief through consistent routine, stress reduction, and targeted supplements.',
  'I have tried everything. Herbs, creams, injections. Nothing gave lasting relief.',
  'I still have psoriasis, but it does not control my life anymore. That is enough for me.',
  true, 'https://i.pravatar.cc/150?u=mei.ling@psoriasis', 'en', 4, 'active', NOW(), NOW());

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(5, 'Dec 2025', 'Comprehensive review',
  'Extensive plaques on legs, arms, torso, and scalp covering ~40% body surface area. Multiple previous treatments with partial response.',
  'Fatigue and low mood noted. Previous trauma from ineffective treatments.',
  '["Set realistic expectations — chronic severe needs patience","Address mental health alongside skin health","Find one doctor who listens and stick with them"]',
  '[]', '[]', 1);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(5, 'Feb 2026', 'Foundation routine',
  'Established gentle skincare routine, magnesium for sleep, vitamin D supplementation. Moderate improvement in skin comfort and sleep.',
  'Skin less reactive. Patient sleeping better which improved mood.',
  '["Magnesium glycinate before bed for sleep","Vitamin D testing recommended first","Routine consistency matters more than product choice"]',
  '[]', '[]', 2);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(5, 'Apr 2026', 'Stress work',
  'Joined a weekly support group. Started gentle yoga. Plaque thickness reduced noticeably. Patient reported feeling hopeful for first time.',
  'Emotional improvement as significant as physical improvement.',
  '["Community support is underrated — find your people","Gentle movement helps stress and circulation","Celebrate small wins, not just full clearance"]',
  '[]', '[]', 3);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(5, 'Jun 2026', 'Sustainable management',
  'Coverage reduced to ~20%. Plaques thinner, less red. Patient maintains routine without feeling burdened. Quality of life significantly improved.',
  'Patient describes feeling "in charge" of her condition for the first time.',
  '["Long-term management over quick fixes","Share your story — it helps others and reinforces your own progress"]',
  '[]', '[]', 4);

-- EN: Hafiz
INSERT INTO testimonials (id, name, location, condition_duration, categories, summary, initial_quote, result_quote, featured, avatar_url, lang, sort_order, status, created_at, updated_at)
VALUES (6, 'Hafiz', 'Shah Alam', '2 years',
  '["Scalp & Face"]',
  'Psoriasis on scalp and face cleared by 85% after eliminating trigger foods and using a targeted skincare routine.',
  'I could not shave or grow a beard. The flakes on my face were embarrassing.',
  'I shaved for the first time in 2 years. My barber did not even notice anything.',
  true, 'https://i.pravatar.cc/150?u=hafiz@psoriasis', 'en', 5, 'active', NOW(), NOW());

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(6, 'Mar 2026', 'Initial consultation',
  'Psoriasis affecting scalp, hairline, eyebrows, and beard area. Redness, flaking, and itching. Avoided shaving and social situations.',
  'Facial psoriasis has high emotional impact. Patient withdrawn.',
  '["Facial skin is thinner — use gentler products","Test new products on a small area first","Beard grooming needs care — avoid harsh trimmers"]',
  '[]', '[]', 1);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(6, 'Apr 2026', 'Trigger identification',
  'Eliminated dairy and spicy food for 3 weeks. Facial redness reduced by 50%. Scalp still flaring but less intense.',
  'Dairy appeared to be a significant trigger. Patient willing to continue elimination.',
  '["Try elimination for 3 weeks minimum","Keep a food-skin diary to spot patterns","Reintroduce one food at a time to confirm"]',
  '[]', '[]', 2);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(6, 'May 2026', 'Skincare routine',
  'Introduced gentle cleanser, fragrance-free moisturiser, and zinc-based cream for face. Used coal tar shampoo on scalp 2x weekly.',
  'Facial skin improved markedly. Patient began socialising more.',
  '["Less is more for facial psoriasis","Zinc cream can calm red patches","Avoid steroid creams on face long-term"]',
  '[]', '[]', 3);

INSERT INTO testimonial_progress (testimonial_id, date_label, title, description, notes, tips, images, product_tags, sort_order) VALUES
(6, 'Jun 2026', 'Confidence restored',
  '85% clear on face and scalp. Occasional small patches but manageable. Patient shaved, started gym, reports feeling like himself again.',
  'Emotional recovery as important as skin recovery.',
  '["Confidence takes time to rebuild — be patient with yourself","Keep a backup routine for flare-ups","You are more than your skin"]',
  '[]', '[]', 4);

SELECT setval('testimonials_id_seq', 6);
