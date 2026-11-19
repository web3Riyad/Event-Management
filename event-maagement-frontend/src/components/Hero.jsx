import React from 'react'
import Image from 'next/image'
import { Sparkles, ArrowRight, Calendar, MapPin, Award, ShieldCheck, Users } from "lucide-react";
import Link from 'next/link';

const HeroPart = () => {
  return (
    <div>
        <div className="flex-1 flex flex-col bg-white text-charcoal">
      {/* Hero Section: Full-Width Event Photography using bannar_backround.jpg from /public */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#101010]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bannar_backround.jpg"
            alt="Luxury Event Banner"
            fill
            priority
            className="object-cover object-center opacity-85 brightness-110 scale-100 transition-transform duration-1000 ease-out"
          />
          {/* Light, subtle gradient overlay so the photo is vibrant & clear */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-black/35 to-black/20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D9A441]/50 bg-black/40 backdrop-blur-md mb-8 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#D9A441]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#D9A441] font-semibold">
              Curated Luxury Gatherings
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
            Moments Crafted with <br />
            <span className="italic font-light text-[#D9A441]">Timeless Distinction</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#F5F1E8]/90 leading-relaxed font-sans mb-10 drop-shadow-md">
            From premier galas and private celebrations to international symposiums, we curate
            bespoke occasions marked by distinction, precision, and unforgettable artistry.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#upcoming"
              className="w-full sm:w-auto bg-[#D9A441] hover:bg-[#C59333] text-[#101010] font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Explore Upcoming Events
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#services"
              className="w-full sm:w-auto border border-[#F5F1E8]/30 hover:border-[#D9A441] bg-white/5 hover:bg-white/10 text-[#F5F1E8] font-medium px-8 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-300"
            >
              Our Experiences
            </Link>
          </div>
        </div>
      </section>
    </div>
    </div>
  )
}

export default HeroPart