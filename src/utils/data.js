/**
 * Portfolio data — all values hardcoded.
 */

// ===========================
// Personal Information
// ===========================
export const PERSONAL_INFO = {
  name: 'Muhammad Faried',
  firstName: 'Ryujinsha',
  title: 'Frontend Developer',
  greeting: 'Hi, I\'m',
  description: 'Suka bikin web yang tampilannya rapi, responsif, dan pastinya enak dilihat. Tujuannya simpel: bikin pengguna betah dan gampang pas makainya!',
  email: 'alex@example.com',
  github: 'https://github.com/Ryujinsha',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com/kmsto_ried/',
};

// ===========================
// Navigation
// ===========================
export const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Designs', href: '#designs' },
  { label: 'Contact', href: '#contact' },
];

// ===========================
// Education
// ===========================
export const EDUCATION = [
  {
    id: 1,
    institution: 'Horizon University Indonesia',
    major: 'Informatika',
    degree: 'S1 (Sarjana)',
    year: '2024 - Sekarang',
    description: 'Mempelajari dasar-dasar ilmu komputer, pengembangan web, dan rekayasa perangkat lunak.',
    gpa: '3.75',
  },
  {
    id: 2,
    institution: 'SMA Negeri 1 Jatisari',
    major: 'IPA (MIPA)',
    degree: 'SMA',
    year: '2021 - 2024',
    description: 'Lulus dengan predikat baik di bidang sains dan teknologi.',
    gpa: '',
  }
];

// ===========================
// Skills
// ===========================
export const SKILLS = [
  {
    id: 1,
    category: 'Frontend',
    icon: 'frontend',
    items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    id: 2,
    category: 'Backend',
    icon: 'backend',
    items: ['Node..js', 'Python'],
  },
  {
    id: 3,
    category: 'Tools & DevOps',
    icon: 'tools',
    items: ['Git', 'GitHub', 'VS Code', 'Vite', 'Figma', 'Vercel'],
  },
  {
    id: 4,
    category: 'Database',
    icon: 'database',
    items: ['MySQL', 'Firebase'],
  }
];

// ===========================
// Projects
// ===========================
export const PROJECTS = [
  {
    id: 1,
    title: 'The Last Door',
    description: 'Sebuah Fan Game dari Five Nights at Freddy\'s yang dibuat berdasarkan minat saya sebagai fans',
    technologies: ['Java'],
    github: 'https://github.com/Ryujinsha/FNAF-game-java.git',
    demo: 'https://example.com',
    color: '#36ADA3',
  },
  {
    id: 2,
    title: 'PseudoQuiz',
    description: 'Website quiz sederhana untuk melatih kemampuan dasar dalam dunia IT',
    technologies: ['Vite'],
    github: 'https://github.com/Ryujinsha/pop-quiz-web',
    demo: 'https://pop-quiz-web.vercel.app/',
    color: '#232F72',
  },
  {
    id: 3,
    title: 'Social Media Analytics',
    description: 'Platform for tracking and analyzing social media performance across multiple channels with customizable reports.',
    technologies: ['Vue.js', 'D3.js', 'Node.js', 'MongoDB'],
    github: 'https://github.com',
    demo: 'https://example.com',
    color: '#2F578A',
  },
  {
    id: 4,
    title: 'Weather Forecast App',
    description: 'Beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.',
    technologies: ['React Native', 'Expo', 'Weather API', 'MapBox'],
    github: 'https://github.com',
    demo: 'https://example.com',
    color: '#36ADA3',
  },
  {
    id: 5,
    title: 'Portfolio Template',
    description: 'A customizable developer portfolio template with smooth animations, dark mode, and responsive design.',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com',
    demo: 'https://example.com',
    color: '#121358',
  },
  {
    id: 6,
    title: 'Real-time Chat App',
    description: 'Feature-rich messaging application with real-time communication, file sharing, and group chat capabilities.',
    technologies: ['React', 'Socket.io', 'Express', 'Redis'],
    github: 'https://github.com',
    demo: 'https://example.com',
    color: '#2F578A',
  }
];

// ===========================
// Design Gallery
// ===========================
export const DESIGNS = [
  {
    id: 1,
    title: 'Poster Design 1',
    category: 'Poster',
    image: '', // Tambahkan path gambar kamu di sini, contoh: '/designs/poster1.jpg'
    description: 'Desain poster pertama.',
    placeholderSeed: '180,180,190',
  },
  {
    id: 2,
    title: 'Banner Design 1',
    category: 'Banner',
    image: '', // Tambahkan path gambar kamu di sini
    description: 'Desain banner untuk media sosial.',
    placeholderSeed: '150,150,160',
  },
  {
    id: 3,
    title: 'Social Media Post 1',
    category: 'Social Media',
    image: '', // Tambahkan path gambar kamu di sini
    description: 'Desain post Instagram.',
    placeholderSeed: '130,130,140',
  },
  {
    id: 4,
    title: 'Poster Design 2',
    category: 'Poster',
    image: '', // Tambahkan path gambar kamu di sini
    description: 'Desain poster kedua.',
    placeholderSeed: '170,170,180',
  },
];

// ===========================
// Social Links
// ===========================
export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: PERSONAL_INFO.github,
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: PERSONAL_INFO.linkedin,
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    href: PERSONAL_INFO.instagram,
    icon: 'instagram',
  },
  {
    label: 'Email',
    href: `mailto:${PERSONAL_INFO.email}`,
    icon: 'email',
  },
];
