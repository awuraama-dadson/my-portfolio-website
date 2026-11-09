/** Contact form enquiry types. Each type can ask for extra, relevant details. */
export interface ExtraField {
  name: string;
  label: string;
  type: 'text' | 'date' | 'textarea' | 'select' | 'url';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface EnquiryType {
  id: string;
  label: string;
  hint: string;
  fields: ExtraField[];
  messagePrompt: string;
}

export const enquiryTypes: EnquiryType[] = [
  {
    id: 'speaking',
    label: 'Speaking Engagements',
    hint: 'Events, panels, workshops and talks',
    messagePrompt: 'Tell me about the event and what you would like me to speak about.',
    fields: [
      { name: 'eventName', label: 'Event name', type: 'text', required: true },
      { name: 'eventDate', label: 'Event date', type: 'date' },
      { name: 'audience', label: 'Audience', type: 'text', placeholder: 'Who will be in the room, and roughly how many?' },
      { name: 'format', label: 'Format', type: 'select', options: ['In person', 'Virtual', 'Not sure yet'] },
    ],
  },
  {
    id: 'software',
    label: 'Software Development / Website Projects',
    hint: 'Websites, web apps and digital products',
    messagePrompt: 'Describe the project and what you would like it to do.',
    fields: [
      { name: 'projectType', label: 'Project type', type: 'select', options: ['New website', 'Website redesign', 'Online store', 'Web application', 'Something else'], required: true },
      { name: 'currentSite', label: 'Current website (if any)', type: 'url', placeholder: 'https://' },
      { name: 'requirements', label: 'Key requirements', type: 'textarea', placeholder: 'Pages, features, integrations, timeline…' },
    ],
  },
  {
    id: 'writing',
    label: 'Writing / Publishing Opportunities',
    hint: 'Guest pieces, features and publishing',
    messagePrompt: 'Share the opportunity and what you have in mind.',
    fields: [
      { name: 'publication', label: 'Publication or platform', type: 'text', required: true },
      { name: 'deadline', label: 'Deadline', type: 'date' },
    ],
  },
  {
    id: 'partnership',
    label: 'Brand Partnerships & Collaborations',
    hint: 'Creative and brand collaborations',
    messagePrompt: 'Tell me about the collaboration you are proposing.',
    fields: [
      { name: 'brandName', label: 'Brand name', type: 'text', required: true },
      { name: 'collaboration', label: 'Proposed collaboration', type: 'textarea', placeholder: 'What would we create together?' },
    ],
  },
  {
    id: 'business',
    label: 'Business Enquiries',
    hint: 'Ventures, products and opportunities',
    messagePrompt: 'What would you like to discuss?',
    fields: [],
  },
  {
    id: 'media',
    label: 'Interviews & Media',
    hint: 'Podcasts, interviews and features',
    messagePrompt: 'Tell me about the interview or feature.',
    fields: [
      { name: 'outlet', label: 'Show or outlet', type: 'text', required: true },
      { name: 'recordingDate', label: 'Proposed date', type: 'date' },
    ],
  },
  {
    id: 'general',
    label: 'General Enquiries',
    hint: 'Anything else, or just to say hello',
    messagePrompt: 'Your message',
    fields: [],
  },
];
