"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  PlusCircle,
  CalendarDays,
  Ticket,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
  Menu,
  Sparkles,
} from "lucide-react";

import { cn } from "cn";

// Shadcn UI Components
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function Navbar() {
  // Mock login state for design preview (interactive toggle)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  // Mock user details
  const user = {
    displayName: "Alexander Wright",
    email: "alexander.wright@elite.com",
    role: "VIP Host",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    initials: "AW",
  };

  return (
    <header className="sticky top-0 z-50 -mb-20 bg-transparent text-[#F5F1E8] border-b border-white/10 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* 1. App Logo and Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden p-1 bg-[#181818] border border-[#D9A441]/40 group-hover:border-[#D9A441] transition-all duration-300 shadow-md">
            <Image
              src="/logo.png"
              alt="Elite Events Logo"
              width={44}
              height={44}
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white group-hover:text-[#D9A441] transition-colors leading-none">
              ÉLITE<span className="text-[#D9A441]">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#777777] font-sans font-medium mt-1">
              Event Management
            </span>
          </div>
        </Link>

        {/* 2. Navigation: Upcoming Events */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/upcoming-events"
            className="flex items-center gap-2 text-sm font-medium tracking-wide text-[#F5F1E8]/90 hover:text-[#D9A441] transition-all duration-200 py-2 border-b-2 border-transparent hover:border-[#D9A441]"
          >
            <Calendar className="w-4 h-4 text-[#D9A441]" />
            Upcoming Events
          </Link>
        </nav>

        {/* 3. Conditional Login/Logout (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {!isLoggedIn ? (
            /* If not logged in -> Show Sign In & Sign Up links */
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-[#F5F1E8] hover:text-[#D9A441] hover:bg-white/5 text-sm font-medium px-4 py-2 rounded-xl transition-all cursor-pointer"
                )}
              >
                <LogIn className="w-4 h-4 mr-1.5" />
                Sign In
              </Link>

              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "bg-[#D9A441] hover:bg-[#C59333] text-[#101010] font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                )}
              >
                <UserPlus className="w-4 h-4 mr-1.5" />
                Sign Up
              </Link>
            </div>
          ) : (
            /* If logged in -> Show Profile Picture (with Hover Display Name & Dropdown) + Logout button */
            <div className="flex items-center gap-4">
              
              {/* Profile Picture with Tooltip & Dropdown Menu */}
              <DropdownMenu>
                <TooltipProvider delay={100}>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <DropdownMenuTrigger
                          render={
                            <button
                              type="button"
                              className="flex items-center gap-2 p-1 rounded-full bg-[#181818] border border-[#D9A441]/40 hover:border-[#D9A441] transition-all focus:outline-none focus:ring-2 focus:ring-[#D9A441]/60 cursor-pointer"
                            />
                          }
                        >
                          <Avatar className="size-9 ring-2 ring-[#D9A441]/40 hover:ring-[#D9A441] transition-all">
                            <AvatarImage src={user.avatar} alt={user.displayName} />
                            <AvatarFallback className="bg-[#181818] text-[#D9A441] font-semibold text-xs">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                          <ChevronDown className="w-3.5 h-3.5 text-[#D9A441] pr-0.5" />
                        </DropdownMenuTrigger>
                      }
                    />
                    <TooltipContent
                      side="bottom"
                      className="bg-[#181818] text-[#F5F1E8] border border-[#D9A441]/40 text-xs py-1.5 px-3 rounded-lg shadow-xl"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#D9A441]" />
                        {user.displayName}
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Profile Picture (Dropdown) */}
                <DropdownMenuContent
                  align="end"
                  className="w-64 bg-[#141414] border border-[#2A2A2A] text-[#F5F1E8] rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95"
                >
                  {/* User info header */}
                  <DropdownMenuLabel className="px-3 py-2 border-b border-[#222222]">
                    <span className="text-[10px] uppercase tracking-wider text-[#D9A441] font-semibold block">
                      Signed In As
                    </span>
                    <span className="text-sm font-serif font-medium text-white block mt-0.5">
                      {user.displayName}
                    </span>
                    <span className="text-xs text-[#777777] font-sans block truncate">
                      {user.email}
                    </span>
                  </DropdownMenuLabel>

                  {/* Private / Protected Routes */}
                  <div className="py-1">
                    <DropdownMenuItem className="cursor-pointer focus:bg-[#1E1E1E] focus:text-[#D9A441] rounded-xl px-3 py-2 text-sm text-[#F5F1E8]/90">
                      <Link href="/events/create" className="flex items-center gap-3 w-full">
                        <PlusCircle className="w-4 h-4 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span>Create Event</span>
                          <span className="text-[10px] text-[#777777]">Protected Route</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer focus:bg-[#1E1E1E] focus:text-[#D9A441] rounded-xl px-3 py-2 text-sm text-[#F5F1E8]/90">
                      <Link href="/events/manage" className="flex items-center gap-3 w-full">
                        <CalendarDays className="w-4 h-4 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span>Manage Events</span>
                          <span className="text-[10px] text-[#777777]">Protected Route</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer focus:bg-[#1E1E1E] focus:text-[#D9A441] rounded-xl px-3 py-2 text-sm text-[#F5F1E8]/90">
                      <Link href="/events/joined" className="flex items-center gap-3 w-full">
                        <Ticket className="w-4 h-4 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span>Joined Events</span>
                          <span className="text-[10px] text-[#777777]">Protected Route</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="bg-[#222222] my-1" />

                  {/* Dropdown Logout Item */}
                  <DropdownMenuItem
                    onClick={() => setIsLoggedIn(false)}
                    className="cursor-pointer focus:bg-red-500/10 focus:text-red-400 text-red-400 rounded-xl px-3 py-2 text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Dedicated Navbar Logout Button as requested */}
              <Button
                variant="outline"
                onClick={() => setIsLoggedIn(false)}
                className="border-[#777777]/40 hover:border-[#D9A441] text-[#F5F1E8] hover:text-[#D9A441] bg-transparent hover:bg-white/5 rounded-xl text-sm font-medium px-4 py-2 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* 4. Mobile Menu Navigation (using Shadcn Sheet) */}
        <div className="md:hidden flex items-center gap-2">
          {isLoggedIn && (
            <Avatar className="size-8 ring-1 ring-[#D9A441]">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback className="bg-[#181818] text-[#D9A441] text-xs">
                {user.initials}
              </AvatarFallback>
            </Avatar>
          )}

          <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#F5F1E8] hover:text-[#D9A441] hover:bg-[#181818] p-2 rounded-lg"
                />
              }
            >
              <Menu className="w-6 h-6" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-[#141414] text-[#F5F1E8] border-l border-[#262626] p-6 w-80 max-w-full"
            >
              <SheetHeader className="p-0 mb-6">
                <SheetTitle className="text-left font-serif text-xl text-white">
                  ÉLITE<span className="text-[#D9A441]">.</span>
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-6">
                <Link
                  href="/upcoming-events"
                  onClick={() => setIsMobileSheetOpen(false)}
                  className="flex items-center gap-3 text-sm font-medium text-[#F5F1E8] hover:text-[#D9A441] py-2 border-b border-[#222222]"
                >
                  <Calendar className="w-4 h-4 text-[#D9A441]" />
                  Upcoming Events
                </Link>

                {isLoggedIn ? (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3 p-3 bg-[#181818] rounded-xl border border-[#2A2A2A]">
                      <Avatar className="size-10 ring-2 ring-[#D9A441]">
                        <AvatarImage src={user.avatar} alt={user.displayName} />
                        <AvatarFallback className="bg-[#101010] text-[#D9A441] font-semibold text-xs">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col truncate">
                        <span className="text-sm font-serif font-medium text-white truncate">
                          {user.displayName}
                        </span>
                        <span className="text-xs text-[#777777] font-sans truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link
                        href="/events/create"
                        onClick={() => setIsMobileSheetOpen(false)}
                        className="flex items-center gap-3 text-sm text-[#F5F1E8] hover:text-[#D9A441] py-2 px-1"
                      >
                        <PlusCircle className="w-4 h-4 text-[#D9A441]" />
                        Create Event
                      </Link>
                      <Link
                        href="/events/manage"
                        onClick={() => setIsMobileSheetOpen(false)}
                        className="flex items-center gap-3 text-sm text-[#F5F1E8] hover:text-[#D9A441] py-2 px-1"
                      >
                        <CalendarDays className="w-4 h-4 text-[#D9A441]" />
                        Manage Events
                      </Link>
                      <Link
                        href="/events/joined"
                        onClick={() => setIsMobileSheetOpen(false)}
                        className="flex items-center gap-3 text-sm text-[#F5F1E8] hover:text-[#D9A441] py-2 px-1"
                      >
                        <Ticket className="w-4 h-4 text-[#D9A441]" />
                        Joined Events
                      </Link>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsMobileSheetOpen(false);
                      }}
                      className="w-full mt-4 border-[#777777]/40 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl py-2.5"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mt-4">
                    <Link
                      href="/signin"
                      onClick={() => setIsMobileSheetOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "w-full border-[#777777]/40 text-[#F5F1E8] hover:text-[#D9A441] hover:border-[#D9A441] py-2.5 rounded-xl cursor-pointer flex items-center justify-center"
                      )}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileSheetOpen(false)}
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "w-full bg-[#D9A441] hover:bg-[#C59333] text-[#101010] font-semibold py-2.5 rounded-xl shadow-md cursor-pointer flex items-center justify-center"
                      )}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
