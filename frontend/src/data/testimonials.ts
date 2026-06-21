export interface ProgressEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  notes: string;
  tips: string[];
  images?: string[];
  productTags?: { name: string; slug?: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  location: string;
  conditionDuration: string;
  categories: string[];
  summary: string;
  initialQuote: string;
  resultQuote: string;
  progressHistory: ProgressEntry[];
  featured: boolean;
  avatar: string;
}

const enAisha: Testimonial = {
  id: "t1",
  name: "Acachiaa",
  age: 35,
  location: "Selangor",
  conditionDuration: "13 years",
  categories: ["Psoriasis", "Nail Psoriasis", "Guttate Psoriasis"],
  summary:
    "From 13 years of painful flare-ups to psoriasis-free skin — through the DND Diet Protocol, 100% natural, no steroids.",
  initialQuote:
    "I tried various treatments and methods, but all failed because I didn't have enough knowledge or preparation.",
  resultQuote:
    "Now I am free from Psoriasis and have started enjoying the life I had long dreamed of.",
  featured: true,
  avatar: "https://i.pravatar.cc/150?u=acachiaa@psoriasis",
  progressHistory: [
    {
      id: "p1",
      date: "Year 1–5",
      title: "Beginning — Didn't Know What Was Happening",
      description:
        "Psoriasis signs started appearing on the skin. Tried various over-the-counter treatments and steroid creams to relieve inflammation, but the condition returned every time I stopped using them.",
      notes:
        "Didn't have enough knowledge about psoriasis at this stage. Treatments only focused on symptoms, not the root cause.",
      tips: [
        "Don't rely on steroid creams as a long-term solution",
        "Start learning about the link between diet and autoimmune diseases",
        "Track daily flare-up patterns in a simple diary",
      ],
      images: [],
      productTags: [{ name: "Steroid Cream", slug: "steroid-cream" }],
    },
    {
      id: "p2",
      date: "Year 6–10",
      title: "Worst Phase — Flare-Ups & Hopelessness",
      description:
        "Psoriasis was at its worst. Pain, burning sensation on the skin, and constant flare-ups. Almost gave up. At the same time, gave birth to a third child who also had eczema and needed intensive care.",
      notes:
        "Life stress and caring for a child with eczema worsened the psoriasis. Stress was the biggest trigger for flare-ups.",
      tips: [
        "Control stress — it's the biggest trigger for flare-ups",
        "Find a community that understands autoimmune skin conditions",
        "Don't go through this journey alone",
      ],
      images: [],
      productTags: [],
    },
    {
      id: "p3",
      date: "2021 — Month 1",
      title: "Turning Point — Discovered DND Diet Protocol",
      description:
        "Started understanding the connection between diet and autoimmune psoriasis. Decided to stop using steroid creams completely. Began dietary restrictions following the DND Diet Protocol by Dr. Noordin Darus.",
      notes:
        "Knowledge is key — only after clearly understanding the relationship between diet and psoriasis did the healing process become easier and more directed.",
      tips: [
        "Understand the knowledge first before starting any diet",
        "Stop steroids gradually, not abruptly",
        "Start the DND Diet Protocol with full commitment",
      ],
      images: [],
      productTags: [
        { name: "DND Diet Protokol", slug: "dnd-diet-protokol" },
        { name: "Sacha Inchi Oil", slug: "sacha-inchi-oil" },
      ],
    },
    {
      id: "p4",
      date: "2021 — Month 2–3",
      title: "Healing Crisis — The Most Challenging Phase",
      description:
        "Experienced a 'healing crisis' — a phase where the body is detoxing and healing from within. Skin may look worse before getting better. Only used organic moisturizer to reduce discomfort.",
      notes:
        "Healing crisis is a sign the body is responding and healing. Many give up at this stage — don't stop.",
      tips: [
        "Healing crisis is a positive sign — the body is healing",
        "Only use organic moisturizer during this phase",
        "Continue dietary restrictions even if skin looks worse",
      ],
      images: [],
      productTags: [
        { name: "Organic Moisturizer", slug: "organic-moisturizer" },
        { name: "DND D3K2 Plus", slug: "dnd-d3k2-plus" },
      ],
    },
    {
      id: "p5",
      date: "2021 — Month 3–4",
      title: "Progress — Skin Started Healing",
      description:
        "After 3–4 months of full dietary compliance with the DND Diet Protocol, skin showed significant changes. Inflammation reduced, flare-ups became less frequent, and sleep quality improved.",
      notes:
        "Consistency is key. There is no shortcut in natural psoriasis healing.",
      tips: [
        "Be patient — natural healing takes 90–120 days",
        "Stay consistent with diet even without visible changes in the first week",
        "Add DND Wellness supplements to speed up healing",
      ],
      images: [],
      productTags: [
        { name: "DND Diet Protokol", slug: "dnd-diet-protokol" },
        { name: "Sacha Inchi Oil", slug: "sacha-inchi-oil" },
        { name: "DND D3K2 Plus", slug: "dnd-d3k2-plus" },
      ],
    },
    {
      id: "p6",
      date: "2021 — Psoriasis Free",
      title: "Finally Free — A New Life Begins",
      description:
        "Psoriasis healed completely. Now maintaining a healthy lifestyle with the DND Diet Protocol and DND Wellness supplements as a daily routine. Started sharing experiences and knowledge through the Acachiaa – Bebas Psoriasis platform.",
      notes:
        "Now helping many other psoriasis and eczema patients through ebooks, blogs, and the Acachiaa community.",
      tips: [
        "Maintain diet and healthy lifestyle even after healing",
        "Share your knowledge — help others who are still struggling",
        "Get the complete guide in the Bebas Psoriasis E-Book",
      ],
      images: [],
      productTags: [
        { name: "Bebas Psoriasis E-Book", slug: "ebook-bebas-psoriasis" },
        { name: "DND Diet Protokol", slug: "dnd-diet-protokol" },
      ],
    },
  ],
};

const shared: Testimonial[] = [
  {
    id: "t2",
    name: "Razak",
    age: 47,
    location: "Penang",
    conditionDuration: "12 years",
    categories: ["Plaque Psoriasis"],
    summary:
      "Large plaques on elbows and knees reduced by 80% after focusing on gut health and omega-3 supplementation.",
    initialQuote:
      "I stopped wearing short sleeves years ago. People would stare.",
    resultQuote: "I wore a t-shirt to the market last week. My wife cried.",
    featured: true,
    avatar: "https://i.pravatar.cc/150?u=razak@psoriasis",
    progressHistory: [
      {
        id: "p5",
        date: "Nov 2025",
        title: "Initial assessment",
        description:
          "Thick, silvery plaques on both elbows (8cm) and knees (6cm). Moderate itching. Patient had tried topical steroids with temporary relief.",
        notes:
          "Plaques were well-defined with significant thickness. Minimal response to previous treatments.",
        tips: [
          "Photograph plaques weekly to track objectively",
          "Moisturise immediately after bathing",
          "Avoid harsh soaps on affected areas",
        ],
      },
      {
        id: "p6",
        date: "Dec 2025",
        title: "Dietary adjustments",
        description:
          "Reduced processed food and added omega-3 rich foods. Started 2000mg fish oil daily. Plaque thickness reduced by 30% in 4 weeks.",
        notes: "Patient noted less redness. Plaques feeling less raised.",
        tips: [
          "Omega-3 takes 4-8 weeks to show effect — be patient",
          "Reduce deep-fried foods and trans fats",
          "Stay hydrated — skin needs moisture from inside too",
        ],
      },
      {
        id: "p7",
        date: "Feb 2026",
        title: "Gut health focus",
        description:
          "Added probiotic and L-glutamine. Plaque size reduced by 60%. Itching nearly gone. Patient reported improved digestion and energy.",
        notes:
          "Significant improvement correlated with gut health intervention.",
        tips: [
          "Probiotics work best on empty stomach",
          "L-glutamine before bed for gut repair",
          "Track digestion alongside skin — they are connected",
        ],
      },
      {
        id: "p8",
        date: "Apr 2026",
        title: "Continued improvement",
        description:
          "Plaques reduced by 80%. Only small patches remain, no scaling. Patient returned to wearing short sleeves and swimming.",
        notes:
          "Best result patient has achieved in 12 years. Maintenance ongoing.",
        tips: [
          "Continue omega-3 even after skin clears",
          "Have a plan for flare triggers (stress, travel, illness)",
          "Join a support group — mental health matters too",
        ],
      },
    ],
  },
  {
    id: "t3",
    name: "Siti",
    age: 29,
    location: "Johor Bahru",
    conditionDuration: "3 years",
    categories: ["Guttate Psoriasis"],
    summary:
      "Small drop-like lesions all over torso cleared within 3 months after identifying strep trigger and supporting immune recovery.",
    initialQuote:
      "Small red dots kept appearing. I was scared it would spread everywhere.",
    resultQuote:
      "My skin is clear 90% of the time now. I know what to do when spots appear.",
    featured: false,
    avatar: "https://i.pravatar.cc/150?u=siti@psoriasis",
    progressHistory: [
      {
        id: "p9",
        date: "Jan 2026",
        title: "Outbreak assessment",
        description:
          "Sudden onset of small red papules on torso and upper arms following a throat infection. 40+ lesions counted.",
        notes:
          "Classic guttate presentation post-streptococcal infection. Stress about the sudden spread was high.",
        tips: [
          "Check for recent sore throat or fever",
          "Do not panic — guttate often responds well to support",
          "Get enough sleep to support immune recovery",
        ],
      },
      {
        id: "p10",
        date: "Feb 2026",
        title: "Immune support",
        description:
          "Focused on rest, hydration, zinc supplementation. Lesions stopped spreading by week 2. Fading started by week 4.",
        notes: "No new lesions appearing. Existing ones turning pink from red.",
        tips: [
          "Zinc with food to avoid nausea",
          "Vitamin C helps immune function",
          "Avoid intense exercise until outbreak stabilises",
        ],
      },
      {
        id: "p11",
        date: "Mar 2026",
        title: "Clearance phase",
        description:
          "80% of lesions cleared completely. Mild hyperpigmentation remains but fading. Patient reports feeling relieved.",
        notes: "Excellent response. Reassured about future outbreaks.",
        tips: [
          "Use sunscreen on healing spots to prevent dark marks",
          "Gentle exfoliation can help once skin is flat",
          "Keep a note of the trigger for future reference",
        ],
      },
    ],
  },
  {
    id: "t4",
    name: "Mei Ling",
    age: 52,
    location: "Ipoh",
    conditionDuration: "20+ years",
    categories: ["Chronic Plaque"],
    summary:
      "Long-term severe psoriasis on 40% of body. Found relief through consistent routine, stress reduction, and targeted supplements.",
    initialQuote:
      "I have tried everything. Herbs, creams, injections. Nothing gave lasting relief.",
    resultQuote:
      "I still have psoriasis, but it does not control my life anymore. That is enough for me.",
    featured: true,
    avatar: "https://i.pravatar.cc/150?u=mei.ling@psoriasis",
    progressHistory: [
      {
        id: "p12",
        date: "Dec 2025",
        title: "Comprehensive review",
        description:
          "Extensive plaques on legs, arms, torso, and scalp covering ~40% body surface area. Multiple previous treatments with partial response.",
        notes:
          "Fatigue and low mood noted. Previous trauma from ineffective treatments.",
        tips: [
          "Set realistic expectations — chronic severe needs patience",
          "Address mental health alongside skin health",
          "Find one doctor who listens and stick with them",
        ],
      },
      {
        id: "p13",
        date: "Feb 2026",
        title: "Foundation routine",
        description:
          "Established gentle skincare routine, magnesium for sleep, vitamin D supplementation. Moderate improvement in skin comfort and sleep.",
        notes:
          "Skin less reactive. Patient sleeping better which improved mood.",
        tips: [
          "Magnesium glycinate before bed for sleep",
          "Vitamin D testing recommended first",
          "Routine consistency matters more than product choice",
        ],
      },
      {
        id: "p14",
        date: "Apr 2026",
        title: "Stress work",
        description:
          "Joined a weekly support group. Started gentle yoga. Plaque thickness reduced noticeably. Patient reported feeling hopeful for first time.",
        notes: "Emotional improvement as significant as physical improvement.",
        tips: [
          "Community support is underrated — find your people",
          "Gentle movement helps stress and circulation",
          "Celebrate small wins, not just full clearance",
        ],
      },
      {
        id: "p15",
        date: "Jun 2026",
        title: "Sustainable management",
        description:
          "Coverage reduced to ~20%. Plaques thinner, less red. Patient maintains routine without feeling burdened. Quality of life significantly improved.",
        notes:
          'Patient describes feeling "in charge" of her condition for the first time.',
        tips: [
          "Long-term management over quick fixes",
          "Share your story — it helps others and reinforces your own progress",
        ],
      },
    ],
  },
  {
    id: "t5",
    name: "Hafiz",
    age: 31,
    location: "Shah Alam",
    conditionDuration: "2 years",
    categories: ["Scalp & Face"],
    summary:
      "Psoriasis on scalp and face cleared by 85% after eliminating trigger foods and using a targeted skincare routine.",
    initialQuote:
      "I could not shave or grow a beard. The flakes on my face were embarrassing.",
    resultQuote:
      "I shaved for the first time in 2 years. My barber did not even notice anything.",
    featured: true,
    avatar: "https://i.pravatar.cc/150?u=hafiz@psoriasis",
    progressHistory: [
      {
        id: "p16",
        date: "Mar 2026",
        title: "Initial consultation",
        description:
          "Psoriasis affecting scalp, hairline, eyebrows, and beard area. Redness, flaking, and itching. Avoided shaving and social situations.",
        notes: "Facial psoriasis has high emotional impact. Patient withdrawn.",
        tips: [
          "Facial skin is thinner — use gentler products",
          "Test new products on a small area first",
          "Beard grooming needs care — avoid harsh trimmers",
        ],
      },
      {
        id: "p17",
        date: "Apr 2026",
        title: "Trigger identification",
        description:
          "Eliminated dairy and spicy food for 3 weeks. Facial redness reduced by 50%. Scalp still flaring but less intense.",
        notes:
          "Dairy appeared to be a significant trigger. Patient willing to continue elimination.",
        tips: [
          "Try elimination for 3 weeks minimum",
          "Keep a food-skin diary to spot patterns",
          "Reintroduce one food at a time to confirm",
        ],
      },
      {
        id: "p18",
        date: "May 2026",
        title: "Skincare routine",
        description:
          "Introduced gentle cleanser, fragrance-free moisturiser, and zinc-based cream for face. Used coal tar shampoo on scalp 2x weekly.",
        notes: "Facial skin improved markedly. Patient began socialising more.",
        tips: [
          "Less is more for facial psoriasis",
          "Zinc cream can calm red patches",
          "Avoid steroid creams on face long-term",
        ],
      },
      {
        id: "p19",
        date: "Jun 2026",
        title: "Confidence restored",
        description:
          "85% clear on face and scalp. Occasional small patches but manageable. Patient shaved, started gym, reports feeling like himself again.",
        notes: "Emotional recovery as important as skin recovery.",
        tips: [
          "Confidence takes time to rebuild — be patient with yourself",
          "Keep a backup routine for flare-ups",
          "You are more than your skin",
        ],
      },
    ],
  },
];

const msAisha: Testimonial = {
  id: "t1",
  name: "Acachiaa",
  age: 35,
  location: "Selangor",
  conditionDuration: "13 tahun",
  categories: ["Psoriasis", "Psoriasis Kuku", "Guttate Psoriasis"],
  summary:
    "Dari kesakitan flare-up selama 13 tahun kepada kulit bebas psoriasis — melalui DND Diet Protokol, 100% alami, tanpa steroid.",
  initialQuote:
    "Saya telah mencuba pelbagai rawatan dan kaedah, namun semuanya gagal kerana tiada ilmu dan persediaan yang mencukupi.",
  resultQuote:
    "Kini saya bebas dari Psoriasis dan mula menikmati hidup yang telah lama saya impikan.",
  featured: true,
  avatar: "https://i.pravatar.cc/150?u=acachiaa@psoriasis",
  progressHistory: [
    {
      id: "p1",
      date: "Tahun 1–5",
      title: "Awal Perjalanan — Tidak Tahu Apa Yang Berlaku",
      description:
        "Mula muncul tanda-tanda psoriasis pada kulit. Mencuba pelbagai rawatan over-the-counter dan krim steroid untuk melegakan keradangan, namun keadaan berulang semula setiap kali berhenti menggunakannya.",
      notes:
        "Tiada ilmu yang cukup tentang psoriasis pada peringkat ini. Rawatan hanya berfokus pada simptom, bukan punca sebenar.",
      tips: [
        "Jangan bergantung pada krim steroid sebagai penyelesaian jangka panjang",
        "Mula cari ilmu tentang kaitan diet dan penyakit autoimmune",
        "Catat corak flare-up harian dalam diari mudah",
      ],
      images: [],
      productTags: [{ name: "Steroid Cream", slug: "steroid-cream" }],
    },
    {
      id: "p2",
      date: "Tahun 6–10",
      title: "Fasa Paling Teruk — Flare-Up & Rasa Putus Asa",
      description:
        "Psoriasis berada pada tahap paling parah. Kesakitan, rasa terbakar pada kulit, dan flare-up yang berterusan. Pernah hampir menyerah. Pada masa yang sama, melahirkan anak ke-3 yang juga mengidap ekzema dan memerlukan penjagaan rapi.",
      notes:
        "Tekanan hidup dan cabaran penjagaan anak dengan ekzema memburukkan lagi keadaan psoriasis. Stress adalah pencetus utama flare-up.",
      tips: [
        "Kawal stress — ia adalah pencetus terbesar flare-up",
        "Cari sokongan komuniti yang faham penyakit kulit autoimmune",
        "Jangan biarkan diri berseorangan dalam perjalanan ini",
      ],
      images: [],
      productTags: [],
    },
    {
      id: "p3",
      date: "2021 — Bulan 1",
      title: "Titik Perubahan — Jumpa DND Diet Protokol",
      description:
        "Mula memahami kaitan antara diet pemakanan dan penyakit autoimmune psoriasis. Nekad berhenti mengambil steroid cream sepenuhnya. Bermula berpantang makanan mengikut DND Diet Protokol oleh Dr. Noordin Darus.",
      notes:
        "Kefahaman ilmu adalah kunci — hanya setelah faham dengan jelas hubungan diet dan psoriasis, barulah proses penyembuhan menjadi lebih mudah dan terarah.",
      tips: [
        "Fahami dulu ilmu sebelum mulakan sebarang diet",
        "Berhenti steroid secara terancang, bukan mengejut",
        "Mulakan DND Diet Protokol dengan komitmen penuh",
      ],
      images: [],
      productTags: [
        { name: "DND Diet Protokol", slug: "dnd-diet-protokol" },
        { name: "Sacha Inchi Oil", slug: "sacha-inchi-oil" },
      ],
    },
    {
      id: "p4",
      date: "2021 — Bulan 2–3",
      title: "Healing Crisis — Fasa Paling Mencabar",
      description:
        'Mengalami "healing crisis" — fasa di mana badan sedang membuang toksin dan menyembuhkan diri dari dalam. Kulit mungkin kelihatan lebih teruk sebelum menjadi lebih baik. Hanya menggunakan krim pelembap organik untuk mengurangkan kesakitan.',
      notes:
        "Healing crisis adalah tanda badan sedang bertindak balas dan menyembuhkan diri. Ramai yang berputus asa di fasa ini — jangan berhenti.",
      tips: [
        "Healing crisis adalah tanda positif — badan sedang sembuh",
        "Gunakan krim pelembap organik sahaja semasa fasa ini",
        "Teruskan berpantang walaupun keadaan nampak lebih teruk",
      ],
      images: [],
      productTags: [
        { name: "Krim Pelembap Organik", slug: "organic-moisturizer" },
        { name: "DND D3K2 Plus", slug: "dnd-d3k2-plus" },
      ],
    },
    {
      id: "p5",
      date: "2021 — Bulan 3–4",
      title: "Usaha Mula Berhasil — Kulit Mula Pulih",
      description:
        "Selepas 3–4 bulan berpantang sepenuhnya mengikut DND Diet Protokol, kulit mula menunjukkan perubahan yang ketara. Keradangan berkurangan, flare-up semakin jarang berlaku, dan kualiti tidur bertambah baik.",
      notes:
        "Konsisten adalah kunci. Tiada jalan singkat dalam penyembuhan psoriasis secara semula jadi.",
      tips: [
        "Sabar — penyembuhan alami mengambil masa 90–120 hari",
        "Konsisten dengan diet walaupun tiada perubahan ketara pada minggu pertama",
        "Tambah suplemen DND Wellness untuk mempercepatkan proses penyembuhan",
      ],
      images: [],
      productTags: [
        { name: "DND Diet Protokol", slug: "dnd-diet-protokol" },
        { name: "Sacha Inchi Oil", slug: "sacha-inchi-oil" },
        { name: "DND D3K2 Plus", slug: "dnd-d3k2-plus" },
      ],
    },
    {
      id: "p6",
      date: "2021 — Bebas Psoriasis",
      title: "Akhirnya Bebas — Hidup Baru Bermula",
      description:
        "Psoriasis berjaya sembuh sepenuhnya. Kini mengamalkan gaya hidup sihat secara berterusan dengan DND Diet Protokol dan suplemen DND Wellness sebagai rutin harian. Mula berkongsi pengalaman dan ilmu melalui platform Acachiaa – Bebas Psoriasis.",
      notes:
        "Kini membantu ramai pesakit psoriasis dan ekzema lain melalui e-book, blog, dan komuniti Acachiaa.",
      tips: [
        "Kekalkan diet dan gaya hidup sihat walaupun sudah sembuh",
        "Kongsi ilmu — bantu orang lain yang sedang berjuang",
        "Dapatkan panduan lengkap dalam E-Book Bebas Psoriasis",
      ],
      images: [],
      productTags: [
        { name: "E-Book Bebas Psoriasis", slug: "ebook-bebas-psoriasis" },
        { name: "DND Diet Protokol", slug: "dnd-diet-protokol" },
      ],
    },
  ],
};

export const testimonialsEn: Testimonial[] = [enAisha, ...shared];
export const testimonialsMs: Testimonial[] = [msAisha, ...shared];

export function getTestimonials(lang: string): Testimonial[] {
  return lang === 'ms' ? testimonialsMs : testimonialsEn;
}

export const testimonials: Testimonial[] = testimonialsEn;
