import { Project, Experience } from "./model";

export const PROJECTS: Project[] = [
  {
    title: 'QualeFuturo',
    description: [
      '"QualeFuturo" is a web marathon, where 400 young men and women work together in a digital brainstorm on four topics relevant for the future',
    ],
    image: 'assets/projects/qualefuturo.png',
    url: 'https://demos.kevincorizi.com/qualefuturo',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    title: 'Ostello Ortensi',
    description: [
      'Ostello Ortensi is a hostel and restaurant in central Italy.',
      'The website includes room information and reservation, along with information of the natural surroundings and menu choices.',
    ],
    image: 'assets/projects/ostelloortensi.png',
    url: 'https://www.ostelloortensi.it',
    tech: ['WordPress'],
  },
  {
    title: 'Visionary Days 2020',
    description: [
      'Official website for the 2020 edition of Visionary Days, the event where thousands of people meet to write a better future.',
    ],
    image: 'assets/projects/vd2020.png',
    url: 'https://demos.kevincorizi.com/visionarydays2020',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    title: 'PoliTO Design Department',
    description: [
      'Creation of the new portal of the Politecnico di Torino Design Department.',
      'The website relies on a WordPress backend with a custom theme created from scratch.',
    ],
    image: 'assets/projects/polito-design.png',
    url: 'https://areeweb.polito.it/didattica/design',
    tech: ['WordPress', 'Custom Theme'],
  },
  {
    title: 'Visionary Days 2019',
    description: [
      'Official website for the 2019 edition of Visionary Days, the event where thousands of people meet to write a better future.',
    ],
    image: 'assets/projects/vd2019.png',
    url: 'https://demos.kevincorizi.com/visionarydays2019',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    title: 'Visionary Days 2018',
    description: [
      'Official website for the 2018 edition of Visionary Days, the event where thousands of people meet to write a better future.',
    ],
    image: 'assets/projects/vd2018.png',
    url: 'https://demos.kevincorizi.com/visionarydays2018',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    title: 'Nexi Advisor',
    description: [
      'Customizable online quiz platform with admin access to set questions and guest interface for candidates',
      'It is possible to configure multiple tests, questions for each test, and time limits.',
    ],
    image: 'assets/projects/nexiadvisor.png',
    url: 'http://techleader.talentgarden.org/apply/nexiadvisor',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
  {
    title: 'Visionary Days 2017',
    description: [
      'Official website for the first edition of Visionary Days, the event where thousands of people meet to write a better future.',
    ],
    image: 'assets/projects/vd2017.png',
    url: 'https://demos.kevincorizi.com/visionarydays2017',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    title: 'Fullstack developer',
    icons: ['assets/experiences/alten.png', 'assets/experiences/amadeus.png'],
    companies: ['ALTEN', 'Amadeus'],
    startDate: 'November 2018',
    endDate: 'July 2021',
    description: [
      'As a consultant in Alten on mission in Amadeus, I could expand my expertise on front-end development and technologies and become more proficient and effective in providing solutions to the client.',
      'As a software developer in Amadeus, I was part of the team in charge of the integration of NDC content in the flagship solution for business travel agencies, Selling Platform Connect - including the development of new components and maintainance the legacy codebase.',
      'My knowledge of the product also allowed me to communicate with stakeholders and teams who handle complementary products.',
      'During my time in Amadeus I gained experience building and testing enterprise-grade Angular 2+ and Java components. I got familiar with Agile and waterfall methodologies, from solution definition to product distribution. I could effectively communicate with stakeholders, provide valuable feedback and solutions, and support other team members.',
    ],
    skills: [
      'Designing and developing enterprise-grade software',
      'Writing robust, automated tests (unit, component, integration)',
      'Following Agile methodologies from solution definition to product distribution',
      'Interacting with stakeholders and other teams',
      'Analyzing problems and leading the discussion to address them',
      'Using CI/CD pipelines',
      'Debugging among several layers of the product',
    ],
    achievements: [
      'SWAG, a modern problem reporting and tracking tool',
      'Code generation capabilities for new components to improve portability and maintainability',
      'New components: seat map, ticket exchange, booking payment and cancellation, flight search',
    ],
    tech: [
      'Angular',
      'Java EE',
      'SQL Server',
      'Spring',
      'Hibernate',
      'MongoDB',
      'web workers',
      'Jasmine',
      'Karma',
      'JUnit',
      'Protractor',
      'Groovy',
      'Selenium',
      'BitBucket',
      'JIRA',
      'Confluence',
      'Jenkins',
      'OpenShift',
    ],
  },
  {
    title: 'Senior Consultant',
    icons: ['assets/experiences/jetop.png'],
    companies: ['J.E.To.P.'],
    startDate: 'March 2018',
    endDate: 'October 2018',
    description: [
      'After my experience as Head of IT, I kept contributing to the growth of the Junior Enterprise as a consultant, providing insights, enforcing best practices in project management and development and helping the ramp-up of newcomers.',
    ],
    skills: ['Support newcomers'],
    achievements: [],
    tech: [],
  },
  {
    title: 'Head of IT department',
    icons: ['assets/experiences/jetop.png'],
    companies: ['J.E.To.P.'],
    startDate: 'November 2017',
    endDate: 'March 2018',
    description: [
      'As Head of IT in JEToP I got a early taste of what it means to manage a group of 15 fellow students on real-life projects.',
      'This experience taught me to evaluate and dispatch incoming projects, discuss with clients, plan and maintain deadlines.',
      'It also forced me to learn how to pivot and think quickly when problems arise, and to steer a variable workforce to make sure the client is satisfied with the results.',
    ],
    skills: [
      'People management',
      'Estimate projects and set reliable deadlines',
      'Discuss contracts with clients',
      'Working under pressure',
    ],
    achievements: [
      'More than 10 projects succesfully delivered',
      'Helped steer the department towards more rewarding and profitable projects',
    ],
    tech: ['Kanban', 'Google Suite'],
  },
  {
    title: 'IT Assistant',
    icons: ['assets/experiences/jetop.png'],
    companies: ['J.E.To.P.'],
    startDate: 'March 2017',
    endDate: 'November 2017',
    description: [
      'As an IT Assistant in JEToP (Junior Enterprise Torino Politecnico), my activity focused on the creation of websites for external clients using WordPress.',
      'I contributed to more than 10 projects working with my team, with varying degrees of complexity and urgency.',
      'This taught me to work under pressure to meet deadlines, to manage my time effectively, and to interact with the client to best match their needs.',
    ],
    skills: [
      'Time management',
      'Team work',
      'Lots of CSS tricks',
      'Understand client needs',
    ],
    achievements: [],
    tech: ['WordPress', 'PrestaShop', 'BitBucket'],
  },
];
