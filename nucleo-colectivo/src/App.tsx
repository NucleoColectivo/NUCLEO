import HeaderNavigation from './components/HeaderNavigation';
import HomeManifiesto from './components/HomeManifiesto';
import MiembrosSection from './components/MiembrosSection';
import NucleoSection from './components/NucleoSection';
import ObraSection from './components/ObraSection';
import EducacionSection from './components/EducacionSection';
import ProyectosEspecialesSection from './components/ProyectosEspecialesSection';
import ContenidosSection from './components/ContenidosSection';
import ContactoAlianzasSection from './components/ContactoAlianzasSection';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <HeaderNavigation />
      <main>
        <HomeManifiesto />
        <MiembrosSection />
        <NucleoSection />
        <ObraSection />
        <EducacionSection />
        <ProyectosEspecialesSection />
        <ContenidosSection />
        <ContactoAlianzasSection />
      </main>
    </div>
  );
}

export default App;
