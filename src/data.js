// ---- EDIT THESE ----
export const CFG = {
  resumeUrl: '', // put a PDF link (or /resume.pdf in /public) to enable download; empty = print dialog
  linkedin: 'https://www.linkedin.com/in/kuldeep-gehlod-637432342',
  github: 'https://github.com/kuldeepgehlod213-cmyk',
  leetcode: 'https://leetcode.com/u/kuldeep28__/',
  projGit: 'https://github.com/kuldeepgehlod213-cmyk/Awatani-a-service-booking-app-',
  projLive: 'https://awatani.vercel.app/login',
  portLive: '',
  email: 'kuldeepgehlod04@gmail.com',
  phone: '+91-9617848010',
}
// --------------------

export const NAV = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['edu', 'Education'],
  ['contact', 'Contact'],
]

export const TYPED_WORDS = [
  'MERN stack apps',
  'secure REST APIs',
  'role-based access control',
  'Data Structures & Algorithms',
]

export const STATS = [
  { n: 4, label: 'Programming languages' },
  { n: 7.25, d: 2, label: 'CGPA, B.Tech CSE' },
  { n: 2, label: 'Projects built & deployed' },
  { n: 3, label: 'Certifications' },
]

export const PROJECTS = [
  {
    title: 'Awatani: Job & Service Booking Platform',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    points: [
      'Full-stack MERN platform for job seekers, employers and admins with job listings, applications and service booking.',
      'JWT authentication, role-based access control and protected routes.',
      'RESTful APIs for job posting, application tracking, bookings and admin user management.',
      'Responsive CRUD dashboards; data modeled with Mongoose schemas.',
    ],
    links: [['GitHub ↗', 'projGit'], ['Live ↗', 'projLive']],
  },
  {
    title: 'Developer Portfolio Website',
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    points: [
      'Responsive portfolio built with reusable React components and Framer Motion animations.',
      'Hosted on Vercel with clean frontend architecture and a maintainable codebase.',
    ],
    links: [['Live ↗', 'portLive']],
  },
  {
    title: 'Resume Match',
    badge: 'In Progress',
    points: ['Currently building. Details, tech stack and demo coming soon.'],
    links: [],
  },
]

export const FLOW = [
  ['React.js + Tailwind CSS', 'Responsive dashboards'],
  ['Node.js + Express REST APIs', 'JWT auth · role-based access control'],
  ['MongoDB + Mongoose', 'Collections & schemas'],
]
export const FLOW_CHIPS = [
  'Job listings', 'Applications', 'Service booking', 'Admin user management', 'Job seekers · Employers · Admins',
]

export const SKILLS = [
  ['Languages', ['Java', 'JavaScript', 'C', 'SQL']],
  ['Core CS', ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks']],
  ['Web', ['React.js', 'Node.js', 'Express.js', 'HTML', 'CSS', 'Tailwind CSS', 'REST APIs']],
  ['Databases', ['MongoDB', 'Mongoose', 'MySQL']],
  ['Tools', ['Git', 'GitHub', 'Postman', 'VS Code', 'Vercel']],
]

export const EDUCATION = [
  { title: 'B.Tech, Computer Science Engineering', place: 'Parul University, Vadodara', when: '2023 – 2027 · CGPA 7.25' },
  { title: 'Class XII (CBSE)', place: 'Paramount Academy, Sitamau, MP', when: '2022' },
  { title: 'Class X (CBSE)', place: 'Paramount Academy, Sitamau, MP', when: '2020' },
]

export const ACHIEVEMENTS = [
  ['Hackathon', 'PU Code Hackathon 3.0: built under time constraints in a team.'],
  ['Problem Solving', 'Practising Data Structures & Algorithms on LeetCode.'],
  ['Certifications', 'NPTEL Computer Networks · IBM SkillsBuild AI Fundamentals · Simplilearn Frontend Development'],
]
