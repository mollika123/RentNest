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
    <footer className="border-t border-white/10  text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* TOP SECTION */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* LEFT COLUMN - BRAND */}
          <div className="space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Logo />
            </Link>

            {/* Description */}
            <p className="max-w-xs leading-8 text-gray-400">
              The modern property management platform. Built for landlords and 
              tenants who value seamless rental workflows.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition hover:bg-violet-600"
                aria-label="Facebook"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 transition hover:bg-violet-500"
                aria-label="GitHub"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition hover:bg-violet-600"
                aria-label="LinkedIn"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* PRODUCT COLUMN */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-500">
              Product
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/properties" className="transition hover:text-white">
                  Rent Management
                </Link>
              </li>
              <li>
                <Link href="/tenant-screening" className="transition hover:text-white">
                  Tenant Screening
                </Link>
              </li>
              <li>
                <Link href="/maintenance" className="transition hover:text-white">
                  Maintenance Hub
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-white">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* NAVIGATION COLUMN */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-500">
              Navigation
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/help-center" className="transition hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/landlord-guides" className="transition hover:text-white">
                  Landlord Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-white">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* RESOURCES COLUMN */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-500">
              Resources
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/legal-forms" className="transition hover:text-white">
                  Lease Agreements
                </Link>
              </li>
              <li>
                <Link href="/newsroom" className="transition hover:text-white">
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>Copyright {currentYear} — RentNest Inc.</p>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="transition hover:text-white">
              Terms & Policy
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}