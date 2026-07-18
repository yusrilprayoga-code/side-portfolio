// Consolidated certification data — previously scattered across five
// decorative showcase components (AccomplismentsLayout, CertificateLayout,
// ThreeDCardPage, InfiniteMovingLayout, constants/certificate.tsx).

export type Credential = {
  title: string;
  image: string;
  /** External proof link, when one exists. */
  credentialUrl?: string;
  issuer?: string;
  date?: string;
  description?: string;
};

export const featuredCredentials: Credential[] = [
  {
    title: "Google IT Support Professional Certificate",
    issuer: "Google / Credly",
    image: "/certificate/google-it-support-professional-certificate.png",
    credentialUrl:
      "https://www.credly.com/badges/04d46c4d-127b-4fb1-8d75-893f91c6cdda/public_url",
  },
  {
    title: "Google Cloud Computing Foundations Certificate",
    issuer: "Google Cloud / Credly",
    image: "/certificate/google-cloud-computing-foundations-certificate.png",
    credentialUrl:
      "https://www.credly.com/badges/5541dfd4-f792-4257-a847-86a532c37ab4/public_url",
  },
  {
    title: "Implement Load Balancing on Compute Engine",
    issuer: "Google Cloud / Credly",
    image: "/certificate/certificate-load-balancing.png",
    credentialUrl:
      "https://www.credly.com/badges/b82a6a3a-61f6-4ce4-b10e-51b5792212d1/public_url",
  },
  {
    title: "Bangkit Academy 2024 — Cloud Computing Learning Path",
    issuer: "Google, GoTo, Traveloka",
    image: "/certificate/certificate-bangkit.png",
    credentialUrl: "/certificate/certificate-bangkit.png",
    description:
      "Distinction graduate of Indonesia's selective tech talent program: cloud architecture, ML serving, and a cross-path capstone.",
  },
  {
    title: "The Complete 2024 Web Development Bootcamp",
    issuer: "Udemy",
    image:
      "https://udemy-certificate.s3.amazonaws.com/image/UC-eb27df0f-6915-40e2-83ed-b3b6b069073c.jpg",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-eb27df0f-6915-40e2-83ed-b3b6b069073c/",
    description:
      "Full-stack web development: Node.js, Express, SQL, React, MongoDB, and more.",
  },
];

export const skillBoostProfileUrl =
  "https://www.cloudskillsboost.google/public_profiles/3985e6aa-47ee-4d99-a370-fffcfdb5a690";

export const skillBoostBadges: Credential[] = [
  {
    title: "Deploy Kubernetes Applications on Google Cloud",
    date: "May 2024",
    image: "/certificate/certificate-kubernetes.png",
  },
  {
    title: "Develop your Google Cloud Network",
    date: "Mar 2024",
    image: "/certificate/certificate-cloud-network.png",
  },
  {
    title: "Build and Secure Networks in Google Cloud",
    date: "Mar 2024",
    image: "/certificate/certificate-secure-networks.png",
  },
  {
    title: "Perform Foundational Data, ML, and AI Tasks in Google Cloud",
    date: "Mar 2024",
    image: "/certificate/certificate-data-ml.png",
  },
  {
    title: "Perform Foundational Infrastructure Tasks in Google Cloud",
    date: "Mar 2024",
    image: "/certificate/certificate-environment.png",
  },
  {
    title: "Create and Manage Cloud Resources",
    date: "Mar 2024",
    image: "/certificate/certificate-load-balancing.png",
  },
  {
    title: "Terraform on Google Cloud",
    image: "/certificate/certificate-terraform.png",
  },
];

export const courseraCertificates: Credential[] = [
  {
    title: "Google IT Support",
    image: "/certificate/certificate-it-support.png",
  },
  {
    title: "Operating Systems and You: Becoming a Power User",
    image: "/certificate/certificate-becoming-a-power-user.png",
  },
  {
    title: "IT Security: Defense Against the Digital Dark Arts",
    image: "/certificate/certificate-it-security.png",
  },
  {
    title: "System Administration and IT Infrastructure Services",
    image: "/certificate/certificate-system-administration.png",
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    image: "/certificate/certificate-bits-and-bytes.png",
  },
  {
    title: "Foundations of Cybersecurity",
    image: "/certificate/certificate-foundations-of-cybersecurity.png",
  },
  {
    title: "Technical Support Fundamentals",
    image: "/certificate/certificate-technical-support.png",
  },
  {
    title: "Play It Safe: Manage Security Risks",
    image: "/certificate/certificate-play-it-safe.png",
  },
];

// Labels derived from the certificate file names.
export const dicodingCertificates: Credential[] = [
  { title: "Cloud Engineer", image: "/certificate/certificate-cloud-engineer.png" },
  { title: "JavaScript", image: "/certificate/certificate-javascript.png" },
  { title: "Back-End Pemula", image: "/certificate/certificate-backend-pemula.png" },
  { title: "Web Dasar", image: "/certificate/certificate-web-dasar.png" },
  { title: "Google Cloud", image: "/certificate/certificate-google-cloud.png" },
  { title: "AI", image: "/certificate/certificate-ai.png" },
  { title: "Pengembang Software", image: "/certificate/certificate-pengembang-software.png" },
  { title: "Programming Logic", image: "/certificate/certificate-programming-logic.png" },
  { title: "Machine Learning", image: "/certificate/certificate-machine-learning.png" },
  { title: "Git & GitHub", image: "/certificate/certificate-github.png" },
  { title: "Visualisasi Data", image: "/certificate/certificate-visualisasi-data.png" },
  { title: "Front-End Pemula", image: "/certificate/certificate-frontend.png" },
  { title: "Python", image: "/certificate/certificate-python.png" },
  { title: "SQL", image: "/certificate/certificate-sql.png" },
  { title: "Manajemen Proyek", image: "/certificate/certificate-project-management.png" },
];
