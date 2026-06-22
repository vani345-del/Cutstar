import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ChoosePath from "@/components/ChoosePath";

export default function Home() {
  return (
    <main>
      {/* Scroll 1 — Hero */}
      <Hero />

      {/* Scroll 2 — How It Works */}
      <HowItWorks />

      {/* Scroll 3 & 4 — Choose Your Path + Form */}
      <ChoosePath />
    </main>
  );
}
