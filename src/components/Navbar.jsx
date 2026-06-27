"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";
import Logo from "./Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  // মূল নেভিগেশন লিংকের অ্যারে (মিউটেল করা এড়াতে লোকাল কপি করা ভালো)
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Properties", href: "/properties" },
  ];

  const dashboardLinks = {
    tenant: "/dashboard/tenant",
    owner: "/dashboard/owner",
    admin: "/dashboard/admin",
  };

  if (user?.email) {
    navLinks.push({
      label: "Dashboard",
      href: dashboardLinks[user?.role || "tenant"],
    });
  }

  return (
    /* ব্যাকগ্রাউন্ড ডার্ক (bg-slate-950) ও গ্লাসমোরফিজম বর্ডার দেওয়া হয়েছে */
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 w-full text-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="leading-none">
            <Logo />
          </div>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          
          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 md:flex">
            {/* Nav Links */}
            <ul className="flex items-center gap-1 rounded-full bg-slate-900/50 border border-slate-800/60 px-2 py-1.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vertical Divider */}
            <div className="h-5 w-px bg-slate-800" />

            {/* Auth Links */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm font-medium text-slate-300">
                    Hi, <span className="text-violet-400 font-semibold">{user.name || "User"}</span>!
                  </span>
                  <Button 
                    onClick={handleSignOut}
                    variant="bordered"
                    className="border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white"
                    size="sm"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="text-sm font-medium text-slate-300 transition hover:text-violet-400"
                  >
                    Sign In
                  </Link>
                  <Link href="/signup">
                    <Button
                      radius="full"
                      className="h-10 bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-700 shadow-lg shadow-violet-600/20"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-slate-300 transition hover:bg-slate-900 md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-slate-900 bg-slate-950 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="space-y-4 px-4 py-6">
            {/* Nav Links */}
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="border-t border-slate-900 pt-4">
              <div className="flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="px-4 text-sm text-slate-400">
                      Logged in as: <span className="text-white font-medium">{user.name}</span>
                    </div>
                    <Button
                      onClick={handleSignOut}
                      className="w-full bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="text-center rounded-xl px-4 py-3 text-base font-medium text-slate-300 transition hover:bg-slate-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link href="/signup" className="w-full" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        className="w-full h-11 bg-violet-600 font-semibold text-white hover:bg-violet-700"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}