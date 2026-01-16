import { useState } from 'react';
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

type Section = 'inicio' | 'miembros' | 'nucleo' | 'obra' | 'educacion' | 'proyectos' | 'contenidos' | 'contacto' | 'colaborar';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('inicio');
  const { t } = useLanguage();

  const sections = [
    { id: 'inicio' as Section, label: { es: 'Inicio', en: 'Home' } },
    { id: 'miembros' as Section, label: { es: 'Miembros', en: 'Members' } },
    { id: 'nucleo' as Section, label: { es: 'Núcleo', en: 'Core' } },
    { id: 'obra' as Section, label: { es: 'Obra', en: 'Work' } },
    { id: 'educacion' as Section, label: { es: 'Educación', en: 'Education' } },
    { id: 'proyectos' as Section, label: { es: 'Proyectos', en: 'Projects' } },
    { id: 'contenidos' as Section, label: { es: 'Contenidos', en: 'Content' } },
    { id: 'contacto' as Section, label: { es: 'Contacto', en: 'Contact' } },
    { id: 'colaborar' as Section, label: { es: 'Colaborar', en: 'Collaborate' } },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <>
            <HomeManifiesto />
            <EstadisticasImpacto />
          </>
        );
      case 'miembros':
        return <MiembrosSection />;
      case 'nucleo':
        return <NucleoSection />;
      case 'obra':
        return (
          <>
            <ObraSection />
            <GaleriaSection />
          </>
        );
      case 'educacion':
        return (
          <>
            <EducacionSection />
            <CotizadorTalleres />
            <FAQSection />
          </>
        );
      case 'proyectos':
        return <ProyectosEspecialesSection />;
      case 'contenidos':
        return <ContenidosSection />;
      case 'contacto':
        return <ContactoAlianzasSection />;
      case 'colaborar':
        return (
          <section className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold text-yellow-400 mb-8">
                {t('colaborar_titulo')}
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20">
                <p className="text-xl text-white/90 mb-6">
                  {t('colaborar_descripcion')}
                </p>
                <ul className="space-y-4 text-white/80">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 text-2xl">•</span>
                    <span>{t('colaborar_1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 text-2xl">•</span>
                    <span>{t('colaborar_2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 text-2xl">•</span>
                    <span>{t('colaborar_3')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-400 text-2xl">•</span>
                    <span>{t('colaborar_4')}</span>
                  </li>
                </ul>
                <button
                  onClick={() => setActiveSection('contacto')}
                  className="mt-8 px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-all transform hover:scale-105"
                >
                  {t('contactar_ahora')}
                </button>
              </div>
            </div>
          </section>
        );
      default:
        return <HomeManifiesto />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <HeaderNavigation />

      <nav className="sticky top-0 z-40 bg-black/95 backdrop-blur-sm border-b border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeSection === section.id
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {t(`nav_${section.id}`)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="transition-all duration-500">
        {renderSection()}
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
