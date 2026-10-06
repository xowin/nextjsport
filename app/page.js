import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SpotifySection from "./components/SpotifySection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-blue-50">
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
