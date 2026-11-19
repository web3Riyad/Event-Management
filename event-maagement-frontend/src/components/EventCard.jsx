"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export function formatEventDate(dateStr) {
  if (!dateStr) return "";
  try {
    const [year, month, day] = dateStr.split("-");
    const d = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10));
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function EventCard({ event, isPast = false }) {
  const formattedDate = formatEventDate(event.eventDate);
  const fallbackImage =
    "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=1200";

  // Past event card styling
  if (isPast) {
    return (
      <div className="bg-white/80 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group opacity-90 hover:opacity-100">
        <div className="relative h-44 w-full overflow-hidden bg-gray-200">
          <img
            src={event.thumbnailImageUrl || fallbackImage}
            alt={event.eventTitle || "Past Event"}
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <span className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full">
            {event.eventType}
          </span>

          <span className="absolute top-3 right-3 bg-emerald-800/90 text-emerald-100 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Completed
          </span>

          <span className="absolute bottom-2.5 left-3 text-xs text-gray-200 font-medium">
            Concluded {formattedDate}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h4 className="text-base font-serif font-semibold text-gray-900 mb-1.5 line-clamp-1">
            {event.eventTitle}
          </h4>
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-2.5">
            <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </p>
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {event.eventDescription}
          </p>
        </div>
      </div>
    );
  }

  // Upcoming event card styling (Coming Date First)
  return (
    <div className="group bg-white rounded-2xl border border-[#E8E2D5] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <img
          src={event.thumbnailImageUrl || fallbackImage}
          alt={event.eventTitle || "Event Thumbnail"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <span className="absolute top-4 left-4 bg-[#0f766e] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
          {event.eventType}
        </span>

        <span className="absolute bottom-3 left-4 text-xs font-semibold text-white flex items-center gap-1.5 drop-shadow-md">
          <Calendar className="w-3.5 h-3.5 text-[#D9A441]" />
          {formattedDate}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-serif font-bold text-[#101010] mb-2.5 group-hover:text-[#0f766e] transition-colors line-clamp-1">
          {event.eventTitle}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-[#777777] mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#D9A441] shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        <p className="text-sm text-gray-600 font-sans line-clamp-2 mb-6 flex-1">
          {event.eventDescription}
        </p>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-[#0f766e] font-semibold">
            Open for Volunteers
          </span>
          <Link
            href={`/events/${event._id || ""}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101010] group-hover:text-[#0f766e] group-hover:translate-x-0.5 transition-all"
          >
            Join Drive
            <ArrowRight className="w-3.5 h-3.5 text-[#0f766e]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
