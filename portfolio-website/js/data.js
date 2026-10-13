/**
 * Portfolio Data Registry
 * Centralized data store for projects, academic laboratory repositories, and developer metadata.
 */

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Ashlesha Singh',
    degree: 'B.Tech CSE Undergrad (AI & ML) • SIT Nagpur',
    institution: 'Symbiosis Institute of Technology, Nagpur',
    cgpa: 8.45,
    class12: '85%',
    class10: '87%',
    specializations: ['AIML', 'Agentic AI', 'Geospatial Data Science'],
    githubUser: 'AashleshaS',
    resumeUrl: 'assets/Ashlesha_Singh_Resume.pdf'
  },

  projects: [
    {
      id: 'vidarbha-urbanization',
      title: 'Vidarbha Urbanization Impact Analysis',
      category: 'proper',
      repoUrl: 'https://github.com/AashleshaS/vidarbha-urbanization-impact-analysis-',
      tags: ['Google Earth Engine', 'Python', 'Random Forest', 'Rasterio', 'Pandas / NumPy']
    },
    {
      id: 'strategic-afforestation',
      title: 'Strategic Afforestation Dashboard (DSS)',
      category: 'proper',
      repoUrl: 'https://github.com/AashleshaS/Geospatial-Afforestation-Decision-Support-System',
      tags: ['GEE', 'JavaScript', 'MCDA', 'Open Buildings']
    },
    {
      id: 'quizcraft-ai',
      title: 'QuizCraft AI — Intelligent Quiz Platform',
      category: 'proper',
      repoUrl: 'https://github.com/AashleshaS/Intelligent-Quiz-Generation-Agent',
      tags: ['FastAPI', 'React 19', 'LangChain', 'Google Gemini', 'Groq LPU', 'Render']
    },
    {
      id: 'smart-green-air-quality-monitor',
      title: 'Smart Green Air Quality Monitor',
      category: 'mini',
      repoUrl: null, // Explicitly no GitHub repo link option per requirement
      tags: ['Arduino Uno', 'DHT22 Sensor', 'MQ-2 Gas Sensor', 'I2C LCD']
    },
    {
      id: 'institute-faq-chatbot',
      title: 'Rule-Based Institute FAQ Chatbot',
      category: 'mini',
      repoUrl: 'https://github.com/AashleshaS/FAQ-Chatbot',
      tags: ['Python', 'JavaScript', 'Regex NLP', 'Tkinter']
    }
  ],

  labs: [
    {
      id: 'javascript-interactive-lab',
      category: 'core',
      repoUrl: 'https://github.com/AashleshaS/JAVASCRIPT_LAB',
      language: 'JavaScript ES6+'
    },
    {
      id: 'compiler-construction-lex-lab',
      category: 'systems',
      repoUrl: 'https://github.com/AashleshaS/Compiler-Construction-Lab',
      language: 'Lex / C'
    },
    {
      id: 'operating-systems-lab',
      category: 'systems',
      repoUrl: 'https://github.com/AashleshaS/Operating-Systems-Lab',
      language: 'C / Linux'
    },
    {
      id: 'dbms-sql-plsql-lab',
      category: 'data',
      repoUrl: 'https://github.com/AashleshaS/DBMS-LAB-SEM-4',
      language: 'PL/SQL / Oracle'
    },
    {
      id: 'java-oop-concurrent-lab',
      category: 'core',
      repoUrl: 'https://github.com/AashleshaS/Java-SEM4',
      language: 'Java'
    },
    {
      id: 'dsa-algorithms-lab',
      category: 'core',
      repoUrl: 'https://github.com/AashleshaS/Design-and-Analysis-of-Algorithms-Lab',
      language: 'C / C++'
    },
    {
      id: 'machine-learning-scikit-lab',
      category: 'data',
      repoUrl: 'https://github.com/AashleshaS/Machine-Learning-Lab',
      language: 'Python / ML'
    },
    {
      id: 'python-programming-foundations-lab',
      category: 'data',
      repoUrl: 'https://github.com/AashleshaS/Programming-and-problem-Solving-in-Python',
      language: 'Python 3'
    }
  ]
};

// Also attach to window for non-module script access
if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
