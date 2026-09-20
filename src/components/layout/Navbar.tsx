"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

// Standard brand SVGs
const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const CloudIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
  </svg>
);

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/shields", label: "الدروع" },
  { href: "/#media", label: "الميديا" },
  { href: "/#fame", label: "المسابقات" },
  { href: "/#sessions", label: "الدراسات" },
  { href: "/hierarchy", label: "الهيكل التنظيمي" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [isScrollingToHash, setIsScrollingToHash] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // The hovering navbar (pill animation) should only happen on the home page.
  // On all other pages, it should remain static at the top.
  const effectivelyScrolled = isHomePage ? isScrolled : false;

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

        if (hasChanges && !isScrollingToHash) {
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
      if (!isScrollingToHash) setActiveHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);

    // Set initial hash
    if (window.location.hash) {
      setTimeout(() => setActiveHash(window.location.hash), 0);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, [isScrollingToHash]);

  // Determine active item to power Magic UI style animated background
  const getActiveTab = () => {
    for (const link of navLinks) {
      const isHashLink = link.href.includes("#");
      const hashPart = isHashLink ? link.href.split("#")[1] : "";
      
      if (isHashLink) {
        if (pathname === link.href.split("#")[0] && activeHash === `#${hashPart}`) return link.href;
      } else {
        if (pathname === link.href && activeHash === "") return link.href;
      }
    }
    return null;
  };
  
  const activeTabId = getActiveTab();

  return (
    <div className={cn("absolute top-0 lg:top-4 inset-x-0 z-50 flex justify-center px-0 lg:px-4 pointer-events-none", !isHomePage ? "lg:absolute" : "lg:fixed")}>
      <motion.nav
        layout
        className={cn(
          "pointer-events-auto transition-colors duration-500 lg:rounded-full",
          effectivelyScrolled
            ? "bg-[var(--color-scout-navy)]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-b lg:border border-white/10 px-4 lg:px-6 py-3 lg:py-3"
            : "bg-transparent px-4 lg:px-6 py-3 lg:py-3 w-full max-w-7xl"
        )}
      >
        <motion.div layout className={cn("flex items-center", effectivelyScrolled ? "justify-center" : "w-full")}>
          
          {/* Left Side (Logo) */}
          <AnimatePresence>
            {!effectivelyScrolled && (
              <motion.div 
                layout 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center flex-1 justify-start overflow-hidden"
              >
                <Link href="/" className="flex items-center gap-3 group pt-2 lg:pt-0">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 flex items-center justify-center shrink-0 -ml-2 -mb-2 lg:-ml-4 lg:-my-4 transition-all duration-300">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/Logo.png" alt="شعار عشيرة جوالة هندسة" className="w-24 h-24 lg:w-28 lg:h-28 object-contain drop-shadow-[0_0_15px_rgba(92,124,182,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(92,124,182,0.7)] transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Center (Desktop Navigation) */}
          <motion.div layout ref={navRef} className="hidden lg:flex relative items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
            {navLinks.map((link) => {
              const isHashLink = link.href.includes("#");
              const hashPart = isHashLink ? link.href.split("#")[1] : "";
              const isActive = activeTabId === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    const isSamePageHome = link.href === "/" && pathname === "/";
                    
                    if (isHashLink || isSamePageHome) {
                      e.preventDefault();
                      setIsScrollingToHash(true);
                      
                      let targetPosition = 0;
                      
                      if (isHashLink) {
                        setActiveHash(`#${hashPart}`);
                        const targetElement = document.getElementById(hashPart);
                        if (targetElement) {
                          targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 100;
                        } else {
                          // If target doesn't exist, just unpause and let it be
                          setIsScrollingToHash(false);
                          return;
                        }
                        // Update URL without jumping
                        window.history.pushState(null, "", `#${hashPart}`);
                      } else {
                        setActiveHash("");
                        window.history.pushState(null, "", window.location.pathname);
                      }
                      
                      const startPosition = window.scrollY;
                      const distance = targetPosition - startPosition;
                      const duration = 600; // 600ms fast glide
                      let start: number | null = null;

                      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

                      const step = (timestamp: number) => {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const percent = Math.min(progress / duration, 1);
                        
                        window.scrollTo(0, startPosition + distance * easeOutQuart(percent));
                        
                        if (progress < duration) {
                          window.requestAnimationFrame(step);
                        }
                      };
                      window.requestAnimationFrame(step);
                      
                      // Unpause observer after scroll finishes
                      setTimeout(() => setIsScrollingToHash(false), 800);
                    }
                  }}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-bold transition-colors duration-300 z-10",
                    isActive ? "text-[var(--color-scout-navy)]" : "text-gray-400 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-[var(--color-glow-cyan)] rounded-full shadow-[0_0_15px_var(--color-glow-cyan)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </motion.div>

          {/* Right Side (Actions) */}
          <motion.div layout className={cn("flex items-center", effectivelyScrolled ? "lg:hidden" : "flex-1 justify-end mr-8")}>
            <AnimatePresence>
              {!effectivelyScrolled && (
                <motion.div
                  initial={{ opacity: 0, width: 0, x: -20 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:flex items-center gap-4 overflow-hidden whitespace-nowrap"
                >
                  {/* Social Icons */}
                  <div className="flex items-center gap-3 px-2">
                    <a href="https://www.facebook.com/scoutingteam.eas" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" title="Facebook">
                      <FacebookIcon size={18} />
                    </a>
                    <a href="https://www.instagram.com/eng_asu_rovers/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E4405F] transition-colors" title="Instagram">
                      <InstagramIcon size={18} />
                    </a>
                    <a href="https://www.youtube.com/@eng_asurovers3282/featured" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors" title="YouTube">
                      <YoutubeIcon size={18} />
                    </a>
                    <a href="https://m.soundcloud.com/eng_asu-rovers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff5500] transition-colors" title="SoundCloud">
                      <CloudIcon size={18} />
                    </a>
                  </div>

                  {/* Divider */}
                  <div className="w-px h-6 bg-white/15 mx-1" />

                  <div className="p-2">
                    <Link
                      href="/join"
                      className="relative group block px-5 py-2 overflow-hidden rounded-full font-bold bg-[var(--color-scout-blue)] text-[var(--color-scout-navy)] transition-all duration-300 hover:scale-105"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="absolute -inset-1 rounded-full blur bg-gradient-to-r from-[var(--color-scout-blue)] to-[var(--color-glow-cyan)] opacity-40 group-hover:opacity-70 transition-opacity duration-300 -z-10"></span>
                      <span className="relative z-10">انضم إلينا</span>
                    </Link>
                  </div>

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
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger render={<button className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors ml-2" aria-label="فتح القائمة" />}>
                <Menu size={24} />
              </SheetTrigger>
              
              <SheetContent side="right" showCloseButton={false} className="bg-[var(--color-scout-navy)] border-l border-[var(--color-dark-border)] p-0 flex flex-col w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">القائمة الرئيسية</SheetTitle>
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--color-dark-border)]">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 flex items-center justify-center shrink-0 -my-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/Logo.png" alt="شعار عشيرة جوالة هندسة" className="w-20 h-20 object-contain" />
                    </div>
                    <span className="text-white font-bold">القائمة</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors lg:hidden"
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
                <div className="p-4 border-t border-[var(--color-dark-border)] space-y-4">
                  {/* Social Icons - Mobile */}
                  <div className="flex items-center justify-center gap-6 py-2">
                    <a href="https://www.facebook.com/scoutingteam.eas" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors" title="Facebook">
                      <FacebookIcon size={22} />
                    </a>
                    <a href="https://www.instagram.com/eng_asu_rovers/?hl=en" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E4405F] transition-colors" title="Instagram">
                      <InstagramIcon size={22} />
                    </a>
                    <a href="https://www.youtube.com/@eng_asurovers3282/featured" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors" title="YouTube">
                      <YoutubeIcon size={22} />
                    </a>
                    <a href="https://m.soundcloud.com/eng_asu-rovers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff5500] transition-colors" title="SoundCloud">
                      <CloudIcon size={22} />
                    </a>
                  </div>

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
              </SheetContent>
            </Sheet>
          </motion.div>
        </motion.div>
      </motion.nav>
    </div>
  );
}
