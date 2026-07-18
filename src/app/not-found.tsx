import Link from "next/link";
import { Button } from "@/components/site/Button";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16">
      <p className="label-mono">Error — page not found</p>
      <h1 className="headline mt-4 text-[clamp(5rem,20vw,16rem)]">
        404<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
        This page doesn&apos;t exist — or it moved during the redesign. The
        important things are all still here.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Back home</Button>
        <Button href="/projects" variant="outline">
          View projects
        </Button>
      </div>
      <p className="label-mono mt-12">
        Lost? Email me —{" "}
        <Link href="/#contact" className="underline decoration-accent decoration-2 underline-offset-4">
          let&apos;s talk
        </Link>
      </p>
    </div>
  );
}
