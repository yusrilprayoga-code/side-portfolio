"use client";
import { TextGenerateEffect } from "./TextGenerate";

const words = `Hey there, I'm Yusril Prayoga - a passionate developer, avid writer,
          and a connoisseur of awesome design. Welcome to my corner of the
          digital world!
`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
