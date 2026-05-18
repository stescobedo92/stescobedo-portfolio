export type SocialProfile = {
  network: 'GitHub' | 'LinkedIn' | 'X' | 'StackOverflow';
  url: string;
};

export type WorkExperience = {
  company: string;
  role: string;
  range: string;
  location: string;
  logo: string;
  domain?: string;
  summary: string;
  highlights: string[];
};

export type Project = {
  name: string;
  description: string;
  highlights: string[];
  tech: string[];
  github: string;
  githubRepo?: string;
  demo?: string;
  image: string;
  cover?: 'terminal-dotnet' | 'cipher-key' | 'password-stream' | 'pixel-desktop' | 'qr-grid' | 'code-pointer' | 'default';
  featured?: boolean;
  active?: boolean;
};

export type EducationItem = {
  school: string;
  credential: string;
  range: string;
  detail: string;
};

export const profile = {
  githubUsername: 'stescobedo92',
  githubPrivateRepoCount: 1,
  githubTotalRepoCount: 140,
  pinnedRepos: [
    'stescobedo92/vscode-binary-coffee',
    'stescobedo92/ScheduleYourTask',
    'stescobedo92/apppass',
    'stescobedo92/OpenWeatherPlace',
    'stescobedo92/unique_ptr',
    'stescobedo92/wallpaper',
  ],
  name: 'Sergio Triana Escobedo',
  label: 'Full Stack Developer',
  location: 'Cuernavaca/Mexico',
  email: 'stescobedo.31@gmail.com',
  image: 'https://github.com/stescobedo92.png?size=420',
  summary:
    "I'm a Full Stack developer with over 8 years of experience in software development. I specialize in modern technologies such as .NET, Rust, Node.js, Python, C/C",
  motto: 'I build reliable software with simple interfaces and strong engineering foundations.',
  passionItems: [
    'Distributed Systems',
    'Cloud Architecture',
    '.NET Services',
    'Rust Tooling',
    'Automation',
    'Backend Platforms',
    'Developer Experience',
  ],
  socials: [
    { network: 'GitHub', url: 'https://github.com/stescobedo92' },
    {
      network: 'LinkedIn',
      url: 'https://www.linkedin.com/in/sergio-triana-escobedo-81a452b9/',
    },
    {
      network: 'StackOverflow',
      url: 'https://stackoverflow.com/users/stescobedo92',
    },
  ] satisfies SocialProfile[],
};

export const primarySkills = [
  { name: '.NET', icon: 'dotnet' },
  { name: 'Rust', icon: 'rust' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Python', icon: 'python' },
  { name: 'C/C++', icon: 'cpp' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'AWS', icon: 'aws' },
  { name: 'Docker', icon: 'docker' },
  { name: 'GitHub Actions', icon: 'githubactions' },
  { name: 'PostgreSQL', icon: 'postgres' },
  { name: 'Linux', icon: 'linux' },
  { name: 'Git', icon: 'git' },
];

export const work: WorkExperience[] = [
  {
    company: 'Apex Systems',
    role: 'Software Developer Engineer',
    range: 'Sep 2022 - Present',
    location: 'Remote',
    logo: '/Apex_Systems.png',
    domain: 'apexsystems.com',
    summary:
      'Builds scalable backend and cloud-facing solutions with a focus on reliability, operational clarity, and maintainable delivery.',
    highlights: [
      'Delivered production services with clean API boundaries.',
      'Improved cloud workflows and backend automation.',
      'Worked across distributed teams and release cycles.',
    ],
  },
  {
    company: 'Peraton',
    role: 'Full-Stack .NET Developer',
    range: 'May 2023 - Oct 2024',
    location: 'Remote',
    logo: '/Peraton.svg',
    domain: 'peraton.com',
    summary:
      'Implemented full-stack features and backend integrations with .NET, focusing on secure flows and clear service contracts.',
    highlights: [
      'Built service features with .NET and modern frontend integrations.',
      'Supported cloud platform work and production delivery.',
      'Contributed to maintainable application architecture.',
    ],
  },
  {
    company: 'Kimia Group',
    role: 'Backend Software Developer',
    range: 'Mar 2022 - Aug 2022',
    location: 'Remote',
    logo: '/Kimia.svg',
    domain: 'kimiagroup.com',
    summary:
      'Developed backend components and integrations for high-throughput systems with pragmatic operational guardrails.',
    highlights: [
      'Implemented backend services and API integrations.',
      'Worked on data flows and service reliability.',
      'Collaborated through iterative delivery cycles.',
    ],
  },
  {
    company: 'GSoft Innovation',
    role: 'Software Developer Engineer',
    range: 'Apr 2021 - Apr 2022',
    location: 'Remote',
    logo: '/CGI.svg',
    domain: 'gsoft.com',
    summary:
      'Created business application features and backend modules with an emphasis on predictable delivery and team collaboration.',
    highlights: [
      'Developed application modules and backend workflows.',
      'Participated in code review and release preparation.',
      'Kept implementation scoped and maintainable.',
    ],
  },
  {
    company: 'MC Systems',
    role: 'Full-Stack Developer',
    range: 'Apr 2021 - Apr 2022',
    location: 'Remote',
    logo: '/MCSystems.svg',
    domain: 'mcsystems.com',
    summary:
      'Worked across frontend and backend surfaces for enterprise systems, connecting UI needs with service-level behavior.',
    highlights: [
      'Built full-stack features for internal systems.',
      'Integrated APIs with user-facing workflows.',
      'Maintained clear implementation and testing habits.',
    ],
  },
  {
    company: 'NTSprint',
    role: 'Backend Software Developer',
    range: 'May 2020 - Mar 2021',
    location: 'Remote',
    logo: '/NTSprint.svg',
    domain: 'ntsprint.com',
    summary:
      'Delivered backend functionality and technical improvements for service-oriented applications.',
    highlights: [
      'Implemented backend services and data handling logic.',
      'Supported production-oriented application work.',
      'Strengthened foundations for later full-stack delivery.',
    ],
  },
];

export const projects: Project[] = [
  {
    name: '.NET Version Manager',
    description:
      'Command-line tool that simplifies managing multiple .NET SDK versions on a development machine.',
    highlights: [
      'Version discovery and switching',
      'Rust-based CLI ergonomics',
      'Developer workflow focused',
    ],
    tech: ['Rust', '.NET', 'CLI'],
    github: 'https://github.com/stescobedo92/dotnet-version-manager',
    githubRepo: 'stescobedo92/dotnet-version-manager',
    image: '/dotnet-version-manager.png',
    cover: 'terminal-dotnet',
    featured: true,
    active: true,
  },
  {
    name: 'Keep Assets Protected Securely',
    description:
      'Security-focused tool that blends cryptographic workflows with a simple command interface.',
    highlights: [
      'Asset protection workflows',
      'Cryptography-first design',
      'Practical CLI experience',
    ],
    tech: ['Rust', 'Cryptography', 'Security'],
    github: 'https://github.com/stescobedo92/kaps',
    githubRepo: 'stescobedo92/kaps',
    image: '/kaps.png',
    cover: 'cipher-key',
    featured: true,
  },
  {
    name: 'apppass',
    description:
      'A command-line application for generating, managing, and securing passwords efficiently.',
    highlights: [
      'Password generation',
      'Secure local utility',
      'Minimal command surface',
    ],
    tech: ['Rust', 'CLI', 'Security'],
    github: 'https://github.com/stescobedo92/apppass',
    githubRepo: 'stescobedo92/apppass',
    image: '/apppass.png',
    cover: 'password-stream',
    featured: true,
  },
  {
    name: 'wallpaper',
    description:
      'C++ utility for changing desktop wallpapers across Windows and Linux environments.',
    highlights: ['Cross-platform behavior', 'Small native utility'],
    tech: ['C++', 'CLI', 'Desktop'],
    github: 'https://github.com/stescobedo92/wallpaper',
    githubRepo: 'stescobedo92/wallpaper',
    image: '/wallpaper.png',
    cover: 'pixel-desktop',
  },
  {
    name: 'GUI QR Code Generator',
    description:
      'Desktop application built with Go and Fyne for generating QR codes through a clean GUI.',
    highlights: ['Desktop GUI', 'QR generation'],
    tech: ['Go', 'Fyne', 'GUI'],
    github: 'https://github.com/stescobedo92/gui-qrcode-generator',
    githubRepo: 'stescobedo92/gui-qrcode-generator',
    image: '/qrcode-generator.png',
    cover: 'qr-grid',
  },
  {
    name: 'unique_ptr',
    description:
      'Rust library inspired by C++ unique_ptr semantics for exploring unique ownership patterns.',
    highlights: ['Ownership model exploration', 'Rust and C++ concepts'],
    tech: ['Rust', 'C++', 'Library'],
    github: 'https://github.com/stescobedo92/unique_ptr',
    githubRepo: 'stescobedo92/unique_ptr',
    image: '/unique_ptr_rs.png',
    cover: 'code-pointer',
  },
];

export const education: EducationItem[] = [
  {
    school: 'Software Engineering Practice',
    credential: 'Full Stack and Cloud Architecture',
    range: '2018 - Present',
    detail:
      'Continuous engineering practice across backend systems, cloud workflows, security, and developer tooling.',
  },
];
