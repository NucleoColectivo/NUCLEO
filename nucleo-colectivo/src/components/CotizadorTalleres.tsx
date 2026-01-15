import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calculator, Users, Clock, MapPin, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';

const CotizadorTalleres = () => {
  const { language } = useLanguage();

  const [selectedWorkshop, setSelectedWorkshop] = useState('');
  const [duration, setDuration] = useState('4');
  const [participants, setParticipants] = useState('10');
  const [modality, setModality] = useState('virtual');
  const [showQuote, setShowQuote] = useState(false);

  const workshops = {
    es: [
      { id: 'ia-basica', name: 'IA Básica para Artistas', basePrice: 600000 },
      { id: 'programacion', name: 'Programación Creativa', basePrice: 800000 },
      { id: 'procesos', name: 'Procesos Creativos + IA', basePrice: 720000 },
      { id: 'revolucion-ia', name: 'Revolución IA 360°', basePrice: 1000000 },
      { id: 'creacion-colectiva', name: 'Creación Colectiva', basePrice: 880000 },
      { id: 'omnipotencia', name: 'Omnipotencia Digital', basePrice: 1200000 },
      { id: 'educacion-global', name: 'Educación Global con IA', basePrice: 1120000 }
    ],
    en: [
      { id: 'ia-basica', name: 'Basic AI for Artists', basePrice: 600000 },
      { id: 'programacion', name: 'Creative Programming', basePrice: 800000 },
      { id: 'procesos', name: 'Creative Processes + AI', basePrice: 720000 },
      { id: 'revolucion-ia', name: 'AI Revolution 360°', basePrice: 1000000 },
      { id: 'creacion-colectiva', name: 'Collective Creation', basePrice: 880000 },
      { id: 'omnipotencia', name: 'Digital Omnipotence', basePrice: 1200000 },
      { id: 'educacion-global', name: 'Global Education with AI', basePrice: 1120000 }
    ]
  };

  const calculatePrice = () => {
    if (!selectedWorkshop) return 0;

    const workshop = workshops[language].find(w => w.id === selectedWorkshop);
    if (!workshop) return 0;

    let price = workshop.basePrice;

    const durationMultiplier = parseInt(duration) / 4;
    price *= durationMultiplier;

    const participantCount = parseInt(participants);
    if (participantCount <= 10) {
      price *= 1;
    } else if (participantCount <= 20) {
      price *= 1.5;
    } else if (participantCount <= 30) {
      price *= 2;
    } else {
      price *= 2.5;
    }

    if (modality === 'presencial') {
      price *= 1.5;
    }

    return Math.round(price);
  };

  const handleCalculate = () => {
    setShowQuote(true);
  };

  const content = {
    es: {
      title: 'Cotizador de Talleres',
      subtitle: 'Calcula el costo estimado de tu taller personalizado',
      workshopLabel: 'Tipo de Taller',
      workshopPlaceholder: 'Selecciona un taller',
      durationLabel: 'Duración',
      participantsLabel: 'Número de Participantes',
      modalityLabel: 'Modalidad',
      virtual: 'Virtual',
      presencial: 'Presencial',
      calculate: 'Calcular Cotización',
      quoteTitle: 'Tu Cotización',
      estimatedPrice: 'Precio Estimado',
      includes: 'Incluye',
      feature1: 'Material didáctico completo',
      feature2: 'Certificado de participación',
      feature3: 'Seguimiento personalizado',
      feature4: 'Acceso a recursos adicionales',
      contact: 'Contactar por WhatsApp',
      note: 'Precio en COP (Pesos Colombianos). Cotización válida por 15 días.'
    },
    en: {
      title: 'Workshop Quotation',
      subtitle: 'Calculate the estimated cost of your custom workshop',
      workshopLabel: 'Workshop Type',
      workshopPlaceholder: 'Select a workshop',
      durationLabel: 'Duration',
      participantsLabel: 'Number of Participants',
      modalityLabel: 'Modality',
      virtual: 'Virtual',
      presencial: 'In-Person',
      calculate: 'Calculate Quote',
      quoteTitle: 'Your Quote',
      estimatedPrice: 'Estimated Price',
      includes: 'Includes',
      feature1: 'Complete learning materials',
      feature2: 'Participation certificate',
      feature3: 'Personalized follow-up',
      feature4: 'Access to additional resources',
      contact: 'Contact via WhatsApp',
      note: 'Price in COP (Colombian Pesos). Quote valid for 15 days.'
    }
  };

  const t = content[language];
  const price = calculatePrice();

  const handleWhatsAppContact = () => {
    const workshopName = workshops[language].find(w => w.id === selectedWorkshop)?.name || '';
    const message = language === 'es'
      ? `Hola! Me interesa el taller "${workshopName}". La cotización es de $${price.toLocaleString('es-CO')} COP para ${participants} participantes, ${duration} horas, modalidad ${modality}. Me gustaría más información.`
      : `Hello! I'm interested in the workshop "${workshopName}". The quote is $${price.toLocaleString('es-CO')} COP for ${participants} participants, ${duration} hours, ${modality} modality. I would like more information.`;

    const whatsappUrl = `https://wa.me/573006101221?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="cotizador" className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/backgrounds/bg-cosmic-digital.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6">
            <Calculator className="w-12 h-12 text-yellow-400 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              {t.title}
            </h2>
            <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md border-2 border-yellow-500/40 rounded-2xl p-8 shadow-2xl hover:shadow-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 transform hover:scale-[1.02]">
            <div className="space-y-7">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-bold text-yellow-400">
                  <Sparkles className="w-5 h-5" />
                  {t.workshopLabel}
                </label>
                <select
                  value={selectedWorkshop}
                  onChange={(e) => {
                    setSelectedWorkshop(e.target.value);
                    setShowQuote(false);
                  }}
                  className="w-full bg-gradient-to-r from-black/80 to-gray-900/80 border-2 border-gray-700 rounded-xl px-5 py-4 text-white text-lg font-semibold focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/30 transition-all duration-300 hover:border-yellow-500/50 cursor-pointer"
                >
                  <option value="" className="bg-gray-900">{t.workshopPlaceholder}</option>
                  {workshops[language].map((workshop) => (
                    <option key={workshop.id} value={workshop.id} className="bg-gray-900">
                      {workshop.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-bold text-yellow-400">
                  <Clock className="w-5 h-5" />
                  {t.durationLabel}
                </label>
                <select
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                    setShowQuote(false);
                  }}
                  className="w-full bg-gradient-to-r from-black/80 to-gray-900/80 border-2 border-gray-700 rounded-xl px-5 py-4 text-white text-lg font-semibold focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/30 transition-all duration-300 hover:border-yellow-500/50 cursor-pointer"
                >
                  <option value="2" className="bg-gray-900">2 {language === 'es' ? 'horas' : 'hours'}</option>
                  <option value="4" className="bg-gray-900">4 {language === 'es' ? 'horas' : 'hours'}</option>
                  <option value="8" className="bg-gray-900">8 {language === 'es' ? 'horas' : 'hours'} (1 {language === 'es' ? 'día' : 'day'})</option>
                  <option value="16" className="bg-gray-900">16 {language === 'es' ? 'horas' : 'hours'} (2 {language === 'es' ? 'días' : 'days'})</option>
                  <option value="24" className="bg-gray-900">24 {language === 'es' ? 'horas' : 'hours'} (3 {language === 'es' ? 'días' : 'days'})</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-bold text-yellow-400">
                  <Users className="w-5 h-5" />
                  {t.participantsLabel}
                </label>
                <select
                  value={participants}
                  onChange={(e) => {
                    setParticipants(e.target.value);
                    setShowQuote(false);
                  }}
                  className="w-full bg-gradient-to-r from-black/80 to-gray-900/80 border-2 border-gray-700 rounded-xl px-5 py-4 text-white text-lg font-semibold focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/30 transition-all duration-300 hover:border-yellow-500/50 cursor-pointer"
                >
                  <option value="5" className="bg-gray-900">5 {language === 'es' ? 'participantes' : 'participants'}</option>
                  <option value="10" className="bg-gray-900">10 {language === 'es' ? 'participantes' : 'participants'}</option>
                  <option value="15" className="bg-gray-900">15 {language === 'es' ? 'participantes' : 'participants'}</option>
                  <option value="20" className="bg-gray-900">20 {language === 'es' ? 'participantes' : 'participants'}</option>
                  <option value="30" className="bg-gray-900">30 {language === 'es' ? 'participantes' : 'participants'}</option>
                  <option value="50" className="bg-gray-900">50+ {language === 'es' ? 'participantes' : 'participants'}</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-bold text-yellow-400">
                  <MapPin className="w-5 h-5" />
                  {t.modalityLabel}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setModality('virtual');
                      setShowQuote(false);
                    }}
                    className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                      modality === 'virtual'
                        ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black shadow-2xl shadow-yellow-500/50 scale-105 border-2 border-yellow-400'
                        : 'bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-700 text-gray-300 hover:border-yellow-500/50 hover:text-white hover:scale-105'
                    }`}
                  >
                    {t.virtual}
                  </button>
                  <button
                    onClick={() => {
                      setModality('presencial');
                      setShowQuote(false);
                    }}
                    className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                      modality === 'presencial'
                        ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black shadow-2xl shadow-yellow-500/50 scale-105 border-2 border-yellow-400'
                        : 'bg-gradient-to-r from-gray-800 to-gray-900 border-2 border-gray-700 text-gray-300 hover:border-yellow-500/50 hover:text-white hover:scale-105'
                    }`}
                  >
                    {t.presencial}
                  </button>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={!selectedWorkshop}
                className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black font-black text-xl py-5 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                <Calculator className="w-7 h-7 group-hover:rotate-12 transition-transform relative z-10" />
                <span className="relative z-10">{t.calculate}</span>
                <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform relative z-10" />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md border-2 border-yellow-500/40 rounded-2xl p-8 shadow-2xl flex flex-col justify-center min-h-[600px]">
            {showQuote && selectedWorkshop ? (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <h3 className="text-3xl font-black text-yellow-400 mb-2">{t.quoteTitle}</h3>
                  <div className="inline-block bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-8 my-6 transform hover:scale-105 transition-all duration-500 shadow-2xl shadow-yellow-500/50 animate-pulse">
                    <p className="text-sm text-black font-bold mb-2">{t.estimatedPrice}</p>
                    <p className="text-5xl md:text-6xl font-black text-black leading-tight">
                      ${price.toLocaleString('es-CO')}
                    </p>
                    <p className="text-lg font-black text-black/90 mt-3">COP</p>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" />
                    {t.includes}
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t.feature1}</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t.feature2}</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t.feature3}</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t.feature4}</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-lg py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/50 flex items-center justify-center gap-3 group"
                >
                  <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  {t.contact}
                  <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>

                <p className="text-xs text-gray-500 text-center italic">{t.note}</p>
              </div>
            ) : (
              <div className="text-center text-gray-500 space-y-4">
                <Calculator className="w-24 h-24 mx-auto opacity-30" />
                <p className="text-xl">
                  {language === 'es'
                    ? 'Selecciona las opciones y calcula tu cotización'
                    : 'Select options and calculate your quote'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CotizadorTalleres;
