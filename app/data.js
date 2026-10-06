import { WifiIcon } from "@heroicons/react/24/outline";

export const PROFILE = {
  name: "Christian Rodrigues",
  title: "IT Support Specialist",
  org: "Digital NEST",
  location: "Ripon, CA",
  email: "crodbizz@gmail.com",
  github: "https://github.com/xowin",
  linkedin: "https://www.linkedin.com/in/christian-rodrigues-91993b233/",
  resume: "/Files/Christian_Rodrigues_Resume.pdf",
};

export const STATS = [
  { value: 80, suffix: "+", label: "users supported", note: "Windows and macOS, on site and remote" },
  { value: 187, label: "devices tracked", note: "every deployment, repair, transfer and retirement logged" },
  { value: 20, label: "tickets closed a week", note: "on site in Stockton and Modesto, remote for Gilroy, Salinas and Watsonville" },
  { value: 45, suffix: "%", label: "fewer repeat requests", note: "after writing 5 guides and training staff" },
];

export const EXPERIENCE = [
  {
    role: "IT Specialist",
    org: "Digital NEST",
    place: "Stockton, CA",
    dates: "Aug 2026 – Present",
    current: true,
    bullets: [
      "Resolve Tier I hardware, software, network, and account issues for 80+ users, closing 20 tickets per week, as the primary on-site technician for the Stockton and Modesto sites and remote support for the Gilroy, Salinas, and Watsonville sites.",
      "Traced recurring admin-credential prompts that blocked app updates on 80+ Macs and proposed a low-cost MDM rollout to the IT Manager by auditing the Apple Business Manager setup and comparing vendors on cost and features.",
      "Maintain accurate records for 187 devices across sites by logging every deployment, check-out, repair, transfer, and retirement and by running staff onboarding and offboarding.",
      "Reduced repeat support requests by 45% by writing 5 knowledge-base articles and user guides and training staff on IT tools, policies, and best practices.",
    ],
  },
  {
    role: "Software Developer Instructor",
    org: "Digital NEST",
    place: "Stockton, CA",
    dates: "Sep 2024 – Aug 2026",
    bullets: [
      "Kept all 15 lab computers working for 3 classes a week, with no lost class time, by fixing hardware and software issues on the spot and running preventive maintenance.",
      "Taught software development (JavaScript, React, WordPress, Git) to 10 members aged 14–24 and guided student teams through shipping a full-stack ticketing app (NestQueue) with pull requests and code review on GitHub.",
    ],
  },
  {
    role: "Web Developer Intern",
    org: "Digital NEST",
    place: "Modesto, CA",
    dates: "Dec 2023 – Aug 2024",
    bullets: [
      "Supported IT asset tracking and license compliance by maintaining hardware and software inventory records.",
    ],
  },
  {
    role: "Software Development Intern",
    org: "Bay Valley Tech",
    place: "Modesto, CA",
    dates: "Nov 2023 – Jun 2024",
    bullets: [
      "Helped ship a real-time communication system with user authentication in Agile sprints with a cross-functional team.",
    ],
  },
];

export const SKILLS = [
  {
    label: "Help desk",
    items: ["Tier I support", "Ticketing", "Triage and escalation", "Remote support", "End-user training", "Onboarding and offboarding"],
  },
  {
    label: "Platforms",
    items: ["Windows 10/11", "macOS", "Linux", "iOS/iPadOS", "Google Workspace", "Microsoft 365", "Apple Business Manager", "Active Directory"],
  },
  {
    label: "Hardware",
    items: ["Imaging", "Device provisioning", "Asset management", "Printers", "Conferencing equipment"],
  },
  {
    label: "Networking",
    items: ["TCP/IP", "LAN/WLAN", "DNS", "DHCP", "Mesh Wi-Fi", "SSID configuration", "ISP gateway troubleshooting"],
  },
  {
    label: "Development",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "SQL", "MongoDB", "Firebase", "REST APIs", "Git", "WordPress"],
  },
];

export const EDUCATION = [
  { title: "A.S., Computer Networking", where: "Modesto Junior College", when: "May 2025" },
  { title: "CompTIA A+", where: "In progress", when: "Expected Nov 2026" },
  {
    title: "Web Development Certificate",
    where: "Bay Valley Tech Academy (HTML/CSS, JavaScript, MySQL, Node.js, CMS)",
    when: "2023",
  },
];

export const PROJECTS = [
  {
    id: "nestqueue",
    title: "NestQueue",
    featured: true,
    description:
      "Digital NEST's in-house ticket management system. As top contributor (26 of 50 commits), I designed the v2 workflow: a triage dashboard, a filterable queue, six statuses from New to Closed, escalation flags, and activity logs, so every ticket keeps a full support record.",
    image: "/images/nestq.webp",
    tags: ["IT", "Web"],
    gitUrl: "https://github.com/digitalnest-wit/nestqueue",
    stack: ["Next.js", "TypeScript", "MongoDB", "Firebase Auth", "Vercel"],
  },
  {
    id: "wifi",
    title: "Wi-Fi Deployment and Troubleshooting",
    description:
      "Delivered building-wide Wi-Fi at the Stockton center with a Netgear Orbi mesh network. At Modesto, diagnosed unstable Wi-Fi for about 30 people by testing a range extender and the wall ethernet ports against a gateway that could not be moved, then recommended a mesh upgrade.",
    Icon: WifiIcon,
    tags: ["IT"],
    stack: ["Mesh Wi-Fi", "Troubleshooting", "Netgear Orbi"],
  },
  {
    id: "handpaint",
    title: "Hand Painting",
    description:
      "Computer-vision canvas that tracks finger input from the camera feed to enable real-time painting.",
    image: "/images/handpaint.webp",
    tags: ["Web"],
    gitUrl: "https://github.com/xowin/Hand-Painting",
    stack: ["React", "Canvas", "Computer Vision"],
  },
  {
    id: "careerharvest",
    title: "Career Harvest",
    description:
      "Web scraping platform built with Node.js, React, and TypeScript. I contributed backend APIs and data filtering across multiple sources.",
    image: "/images/CareerHarvest.png",
    tags: ["Web"],
    stack: ["Node.js", "TypeScript", "Puppeteer"],
  },
  {
    id: "comms",
    title: "Business Communication App",
    description:
      "Team-built communication platform with real-time messaging and user authentication, shipped in Agile sprints.",
    image: "/images/opowl.png",
    tags: ["Web"],
    gitUrl: "https://github.com/Martyn-Conkling/operating-owls-business-communication-platform",
    stack: ["React", "TypeScript"],
  },
  {
    id: "moonbin",
    title: "Moonbin Seoul Food",
    description:
      "Restaurant site built as a capstone project, with a responsive UI and Next.js routing.",
    image: "/images/moonbin.webp",
    tags: ["Web"],
    gitUrl: "https://github.com/xowin/moonbin-seoul-food",
    stack: ["React", "Next.js"],
  },
];
