import { useLanguage } from './contexts/LanguageContext';
import HeaderNavigation from './components/HeaderNavigation';
import HomeManifiesto from './components/HomeManifiesto';
import EstadisticasImpacto from './components/EstadisticasImpacto';
import MiembrosSection from './components/MiembrosSection';
import NucleoSection from './components/NucleoSection';
import ObraSection from './components/ObraSection';
import GaleriaSection from './components/GaleriaSection';
import EducacionSection from './components/EducacionSection';
import CotizadorTalleres from './components/CotizadorTalleres';
import ProyectosEspecialesSection from './components/ProyectosEspecialesSection';
import ContenidosSection from './components/ContenidosSection';
import FAQSection from './components/FAQSection';
import ContactoAlianzasSection from './components/ContactoAlianzasSection';
import BibliotecaRecursos from './components/BibliotecaRecursos';
import './App.css';

function App() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    { id: 'inicio', label: t('nav_inicio') },
    { id: 'miembros', label: t('nav_miembros') },
    { id: 'nucleo', label: t('nav_nucleo') },
    { id: 'obra', label: t('nav_obra') },
    { id: 'educacion', label: t('nav_educacion') },
    { id: 'proyectos', label: t('nav_proyectos') },
    { id: 'contenidos', label: t('nav_contenidos') },
    { id: 'contacto', label: t('nav_contacto') }
  ];

  return (
    <div className="min-h-screen bg-black">
      <HeaderNavigation />

      <nav className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="px-4 py-2 rounded-lg font-medium transition-all bg-white/5 text-white/70 hover:bg-yellow-400 hover:text-black text-sm"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <section id="inicio">
          <HomeManifiesto />
          <EstadisticasImpacto />
        </section>

        <section id="miembros">
          <MiembrosSection />
        </section>

        <section id="nucleo">
          <NucleoSection />
        </section>

        <section id="obra">
          <ObraSection />
          <GaleriaSection />
        </section>

        <section id="educacion">
          <EducacionSection />
          <CotizadorTalleres />
          <FAQSection />
        </section>

        <section id="proyectos">
          <ProyectosEspecialesSection />
        </section>

        <section id="contenidos">
          <ContenidosSection />
        </section>

        <section id="contacto">
          <ContactoAlianzasSection />
        </section>
      </main>

      <BibliotecaRecursos />

      <footer className="bg-black border-t border-yellow-400/20 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/60 text-sm">
            {t('footer_plataforma')} | NÚCLEO COLECTIVO
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
