declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const meta: {
    title: string;
    date: string;
    description: string;
    image: string;
    tags?: string[];
  };

  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
