import HeroPart from "@/components/Hero";
import EventsSection from "@/components/EventsSection";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* 1. Hero Section */}
      <HeroPart />

      {/* 2. Category Filter & Upcoming / Past Events */}
      <EventsSection />
    </main>
  );
}
