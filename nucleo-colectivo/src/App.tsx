import { useState, useEffect } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import TalleresSection from './components/TalleresSection'
import GaleriaSection from './components/GaleriaSection'
import AboutSection from './components/AboutSection'
import PilaresFundamentales from './components/PilaresFundamentales'
import PortafoliosArtistas from './components/PortafoliosArtistas'
import TestimoniosSection from './components/TestimoniosSection'
import EstadisticasImpacto from './components/EstadisticasImpacto'
import FAQSection from './components/FAQSection'
import ContactoSection from './components/ContactoSection'
import RadioMundialArteCultura from './components/RadioMundialArteCultura'
import BibliotecaRecursos from './components/BibliotecaRecursos'
import ChatBotMejorado from './components/ChatBotMejorado'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

interface ContentData {
  extracted_information: string;
  features: string[];
  geographical_data: {
    ciudad: string;
    pais: string;
  };
}

const AppContent = () => {
  const [contentData, setContentData] = useState<ContentData | null>(null)

  useEffect(() => {
    fetch('/nucleocolectivo_content.json')
      .then(res => res.json())
      .then(data => setContentData(data))
      .catch(err => console.error('Error loading content:', err))
  }, [])

  if (!contentData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div id="inicio">
        <HeroSection data={contentData} />
      </div>

      <div id="pilares">
        <PilaresFundamentales />
      </div>

      <div id="nosotros">
        <AboutSection />
      </div>

      <div id="talleres-ia">
        <TalleresSection />
      </div>

      <div id="galeria">
        <GaleriaSection />
      </div>

      <div id="portafolios">
        <PortafoliosArtistas />
      </div>

      <div id="radio">
        <RadioMundialArteCultura />
      </div>

      <div id="biblioteca">
        <BibliotecaRecursos />
      </div>

      <div id="testimonios">
        <TestimoniosSection />
      </div>

      <div id="estadisticas">
        <EstadisticasImpacto />
      </div>

      <div id="faq">
        <FAQSection />
      </div>

      <div id="contacto">
        <ContactoSection />
      </div>

      <ChatBotMejorado />

      <Footer />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App
