export interface ProjectFeatureItem {
  title: string;
  description?: string;
}

export interface Project {
  id: string;
  number: string;
  category: string;
  filterTags: ('AI / ML' | 'Full Stack' | 'Healthcare' | 'DSA')[];
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  problemBullets?: string[];
  solution: string;
  solutionCapabilities?: string[];
  importantFeatures: ProjectFeatureItem[];
  technologies: string[];
  features?: string[];
  metrics?: {
    label: string;
    value: string;
    sublabel?: string;
  };
  compactStats?: {
    solved: number;
    easy: number;
    medium: number;
    hard: number;
    attempting?: number;
  };
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  projectUrl?: string;
  accent: 'red-pink' | 'purple-blue' | 'cyan-purple';
}

export interface SkillItem {
  name: string;
  badge?: string;
  description: string;
  projectRelation?: string;
}

export interface SkillCategory {
  title: string;
  categoryKey: 'PROGRAMMING' | 'AI / ML' | 'DEVELOPMENT' | 'TOOLS';
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  organization: string;
  type: 'Internship' | 'Hackathon' | 'Independent Technical Development';
  badge: string;
  description: string;
  projects?: string[];
  projectSingle?: string;
  technologies: string[];
  accent: 'purple-blue' | 'cyan-blue' | 'pink-purple' | 'pink-cyan';
  certificateUrl?: string;
}

export interface Achievement {
  title: string;
  category: string;
  description: string;
  verifiedLabel: string;
  icon: string;
  accent: 'pink' | 'cyan' | 'purple' | 'blue';
}

export interface Certification {
  title: string;
  issuer: string;
  verifiedUrl: string;
  date: string;
  skillsCovered: string[];
}

export const PERSONAL_INFO = {
  name: "Boya Mallikarjuna",
  firstName: "Boya",
  lastName: "Mallikarjuna",
  role: "AI & ML Engineer",
  status: "Available for opportunities",
  university: "Uttaranchal University",
  degree: "B.Tech CSE (AI & ML)",
  cgpa: "9.30 / 10",
  experienceYears: "2+ Years",
  email: "boyamallikarjuna183@gmail.com",
  tagline: "B.Tech CSE (AI & ML) student at Uttaranchal University, focused on building intelligent systems, scalable applications, and beautiful digital experiences.",
  about: "I'm a Computer Science student specializing in Artificial Intelligence & Machine Learning, passionate about building practical AI systems, full-stack applications and data-driven solutions.",
  socials: {
    github: "https://github.com/malli2247",
    leetcode: "https://leetcode.com/u/Mallikarjuna_Boya/",
    hackerrank: "https://www.hackerrank.com/profile/boyamallikarjun4/",
    linkedin: "https://www.linkedin.com/in/mallikarjuna-boya/",
    email: "boyamallikarjuna183@gmail.com",
    resume: "/resume/Boya_Mallikarjuna_Resume.pdf",
  },
  resumeUrl: "/resume/Boya_Mallikarjuna_Resume.pdf",
  stats: [
    { label: "B.Tech CSE", value: "AI & ML Specialization", detail: "Uttaranchal University" },
    { label: "CGPA", value: "9.30 / 10", detail: "Consistent academic standing" },
    { label: "Primary Focus", value: "AI + Software", detail: "Intelligent systems & products" },
    { label: "Experience", value: "2+ Years", detail: "Development & Learning" },
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "PROGRAMMING",
    categoryKey: "PROGRAMMING",
    skills: [
      {
        name: "Python",
        badge: "Primary",
        description: "Primary language used for machine learning pipelines, data analysis, algorithms, and backend API engineering.",
        projectRelation: "CardioVision AI, LeetCode (633 Solved), RakthaSethu"
      },
      {
        name: "Java",
        badge: "Core",
        description: "Object-oriented software development, robust data structures, and memory-safe enterprise concepts.",
        projectRelation: "Core CS foundations & algorithms"
      },
      {
        name: "C#",
        badge: "Backend",
        description: "High-performance backend logic, structured component programming, and .NET ecosystem development.",
        projectRelation: "System software & libraries"
      },
      {
        name: "JavaScript",
        badge: "Full-Stack",
        description: "Modern ES6+ asynchronous web programming, DOM manipulation, and interactive reactive UI architectures.",
        projectRelation: "RakthaSethu web client & dynamic frontend"
      },
      {
        name: "SQL",
        badge: "Relational",
        description: "Relational database design, complex JOIN optimizations, indexing strategies, and ACID transaction safety.",
        projectRelation: "PostgreSQL & MySQL schemas in RakthaSethu"
      },
    ]
  },
  {
    title: "AI / ML",
    categoryKey: "AI / ML",
    skills: [
      {
        name: "Machine Learning",
        badge: "Algorithms",
        description: "Applied machine learning including Supervised Classification, Random Forests, Naive Bayes, and Ensemble voting.",
        projectRelation: "CardioVision AI & clinical risk benchmarks"
      },
      {
        name: "Scikit-learn",
        badge: "Modeling",
        description: "Model selection, hyperparameter tuning, Stratified K-Fold CV, ROC-AUC benchmarking, and feature importances.",
        projectRelation: "CardioVision AI training pipelines"
      },
      {
        name: "Pandas",
        badge: "Data Wrangling",
        description: "Large tabular data manipulation, missing value imputation, categorical encoding, and medical exploratory analysis.",
        projectRelation: "UCI Cleveland dataset preprocessing"
      },
      {
        name: "NumPy",
        badge: "Vector Math",
        description: "High-speed n-dimensional array mathematics, matrix transformations, and numerical vector operations.",
        projectRelation: "Feature normalization & algorithmic tensors"
      },
      {
        name: "Data Analysis",
        badge: "Insights",
        description: "Hypothesis testing, correlation heatmaps, feature weight analysis, and statistical significance evaluation.",
        projectRelation: "Healthcare diagnostic research"
      },
    ]
  },
  {
    title: "DEVELOPMENT",
    categoryKey: "DEVELOPMENT",
    skills: [
      {
        name: "React",
        badge: "Frontend",
        description: "Component-driven SPA architectures, state management, custom hooks, and modern reactive UX.",
        projectRelation: "RakthaSethu client & portfolio ecosystem"
      },
      {
        name: "HTML",
        badge: "Semantic",
        description: "Semantic document architecture, accessible DOM trees, WAI-ARIA compliance, and SEO markup.",
        projectRelation: "Accessible web standards"
      },
      {
        name: "CSS",
        badge: "Modern UI",
        description: "Tailwind CSS, Glassmorphism, CSS keyframe animations, responsive grid layouts, and hardware-accelerated transforms.",
        projectRelation: "Dark futuristic UI & HUD styling"
      },
      {
        name: "Flask",
        badge: "API",
        description: "Lightweight Python RESTful microservices, routing, request validation, and ML model serving.",
        projectRelation: "Inference endpoints & backend prototypes"
      },
      {
        name: "Streamlit",
        badge: "AI Apps",
        description: "Rapid interactive machine learning dashboards, feature sliders, and real-time visualization widgets.",
        projectRelation: "CardioVision AI medical analytics dashboard"
      },
    ]
  },
  {
    title: "TOOLS",
    categoryKey: "TOOLS",
    skills: [
      {
        name: "Git",
        badge: "VCS",
        description: "Version control, branching workflows, clean atomic commits, rebase strategies, and merge resolution.",
        projectRelation: "Code versioning across all repositories"
      },
      {
        name: "GitHub",
        badge: "Collaboration",
        description: "Open source publishing, project management, code reviews, and public developer activity tracking.",
        projectRelation: "github.com/malli2247"
      },
      {
        name: "VS Code",
        badge: "IDE",
        description: "Primary development environment with Python, TypeScript, Docker, and Git integration.",
        projectRelation: "Daily development workflow"
      },
      {
        name: "MySQL",
        badge: "Database",
        description: "Relational database server management, schema modeling, and indexing for concurrent transaction support.",
        projectRelation: "RakthaSethu relational datastore"
      },
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "rakthasethu",
    number: "01",
    category: "EMERGENCY HEALTHCARE PLATFORM",
    filterTags: ["Full Stack", "Healthcare"],
    title: "RakthaSethu",
    subtitle: "AI-Powered Real-Time Blood Emergency & Donor Matching Platform",
    description: "RakthaSethu is a real-time blood emergency platform designed to connect donors, receivers, hospitals and blood banks through intelligent blood compatibility, location-based matching, emergency requests and donor eligibility management.",
    problem: "During medical emergencies, finding a compatible blood donor quickly can be difficult.",
    problemBullets: [
      "Delayed donor discovery",
      "Manual coordination",
      "Difficulty identifying compatible donors",
      "Limited visibility of blood availability",
      "Difficulty finding nearby donors",
      "Lack of real-time emergency coordination"
    ],
    solution: "RakthaSethu provides a centralized intelligent platform that connects donors, receivers, hospitals and blood banks.",
    solutionCapabilities: [
      "Determines compatible blood groups",
      "Finds suitable nearby donors",
      "Handles emergency blood requests",
      "Manages blood-bank inventory",
      "Checks donor eligibility",
      "Provides role-based access",
      "Supports PWA/offline functionality"
    ],
    importantFeatures: [
      {
        title: "Blood Compatibility Engine",
        description: "Determines medically compatible blood relationships instead of relying only on exact blood-group matching."
      },
      {
        title: "Smart Donor Matching",
        description: "Finds suitable nearby donors using blood compatibility and location."
      },
      {
        title: "Emergency Request System",
        description: "Allows urgent blood requirements to be created and managed."
      },
      {
        title: "Blood Bank Inventory",
        description: "Allows blood banks to maintain available blood inventory."
      },
      {
        title: "Donor Eligibility",
        description: "Tracks donor health/eligibility information and controls donor visibility based on eligibility."
      },
      {
        title: "Hospital & Blood Bank Management",
        description: "Provides dedicated role-based access for healthcare organizations."
      },
      {
        title: "Analytics Dashboard",
        description: "Provides information about requests, donations, inventory and trends."
      },
      {
        title: "Offline PWA",
        description: "Provides a responsive progressive web application with offline-capable functionality."
      }
    ],
    technologies: ["Python", "FastAPI", "React", "JavaScript", "MySQL", "PostgreSQL", "Prisma", "PWA", "Machine Learning"],
    highlights: [
      "Automated ABO/Rh compatibility engine preventing transfusion mismatch errors",
      "Progressive geospatial search expanding radius to locate nearby active donors",
      "Role-based portals for hospitals, donors, blood banks, and emergency caretakers"
    ],
    githubUrl: "https://github.com/rakthasethu/rakthasethu",
    projectUrl: "https://raktha-sethu-smart-blood-emergency-donor-coordinatio-rf1wh0yeo.vercel.app/",
    demoUrl: "https://raktha-sethu-smart-blood-emergency-donor-coordinatio-rf1wh0yeo.vercel.app/",
    accent: "red-pink",
  },
  {
    id: "cardiovision-ai",
    number: "02",
    category: "AI / MACHINE LEARNING",
    filterTags: ["AI / ML", "Healthcare"],
    title: "CardioVision AI",
    subtitle: "Heart Disease Prediction & Medical Analytics Dashboard",
    description: "An interactive machine learning dashboard for analyzing cardiovascular health indicators and generating heart disease predictions using a Random Forest classification model.",
    problem: "Analyzing multiple cardiovascular health indicators manually can make it difficult to quickly understand potential risk patterns.",
    solution: "CardioVision AI uses a machine learning model to analyze health-related input data and provide a prediction through an interactive dashboard.",
    importantFeatures: [
      {
        title: "Machine learning prediction",
        description: "Trained Random Forest classifier predicting potential cardiovascular risk patterns."
      },
      {
        title: "Interactive dashboard",
        description: "Real-time interactive inputs and parameter sliders for clinical analysis."
      },
      {
        title: "Data preprocessing",
        description: "Automated scaling, encoding, and normalization of medical indicators."
      },
      {
        title: "Health-data analysis",
        description: "Correlation and sensitivity analysis across key physiological risk factors."
      },
      {
        title: "Prediction interface",
        description: "Immediate risk assessment feedback and clinical stratification."
      },
      {
        title: "Visual analytics",
        description: "Diagnostic charts illustrating feature impact on predictive results."
      }
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit"],
    highlights: [
      "Random Forest model evaluating complex multi-factor physiological test parameters",
      "Explainable AI interface demonstrating primary risk factor contributions",
      "Interactive simulation enabling immediate clinical scenario testing"
    ],
    githubUrl: "https://github.com/malli2247/heart-disease-ml-platform",
    projectUrl: "https://cardiovision-ai-tu3pzquroznwxvlizyzagh.streamlit.app/",
    demoUrl: "https://cardiovision-ai-tu3pzquroznwxvlizyzagh.streamlit.app/",
    accent: "purple-blue",
  },
  {
    id: "leetcode-solutions",
    number: "03",
    category: "DSA / PROBLEM SOLVING",
    filterTags: ["DSA"],
    title: "LeetCode Solutions",
    subtitle: "Data Structures & Algorithms Practice",
    description: "A growing collection of LeetCode solutions focused on Data Structures, Algorithms, problem solving and competitive programming.",
    problem: "Consistent practice with algorithmic problems is essential for improving problem-solving and technical interview skills.",
    solution: "Maintain a structured repository of solutions covering different algorithmic patterns, data structures and problem-solving techniques.",
    importantFeatures: [
      {
        title: "Algorithm implementations",
        description: "Optimal code solutions with rigorous time and space complexity analysis."
      },
      {
        title: "Data structure practice",
        description: "Extensive practice across Arrays, Trees, Graphs, Heaps, and Hash Tables."
      },
      {
        title: "Problem-solving patterns",
        description: "Application of Dynamic Programming, Binary Search, Two Pointers, and DFS/BFS."
      },
      {
        title: "Competitive programming practice",
        description: "Timed contest problem solving emphasizing edge cases and memory constraints."
      },
      {
        title: "Continuous learning",
        description: "Consistent problem-solving streak with iterative code refactoring."
      }
    ],
    technologies: ["Python", "Data Structures", "Algorithms", "Problem Solving"],
    compactStats: {
      solved: 633,
      easy: 253,
      medium: 276,
      hard: 104,
      attempting: 2
    },
    highlights: [
      "633 verified problem solutions on LeetCode across Easy (253), Medium (276), and Hard (104)",
      "Daily practice focusing on dynamic programming, trees, graphs, and core data structures",
      "Clean algorithmic implementations with asymptotic time & space complexity analysis"
    ],
    githubUrl: "https://github.com/malli2247",
    demoUrl: "https://leetcode.com/u/Mallikarjuna_Boya/",
    accent: "cyan-purple",
  }
];

export const LEETCODE_PROFILE = {
  username: "Mallikarjuna_Boya",
  displayName: "BOYA MALLIKARJUNA",
  profileUrl: "https://leetcode.com/u/Mallikarjuna_Boya/",
  focus: [
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Structures",
    "Algorithms",
    "Java"
  ],
  stats: {
    totalSolved: 633,
    totalQuestions: 4060,
    easy: { solved: 253, total: 966 },
    medium: { solved: 276, total: 2117 },
    hard: { solved: 104, total: 977 },
    attempting: 2,
    contestRating: 1480,
    globalRanking: "126,326",
    contestsAttended: 1,
    contestUnlockNote: "5 more contests to unlock Global Ranking",
    totalBadges: 4,
    recentBadge: "100 Days Badge 2026",
    submissionsPastYear: "1,043",
    submissionsCount: 1043,
    totalActiveDays: 136,
    maxStreak: 87,
  },
  topics: [
    "Array", "String", "Hash Table", "Dynamic Programming", "Math", "Sorting",
    "Greedy", "Depth-First Search", "Binary Search", "Tree", "Breadth-First Search",
    "Matrix", "Two Pointers", "Bit Manipulation", "Stack", "Heap (Priority Queue)",
    "Graph", "Prefix Sum", "Design", "Simulation", "Counting", "Sliding Window",
    "Backtracking", "Union Find", "Linked List", "Recursion", "Binary Tree",
    "Monotonic Stack", "Trie", "Divide and Conquer", "Queue", "Memoization"
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "codealpha",
    number: "01",
    title: "Machine Learning Intern",
    organization: "CodeAlpha",
    type: "Internship",
    badge: "Machine Learning Internship",
    description: "Completed a Machine Learning Internship focused on developing practical machine learning applications and strengthening applied AI development skills.",
    projects: [
      "Disease Prediction",
      "Credit Scoring Model",
      "Handwritten Character Recognition"
    ],
    technologies: [
      "Python",
      "Machine Learning",
      "Scikit-learn",
      "Data Processing",
      "Model Development"
    ],
    accent: "purple-blue"
  },
  {
    id: "eduexpose",
    number: "02",
    title: "Artificial Intelligence Intern",
    organization: "EduExpose",
    type: "Internship",
    badge: "AI Internship",
    description: "Completed an Artificial Intelligence Internship focused on building a real-time computer vision application using Python.",
    projectSingle: "Real-Time Object Detection System Using Python",
    technologies: [
      "Python",
      "Artificial Intelligence",
      "Computer Vision",
      "Real-Time Object Detection"
    ],
    accent: "cyan-blue"
  },
  {
    id: "sih-internal",
    number: "03",
    title: "Smart India Hackathon — Internal Hackathon Participant",
    organization: "Uttaranchal University",
    type: "Hackathon",
    badge: "SIH / Hackathon",
    description: "Participated in an internal hackathon as part of Smart India Hackathon preparation and selection, working on technology-driven solutions to real-world problems.",
    projects: [
      "Collaborated on technology-driven solutions to real-world challenge statements",
      "Applied machine learning, software development workflows, and rapid prototyping under hackathon timeframes",
      "Engineered end-to-end presentation and algorithmic problem-solving pipeline"
    ],
    technologies: [
      "AI",
      "Machine Learning",
      "Software Development",
      "Problem Solving",
      "Team Collaboration"
    ],
    accent: "pink-purple"
  },
  {
    id: "independent-dev",
    number: "04",
    title: "AI & Software Development",
    organization: "Independent Technical Development",
    type: "Independent Technical Development",
    badge: "Independent Technical Development",
    description: "Building real-world AI and full-stack applications while continuously developing skills in machine learning, software engineering, data analysis, and modern web development.",
    projects: [
      "RakthaSethu — AI-Powered Real-Time Blood Emergency & Donor Matching Platform",
      "CardioVision AI — Heart Disease Prediction & Clinical ML Dashboard (90.16% Test Accuracy)",
      "LeetCode Solutions — 633 Verified Problems Solved Across Core DSA"
    ],
    technologies: [
      "AI / Machine Learning",
      "Full Stack Development",
      "Data Structures & Algorithms",
      "Python Development",
      "Web Applications"
    ],
    accent: "pink-cyan"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "9.30 CGPA",
    category: "Academic Standing",
    description: "Maintained top academic performance in B.Tech CSE (AI & ML) at Uttaranchal University.",
    verifiedLabel: "Verified Academic Record",
    icon: "GraduationCap",
    accent: "pink",
  },
  {
    title: "633 LeetCode Solved",
    category: "Competitive Programming",
    description: "Solved 633 problems (253 Easy, 276 Medium, 104 Hard) with 1,043 yearly submissions and an 87-day max streak.",
    verifiedLabel: "Verified on LeetCode",
    icon: "Code",
    accent: "cyan",
  },
  {
    title: "HackerRank SE Intern",
    category: "Skills Certification",
    description: "Certified Software Engineer Intern assessment covering algorithmic logic, system concepts, and data structure manipulation.",
    verifiedLabel: "HackerRank Verified",
    icon: "Award",
    accent: "purple",
  },
  {
    title: "Problem Solving (Intermediate)",
    category: "Algorithms Certification",
    description: "Earned intermediate problem-solving certification on HackerRank, validating complex algorithmic analysis and optimization.",
    verifiedLabel: "HackerRank Verified",
    icon: "CheckCircle2",
    accent: "blue",
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Software Engineer Intern Certificate",
    issuer: "HackerRank",
    verifiedUrl: "https://www.hackerrank.com/profile/boyamallikarjun4/",
    date: "Verified Assessment",
    skillsCovered: ["Data Structures", "Algorithms", "Core Computer Science", "Code Optimization"]
  },
  {
    title: "Problem Solving (Intermediate) Certificate",
    issuer: "HackerRank",
    verifiedUrl: "https://www.hackerrank.com/profile/boyamallikarjun4/",
    date: "Verified Assessment",
    skillsCovered: ["Complex Problem Solving", "Time Complexity", "Graph & Array Traversals", "Debugging"]
  }
];
