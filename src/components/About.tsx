"use client";
import { Paragraph } from "@/components/Paragraph";
import { TextGenerateEffectDemo } from "./TextGeneratePage";

export default function About() {
  return (
    <div>
      <div className="max-w-4xl">
        <TextGenerateEffectDemo />
        <Paragraph className=" mt-4 dark:text-gray-300">
          I&apos;m a Full Stack Developer from Yogyakarta, Indonesia. Right now
          I&apos;m building <strong>AURORA</strong>, an enterprise monitoring
          and governance platform for Pertamina Regional 1&apos;s Subsurface
          Performance &amp; Engineering team — designing the architecture,
          database, dashboards, and approval workflows end-to-end with Next.js,
          TypeScript, PostgreSQL, and Prisma.
        </Paragraph>

        <Paragraph className=" mt-4 dark:text-gray-300">
          Before that, I shipped production work across very different domains:
          an e-learning platform at Cleanique Academy, front-end work at PT
          Solutionlabs, the B-Otomotif automotive site, and a Cloud Computing
          learning path at Bangkit Academy 2024 (Google, GoTo, Traveloka). That
          mix taught me to move comfortably between frontend, backend,
          databases, and deployment — and to care about the business problem
          behind every feature.
        </Paragraph>

        <Paragraph className=" mt-4 dark:text-gray-300">
          I believe aesthetics and usability go hand in hand: a dashboard
          nobody can read is a bug, no matter how clean the code is. So I sweat
          the details on both sides — type-safe APIs and schema design under
          the hood, and clear, responsive interfaces on the surface. When
          I&apos;m not coding, I write about what I learn and edit videos.
        </Paragraph>

        <Paragraph className=" mt-4 dark:text-gray-300">
          If you&apos;re looking for someone who can take a product from
          business requirement to deployed system — or you just want to talk
          shop — my inbox is always open.
        </Paragraph>
      </div>
    </div>
  );
}
