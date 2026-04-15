// ============================================================
//  PERSONAL CONFIGURATION — Edit everything here
//  All sections of the website pull from this single file
// ============================================================

export const PERSONAL = {
  // Basic Info
  name: 'Bhumil Prajapati',
  company: 'Clip Crafters',
  tagline: 'Video Editor & Web Developer',
  bio: `I'm a passionate Video Editor and Web Developer with a knack for creating
    compelling visual stories and building robust digital solutions.
    With expertise spanning from cinematic video production to full-stack web development,
    I bring a unique blend of creative and technical skills to every project.`,
  bioShort: 'Crafting stunning visual stories and building powerful digital experiences. From cinematic edits to full-stack web apps — I bring ideas to life.',

  // Contact
  whatsapp: '918511872920',          // Country code + number (no + or spaces)
  whatsappDisplay: '+91 85118 72920',
  email: 'bhumilprajapati4@gmail.com',
  whatsappMessage: "Hi Bhumil! I'd like to discuss a project with you.",

  // Location & Education
  location: 'India',
  education: 'Your Degree / Field',  // Update this

  // Social Links
  social: {
    github: 'https://github.com/',       // Update with your GitHub
    linkedin: 'https://linkedin.com/',   // Update with your LinkedIn
    instagram: 'https://instagram.com/', // Update with your Instagram
    youtube: '',                          // Optional
  },

  // Logo — place your logo file in frontend/public/logo.png
  // Set logoType to 'image' to use a logo file, or 'text' for text logo
  logoType: 'text',   // 'text' | 'image'
  logoImage: '/logo.png',  // path inside /public folder

  // Stats (also editable from Admin Panel)
  stats: {
    videosEdited: '200+',
    projectsBuilt: '50+',
    yearsExperience: '3+',
    happyClients: '80+',
  },

  // SEO
  seoTitle: 'Clip Crafters | Bhumil Prajapati — Video Editor & Web Developer',
  seoDescription: 'Professional Video Editor & Web Developer. Motion graphics, product edits, ads, and full-stack web development.',
  seoKeywords: 'video editor, web developer, motion graphics, clip crafters, bhumil prajapati, react, nodejs',

  // Footer
  footerNote: `© ${new Date().getFullYear()} Clip Crafters — Bhumil Prajapati. Built with React, Three.js & GSAP.`,
}

export default PERSONAL
