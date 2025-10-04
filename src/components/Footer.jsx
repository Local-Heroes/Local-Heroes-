// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUp,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B1220] text-slate-300 border-t border-white/5">
      {/* Top */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand / About */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 grid place-items-center">
                <span className="font-bold text-white">LH</span>
              </div>
              <span className="text-white font-semibold text-lg">
                Local Heroes
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Celebrating everyday people making extraordinary differences in
              their communities. Join us in recognizing the heroes around us.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-1">
              <a
                aria-label="Twitter"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 hover:bg-white/10 transition"
                href="#"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 hover:bg-white/10 transition"
                href="#"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                aria-label="YouTube"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 hover:bg-white/10 transition"
                href="#"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 hover:bg-white/10 transition"
                href="#"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="hover:text-white transition" to="/heros">
                  Browse Heroes
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/nominate">
                  Nominate a Hero
                </Link>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  How It Works
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Success Stories
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </nav>

          {/* Support */}
          <nav className="space-y-4">
            <h4 className="text-white font-semibold">Support</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a className="hover:text-white transition" href="#">
                  Help Center
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Report Content
                </a>
              </li>
            </ul>
          </nav>

          {/* Get in Touch + Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Get in Touch</h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <a
                  href="mailto:hello@localheroes.com"
                  className="hover:text-white transition"
                >
                  hello@localheroes.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-400" />
                <a
                  href="tel:18004437637"
                  className="hover:text-white transition"
                >
                  1-800-HEROES
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>
                  123 Community Street
                  <br />
                  Hero City, HC 12345
                </span>
              </div>
            </div>

            <div className="pt-3">
              <p className="text-sm mb-2">Stay Updated</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // handle subscribe
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full rounded-lg bg-white/5 text-sm text-white placeholder:text-slate-500 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/20"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Local Heroes. All rights reserved.
            <span className="mx-2">•</span>
            Made with{" "}
            <Heart className="inline h-3 w-3 -mt-0.5 text-rose-400" /> for
            communities everywhere.
          </p>

          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-200 hover:bg-white/10 transition"
          >
            <ArrowUp className="h-4 w-4" />
            Back to top

          </a>
        </div>
      </div>
    </footer>
  );
}
