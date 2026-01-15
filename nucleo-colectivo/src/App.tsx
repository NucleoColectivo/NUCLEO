import HeaderNavigation from './components/HeaderNavigation';
import HomeManifiesto from './components/HomeManifiesto';
import EstadisticasImpacto from './components/EstadisticasImpacto';
import MiembrosSection from './components/MiembrosSection';
import NucleoSection from './components/NucleoSection';
import ObraSection from './components/ObraSection';
import GaleriaSection from './components/GaleriaSection';
import EducacionSection from './components/EducacionSection';
import CrearRetratoFuturo from './components/CrearRetratoFuturo';
import ProyectosEspecialesSection from './components/ProyectosEspecialesSection';
import ContenidosSection from './components/ContenidosSection';
import FAQSection from './components/FAQSection';
import ContactoAlianzasSection from './components/ContactoAlianzasSection';
import BibliotecaRecursos from './components/BibliotecaRecursos';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderNavigation />
      <main>
        <HomeManifiesto />
        <EstadisticasImpacto />
        <MiembrosSection />
        <NucleoSection />
        <ObraSection />
        <GaleriaSection />
        <EducacionSection />
        <CrearRetratoFuturo />
        <ProyectosEspecialesSection />
        <ContenidosSection />
        <FAQSection />
        <ContactoAlianzasSection />
      </main>
      <BibliotecaRecursos />
    </div>
  );
}

export default App;
