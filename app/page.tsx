import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import ServicesSection from "@/components/ServicesSection";
import StatsGrid from "@/components/StatsGrid";
import FlagshipProject from "@/components/FlagshipProject";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section עם ה-Chat הדינמי */}
      <section className="pt-32 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
            Saban<span className="text-green-500">OS</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            הופכים את העסק שלך לאוטומטי עם פתרונות AI מתקדמים בוואטסאפ ובניהול פרויקטים.
          </p>
        </div>
        
        <ChatInterface />
      </section>

      <StatsGrid />
      <ServicesSection />
      <FlagshipProject />
      <ProjectsShowcase />
      <ContactSection />
    </main>
  );
}
