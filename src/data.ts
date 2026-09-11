import { Project, StatItem, ServiceItem, FaqItem, ProcessStep } from './types';

export const STATS_DATA: StatItem[] = [
  {
    id: 'commits',
    label: 'Commits',
    value: '1,064+',
    description: 'commits logged across Linux, Python, Kotlin & web experiments',
  },
  {
    id: 'stack',
    label: 'Core Stack',
    value: 'Linux + 4',
    description: 'hands-on with Linux, Python 3, HTML/CSS, and Kotlin Android',
  },
  {
    id: 'curiosity',
    label: 'Learning',
    value: '100%',
    description: 'dedication to mastering systems, terminal workflows & clean code',
  },
  {
    id: 'ai-pairing',
    label: 'Method',
    value: 'AI-Paired',
    description: 'transparently co-building modern architectures with AI Studio',
  },
];

export const SERVICES_DESIGN: ServiceItem[] = [
  {
    number: '01',
    title: 'Linux Systems & Shell Foundations',
    description: 'Learning Linux terminal workflows, bash scripting, process trees, environment variables, and filesystem hierarchies from first principles.',
  },
  {
    number: '02',
    title: 'Python Scripting & Task Automation',
    description: 'Writing modular Python 3 utilities, automated data scrapers, batch file handlers, and algorithmic logic for everyday productivity.',
  },
  {
    number: '03',
    title: 'Kotlin Android Mobile Prototyping',
    description: 'Exploring native Android development using Kotlin, designing activity lifecycles, XML layouts, and responsive mobile interfaces.',
  },
];

export const SERVICES_BUILD: ServiceItem[] = [
  {
    number: '04',
    title: 'Semantic HTML5 & Modern CSS3',
    description: 'Crafting responsive, accessible web layouts using clean HTML semantics, CSS Flexbox, Grid, and subtle transitions without bloated code.',
  },
  {
    number: '05',
    title: 'AI-Assisted Full-Stack Architectures',
    description: 'Collaborating transparently with Google AI Studio and Gemini models to design, code, and deploy complex React, TypeScript & WebGL apps.',
  },
  {
    number: '06',
    title: 'Git Version Control & Shell Cadence',
    description: 'Disciplined git branching, clean commit hygiene, semantic commit messages, and automated repository dotfiles.',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'linux-lab',
    demoNumber: '001',
    title: 'Linux System Lab & Shell Automation',
    category: 'Systems & Terminal · Linux',
    badge: 'Linux Journey',
    description: 'Hands-on exploration of Linux distributions, bash scripting, file system architecture, process trees, and systemd automation.',
    fullDescription: 'A dedicated repository of shell scripts, alias setups, and system diagnostic routines built while learning Linux internals. Covers permission models, pipe compositions, cron scheduling, and command-line mastery on Ubuntu and Debian environments.',
    tags: ['Linux', 'Bash', 'Ubuntu/Debian', 'Shell Scripting', 'CLI'],
    techStack: ['Linux', 'Bash', 'POSIX Shell', 'Cron', 'Systemd'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: 'Shell Utilities', value: '25+ Scripts' },
      { label: 'Environment', value: 'Ubuntu / POSIX' },
      { label: 'Focus', value: 'Kernel & CLI' },
    ],
    liveUrl: 'https://www.linkedin.com/in/shaik-rehan-ali-058969343/',
    githubUrl: 'https://github.com/rehanalishaik',
  },
  {
    id: 'python-automation',
    demoNumber: '002',
    title: 'Python Automation Suite & Tools',
    category: 'Scripting & Logic · Python 3',
    badge: 'Python',
    description: 'Modular Python scripts for automated web tasks, file parsing, data cleaning, and algorithmic challenges created during learning.',
    fullDescription: 'Practical Python utilities built to automate repetitive daily tasks. Features web scraping routines, file renamers, API data fetching, and algorithmic problem-solving notebooks exploring data structures.',
    tags: ['Python 3', 'Automation', 'CLI', 'Web Scraping', 'Scripts'],
    techStack: ['Python 3.12', 'Requests', 'OS & Sys', 'BeautifulSoup', 'JSON'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: 'Language Version', value: 'Python 3.12' },
      { label: 'Execution', value: 'CLI / Headless' },
      { label: 'Modules', value: 'Standard + Pip' },
    ],
    liveUrl: 'https://www.linkedin.com/in/shaik-rehan-ali-058969343/',
    githubUrl: 'https://github.com/rehanalishaik',
  },
  {
    id: 'kotlin-android',
    demoNumber: '003',
    title: 'Kotlin Native Android Prototypes',
    category: 'Mobile Development · Kotlin & Android',
    badge: 'Kotlin Android',
    description: 'Exploring native Android development using Kotlin: activity lifecycles, user interface layouts, intent handling, and responsive mobile UX.',
    fullDescription: 'Mobile app prototypes built in Android Studio with Kotlin. Demonstrates modern Android development concepts including ViewBinding, Intent routing, custom adapter lists, and intuitive mobile UI design.',
    tags: ['Kotlin', 'Android Studio', 'Jetpack', 'Mobile UI', 'Gradle'],
    techStack: ['Kotlin', 'Android SDK', 'Gradle', 'XML Layouts', 'Material 3'],
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: 'Platform', value: 'Android' },
      { label: 'Language', value: 'Kotlin' },
      { label: 'Toolchain', value: 'Android Studio' },
    ],
    liveUrl: 'https://www.linkedin.com/in/shaik-rehan-ali-058969343/',
    githubUrl: 'https://github.com/rehanalishaik',
  },
  {
    id: 'semantic-web',
    demoNumber: '004',
    title: 'Semantic HTML5 & Modern CSS3 Crafts',
    category: 'Web Fundamentals · Pure Frontend',
    badge: 'HTML5 / CSS3',
    description: 'Handcrafted web pages built strictly with semantic HTML5 and modern CSS3 (Flexbox, CSS Grid, responsive media queries, and dark mode palettes).',
    fullDescription: 'Demonstrates deep respect for foundational web standards. Written without heavy framework dependencies to master browser rendering, responsive layout mathematics, typographic scales, and WCAG accessibility contrast.',
    tags: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Responsive Design'],
    techStack: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Media Queries'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: 'Responsive', value: 'Mobile to 4K' },
      { label: 'Framework Size', value: '0 KB (Pure CSS)' },
      { label: 'Semantic Standard', value: 'HTML5 Validated' },
    ],
    liveUrl: 'https://www.linkedin.com/in/shaik-rehan-ali-058969343/',
    githubUrl: 'https://github.com/rehanalishaik',
  },
  {
    id: 'git-dotfiles',
    demoNumber: '005',
    title: 'Git Automation & Terminal Dotfiles',
    category: 'Developer Workflow · Shell & Git',
    badge: 'Git & Dotfiles',
    description: 'Custom shell aliases, commit automation hooks, and dotfiles configuration for productive development across Linux distributions.',
    fullDescription: 'A personal suite of shell aliases, git hook automations, and Linux dotfiles designed to streamline everyday terminal workflows. Includes automated repository syncing, custom log formatting, and structured git commit routines.',
    tags: ['Git', 'Bash', 'Linux CLI', 'Dotfiles', 'Automation'],
    techStack: ['Bash', 'Git', 'POSIX Shell', 'Linux CLI'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: 'Environment', value: 'Linux / POSIX' },
      { label: 'Commits Logged', value: '1,064' },
      { label: 'Workflow', value: 'Modular Dotfiles' },
    ],
    liveUrl: 'https://www.instagram.com/assassin064',
    githubUrl: 'https://github.com/rehanalishaik',
  },
  {
    id: 'ai-paired-portfolio',
    demoNumber: '006',
    title: 'AI-Assisted 3D Web Portfolio & King Canvas',
    category: 'AI Pair-Programming · Three.js & React',
    badge: 'AI Studio & DeepMind',
    description: 'Built openly through pair programming with Google AI Studio. Combines real-time WebGL Three.js 3D King geometry with dark editorial aesthetic.',
    fullDescription: 'A transparent demonstration of modern AI pair-programming. Built with Google AI Studio and Gemini, this application blends real-time 3D WebGL rendering, custom math shaders, responsive typography, and anti-spam CAPTCHA protection.',
    tags: ['AI-Paired', 'Google AI Studio', 'Three.js', 'React', 'TypeScript'],
    techStack: ['Google AI Studio', 'Gemini Models', 'Three.js', 'React', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=900&q=80',
    metrics: [
      { label: '3D Geometry', value: 'Real-time Staunton King' },
      { label: 'Collaboration', value: 'Human + AI Studio' },
      { label: 'Frame Budget', value: '60 fps stable' },
    ],
    liveUrl: 'https://www.linkedin.com/in/shaik-rehan-ali-058969343/',
    githubUrl: 'https://github.com/rehanalishaik',
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How are these projects built and what is your story?',
    answer: 'I am a passionate learner exploring how Linux works from the ground up, building scripts in Python, native mobile apps in Kotlin, and frontend web interfaces with HTML/CSS. I believe in complete honesty: several of these advanced architectures were built through AI pair-programming with Google AI Studio. I view AI as a powerful collaborative mentor to understand how real-world code fits together.',
  },
  {
    id: 'faq-2',
    question: 'What is running underneath the hood of this portfolio?',
    answer: 'Real-time 3D rendered directly in the browser via WebGL and Three.js — no video loops, no plugins. The Staunton Chess King features custom procedural crown geometries, gilded gold rim lighting, and responds live to mouse parallax and scroll progression.',
  },
  {
    id: 'faq-3',
    question: 'How do you structure your daily coding and commit cadence?',
    answer: 'I believe in maintaining a steady, honest learning rhythm—whether practicing Linux process pipes, writing Python automation scripts, or styling web components. The activity graph captures natural busy sprints, rest days, and consistent daily momentum.',
  },
  {
    id: 'faq-4',
    question: 'How can we connect or collaborate?',
    answer: 'You can connect with me on LinkedIn at linkedin.com/in/shaik-rehan-ali-058969343, follow my journey on Instagram @assassin064, or email me directly at rehanalishaik06@gmail.com. I am always open to learning, collaborating, and discussing software!',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Explore & Understand',
    description: 'Diving deep into Linux fundamentals, terminal commands, language syntax, and understanding system mechanics from first principles.',
  },
  {
    number: '02',
    title: 'Code & Prototype',
    description: 'Writing Python automation scripts, Kotlin Android activities, or semantic HTML/CSS layouts with clean, readable structure.',
  },
  {
    number: '03',
    title: 'AI Pair-Programming',
    description: 'Iterating with Google AI Studio and Gemini to debug edge cases, architectural patterns, and enhance full-stack capabilities.',
  },
  {
    number: '04',
    title: 'Deploy & Share',
    description: 'Committing code with disciplined git messages and sharing progress openly on LinkedIn and GitHub.',
  },
];

export const TECH_STACK = [
  { name: 'Linux (Ubuntu/Debian)', category: 'Operating System' },
  { name: 'Python 3', category: 'Scripting & Automation' },
  { name: 'HTML5 & CSS3', category: 'Web Fundamentals' },
  { name: 'Kotlin (Android SDK)', category: 'Mobile App Dev' },
  { name: 'Google AI Studio', category: 'AI Pair-Programming' },
  { name: 'Bash & Shell', category: 'Terminal & CLI' },
  { name: 'Git & GitHub', category: 'Version Control' },
  { name: 'React & Three.js', category: 'Interactive 3D Web' },
];

export const RADAR_CAPABILITIES = [
  { axis: 'Linux Systems', score: 85 },
  { axis: 'Python Scripting', score: 90 },
  { axis: 'HTML5 & CSS3', score: 92 },
  { axis: 'Kotlin Android', score: 84 },
  { axis: 'AI Pair-Programming', score: 98 },
  { axis: 'Git & Workflows', score: 94 },
];

