
"use client";

import { useEffect, useRef } from 'react';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export function Header() {
  const { 
    activeTab, 
    setActiveTab, 
    isMenuOpen, 
    setIsMenuOpen, 
    scrolled, 
    setScrolled,
    playSound,
    headerVisible,
    setHeaderVisible,
  } = useApp();
  const { t, language, setLanguage } = useTranslation();
  const lastScrollY = useRef(0);

  const navLinks = [
    { id: 'home', label: t('header.home') },
    { id: 'nucleo', label: t('header.manifesto') },
    { id: 'talleres', label: t('header.labs') },
    { id: 'miembros', label: t('header.community') },
    { id: 'obra', label: t('header.showcase') },
    { id: 'radio', label: t('header.radio') },
    { id: 'nucleo-channel', label: t('header.channel') },
    { id: 'reto', label: t('header.challenges') },
    { id: 'soluciones', label: t('header.solutions') },
    { id: 'contacto', label: t('header.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrolled, setHeaderVisible]);

  const handleNavClick = (id: string) => {
    playSound('click');
    setActiveTab(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    playSound('click');
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[60] transition-all duration-300',
          scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-4 border-b' : 'bg-transparent py-6 md:py-8',
          activeTab === 'radio' && !scrolled ? 'text-white' : '',
          !headerVisible && !isMenuOpen && '-translate-y-full'
        )}
      >
        <div className="px-4 md:px-12 flex justify-between items-center max-w-[1600px] mx-auto">
          <button onMouseEnter={() => playSound('hover')} onClick={() => handleNavClick('home')} className="z-50 relative group flex-shrink-0">
            <span
              className={cn(
                'text-lg md:text-2xl font-black tracking-tighter border-[3px] px-2 py-1 transition-colors',
                activeTab === 'radio' && !scrolled && !isMenuOpen
                  ? 'border-white group-hover:bg-white group-hover:text-black'
                  : 'border-foreground bg-foreground text-background group-hover:bg-background group-hover:text-foreground'
              )}
            >
              NÚCLEO
            </span>
          </button>
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onMouseEnter={() => playSound('hover')}
                onClick={() => handleNavClick(link.id)}
                className={cn(
                  'text-sm tracking-widest uppercase py-2 transition-all relative group',
                  activeTab === link.id ? 'font-bold' : '',
                  (activeTab === 'radio' && !scrolled && !isMenuOpen)
                    ? (link.id === activeTab ? 'text-red-500' : 'text-neutral-400 hover:text-red-500')
                    : (link.id === activeTab ? 'text-accent' : 'text-muted-foreground hover:text-accent')
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 w-full h-[2px] transform transition-transform duration-300 origin-left',
                    activeTab === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50',
                    activeTab === 'radio' ? 'bg-red-500' : 'bg-accent'
                  )}
                ></span>
              </button>
            ))}
             <div className="w-px h-5 bg-border mx-2"></div>
             <button
              onClick={toggleLanguage}
              className={cn(
                "text-sm font-bold tracking-widest transition-colors",
                (activeTab === 'radio' && !scrolled && !isMenuOpen)
                  ? 'text-white hover:text-red-500'
                  : 'text-muted-foreground hover:text-accent'
              )}
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          </nav>
          <div className="flex items-center gap-1 md:gap-2 xl:hidden">
            <button
              onClick={toggleLanguage}
              className={cn(
                'text-xs md:text-sm font-bold tracking-widest p-2 rounded-full',
                activeTab === 'radio' && !scrolled && !isMenuOpen
                  ? 'text-white hover:bg-white/10'
                  : 'text-foreground hover:bg-neutral-100'
              )}
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              className={cn(
                'z-50 p-2 rounded-full',
                activeTab === 'radio' && !scrolled && !isMenuOpen
                  ? 'text-white hover:bg-white/10'
                  : 'text-foreground hover:bg-neutral-100'
              )}
              onClick={() => {
                playSound('click');
                setIsMenuOpen(!isMenuOpen)
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-background z-[55] transform transition-transform duration-500 ease-cubic-bezier xl:hidden flex flex-col justify-center items-center',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col gap-4 text-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={cn(
                'text-2xl font-bold tracking-wider uppercase transition-colors py-2',
                activeTab === link.id
                  ? (link.id === 'radio' ? 'text-red-500' : 'text-primary')
                  : 'text-neutral-500 hover:text-accent'
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
