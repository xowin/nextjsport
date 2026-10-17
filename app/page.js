import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SpotifySection from "./components/SpotifySection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import { PROFILE, SITE_URL } from "./data";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  url: SITE_URL,
  jobTitle: PROFILE.title,
  worksFor: { "@type": "Organization", name: PROFILE.org },
  address: { "@type": "PostalAddress", addressLocality: "Ripon", addressRegion: "CA" },
  sameAs: [PROFILE.github, PROFILE.linkedin],
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-blue-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <div className="container mx-auto mt-28 px-6 sm:px-10 lg:px-16">
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SpotifySection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
