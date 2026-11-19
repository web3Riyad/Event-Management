import React from 'react'
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className="bg-[#101010] text-[#F5F1E8] border-t border-[#222222] pt-16 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <span className="text-2xl font-serif font-semibold tracking-wide text-white">
              UNIQUE<span className="text-[#D9A441]">.</span>
            </span>
            <p className="mt-4 text-sm text-[#777777] max-w-sm leading-relaxed">
              Crafting transcendent experiences for discerning hosts, cultural institutions, and
              world-class enterprises.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D9A441] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#F5F1E8]/80">
              <li>
                <Link href="#featured" className="hover:text-[#D9A441] transition-colors">
                  Featured Events
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[#D9A441] transition-colors">
                  Services & Galas
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#D9A441] transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D9A441] font-semibold mb-4">
              Private Inquiries
            </h4>
            <p className="text-sm text-[#777777] mb-2">concierge@elite-events.com</p>
            <p className="text-sm text-[#777777]">+1 (800) 845-9200</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] gap-4">
          <p>© 2026 Élite Events Management. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#F5F1E8] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#F5F1E8] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[#F5F1E8] cursor-pointer transition-colors">Concierge</span>
          </div>
        </div>
      </footer>
  )
}

export default Footer


