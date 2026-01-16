import { useState, useEffect } from 'react';

export default function HeaderNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Inicio' },
    { href: '#miembros', label: 'Miembros' },
    { href: '#nucleo', label: 'Núcleo' },
    { href: '#obra', label: 'Obra' },
    { href: '#educacion', label: 'Educación' },
    { href: '#proyectos', label: 'Proyectos' },
    { href: '#contenidos', label: 'Contenidos' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-yellow-500/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all">
              <span className="text-2xl font-black text-black">NC</span>
            </div>
            <div className="hidden md:block">
              <span className="text-white font-black text-xl tracking-tight">
                NÚCLEO<span className="text-yellow-400">COLECTIVO</span>
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-white hover:text-yellow-400 font-medium transition-all hover:bg-purple-900/30 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#contacto"
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold rounded-lg transition-all transform hover:scale-105"
            >
              Colaborar
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:text-yellow-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-purple-500/30 pt-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-white hover:text-yellow-400 font-medium transition-all hover:bg-purple-900/30 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold rounded-lg text-center"
              >
                Colaborar
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
