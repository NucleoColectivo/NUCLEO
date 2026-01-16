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

  return (
    <div className="min-h-screen bg-black">
      <HeaderNavigation />

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
