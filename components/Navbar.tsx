'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Expertise', id: 'skills' },
    { label: 'Portfolio', id: 'projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-[#fcfaf2]/95 backdrop-blur-md border-b border-black py-3 shadow-lg" 
        : "bg-transparent py-5 md:py-8"
    )}>
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-black text-gray-950 cursor-pointer flex items-center group" 
            onClick={() => scrollToSection('hero')}
          >
            <span className="tracking-tighter">NIKESH</span>
            <span className="text-red-700 ml-1 transform group-hover:rotate-12 transition-transform">T</span>
            <div className="ml-2 w-2 h-2 bg-red-700 rounded-full animate-pulse hidden md:block"></div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              link.href ? (
                <Link 
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-xs font-black uppercase tracking-[0.3em] transition-all hover:text-red-700 relative group/link",
                    pathname === link.href ? "text-red-700" : "text-gray-950"
                  )}
                >
                  {link.label}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-red-700 transition-all group-hover/link:w-full",
                    pathname === link.href && "w-full"
                  )}></span>
                </Link>
              ) : (
                <button 
                  key={link.label}
                  onClick={() => scrollToSection(link.id!)}
                  className="text-xs font-black uppercase tracking-[0.3em] text-gray-950 hover:text-red-700 transition-all cursor-pointer relative group/link"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-700 transition-all group-hover/link:w-full"></span>
                </button>
              )
            ))}
            
            <a 
              href="https://buymeacoffee.com/nikeshtamag" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-700 text-white px-6 py-2 rounded-sm text-xs font-black tracking-widest hover:bg-gray-950 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              SUPPORT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-white border-2 border-black rounded-sm active:bg-gray-100 transition-colors"
          >
            <div className={cn("h-0.5 w-6 bg-black transition-all duration-300", isMenuOpen && "rotate-45 translate-y-2")}></div>
            <div className={cn("h-0.5 w-6 bg-black transition-all duration-300", isMenuOpen && "opacity-0")}></div>
            <div className={cn("h-0.5 w-6 bg-black transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-2")}></div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          "md:hidden fixed inset-x-0 top-[65px] bg-[#fcfaf2] border-b-4 border-black transition-all duration-500 ease-in-out z-40 overflow-hidden",
          isMenuOpen ? "max-h-[80vh] opacity-100 py-12 shadow-2xl" : "max-h-0 opacity-0 py-0"
        )}>
          <div className="flex flex-col items-center space-y-8">
            {navLinks.map((link) => (
              link.href ? (
                <Link 
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-2xl font-black uppercase tracking-[0.4em] transition-colors",
                    pathname === link.href ? "text-red-700" : "text-gray-950"
                  )}
                >
                  {link.label}
                </Link>
              ) : (
                <button 
                  key={link.label}
                  onClick={() => scrollToSection(link.id!)}
                  className="text-2xl font-black uppercase tracking-[0.4em] text-gray-950 hover:text-red-700 transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              )
            ))}
            <div className="pt-4">
              <a 
                href="https://buymeacoffee.com/nikeshtamag" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-700 text-white px-10 py-4 rounded-sm font-black tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                SUPPORT ME
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
