export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface PersonalInformation {
  firstName?: string;
  lastName?: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}

export interface Education {
  degree?: string;
  institution?: string;
  year?: string;
  description?: string;
}

export interface Experience {
  title?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Project {
  title?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Certification {
  description?: string;
  media?: string;
}

export interface Skill {
  name?: string;
  level?: string;
  description?: string;
}

export interface Summary {
  description?: string;
}

export interface CV {
  personalInformation?: PersonalInformation;
  education?: Education[];
  experience?: Experience[];
  skills?: Skill[];
  summary?: Summary;
  projects?: Project[];
  certifications?: Certification[];
}

export interface PropertyMetadata {
  [key: string]: {
    label?: string;
    editComponent?: string;
    displayComponent?: string;
    displayClass?: string;
    childDisplayClass?: string;
    subProperties?: PropertyMetadata;
    addItemMethod?: string;
    deleteItemMethod?: string;
  };
}

export const propertyMetadata: PropertyMetadata = {
  personalInformation: {
    label: 'Personal Information',
    editComponent: 'EditPersonalInformationComponent',
    displayComponent: 'DisplayPersonalInformationComponent',
    displayClass: 'col-12',
    childDisplayClass: 'row',
    subProperties: {
      firstName: {
        label: 'First Name',
        editComponent: 'EditFirstName',
        displayComponent: 'DisplayFirstNameComponent',
        addItemMethod: 'addFirstName',
        deleteItemMethod: 'deleteFirstName',
      },
      lastName: {
        label: 'Last Name',
        editComponent: 'EditLastName',
        displayComponent: 'DisplayLastNameComponent',
        addItemMethod: 'addLastName',
        deleteItemMethod: 'deleteLastName',
      },
      address: {
        label: 'Address',
        editComponent: 'EditAddress',
        displayComponent: 'DisplayAddressComponent',
        addItemMethod: 'addAddress',
        deleteItemMethod: 'deleteAddress',
      },
      email: {
        label: 'E-Mail',
        editComponent: 'EditEmail',
        displayComponent: 'DisplayEmailComponent',
        addItemMethod: 'addEmail',
        deleteItemMethod: 'deleteEmail',
      },
      phoneNumber: {
        label: 'Phone Number',
        editComponent: 'EditPhoneNumber',
        displayComponent: 'DisplayPhoneNumberComponent',
        addItemMethod: 'addPhoneNumber',
        deleteItemMethod: 'deletePhoneNumber',
      },
      dateOfBirth: {
        label: 'Date of Birth',
        editComponent: 'EditDateOfBirth',
        displayComponent: 'DisplayDateOfBirthComponent',
        addItemMethod: 'addDateOfBirth',
        deleteItemMethod: 'deleteDateOfBirth',
      },
    },
  },
  education: {
    label: 'Education',
    editComponent: 'EditEducationComponent',
    displayComponent: 'DisplayEducationComponent',
    displayClass: 'col-4',
    childDisplayClass: 'row',
    subProperties: {
      degree: {
        label: 'Degree',
        editComponent: 'EditDegreeComponent',
        displayComponent: 'DisplayDegreeComponent',
      },
      institution: {
        label: 'Institution',
        editComponent: 'EditInstitutionComponent',
        displayComponent: 'DisplayInstitutionComponent',
      },
      year: {
        label: 'Year',
        editComponent: 'EditStartDateComponent',
        displayComponent: 'DisplayStartDateComponent',
      },
      description: {
        label: 'Description',
        editComponent: 'EditEducationDescriptionComponent',
        displayComponent: 'DisplayEducationDescriptionComponent',
      },
    },
    addItemMethod: 'addEducation',
    deleteItemMethod: 'deleteEducation',
  },
  experience: {
    label: 'Experience',
    editComponent: 'EditExperienceComponent',
    displayComponent: 'DisplayExperienceComponent',
    displayClass: 'col-8',
    childDisplayClass: 'row',
    subProperties: {
      title: {
        label: 'Title',
        editComponent: 'EditExperienceTitleComponent',
        displayComponent: 'DisplayExperienceTitleComponent',
      },
      company: {
        label: 'Company',
        editComponent: 'EditExperienceCompanyComponent',
        displayComponent: 'DisplayExperienceCompanyComponent',
      },
      startDate: {
        label: 'Start Date',
        editComponent: 'EditExperienceStartDateComponent',
        displayComponent: 'DisplayExperienceStartDateComponent',
      },
      endDate: {
        label: 'End Date',
        editComponent: 'EditExperienceEndDateComponent',
        displayComponent: 'DisplayExperienceEndDateComponent',
      },
      description: {
        label: 'Description',
        editComponent: 'EditExperienceDescriptionComponent',
        displayComponent: 'DisplayExperienceDescriptionComponent',
      },
    },
    addItemMethod: 'addExperience',
    deleteItemMethod: 'deleteExperience',
  },
  skills: {
    label: 'Skills',
    editComponent: 'EditSkillsComponent',
    displayComponent: 'DisplaySkillsComponent',
    displayClass: 'col-3',
    childDisplayClass: 'row',
    subProperties: {
      name: {
        label: 'Skill',
        editComponent: 'EditSkillNameComponent',
        displayComponent: 'DisplaySkillNameComponent',
      },
      level: {
        label: 'Level',
        editComponent: 'EditSkillLevelComponent',
        displayComponent: 'DisplaySkillLevelComponent',
      },
      description: {
        label: 'Description',
        editComponent: 'EditSkillDescriptionComponent',
        displayComponent: 'DisplaySkillDescriptionComponent',
      },
    },
  },
  summary: {
    label: 'Summary',
    editComponent: 'EditSummaryComponent',
    displayComponent: 'DisplaySummaryComponent',
    displayClass: 'col-12',
    subProperties: {
      description: {
        label: 'Description',
        editComponent: 'EditSummaryDescriptionComponent',
        displayComponent: 'DisplaySummaryDescriptionComponent',
      },
    },
  },
  projects: {
    label: 'Projects',
    editComponent: 'EditProjectsComponent',
    displayComponent: 'DisplayProjectsComponent',
    displayClass: 'col-9',
    childDisplayClass: 'row',
    subProperties: {
      title: {
        label: 'Title',
        editComponent: 'EditProjectTitleComponent',
        displayComponent: 'DisplayProjectTitleComponent',
      },
      company: {
        label: 'Company',
        editComponent: 'EditProjectCompanyComponent',
        displayComponent: 'DisplayProjectCompanyComponent',
      },
      startDate: {
        label: 'Start Date',
        editComponent: 'EditProjectStartDateComponent',
        displayComponent: 'DisplayProjectStartDateComponent',
      },
      endDate: {
        label: 'End Date',
        editComponent: 'EditProjectEndDateComponent',
        displayComponent: 'DisplayProjectEndDateComponent',
      },
      description: {
        label: 'Description',
        editComponent: 'EditProjectDescriptionComponent',
        displayComponent: 'DisplayProjectDescriptionComponent',
      },
    },
    addItemMethod: 'addProject',
    deleteItemMethod: 'deleteProject',
  },
  certifications: {
    label: 'Certifications',
    editComponent: 'EditCertificationsComponent',
    displayComponent: 'DisplayCertificationsComponent',
    subProperties: {
      description: {
        label: 'Description',
        editComponent: 'EditCertificationDescriptionComponent',
        displayComponent: 'DisplayCertificationDescriptionComponent',
      },
      media: {
        label: 'Media',
        editComponent: 'EditCertificationMediaComponent',
        displayComponent: 'DisplayCertificationMediaComponent',
      },
    },
    addItemMethod: 'addCertification',
    deleteItemMethod: 'deleteCertification',
  },
};

export const cv: CV = {
  personalInformation: {
    firstName: 'Yair',
    lastName: 'Levy',
    address: '123 Main Street, City, Country',
    email: 'yair@example.com',
    phoneNumber: '123-456-7890',
    dateOfBirth: (new Date('1990-06-15')).toDateString(),
  },
  summary: {
    description: 'Highly motivated Fullstack Developer with a passion for creating efficient and scalable web applications. Experienced in JavaScript, React, Node.js, and MongoDB.',
  },
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of XYZ',
      year: (new Date('2010-09-01')).toDateString(),
      description: 'Studied various computer science subjects and gained valuable knowledge.',
    },
  ],
  experience: [
    {
      title: 'Fullstack Developer',
      company: 'Tech Solutions Inc.',
      startDate: (new Date('2015-01-01')).toDateString(),
      endDate: (new Date('2023-07-31')).toDateString(),
      description: 'Developed and maintained web applications using modern technologies.',
    },
    {
      title: 'Frontend Developer',
      company: 'Web Dev Co.',
      startDate: (new Date('2014-07-01')).toDateString(),
      endDate: (new Date('2014-12-31')).toDateString(),
      description: 'Worked on building user interfaces and implementing responsive designs.',
    },
  ],
  skills: [
    {
      name: 'JavaScript',
      level: 'Advanced',
      description: 'Proficient in modern JavaScript and ES6+ features.',
    },
    {
      name: 'React',
      level: 'Advanced',
      description: 'Extensive experience in building complex React applications.',
    },
    {
      name: 'Node.js',
      level: 'Advanced',
      description: 'Strong knowledge of server-side JavaScript using Node.js.',
    },
    {
      name: 'HTML/CSS',
      level: 'Intermediate',
      description: 'Skilled in building and styling web pages with HTML and CSS.',
    },
    {
      name: 'MongoDB',
      level: 'Intermediate',
      description: 'Familiarity with NoSQL databases like MongoDB.',
    },
    {
      name: 'SQL',
      level: 'Intermediate',
      description: 'Experience with relational databases and SQL queries.',
    },
  ],
  projects: [
    {
      title: 'E-commerce Website',
      company: 'Tech Solutions Inc.',
      startDate: (new Date('2022-02-01')).toDateString(),
      endDate: (new Date('2022-06-30')).toDateString(),
      description: 'Developed an e-commerce website with React and Node.js, enabling online purchases and order management.',
    },
    {
      title: 'Blog Platform',
      company: 'Personal Project',
      startDate: (new Date('2021-07-01')).toDateString(),
      endDate: (new Date('2021-12-31')).toDateString(),
      description: 'Created a blog platform with user authentication and CRUD functionality using React and MongoDB.',
    },
  ],
  certifications: [
    {
      description: 'AWS Certified Developer - Associate',
    },
    {
      description: 'React Nanodegree',
    },
  ],
};

export const defaultCv:CV = {
  personalInformation: {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
  },
  summary: {
    description: '',
  },
  education: [
    {
      degree: '',
      institution: '',
      year: '',
      description: '',
    },
  ],
  experience: [
    {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  skills: [
    {
      name: '',
      level: '',
      description: '',
    },
  ],
  projects: [
    {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
  certifications: [
    {
      description: '',
    },
  ],
};

export const assistantMessages = {
  default: {
    assistant: {
      id: '1',
      name: 'Jane',
      avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
      text: ["Hi, I'm Jane, your CV assistant, what would you  like to do?", "1st option"],
      sent: false,
      stamp: new Date().toLocaleString(),
    },
    me: {
      id: '2',
      name: 'me',
      avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
      text: ["answer"],
      sent: true,
      stamp: new Date().toLocaleString(),
    },
  },
  suggest: (suggestion:string) => ({
    id: Math.random().toString(),
    name: 'Jane',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    text: [suggestion],
    sent: false,
    stamp: new Date().toLocaleString(),
  }),
};

export enum QueryTypes {
  SUGGEST = 'suggestImprovements',
  ASK = 'askInformation'
}
