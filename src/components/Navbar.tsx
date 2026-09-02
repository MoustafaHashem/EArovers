"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/#shields", label: "الدروع" },
  { href: "/#media", label: "الميديا" },
  { href: "/#fame", label: "الشرف" },
  { href: "/#sessions", label: "التأهيل" },
  { href: "/#hierarchy-preview", label: "الشجرة" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");

  // Track scroll, hash changes, and active sections via IntersectionObserver
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 100) {
        setActiveHash("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Only observe elements on the current page
    const sectionElements = navLinks
      .filter((link) => link.href.includes("#"))
      .map((link) => {
        const id = link.href.split("#")[1];
        return document.getElementById(id);
      })
      .filter(Boolean) as HTMLElement[];

    // Use a Set to track all currently visible sections
    const visibleSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        let hasChanges = false;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
            hasChanges = true;
          } else {
            visibleSections.delete(entry.target.id);
            hasChanges = true;
          }
        });
        
        if (hasChanges) {
          // Find the first visible section based on navLinks order
          for (const link of navLinks) {
            const id = link.href.split("#")[1];
            if (id && visibleSections.has(id)) {
              setActiveHash(`#${id}`);
              break;
            }
          }
        }
      },
      { rootMargin: "-20% 0px -40% 0px", threshold: 0 }
    );

    sectionElements.forEach((section) => observer.observe(section));

    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    
    // Set initial hash
    if (window.location.hash) {
      setActiveHash(window.location.hash);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto transition-all duration-500 rounded-full",
          isScrolled
            ? "bg-[var(--color-scout-navy)]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 px-6 py-3"
            : "bg-transparent px-4 py-4 w-full max-w-7xl"
        )}
      >
        <div className={cn("flex justify-between items-center", isScrolled ? "gap-8" : "w-full")}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(92,124,182,0.4)] group-hover:shadow-[0_0_25px_rgba(92,124,182,0.7)] text-white font-black text-lg transition-all duration-300">
              ج
            </div>
            {!isScrolled && (
              <span className="text-lg font-bold text-white tracking-wide">
                جوالة هندسة عين شمس
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
            {navLinks.map((link) => {
              const isHashLink = link.href.includes("#");
              const hashPart = isHashLink ? link.href.split("#")[1] : "";
              const routePart = link.href.split("#")[0] || "/";
              
              let isActive = false;
              if (isHashLink) {
                isActive = pathname === routePart && activeHash === `#${hashPart}`;
              } else {
                isActive = pathname === link.href && activeHash === "";
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => isHashLink && setActiveHash(`#${hashPart}`)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10",
                    isActive ? "text-[var(--color-scout-navy)]" : "text-gray-300 hover:text-white hover:bg-white/10"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[var(--color-glow-cyan)] rounded-full -z-10 shadow-[0_0_15px_var(--color-glow-cyan)]"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <AnimatePresence>
            {!isScrolled && (
              <motion.div
                initial={{ opacity: 0, width: 0, x: -20 }}
                animate={{ opacity: 1, width: "auto", x: 0 }}
                exit={{ opacity: 0, width: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:flex items-center gap-5 overflow-hidden whitespace-nowrap"
              >
                <Link
                  href="/join"
                  className="relative group px-5 py-2 overflow-hidden rounded-full font-bold bg-[var(--color-scout-blue)] text-[var(--color-scout-navy)] transition-all duration-300 hover:scale-105"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute -inset-1 rounded-full blur bg-gradient-to-r from-[var(--color-scout-blue)] to-[var(--color-glow-cyan)] opacity-40 group-hover:opacity-70 transition-opacity duration-300 -z-10"></span>
                  <span className="relative z-10">انضم إلينا</span>
                </Link>

                <a
                  href="/login"
                  className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-white transition-colors px-2"
                >
                  <LogIn size={16} />
                  <span>دخول</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-[var(--color-scout-navy)] border-l border-[var(--color-dark-border)] shadow-2xl z-50 lg:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-dark-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-scout-blue)] to-[var(--color-anchor)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    ج
                  </div>
                  <span className="text-white font-bold">القائمة</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="إغلاق القائمة"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
                {navLinks.map((link, index) => {
                  const isHashLink = link.href.includes("#");
                  const hashPart = isHashLink ? link.href.split("#")[1] : "";
                  const routePart = link.href.split("#")[0] || "/";
                  
                  let isActive = false;
                  if (isHashLink) {
                    isActive = pathname === routePart && activeHash === `#${hashPart}`;
                  } else {
                    isActive = pathname === link.href && activeHash === "";
                  }

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          if (isHashLink) setActiveHash(`#${hashPart}`);
                        }}
                        className={cn(
                          "block w-full text-right px-4 py-3 rounded-xl font-bold transition-colors",
                          isActive
                            ? "bg-[var(--color-scout-blue)]/20 text-[var(--color-scout-blue-light)] border border-[var(--color-scout-blue)]/30"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-[var(--color-dark-border)] space-y-3">
                <Link
                  href="/join"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center w-full bg-[var(--color-scout-blue)] text-[var(--color-scout-navy)] py-3 rounded-xl font-bold hover:bg-[var(--color-scout-blue-light)] transition-colors"
                >
                  انضم إلينا
                </Link>
                <a
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <LogIn size={16} />
                  <span>تسجيل الدخول</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
