import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ui";
import { QrWelcome } from "@/components/QrWelcome";
import { Hero } from "@/components/Hero";
import { Demo, FinalCTA, Footer, Inclusion, Problem, Proposal, Research } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <Proposal />
        <Inclusion />
        <Demo />
        <Research />
        <FinalCTA />
      </main>
      <Footer />
      <QrWelcome />
    </>
  );
}
