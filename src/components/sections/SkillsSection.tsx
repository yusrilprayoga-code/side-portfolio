import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { skillCategories } from "@/constants/skills";

/**
 * Capabilities as a structural index — no bars, no logos, no percentages.
 * Each category is a ruled row: mono label on the left, wrapped tags on
 * the right. Rows stack on mobile, split into two columns from md up.
 */
export function SkillsSection() {
  return (
    <Section
      id="skills"
      index="02"
      label="Capabilities"
      title="What I work with"
      intro="No ratings, no bars — just the tools I ship with, grouped by where they sit in the stack."
    >
      <div className="border-b-2 border-line">
        {skillCategories.map((category, i) => (
          <Reveal key={category.name} delay={i * 0.05}>
            <div className="grid gap-4 border-t-2 border-line py-8 md:grid-cols-[220px_1fr] md:gap-8 md:py-10">
              <h3 className="label-mono text-fg">
                <span aria-hidden="true" className="text-accent">
                  /
                </span>{" "}
                {category.name}
              </h3>
              <ul className="flex flex-wrap gap-2 md:gap-3">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border border-line px-3 py-1 font-mono text-sm uppercase transition-colors duration-150 hover:border-accent hover:text-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
