import React from "react";
import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
  LogoGithub,
} from "@gravity-ui/icons";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-700 text-white relative overflow-hidden">
      {/* soft glow background effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-slate-800/20 to-violet-900/10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 relative z-10">
        
        {/* TOP SECTION */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* BRAND */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Logo />
            </Link>

            <p className="max-w-xs leading-7 text-gray-300">
              The modern property management platform. Built for landlords and
              tenants who value seamless rental workflows.
            </p>

            {/* Social */}
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="#"
                className="group flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 transition hover:bg-violet-600 hover:scale-105"
              >
                <LogoFacebook className="h-5 w-5 group-hover:scale-110 transition" />
              </Link>

              <Link
                href="#"
                className="group flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600/80 backdrop-blur-md border border-white/10 transition hover:bg-violet-500 hover:scale-105"
              >
                <LogoGithub className="h-5 w-5 group-hover:scale-110 transition" />
              </Link>

              <Link
                href="#"
                className="group flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 transition hover:bg-violet-600 hover:scale-105"
              >
                <LogoLinkedin className="h-5 w-5 group-hover:scale-110 transition" />
              </Link>
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-300">
              Product
            </h3>
            <ul className="space-y-3 text-gray-300">
              {[
                ["Rent Management", "/properties"],
                ["Tenant Screening", "/tenant-screening"],
                ["Maintenance Hub", "/maintenance"],
                ["Pricing Plans", "/pricing"],
              ].map(([name, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition hover:text-white hover:pl-1 duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-300">
              Navigation
            </h3>
            <ul className="space-y-3 text-gray-300">
              {[
                ["Help Center", "/help-center"],
                ["Landlord Guides", "/landlord-guides"],
                ["Contact Support", "/contact"],
              ].map(([name, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition hover:text-white hover:pl-1 duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-300">
              Resources
            </h3>
            <ul className="space-y-3 text-gray-300">
              {[
                ["Lease Agreements", "/legal-forms"],
                ["Newsroom", "/newsroom"],
              ].map(([name, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition hover:text-white hover:pl-1 duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-400">
          <p>© {currentYear} — RentNest Inc.</p>

          <div className="flex items-center gap-6">
            <Link className="hover:text-white transition" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-white transition" href="/privacy">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}