/**
 * Central portfolio data — Akash Gawali.
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 * Only add facts you can back up in an interview or client call.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Akash Gawali',
  displayName: 'Akash Gawali',
  firstName: 'AKASH',
  seriesTag: '',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A GAWALI ORIGINAL',
  role: 'Data Scientist & AI Engineer',
  tagline: ['Data Scientist', 'AI Engineer', 'Freelancer'],
  /** The one line a client reads first on the landing page: what you do for them. */
  offer: 'I build AI tools, dashboards and websites for businesses — from idea to launch.',
  intro:
    'AI & Data Professional specializing in Data Analytics, Machine Learning, Generative AI, and technical training. I build intelligent solutions, transform complex data into meaningful insights, and help aspiring professionals build real-world technical skills.',
  about: {
    quote: 'I build practical AI that solves real problems — and I help others learn to build it too.',
    paragraphs: [
      'A Data Scientist and AI Solutions Engineer from Pune. I build practical, data-driven systems for real-world problems: predictive models, computer vision, generative AI applications and dashboards that teams actually use every day.',
      "By day, I'm a Data Scientist and Technical Project Lead at Globe Creater, building a digital archive and document management platform and running security and quality testing before every release. Before that, I worked on an AI-powered analytics dashboard covering districts across Maharashtra, and built end-to-end ML pipelines as an AI/ML intern.",
      'Independently, I take on a small number of freelance projects — AI tools, dashboards and business websites — for startups, small businesses and institutes. Every project gets a clear written scope, weekly updates and a proper handover.',
      "Teaching is close to my heart. I've trained 100+ students and professionals in Python, SQL, Power BI and machine learning through hands-on sessions, workshops and mock interviews — bridging the gap between classroom learning and real-world work.",
      "I believe in continuous learning and practical problem-solving. If you have a problem that data or AI can solve, let's talk.",
    ],
  },
  location: 'Pune, Maharashtra',
  email: 'akashgawali736@gmail.com',
  /**
   * WhatsApp number for the Contact section, with country code and no spaces or "+", e.g. '919876543210'.
   * Leave empty ('') to hide the WhatsApp button.
   */
  whatsapp: '917350501320',
  /**
   * Contact form: create a free form at https://formspree.io (sign in with your Gmail),
   * then paste its ID here, e.g. 'xyzabcd'. Messages arrive in your inbox.
   * Leave empty and the form opens the visitor's email app with the message filled in.
   */
  formspreeId: '',
  links: {
    linkedin: 'https://www.linkedin.com/in/akash-gawali1301',
    github: 'https://github.com/Akash-gawali-13',
  },
  githubHandle: 'Akash-gawali-13',
  resumePdf: './assets/Akash_Gawali_Resume.pdf',
  resumeFileName: 'Akash_Gawali_Resume.pdf',
  /** Landing page photo: full photo + the same photo with Akash and the bike cut out (pixel-aligned). */
  hero: {
    // AI-upscaled (Real-ESRGAN 2x) so the photo stays sharp on large screens. Sources are in hero-src/.
    bg: './assets/hero-bg-1600.webp',
    bgSet: './assets/hero-bg-1600.webp 1600w, ./assets/hero-bg-2560.webp 2560w',
    fg: './assets/hero-fg-1600.webp',
    fgSet: './assets/hero-fg-1600.webp 1600w, ./assets/hero-fg-2560.webp 2560w',
    plate: './assets/hero-plate.webp',
    alt: 'Akash Gawali leaning on his motorcycle above a valley bridge',
    /** Horizontal position of Akash's body in the photo (0–1) — used to frame him on screen. */
    focus: 0.59,
  },
  portrait: {
    src: './assets/portrait-720.webp',
    srcSet: './assets/portrait-420.webp 420w, ./assets/portrait-720.webp 720w, ./assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Akash Gawali',
  },
  /** Freelance services, shown as chips in About. */
  interests: ['AI tools & automation', 'Dashboards & analytics', 'Business websites', 'Training & workshops'],
  openToFreelance: true,
};

export const education = [
  {
    school: 'Savitribai Phule Pune University',
    place: 'Pune',
    degree: 'B.Sc. Data Science',
    period: '2022 – 2025',
    score: 'Graduated 2025',
  },
];

export const experience = [
  {
    company: 'Globe Creater Services LLP',
    role: 'Data Scientist & Technical Project Lead',
    place: 'Pune',
    period: 'Jun 2026 – Present',
    points: [
      'Building a digital archive and document management system: ingestion workflows, metadata pipelines, audit trails and traceability.',
      'Running pre-deployment security and quality testing (OWASP checks, VAPT, server hardening) before release.',
      'Training student batches in SQL, Excel, Power BI and machine learning, including mock technical interviews.',
    ],
  },
  {
    company: 'Novarties Tech System',
    role: 'Data Analyst',
    place: 'Pune',
    period: 'Aug 2025 – Jun 2026',
    points: [
      'Worked on an AI-integrated analytics dashboard covering multiple districts across Maharashtra.',
      'Owned data collection, cleaning, validation and transformation for large administrative datasets.',
      'Designed dashboards for district-wise KPI tracking, comparison and reporting.',
    ],
  },
  {
    company: 'Labtech Innovations',
    role: 'AI/ML Engineer Intern',
    place: 'Pune',
    period: 'Jun 2025 – Aug 2025',
    points: [
      'Built end-to-end ML pipelines on real datasets: cleaning, feature selection, training and evaluation.',
      'Compared algorithms on accuracy and trade-offs, and presented findings to the team.',
    ],
  },
];

/** Freelance services — the "Now Booking" section. */
export type Service = { id: string; title: string; text: string; deliver: string; palette: Palette };

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  /** Where the work was done — shown as a badge. */
  kind: 'Industry' | 'Freelance' | 'Personal';
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Omit when the repository isn't public — the GitHub button is hidden instead of linking to a 404. */
  github?: string;
  /** One-line result shown on the card ("Outcome"). Use real results; add numbers when you have them. */
  outcome?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants' | 'bars' | 'iris' | 'hand' | 'browser';
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const projects: Project[] = [
  {
    id: 'district-dashboard',
    outcome: 'One platform for multi-district reporting — officials ask questions in plain language instead of digging through spreadsheets.',
    title: 'District Intelligence Dashboard',
    year: '2025',
    genre: 'AI • Analytics • Government',
    kind: 'Industry',
    logline: 'Village, tehsil and district data from scattered sources, unified into one platform with an AI chatbot that answers in plain language.',
    stack: ['Python', 'SQL', 'Power BI', 'LLM integration'],
    build: [
      'Brought fragmented administrative data from multiple sources into one unified data model, covering multiple districts across Maharashtra.',
      'Built interactive KPI dashboards for district-wise tracking, comparison and reporting, plus an AI chatbot for natural-language queries.',
    ],
    features: [
      'Unified data model across village, tehsil and district levels',
      'District-wise KPI dashboards and comparison views',
      'AI chatbot that answers questions in plain language',
      'Data cleaning, validation and transformation pipelines',
    ],
    metrics: [
      { value: 'Multi', label: 'districts across Maharashtra' },
      { value: '3', label: 'levels: village, tehsil, district' },
      { value: 'AI', label: 'plain-language querying' },
      { value: '1', label: 'unified data platform' },
    ],
    palette: amber,
    motif: 'bars',
  },
  {
    id: 'digital-archive',
    outcome: 'Documents ingested, searchable and fully traceable — released only after passing OWASP and VAPT checks.',
    title: 'Digital Archive & DMS',
    year: '2026',
    genre: 'Django • Security • Document Management',
    kind: 'Industry',
    logline: 'Large-scale document ingestion with metadata, audit logging and full traceability — security-tested before going live.',
    stack: ['Python', 'Django', 'PostgreSQL', 'Search'],
    build: [
      'Built ingestion workflows and metadata pipelines for a large-scale digital archive and document management system.',
      'Ran pre-deployment security and quality testing — OWASP checks, VAPT and server hardening — before release.',
    ],
    features: [
      'Bulk document ingestion workflows',
      'Metadata management and search',
      'Audit trails and full traceability',
      'OWASP checks, VAPT and server hardening before go-live',
    ],
    metrics: [
      { value: 'OWASP', label: 'security checks before release' },
      { value: 'VAPT', label: 'vulnerability assessment' },
      { value: 'Full', label: 'audit trail & traceability' },
    ],
    palette: crimson,
    motif: 'shield',
  },
  {
    id: 'globe-creater-site',
    outcome: "A clearer, responsive site that explains the company's services and training programs at a glance.",
    title: 'Globe Creater Website',
    year: '2026',
    genre: 'Web • Brand • Responsive',
    kind: 'Industry',
    logline: "A new visual identity and responsive site that explains the company's technology services and training programs clearly.",
    stack: ['HTML', 'CSS', 'JavaScript'],
    build: [
      "Redesigned the company's digital presence with a new visual identity and a responsive, mobile-first layout.",
      'Structured the content so visitors quickly understand the technology services and training programs on offer.',
    ],
    features: ['New visual identity', 'Responsive, mobile-first layout', 'Services and training program pages'],
    metrics: [
      { value: 'New', label: 'visual identity' },
      { value: 'All', label: 'screen sizes supported' },
    ],
    palette: ocean,
    motif: 'browser',
  },
  {
    id: 'sign-language',
    outcome: 'Gestures translated live from a webcam feed — a working prototype for more inclusive communication.',
    title: 'Sign Language Recognition',
    year: '2025',
    genre: 'Computer Vision • Deep Learning',
    kind: 'Personal',
    logline: 'A deep learning model that reads hand gestures from a webcam and translates them in real time.',
    stack: ['Python', 'OpenCV', 'Deep learning'],
    build: [
      'Trained a deep learning model to recognise hand gestures captured from a live webcam feed.',
      'Translated recognised signs in real time to ease communication between hearing and deaf people.',
    ],
    features: ['Live webcam input with OpenCV', 'Gesture classification model', 'Real-time translation output'],
    metrics: [
      { value: 'Live', label: 'webcam translation' },
      { value: 'CV', label: 'OpenCV + deep learning' },
    ],
    palette: violet,
    motif: 'hand',
  },
  {
    id: 'iris-verification',
    outcome: 'Identity verified from two iris images in a simple web app anyone can try.',
    title: 'Iris Verification Engine',
    year: '2025',
    genre: 'Biometrics • Siamese Networks',
    kind: 'Personal',
    logline: 'A Siamese neural network that compares iris patterns to verify identity, served through a Streamlit app.',
    stack: ['TensorFlow', 'Siamese networks', 'Streamlit'],
    build: [
      'Built a Siamese neural network that learns a similarity measure between pairs of iris images.',
      'Wrapped the model in a Streamlit app so anyone can upload two images and get a verification result.',
    ],
    features: ['Pairwise iris comparison', 'Similarity-based verification', 'Streamlit demo app'],
    metrics: [
      { value: '2', label: 'images in, one verdict out' },
      { value: 'Web', label: 'Streamlit demo' },
    ],
    palette: jade,
    motif: 'iris',
  },
  {
    id: 'resume-screening',
    outcome: 'First-round screening becomes faster and more consistent with a ranked shortlist.',
    title: 'Resume Screening & Ranking',
    year: '2025',
    genre: 'NLP • Hiring • Transformers',
    kind: 'Personal',
    logline: 'Ranks candidates by matching resumes to a job description on skills and experience.',
    stack: ['Python', 'spaCy', 'Transformers'],
    build: [
      'Parsed resumes and job descriptions with spaCy and transformer embeddings to extract skills and experience.',
      'Scored and ranked candidates by relevance, making first-round screening faster and more consistent.',
    ],
    features: ['Resume and JD parsing', 'Skill and keyword similarity scoring', 'Ranked candidate shortlist'],
    metrics: [
      { value: 'NLP', label: 'skill matching' },
      { value: 'Top-N', label: 'ranked shortlist' },
    ],
    palette: amber,
    motif: 'flow',
  },
  {
    id: 'job-automation',
    outcome: 'Repetitive searching and form-filling turned into a few automated steps.',
    title: 'Job Application Automation',
    year: '2025',
    genre: 'Automation • Scraping',
    kind: 'Personal',
    logline: 'Collects relevant listings, filters them by your criteria and automates the repetitive parts of applying.',
    stack: ['Python', 'Selenium'],
    build: [
      'Automated collection of job listings and filtered them against role, location and skill criteria.',
      'Scripted the repetitive steps of the application flow to save hours of manual work.',
    ],
    features: ['Listing collection', 'Criteria-based filtering', 'Automated application steps'],
    metrics: [
      { value: 'Auto', label: 'collect, filter, apply' },
      { value: '3', label: 'steps automated' },
    ],
    palette: ocean,
    motif: 'tenants',
  },
];

export const services: Service[] = [
  {
    id: 'ai-tools',
    title: 'AI tools & automation',
    text: 'Chatbots that answer from your own documents, smart search, resume or document screening, and scripts that remove repetitive manual work.',
    deliver: 'A working tool, source code and a short guide for your team.',
    palette: crimson,
  },
  {
    id: 'dashboards',
    title: 'Dashboards & analytics',
    text: 'Your sales, operations or student data cleaned up and turned into Power BI or web dashboards that answer the questions you ask every week.',
    deliver: 'A live dashboard, cleaned dataset and KPI definitions.',
    palette: amber,
  },
  {
    id: 'websites',
    title: 'Business websites',
    text: 'Fast, responsive websites for small businesses, with an admin panel so you can update content without calling a developer.',
    deliver: 'A deployed site, admin access and handover on your own domain.',
    palette: ocean,
  },
  {
    id: 'training',
    title: 'Training & workshops',
    text: 'Hands-on sessions in Python, SQL, Power BI and applied AI for colleges, institutes and company teams — built from real projects.',
    deliver: 'Session plan, practice datasets, assignments and answer keys.',
    palette: jade,
  },
];

export const process = [
  { title: 'Call', text: 'A 30-minute call to understand the problem and what success looks like.' },
  { title: 'Proposal', text: 'A written scope, timeline and fixed quote within two working days.' },
  { title: 'Build', text: 'Short milestones with a demo or update every week.' },
  { title: 'Handover', text: 'Code, access and documentation, plus two weeks of fixes included.' },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'learners',
    title: '100+ Learners Trained',
    org: 'Python · SQL · Power BI · ML',
    detail: 'Trained student batches in industry-oriented data skills, including practice tests and mock technical interviews.',
    laurel: 'Trainer',
  },
  {
    id: 'solutions',
    title: '5+ AI/ML Solutions',
    org: 'Industry & personal',
    detail: 'From a government analytics dashboard to computer vision and NLP systems — built end to end.',
    laurel: 'Builder',
  },
  {
    id: 'project-lead',
    title: 'Technical Project Lead',
    org: 'Globe Creater',
    detail: 'Leading delivery of a digital archive and document management system within a year of graduating.',
    laurel: 'Leadership',
  },
  {
    id: 'security',
    title: 'Security-First Releases',
    org: 'OWASP · VAPT',
    detail: 'Ran pre-deployment security and quality testing, including OWASP checks, VAPT and server hardening.',
    laurel: 'Quality',
  },
  {
    id: 'workshop',
    title: 'AI in Design Workshop',
    org: 'Globe Creater · Oct 2026',
    detail: 'Co-ran a hands-on workshop for art and design students on using AI in creative work.',
    laurel: 'Workshop',
  },
];

export type Testimonial = { quote: string; name: string; role: string };

/**
 * What clients, students or colleagues say. The Testimonials section appears automatically
 * once this list has at least one item. Only add real quotes, with permission. Example:
 * { quote: 'Akash built our dashboard in two weeks and explained everything clearly.', name: 'Priya S.', role: 'Founder, Example Co.' },
 */
export const testimonials: Testimonial[] = [];

export type Certification = { issuer: string; name: string; link: string };

/** Add your certificates here — the "Certified" rail appears automatically once this list has items. */
export const certifications: Certification[] = [];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Python is the primary language',
    skills: [
      { name: 'Python', mono: 'Py', note: 'Primary' },
      { name: 'SQL', mono: 'Sq' },
      { name: 'JavaScript', mono: 'Js' },
      { name: 'HTML / CSS', mono: 'Ht' },
    ],
  },
  {
    id: 'ml',
    title: 'ML & AI',
    subtitle: 'Models, vision and language',
    skills: [
      { name: 'scikit-learn', mono: 'Sk' },
      { name: 'TensorFlow', mono: 'Tf' },
      { name: 'OpenCV', mono: 'Cv' },
      { name: 'spaCy', mono: 'Sp' },
      { name: 'Transformers', mono: 'Tr' },
      { name: 'Generative AI / LLMs', mono: 'Ai' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & BI',
    subtitle: 'From raw data to decisions',
    skills: [
      { name: 'Pandas', mono: 'Pd' },
      { name: 'Power BI', mono: 'Bi' },
      { name: 'Excel', mono: 'Xl' },
      { name: 'Streamlit', mono: 'St' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Data',
    subtitle: 'Shipping real systems',
    skills: [
      { name: 'Django', mono: 'Dj' },
      { name: 'PostgreSQL', mono: 'Pg' },
      { name: 'MySQL', mono: 'My' },
      { name: 'REST APIs', mono: 'Ap' },
    ],
  },
  {
    id: 'quality',
    title: 'Testing & Security',
    subtitle: 'Before anything goes live',
    skills: [
      { name: 'OWASP checks', mono: 'Ow' },
      { name: 'VAPT', mono: 'Va' },
      { name: 'Server hardening', mono: 'Sh' },
      { name: 'Selenium', mono: 'Se' },
    ],
  },
  {
    id: 'teaching',
    title: 'Teaching',
    subtitle: 'Training the next batch',
    skills: [
      { name: 'Curriculum design', mono: 'Cu' },
      { name: 'Mock interviews', mono: 'Mi' },
      { name: 'Workshops', mono: 'Wk' },
    ],
  },
];

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears in the projects and roles.
 */
export const skillEvidence: Record<string, string[]> = {
  Python: ['District Intelligence Dashboard', 'Digital Archive & DMS', 'Sign Language Recognition', 'Resume Screening & Ranking'],
  SQL: ['District Intelligence Dashboard', 'Data Analyst — Novarties', 'SQL batches at Globe Creater'],
  JavaScript: ['Globe Creater Website'],
  'HTML / CSS': ['Globe Creater Website'],
  'scikit-learn': ['AI/ML Engineer Intern — Labtech'],
  TensorFlow: ['Iris Verification Engine'],
  OpenCV: ['Sign Language Recognition'],
  spaCy: ['Resume Screening & Ranking'],
  Transformers: ['Resume Screening & Ranking'],
  'Generative AI / LLMs': ['District Intelligence Dashboard — AI chatbot'],
  Pandas: ['AI/ML Engineer Intern — Labtech'],
  'Power BI': ['District Intelligence Dashboard', 'Power BI training batches'],
  Excel: ['Data Analyst — Novarties', 'Excel training batches'],
  Streamlit: ['Iris Verification Engine'],
  Django: ['Digital Archive & DMS'],
  PostgreSQL: ['Digital Archive & DMS'],
  'REST APIs': ['Digital Archive & DMS'],
  'OWASP checks': ['Digital Archive & DMS'],
  VAPT: ['Digital Archive & DMS'],
  'Server hardening': ['Digital Archive & DMS'],
  Selenium: ['Job Application Automation'],
  'Mock interviews': ['Globe Creater training'],
  Workshops: ['AI in Design workshop'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Beginning',
    period: '2022 – 2025',
    synopsis: 'B.Sc. in Data Science at Savitribai Phule Pune University — and the first models, built for fun.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Student',
        description: 'B.Sc. Data Science at Savitribai Phule Pune University — statistics, programming and machine learning foundations.',
        tags: ['B.Sc.', 'Data Science', 'SPPU'],
        runtime: '2022 – 2025',
        palette: amber,
      },
      {
        code: 'S01 E02',
        title: 'The Experiments',
        description: 'Personal projects in computer vision, biometrics and NLP: sign language recognition, iris verification and resume ranking.',
        tags: ['OpenCV', 'TensorFlow', 'spaCy'],
        runtime: 'Side projects',
        palette: violet,
      },
    ],
  },
  {
    number: 2,
    title: 'The Intern',
    period: '2025',
    synopsis: 'AI/ML Engineer Intern at Labtech Innovations, Pune.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The Pipeline',
        description: 'End-to-end ML pipelines on real datasets — cleaning, feature selection, training and evaluation.',
        tags: ['Python', 'scikit-learn', 'Pandas'],
        runtime: 'Jun – Aug 2025',
        palette: jade,
      },
      {
        code: 'S02 E02',
        title: 'The Comparison',
        description: 'Compared algorithms on accuracy and trade-offs, and presented the findings to the team.',
        tags: ['Model evaluation', 'Presenting'],
        runtime: 'Labtech',
        palette: ocean,
      },
    ],
  },
  {
    number: 3,
    title: 'The Analyst',
    period: '2025 – 2026',
    synopsis: 'Data Analyst at Novarties Tech System, on a district-level government dashboard.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'The Clean-Up',
        description: 'Owned data collection, cleaning, validation and transformation for large administrative datasets.',
        tags: ['SQL', 'Excel', 'Python'],
        runtime: 'Aug 2025 – Jun 2026',
        palette: amber,
      },
      {
        code: 'S03 E02',
        title: 'The Dashboard',
        description: 'Designed district-wise KPI dashboards with an AI chatbot covering multiple districts across Maharashtra.',
        tags: ['Power BI', 'LLM', 'KPIs'],
        runtime: 'Novarties',
        palette: crimson,
      },
    ],
  },
  {
    number: 4,
    title: 'The Lead',
    period: '2026 – Present',
    synopsis: 'Data Scientist, Trainer and Technical Project Lead at Globe Creater Services LLP.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'The Archive',
        description: 'Building a digital archive and document management system — ingestion, metadata, audit trails and traceability.',
        tags: ['Django', 'PostgreSQL'],
        runtime: 'Jun 2026 – Present',
        palette: ocean,
      },
      {
        code: 'S04 E02',
        title: 'The Tester',
        description: 'Pre-deployment security and quality testing: OWASP checks, VAPT and server hardening.',
        tags: ['OWASP', 'VAPT', 'Security'],
        runtime: 'Before go-live',
        palette: crimson,
      },
      {
        code: 'S04 E03',
        title: 'The Trainer',
        description: 'Training student batches in SQL, Excel, Power BI and ML — plus mock interviews and an AI-in-design workshop.',
        tags: ['SQL', 'Power BI', '100+ learners'],
        runtime: 'Globe Creater',
        palette: jade,
      },
    ],
  },
  {
    number: 5,
    title: 'Going Independent',
    period: 'Now streaming',
    synopsis: 'Alongside the day job: a small number of freelance projects for businesses that need data or AI done properly.',
    episodes: [
      {
        code: 'S05 E01',
        title: 'The Freelancer',
        description: 'AI tools, dashboards, business websites and training — scoped clearly, delivered on time, outside work hours.',
        tags: ['Freelance', 'AI', 'Dashboards', 'Websites'],
        runtime: 'Open for projects',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Primary language', title: 'Python', detail: 'Pipelines, models, Django and automation', palette: amber },
  { label: 'The big production', title: 'District Dashboard', detail: 'Multi-district • AI chatbot', palette: crimson },
  { label: 'Current role', title: 'Project Lead', detail: 'Globe Creater Services LLP', palette: ocean },
  { label: 'Classroom', title: '100+', detail: 'Learners trained in data skills', palette: violet },
  { label: 'Delivered', title: '5+ AI/ML', detail: 'Solutions built end to end', palette: jade },
  { label: 'BI weapon', title: 'Power BI', detail: 'Dashboards & KPI reporting', palette: amber },
  { label: 'Vision', title: 'Sign Language', detail: 'Real-time webcam translation', palette: crimson },
  { label: 'Security', title: 'OWASP · VAPT', detail: 'Tested before every release', palette: ocean },
  { label: 'Foundation', title: 'B.Sc. Data Science', detail: 'SPPU • 2025', palette: jade },
  { label: 'Now booking', title: 'Freelance', detail: 'AI tools • dashboards • websites', palette: violet },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'About',
    title: "Hi, I'm Akash",
    lines: [
      'AI Solutions Engineer & Data Scientist · Pune',
      'I build practical AI and data systems — and help others learn to build them',
    ],
    chips: ['Machine Learning', 'Generative AI', 'Data Analytics', 'Business Intelligence'],
  },
  {
    kicker: 'Projects',
    title: `${projects.length} Projects`,
    lines: ['District Intelligence Dashboard — AI over multi-district data', 'Digital Archive — OWASP & VAPT tested', 'Vision, biometrics and NLP side projects'],
  },
  {
    kicker: 'Freelance',
    title: 'Now Booking',
    lines: ['AI tools · Dashboards · Business websites · Training', 'Clear scope, weekly updates, replies within 24 hours'],
  },
  {
    kicker: 'Current mission',
    title: "Let's build",
    lines: ['Turning messy data into systems people actually use'],
  },
];
export type SectionId = 'about' | 'journey' | 'originals' | 'services' | 'picks' | 'skills' | 'moments' | 'story' | 'testimonials' | 'contact';

/** Order the sections play in after the landing page. */
// Client-first order: what I offer → proof → who I am → what others say → get in touch.
// 'testimonials' is skipped automatically while the testimonials list is empty.
export const sectionOrder: SectionId[] = ['services', 'originals', 'about', 'testimonials', 'contact'];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Who I am', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Work', card: 'My Work', meta: `${projects.length} Projects • Industry & personal`, palette: crimson },
  services: { nav: 'Services', card: 'Hire Me', meta: `Now booking • ${services.length} services`, palette: jade },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: 'Top 10 highlights', palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Moments', card: 'Highlights', meta: `${achievements.length} Moments`, palette: crimson },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
  testimonials: { nav: 'Reviews', card: 'Reviews', meta: 'What people say', palette: amber },
  contact: { nav: 'Contact', card: 'Contact', meta: 'Start a project', palette: crimson },
};
