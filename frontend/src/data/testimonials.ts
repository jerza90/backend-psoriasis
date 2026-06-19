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
  category: string;
  summary: string;
  initialQuote: string;
  resultQuote: string;
  progressHistory: ProgressEntry[];
  featured: boolean;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Aisha',
    age: 34,
    location: 'Kuala Lumpur',
    conditionDuration: '6 years',
    category: 'Scalp Psoriasis',
    summary: 'From constant itching and flakes to 90% clearer scalp in 4 months by adjusting shampoo routine and managing stress.',
    initialQuote: 'I thought it was just bad dandruff. The itching kept me up at night.',
    resultQuote: 'Now I can wear dark clothes without worrying about flakes. Life-changing.',
    featured: true,
    avatar: 'https://i.pravatar.cc/150?u=aisha@psoriasis',
    progressHistory: [
      {
        id: 'p1',
        date: 'Jan 2026',
        title: 'First consultation',
        description: 'Severe scaling on 70% of scalp. Constant itching, sleep disturbance. Using harsh anti-dandruff shampoos daily which worsened irritation.',
        notes: 'Scalp was red and inflamed. Multiple over-the-counter treatments tried with no improvement.',
        tips: ['Stop using harsh SLS-based shampoos', 'Avoid scratching — use cool compress instead', 'Track flare-ups in a simple diary'],
        images: ['https://picsum.photos/seed/aisha-before1/800/600', 'https://picsum.photos/seed/aisha-before2/800/600'],
        productTags: [{ name: 'Gentle Shampoo', slug: 'gentle-shampoo' }],
      },
      {
        id: 'p2',
        date: 'Feb 2026',
        title: 'Routine adjustment',
        description: 'Switched to gentle, fragrance-free shampoo. Started using a scalp oil treatment twice weekly. Itching reduced by 40%.',
        notes: 'Patient reported less redness. Flaking reduced from daily to every other day.',
        tips: ['Apply oil treatment 30min before shower', 'Use lukewarm water — hot water worsens inflammation', 'Pat dry, never rub scalp'],
        images: ['https://picsum.photos/seed/aisha-progress1/800/600'],
        productTags: [{ name: 'Scalp Oil Treatment', slug: 'scalp-oil' }],
      },
      {
        id: 'p3',
        date: 'Mar 2026',
        title: 'Stress management added',
        description: 'Introduced 10-min morning breathing exercises and earlier bedtime. Flaking reduced by 70%. Sleep quality improved significantly.',
        notes: 'Clear correlation between stress levels and flare severity noticed.',
        tips: ['Even 5 minutes of deep breathing helps', 'Consistent sleep schedule matters more than sleep duration', 'Journaling before bed reduces nighttime scratching'],
        images: ['https://picsum.photos/seed/aisha-progress2/800/600'],
      },
      {
        id: 'p4',
        date: 'Apr 2026',
        title: 'Maintenance phase',
        description: 'Scalp 90% clear. Occasional mild flakes during high-stress weeks but manageable with routine. Stopped using medicated shampoos entirely.',
        notes: 'Maintenance routine now sustainable. Patient reports feeling in control.',
        tips: ['Keep a "stress flare" backup plan', 'Do not abandon routine when skin looks good', 'Reintroduce triggers one at a time'],
        images: ['https://picsum.photos/seed/aisha-after1/800/600', 'https://picsum.photos/seed/aisha-after2/800/600'],
      },
    ],
  },
  {
    id: 't2',
    name: 'Razak',
    age: 47,
    location: 'Penang',
    conditionDuration: '12 years',
    category: 'Plaque Psoriasis',
    summary: 'Large plaques on elbows and knees reduced by 80% after focusing on gut health and omega-3 supplementation.',
    initialQuote: 'I stopped wearing short sleeves years ago. People would stare.',
    resultQuote: 'I wore a t-shirt to the market last week. My wife cried.',
    featured: true,
    avatar: 'https://i.pravatar.cc/150?u=razak@psoriasis',
    progressHistory: [
      {
        id: 'p5',
        date: 'Nov 2025',
        title: 'Initial assessment',
        description: 'Thick, silvery plaques on both elbows (8cm) and knees (6cm). Moderate itching. Patient had tried topical steroids with temporary relief.',
        notes: 'Plaques were well-defined with significant thickness. Minimal response to previous treatments.',
        tips: ['Photograph plaques weekly to track objectively', 'Moisturise immediately after bathing', 'Avoid harsh soaps on affected areas'],
      },
      {
        id: 'p6',
        date: 'Dec 2025',
        title: 'Dietary adjustments',
        description: 'Reduced processed food and added omega-3 rich foods. Started 2000mg fish oil daily. Plaque thickness reduced by 30% in 4 weeks.',
        notes: 'Patient noted less redness. Plaques feeling less raised.',
        tips: ['Omega-3 takes 4-8 weeks to show effect — be patient', 'Reduce deep-fried foods and trans fats', 'Stay hydrated — skin needs moisture from inside too'],
      },
      {
        id: 'p7',
        date: 'Feb 2026',
        title: 'Gut health focus',
        description: 'Added probiotic and L-glutamine. Plaque size reduced by 60%. Itching nearly gone. Patient reported improved digestion and energy.',
        notes: 'Significant improvement correlated with gut health intervention.',
        tips: ['Probiotics work best on empty stomach', 'L-glutamine before bed for gut repair', 'Track digestion alongside skin — they are connected'],
      },
      {
        id: 'p8',
        date: 'Apr 2026',
        title: 'Continued improvement',
        description: 'Plaques reduced by 80%. Only small patches remain, no scaling. Patient returned to wearing short sleeves and swimming.',
        notes: 'Best result patient has achieved in 12 years. Maintenance ongoing.',
        tips: ['Continue omega-3 even after skin clears', 'Have a plan for flare triggers (stress, travel, illness)', 'Join a support group — mental health matters too'],
      },
    ],
  },
  {
    id: 't3',
    name: 'Siti',
    age: 29,
    location: 'Johor Bahru',
    conditionDuration: '3 years',
    category: 'Guttate Psoriasis',
    summary: 'Small drop-like lesions all over torso cleared within 3 months after identifying strep trigger and supporting immune recovery.',
    initialQuote: 'Small red dots kept appearing. I was scared it would spread everywhere.',
    resultQuote: 'My skin is clear 90% of the time now. I know what to do when spots appear.',
    featured: false,
    avatar: 'https://i.pravatar.cc/150?u=siti@psoriasis',
    progressHistory: [
      {
        id: 'p9',
        date: 'Jan 2026',
        title: 'Outbreak assessment',
        description: 'Sudden onset of small red papules on torso and upper arms following a throat infection. 40+ lesions counted.',
        notes: 'Classic guttate presentation post-streptococcal infection. Stress about the sudden spread was high.',
        tips: ['Check for recent sore throat or fever', 'Do not panic — guttate often responds well to support', 'Get enough sleep to support immune recovery'],
      },
      {
        id: 'p10',
        date: 'Feb 2026',
        title: 'Immune support',
        description: 'Focused on rest, hydration, zinc supplementation. Lesions stopped spreading by week 2. Fading started by week 4.',
        notes: 'No new lesions appearing. Existing ones turning pink from red.',
        tips: ['Zinc with food to avoid nausea', 'Vitamin C helps immune function', 'Avoid intense exercise until outbreak stabilises'],
      },
      {
        id: 'p11',
        date: 'Mar 2026',
        title: 'Clearance phase',
        description: '80% of lesions cleared completely. Mild hyperpigmentation remains but fading. Patient reports feeling relieved.',
        notes: 'Excellent response. Reassured about future outbreaks.',
        tips: ['Use sunscreen on healing spots to prevent dark marks', 'Gentle exfoliation can help once skin is flat', 'Keep a note of the trigger for future reference'],
      },
    ],
  },
  {
    id: 't4',
    name: 'Mei Ling',
    age: 52,
    location: 'Ipoh',
    conditionDuration: '20+ years',
    category: 'Chronic Plaque',
    summary: 'Long-term severe psoriasis on 40% of body. Found relief through consistent routine, stress reduction, and targeted supplements.',
    initialQuote: 'I have tried everything. Herbs, creams, injections. Nothing gave lasting relief.',
    resultQuote: 'I still have psoriasis, but it does not control my life anymore. That is enough for me.',
    featured: true,
    avatar: 'https://i.pravatar.cc/150?u=mei.ling@psoriasis',
    progressHistory: [
      {
        id: 'p12',
        date: 'Dec 2025',
        title: 'Comprehensive review',
        description: 'Extensive plaques on legs, arms, torso, and scalp covering ~40% body surface area. Multiple previous treatments with partial response.',
        notes: 'Fatigue and low mood noted. Previous trauma from ineffective treatments.',
        tips: ['Set realistic expectations — chronic severe needs patience', 'Address mental health alongside skin health', 'Find one doctor who listens and stick with them'],
      },
      {
        id: 'p13',
        date: 'Feb 2026',
        title: 'Foundation routine',
        description: 'Established gentle skincare routine, magnesium for sleep, vitamin D supplementation. Moderate improvement in skin comfort and sleep.',
        notes: 'Skin less reactive. Patient sleeping better which improved mood.',
        tips: ['Magnesium glycinate before bed for sleep', 'Vitamin D testing recommended first', 'Routine consistency matters more than product choice'],
      },
      {
        id: 'p14',
        date: 'Apr 2026',
        title: 'Stress work',
        description: 'Joined a weekly support group. Started gentle yoga. Plaque thickness reduced noticeably. Patient reported feeling hopeful for first time.',
        notes: 'Emotional improvement as significant as physical improvement.',
        tips: ['Community support is underrated — find your people', 'Gentle movement helps stress and circulation', 'Celebrate small wins, not just full clearance'],
      },
      {
        id: 'p15',
        date: 'Jun 2026',
        title: 'Sustainable management',
        description: 'Coverage reduced to ~20%. Plaques thinner, less red. Patient maintains routine without feeling burdened. Quality of life significantly improved.',
        notes: 'Patient describes feeling "in charge" of her condition for the first time.',
        tips: ['Long-term management over quick fixes', 'Share your story — it helps others and reinforces your own progress'],
      },
    ],
  },
  {
    id: 't5',
    name: 'Hafiz',
    age: 31,
    location: 'Shah Alam',
    conditionDuration: '2 years',
    category: 'Scalp & Face',
    summary: 'Psoriasis on scalp and face cleared by 85% after eliminating trigger foods and using a targeted skincare routine.',
    initialQuote: 'I could not shave or grow a beard. The flakes on my face were embarrassing.',
    resultQuote: 'I shaved for the first time in 2 years. My barber did not even notice anything.',
    featured: true,
    avatar: 'https://i.pravatar.cc/150?u=hafiz@psoriasis',
    progressHistory: [
      {
        id: 'p16',
        date: 'Mar 2026',
        title: 'Initial consultation',
        description: 'Psoriasis affecting scalp, hairline, eyebrows, and beard area. Redness, flaking, and itching. Avoided shaving and social situations.',
        notes: 'Facial psoriasis has high emotional impact. Patient withdrawn.',
        tips: ['Facial skin is thinner — use gentler products', 'Test new products on a small area first', 'Beard grooming needs care — avoid harsh trimmers'],
      },
      {
        id: 'p17',
        date: 'Apr 2026',
        title: 'Trigger identification',
        description: 'Eliminated dairy and spicy food for 3 weeks. Facial redness reduced by 50%. Scalp still flaring but less intense.',
        notes: 'Dairy appeared to be a significant trigger. Patient willing to continue elimination.',
        tips: ['Try elimination for 3 weeks minimum', 'Keep a food-skin diary to spot patterns', 'Reintroduce one food at a time to confirm'],
      },
      {
        id: 'p18',
        date: 'May 2026',
        title: 'Skincare routine',
        description: 'Introduced gentle cleanser, fragrance-free moisturiser, and zinc-based cream for face. Used coal tar shampoo on scalp 2x weekly.',
        notes: 'Facial skin improved markedly. Patient began socialising more.',
        tips: ['Less is more for facial psoriasis', 'Zinc cream can calm red patches', 'Avoid steroid creams on face long-term'],
      },
      {
        id: 'p19',
        date: 'Jun 2026',
        title: 'Confidence restored',
        description: '85% clear on face and scalp. Occasional small patches but manageable. Patient shaved, started gym, reports feeling like himself again.',
        notes: 'Emotional recovery as important as skin recovery.',
        tips: ['Confidence takes time to rebuild — be patient with yourself', 'Keep a backup routine for flare-ups', 'You are more than your skin'],
      },
    ],
  },
];
