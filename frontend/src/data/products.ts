export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  shortDesc: string;
  whyItHelps: string;
  howItWorks: string;
  keyIngredients: string[];
  dosage: string;
  bestTime: string;
  safety: string[];
  suitableFor: string[];
  notSuitableFor: string[];
  evidenceLevel: 'Strong' | 'Moderate' | 'Emerging';
  evidenceNote: string;
  affiliateUrl: string;
  isHero?: boolean;
  rating: number;
  imageUrl?: string;
  images?: string[];
  testimonialImage?: string;
  testimonialText?: string;
  testimonialAuthor?: string;
  purchaseOptions?: PurchaseOption[];
}

export interface PurchaseOption {
  id: string;
  label: string;
  subtitle: string;
  dosage: string;
  packInfo: string;
  supplyBadge?: string;
  note: string;
  imageUrl?: string;
  affiliateUrl?: string;
}

export const products: Product[] = [
  {
    id: 'vitamin-d3-k2',
    name: 'Vitamin D3 + K2',
    brand: 'NOW Foods',
    category: 'Skin Barrier & Immune',
    shortDesc: 'The most researched nutrient for psoriasis support. Most people with psoriasis are deficient.',
    whyItHelps: 'Vitamin D regulates keratinocyte (skin cell) production. In psoriasis, skin cells multiply too quickly. Vitamin D helps slow this down and modulates the immune response that drives inflammation. K2 ensures calcium goes to bones, not skin, and works synergistically with D3.',
    howItWorks: 'Binds to vitamin D receptors on immune cells and skin cells, reducing the inflammatory cascade that triggers flare-ups. Topical vitamin D analogues are actually prescribed for psoriasis — oral D3 provides systemic support.',
    keyIngredients: ['Vitamin D3 (cholecalciferol) 2000 IU', 'Vitamin K2 (menaquinone-7) 100 mcg'],
    dosage: '1 softgel daily with a meal containing fat',
    bestTime: 'Morning or lunch (with fat for absorption)',
    safety: ['Do not exceed 4000 IU daily without blood testing', 'K2 contraindicated if on blood thinners like warfarin', 'Check vitamin D levels first if possible'],
    suitableFor: ['Anyone with psoriasis, especially if low sun exposure', 'Those with darker skin (higher deficiency risk)', 'People on restricted diets'],
    notSuitableFor: ['Those with sarcoidosis', 'Diagnosed hypercalcemia', 'Without checking levels if on high dose'],
    evidenceLevel: 'Strong',
    evidenceNote: 'Multiple clinical trials show oral vitamin D supplementation improves psoriasis severity scores (PASI). Topical vitamin D analogues are first-line prescription treatment.',
    affiliateUrl: 'https://shopee.com.my/search?keyword=Dnd%20SunTerra%20D3K2%20Omega%203%2C6%2C7%2C9',
    isHero: false,
    rating: 5,
  },
  {
    id: 'dnd-sunterra',
    name: 'Dnd SunTerra D3K2 + Omega 3,6,7,9',
    brand: 'Dnd SunTerra',
    category: 'Essential Nutrients',
    shortDesc: 'A flexible D3K2 + Omega 3,6,7,9 formula available in sachet and softgel formats so users can choose the version they prefer for daily skin and immune support.',
    whyItHelps: 'This oil-based formula combines vitamin D3, K2, and omega support in one daily routine. D3 and K2 help support skin cell turnover and immune balance, while the omega blend helps support skin barrier function and inflammation control. The sachet and softgel options deliver the same core benefits in different formats.',
    howItWorks: 'D3 binds to vitamin D receptors on immune and skin cells, supporting normal keratinocyte production and immune regulation. K2 helps direct calcium away from soft tissues. The omega blend supports cell membranes, skin comfort, and overall recovery support. Both package styles are designed to be taken after meals for better tolerance and absorption.',
    keyIngredients: ['Vitamin D3 (cholecalciferol) 2000 IU', 'Vitamin K2 (menaquinone-7) 100 mcg', 'Omega-3 (EPA 500mg / DHA 250mg)', 'Omega-7 (palmitoleic acid) 100 mg', 'Omega-9 (oleic acid) 200 mg'],
    dosage: 'Choose a format below: sachet or softgel',
    bestTime: 'After meals, ideally lunch or dinner',
    safety: ['Do not exceed the recommended daily amount on the package', 'Use caution if you are on blood thinners or have a bleeding disorder', 'Store in a cool, dry place away from direct heat', 'Check the ingredient list if you have known sensitivities'],
    suitableFor: ['Anyone seeking comprehensive psoriasis nutrition support', 'Those who prefer either sachet or softgel format', 'People who want one daily oil-based routine after meals', 'Those with dry or compromised skin barriers'],
    notSuitableFor: ['Those with known sensitivity to any listed ingredients', 'Anyone who cannot take supplement oils after meals', 'Without clinician advice if you are on blood thinners'],
    evidenceLevel: 'Strong',
    evidenceNote: 'Vitamin D supplementation for psoriasis is supported by multiple clinical trials showing PASI improvement. Omega-3 meta-analyses demonstrate reduced inflammation and severity scores. The combination provides synergistic benefits not achievable with either alone, and both package formats deliver the same nutrient base.',
    affiliateUrl: 'https://s.shopee.com.my/5q6059Ul9O',
    isHero: true,
    rating: 5,
    imageUrl: '/products/Suntera_D3K2Plus_softgel.JPG',
    purchaseOptions: [
      {
        id: 'sachet',
        label: 'Sachet Version',
        subtitle: 'Liquid oil in olive oil base',
        dosage: 'Take 2 sachets daily after meals',
        packInfo: '30 sachets per box, about 2 boxes for a 30-day supply',
        supplyBadge: '30-day supply',
        note: 'Best for anyone who prefers a sachet format. Two sachets daily makes one box last about 15 days.',
        imageUrl: '/products/Suntera_D3K2Plus_softgel.JPG',
        affiliateUrl: 'https://s.shopee.com.my/5q6059Ul9O',
      },
      {
        id: 'softgel',
        label: 'Softgel Version',
        subtitle: 'Oil-based softgel capsules',
        dosage: 'Take 4 softgels daily after meals',
        packInfo: '60 softgels per bottle, about 2 bottles for a 30-day supply',
        supplyBadge: '30-day supply',
        note: 'Best for anyone who prefers a softgel format. Four softgels daily makes one bottle last about 15 days.',
        imageUrl: '/products/Suntera_D3K2Plus_softgel.png',
        affiliateUrl: 'https://s.shopee.com.my/5fmZtDJ0f8',
      },
    ],
    images: [
      '/products/Suntera_D3K2Plus_softgel.JPG',
      '/products/Suntera_D3K2Plus_softgel.png',
    ],
    testimonialImage: '/e-book-landing-pages/placeholder-testimonial.svg',
    testimonialText: 'After adding D3K2 with Omega to my daily routine, my flare-ups reduced significantly within weeks. My skin feels healthier and I no longer rely on topical creams as much.',
    testimonialAuthor: 'Sarah M., Psoriasis Warrior',
  },
  {
    id: 'omega-3',
    name: 'Omega-3 (Fish Oil)',
    brand: 'Nordic Naturals',
    category: 'Inflammatory Response',
    shortDesc: 'Powerful anti-inflammatory that addresses the systemic inflammation driving psoriasis.',
    whyItHelps: 'Psoriasis is an inflammatory condition. Omega-3s (EPA and DHA) are precursors to resolvins — molecules that actively resolve inflammation. Most modern diets are high in omega-6 (pro-inflammatory) and low in omega-3 (anti-inflammatory). Rebalancing this ratio can reduce flare severity.',
    howItWorks: 'EPA and DHA integrate into cell membranes and reduce production of inflammatory cytokines (IL-17, TNF-alpha) that are elevated in psoriasis. They also support skin barrier integrity and moisture retention.',
    keyIngredients: ['EPA (eicosapentaenoic acid) 650 mg', 'DHA (docosahexaenoic acid) 450 mg'],
    dosage: '2 softgels daily (2000 mg combined EPA+DHA)',
    bestTime: 'With meals to improve absorption and reduce fish burps',
    safety: ['Mild blood thinning effect — check if on anticoagulants', 'Choose IFOS-certified for purity', 'Store in fridge after opening'],
    suitableFor: ['Most people with psoriasis', 'Those with limited fatty fish intake', 'People wanting cardiovascular support alongside skin support'],
    notSuitableFor: ['Those on warfarin without doctor approval', 'Fish/shellfish allergy (consider algae-based)'],
    evidenceLevel: 'Strong',
    evidenceNote: 'Meta-analyses show omega-3 supplementation reduces psoriasis area and severity index (PASI). EPA seems more effective than DHA for inflammatory conditions.',
    affiliateUrl: '#',
    isHero: false,
    rating: 5,
  },
  {
    id: 'zinc-picolinate',
    name: 'Zinc Picolinate',
    brand: 'Solgar',
    category: 'Skin Healing & Immune',
    shortDesc: 'Essential mineral for skin repair, immune regulation, and wound healing. Often low in psoriasis patients.',
    whyItHelps: 'Zinc is critical for skin cell division, repair, and immune function. Psoriasis involves both accelerated skin cell turnover and immune dysregulation. Zinc deficiency is more common in people with psoriasis, and supplementation can help normalise skin cell production and reduce inflammation.',
    howItWorks: 'Zinc acts as a cofactor for enzymes involved in DNA synthesis and cell division. It modulates the immune response by regulating T-cell activity and reducing inflammatory cytokine production. Also supports collagen formation for skin integrity.',
    keyIngredients: ['Zinc picolinate 25 mg (providing 5 mg elemental zinc)'],
    dosage: '1 capsule daily with food',
    bestTime: 'With a meal (avoid coffee/tea within 1 hour)',
    safety: ['Do not exceed 40 mg daily long-term', 'Can cause nausea on empty stomach', 'Long-term high dose requires copper monitoring'],
    suitableFor: ['Those with low zinc intake (vegans, restricted diets)', 'People with frequent flare-ups', 'Those with slow-healing skin'],
    notSuitableFor: ['Long-term high-dose without copper monitoring'],
    evidenceLevel: 'Moderate',
    evidenceNote: 'Studies show lower serum zinc levels in psoriasis patients. Supplementation studies show improvement in lesion healing and reduced inflammation markers.',
    affiliateUrl: '#',
    isHero: false,
    rating: 4,
  },
  {
    id: 'quercetin',
    name: 'Quercetin',
    brand: 'NOW Foods',
    category: 'Mast Cell & Histamine',
    shortDesc: 'Plant flavonoid that stabilises mast cells and reduces histamine-driven inflammation and itch.',
    whyItHelps: 'Many people with psoriasis also have histamine intolerance or mast cell activation. Quercetin is a natural mast cell stabiliser — it prevents the release of histamine and other inflammatory mediators that can trigger or worsen flare-ups. It also acts as a powerful antioxidant protecting skin cells from oxidative stress.',
    howItWorks: 'Inhibits mast cell degranulation, reducing histamine release. Also inhibits NF-kB pathway, reducing production of pro-inflammatory cytokines. Its antioxidant activity protects keratinocytes from damage.',
    keyIngredients: ['Quercetin dihydrate 500 mg'],
    dosage: '1 capsule, 1-2 times daily',
    bestTime: 'Between meals for better absorption',
    safety: ['Can interact with blood thinners and thyroid medication', 'Start with lower dose to test tolerance', 'May cause mild headache initially'],
    suitableFor: ['Those with itching as a primary symptom', 'People with histamine intolerance symptoms', 'Those wanting antioxidant support'],
    notSuitableFor: ['Pregnant or nursing without doctor approval', 'Those on blood thinners without checking', 'Those with thyroid conditions without monitoring'],
    evidenceLevel: 'Moderate',
    evidenceNote: 'Research shows quercetin reduces inflammatory markers in skin conditions. Clinical studies specifically for psoriasis are limited but mechanistic evidence is strong.',
    affiliateUrl: '#',
    isHero: false,
    rating: 4,
  },
  {
    id: 'probiotic',
    name: 'Probiotic (Multi-Strain)',
    brand: 'Jarrow Formulas',
    category: 'Gut-Skin Axis',
    shortDesc: 'The gut-skin connection is real. Balanced gut microbiome reduces systemic inflammation.',
    whyItHelps: 'The gut-skin axis is well-established. Psoriasis is linked with gut dysbiosis (imbalanced gut bacteria), leaky gut, and intestinal inflammation. A diverse probiotic helps restore healthy gut flora, reduces intestinal permeability, and lowers the inflammatory load reaching the skin.',
    howItWorks: 'Probiotics support the gut barrier, reducing LPS (lipopolysaccharide) translocation that triggers systemic inflammation. Specific strains like Lactobacillus and Bifidobacterium produce short-chain fatty acids that regulate immune responses, including those involved in psoriasis.',
    keyIngredients: [
      'Lactobacillus acidophilus',
      'Bifidobacterium lactis',
      'Lactobacillus plantarum',
      'Saccharomyces boulardii',
    ],
    dosage: '1 capsule daily (25 billion CFU)',
    bestTime: 'On empty stomach, 30 min before breakfast',
    safety: ['Start with lower CFU if new to probiotics', 'May cause temporary bloating/gas', 'Space 2 hours apart from antibiotics'],
    suitableFor: ['Those with digestive issues alongside psoriasis', 'People after antibiotic use', 'Those wanting immune support'],
    notSuitableFor: ['Immunocompromised without checking with doctor', 'Those with acute pancreatitis'],
    evidenceLevel: 'Moderate',
    evidenceNote: 'Multiple studies show altered gut microbiome in psoriasis patients. Probiotic supplementation improves inflammatory markers and some studies show modest improvement in psoriasis severity.',
    affiliateUrl: '#',
    isHero: false,
    rating: 4,
  },
  {
    id: 'magnesium-glycinate',
    name: 'Magnesium Glycinate',
    brand: 'Doctor\'s Best',
    category: 'Stress & Sleep',
    shortDesc: 'Stress and poor sleep are top flare triggers. Magnesium supports both while calming the nervous system.',
    whyItHelps: 'Stress is the #1 reported trigger for psoriasis flare-ups. Magnesium regulates the nervous system, reduces cortisol, improves sleep quality, and supports skin barrier function. The glycinate form is gentle on digestion and highly absorbable — perfect for long-term daily use.',
    howItWorks: 'Magnesium binds to GABA receptors promoting calm and sleep. It regulates cortisol production, reducing stress-driven inflammation. Magnesium also supports keratinocyte differentiation and skin barrier integrity. Glycine (the chelated amino acid) further supports sleep and collagen production.',
    keyIngredients: ['Magnesium bisglycinate (elemental magnesium 200 mg)'],
    dosage: '2 capsules before bed (400 mg elemental magnesium)',
    bestTime: '30-60 minutes before bedtime',
    safety: ['Reduce dose if loose stools occur', 'Magnesium oxide is cheaper but poorly absorbed — avoid for sleep', 'Check with doctor if kidney impairment'],
    suitableFor: ['Those with stress-triggered flare-ups', 'People with poor sleep quality', 'Those with muscle tension or cramps'],
    notSuitableFor: ['Those with severe kidney impairment without checking', 'Those taking certain antibiotics (space apart)'],
    evidenceLevel: 'Moderate',
    evidenceNote: 'While direct psoriasis studies are limited, magnesium\'s role in stress reduction, sleep quality, and inflammation regulation is well-established. Stress reduction alone significantly improves psoriasis outcomes.',
    affiliateUrl: '#',
    isHero: false,
    rating: 5,
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha (KSM-66)',
    brand: 'NOW Foods',
    category: 'Stress & Cortisol',
    shortDesc: 'Adaptogenic herb that lowers cortisol and reduces stress-triggered flare-ups.',
    whyItHelps: 'Chronic stress elevates cortisol, which dysregulates the immune system and triggers psoriasis flare-ups. Ashwagandha is a well-studied adaptogen that normalises cortisol levels, reduces anxiety, and helps the body adapt to stress — breaking the stress-flare cycle.',
    howItWorks: 'KSM-66 ashwagandha reduces serum cortisol by regulating the HPA axis. It also modulates immune function by balancing Th1/Th2 responses, reducing the inflammatory cytokines involved in psoriasis. Improves sleep quality and reduces anxiety.',
    keyIngredients: ['Withania somnifera root extract (KSM-66) 600 mg'],
    dosage: '1 capsule daily with food',
    bestTime: 'Morning or early afternoon (can be energising for some)',
    safety: ['Avoid if hyperthyroid or autoimmune thyroid', 'Take a 1-week break every 2-3 months', 'Can lower blood pressure and blood sugar'],
    suitableFor: ['Those with stress-driven flare-ups', 'People with high cortisol symptoms (belly fat, poor sleep, anxiety)', 'Those wanting adaptogenic support'],
    notSuitableFor: ['Pregnant or nursing', 'Those with thyroid conditions without checking', 'Those on sedatives or thyroid medication'],
    evidenceLevel: 'Moderate',
    evidenceNote: 'Multiple human trials show ashwagandha significantly reduces cortisol (22-28% reduction) and stress scores. Direct psoriasis research is emerging but mechanistic link is strong.',
    affiliateUrl: '#',
    isHero: false,
    rating: 4,
  },
  {
    id: 'curcumin',
    name: 'Curcumin (BioPerine)',
    brand: 'Nature\'s Bounty',
    category: 'Inflammatory Response',
    shortDesc: 'Potent natural anti-inflammatory that targets the same pathways as some prescription psoriasis medications.',
    whyItHelps: 'Curcumin inhibits NF-kB and TNF-alpha — the same inflammatory pathways targeted by biologic psoriasis medications like Humira. It is one of the most potent natural anti-inflammatories and addresses the root inflammatory process driving psoriasis.',
    howItWorks: 'Curcumin blocks NF-kB activation, reducing production of inflammatory cytokines (TNF-alpha, IL-6, IL-17). It also inhibits COX-2 and LOX enzymes involved in inflammation. BioPerine (black pepper extract) increases absorption by 2000%.',
    keyIngredients: ['Curcumin C3 Complex 500 mg', 'BioPerine (piperine) 5 mg'],
    dosage: '1 capsule, 2 times daily with meals',
    bestTime: 'With meals containing fat for best absorption',
    safety: ['Can thin blood — avoid if on blood thinners without checking', 'May cause mild digestive upset', 'Avoid if gallstones or bile duct obstruction'],
    suitableFor: ['Those with moderate to severe inflammation', 'People wanting natural anti-inflammatory support', 'Those with joint pain alongside psoriasis (psoriatic arthritis)'],
    notSuitableFor: ['Those on blood thinners', 'Pregnant or nursing', 'Those with gallbladder issues'],
    evidenceLevel: 'Moderate',
    evidenceNote: 'Studies show curcumin reduces psoriasis severity (PASI scores) and inflammatory markers. A 2021 randomised controlled trial found curcumin combined with topical treatment improved outcomes more than topical treatment alone.',
    affiliateUrl: '#',
    isHero: false,
    rating: 4,
  },
];
