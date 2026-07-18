// Single source of truth for site identity — every section reads from here.
export const site = {
  name: "Yusril Prayoga",
  initials: "YP",
  role: "Software Engineer",
  tagline: "Full-stack software engineer building data-heavy products end-to-end.",
  email: "yusrilprayoga90@gmail.com",
  location: "Yogyakarta, Indonesia",
  availability: "Available for work",
  resumeUrl: "/mycv.pdf",
  github: "https://github.com/yusrilprayoga-code",
  linkedin: "https://www.linkedin.com/in/yusrilprayoga/",
  instagram: "https://www.instagram.com/moh_yusrilprayoga/",
};

export type NavItem = { label: string; href: string };

// Anchors are absolute ("/#about") so they work from any page.
export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];
