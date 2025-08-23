import FuzzyText from "@/components/FuzzyText";
import React from "react";

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
        404 Not Found
      </FuzzyText>
    </div>
  );
};

export default Page;
