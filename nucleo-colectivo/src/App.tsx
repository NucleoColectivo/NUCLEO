import HeaderNavigation from './components/HeaderNavigation';
import HomeManifiesto from './components/HomeManifiesto';
import EstadisticasImpacto from './components/EstadisticasImpacto';
import MiembrosSection from './components/MiembrosSection';
import NucleoSection from './components/NucleoSection';
import ObraSection from './components/ObraSection';
import GaleriaSection from './components/GaleriaSection';
import EducacionSection from './components/EducacionSection';
import CalculadoraTalleres from './components/CalculadoraTalleres';
import LaboratorioCreativo from './components/LaboratorioCreativo';
import ProyectosEspecialesSection from './components/ProyectosEspecialesSection';
import ContenidosSection from './components/ContenidosSection';
import NewsletterLeadMagnet from './components/NewsletterLeadMagnet';
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
        <CalculadoraTalleres />
        <LaboratorioCreativo />
        <ProyectosEspecialesSection />
        <ContenidosSection />
        <NewsletterLeadMagnet />
        <FAQSection />
        <ContactoAlianzasSection />
      </main>
      <BibliotecaRecursos />
    </div>
  );
}

export default App;
