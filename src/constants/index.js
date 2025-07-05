import { meta, shopify, starbucks, tesla } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
   
   
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    }
];

export const experiences = [
    {
        title: "Fullstack freelancer developer",
        company_name: "Workana",
        icon: react,
        iconBg: "#a2d2ff",
        date: "Jun 2023 - Nov 2023",
        points: [
            "I developed innovative web applications, collaborating with global clients, through the workana platform as a fullstack freelancer.",
            "I faced stimulating challenges, balancing frontend and backend skills to create efficient sikucoes for various projects at workana.",
            "I learned and grew professionally by adapting to different technologies and client requirements, delivering high-quality results as an independent fullstack developer",
           
        ],
    },
    
    {
        title: "Intern in Santa Luzia",
        company_name: "Hospital Santa Luzia",
        icon: typescript,
        iconBg: "#a2d2ff",
        date: "March 2023 - march 2024",
        points: [
            "Contributed to the efficiency of the hospital environment by making administrative procedures faster.",
            "I coordinate administrative tasks, keeping documentation organized and facilitating internal communication.",
            "plays a crucial role in coordinating administrative activities, providing vital support to the medical team.",
            "I developed an automation project for the hospital, which consisted of using the python language in conjunction with html, css and js to create the graphical interface, I used pyautoGUI, pytesseract and flask."
        ],
    },
      {
        title: "Intership",
        company_name: "W5i Tecnologia",
        icon: typescript,
        iconBg: "#a2d2ff",
        date: "April 2024 - June 2024",
        points: [
            "Contributed to the development and learning about build functional apps and grow as team.",
            "Learned to much and i created an strong QueryBuilder for the AdiantiFramework.",
        ],
    },
     {
        title: "Junior developer",
        company_name: "W5i Tecnologia",
        icon: typescript,
        iconBg: "#a2d2ff",
        date: "June 2024 - present",
        points: [
            "I build awassome applications to improve goverment management, deputy website transparency, and the Business Intelligence.",
            "For make the work more easy, i build an sgdb and code generator for a PHP framework called AdiantiFramework.",
            "",
            ""
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/LuscaCid',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/lucas-cid/',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'W5i Builder',
        description: 'Developed a web and desktop application that generates code and organize your database table and relations, generate PHP and sql code.',
        link: 'https://github.com/adrianhajdin/pricewise',
    },
    {
        iconUrl: nextjs,
        theme: 'btn-back-green',
        name: 'Transparency Portal for cities',
        description: 'Created a fullstack application for governments to show population all the transparency data.',
        link: 'https://w5i-portal-transparencia-frontend.vercel.app/',
    },
    {
        iconUrl: nextjs,
        theme: 'btn-back-blue',
        name: 'city ​​hall portal',
        description: 'Developed another fullstack application that is reponsible for show news, notify the population about situations, secretariats, deputy mayor status, schedules...',
        link: 'https://w5i-gerenciador-sites.vercel.app/w5i-tecnologia-acesso-2025',
    },
    {
        iconUrl: nextjs,
        theme: 'btn-back-pink',
        name: 'Styles spotify clone',
        description: 'Built home page spotify for only train my css skills, simple, but special for me',
        link: 'https://spotfy-clone-seven.vercel.app/',
    }
];
