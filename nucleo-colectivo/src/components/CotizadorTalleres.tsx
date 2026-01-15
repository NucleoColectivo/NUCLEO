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
    <section id="cotizador" className="relative py-32 overflow-hidden bg-[#0a0e27]">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('/backgrounds/bg-cosmic-digital.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

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
          <div className="bg-[#0f1629] backdrop-blur-md border-2 border-[#d4a574] rounded-2xl p-8 shadow-2xl shadow-black/50">
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
                  className="w-full bg-[#4a5568] border-0 rounded-xl px-5 py-4 text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200 cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 1rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '3rem'
                  }}
                >
                  <option value="" className="bg-gray-800">{t.workshopPlaceholder}</option>
                  {workshops[language].map((workshop) => (
                    <option key={workshop.id} value={workshop.id} className="bg-gray-800">
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
                  className="w-full bg-[#4a5568] border-0 rounded-xl px-5 py-4 text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200 cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 1rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '3rem'
                  }}
                >
                  <option value="2" className="bg-gray-800">2 {language === 'es' ? 'horas' : 'hours'}</option>
                  <option value="4" className="bg-gray-800">4 {language === 'es' ? 'horas' : 'hours'}</option>
                  <option value="8" className="bg-gray-800">8 {language === 'es' ? 'horas' : 'hours'} (1 {language === 'es' ? 'día' : 'day'})</option>
                  <option value="16" className="bg-gray-800">16 {language === 'es' ? 'horas' : 'hours'} (2 {language === 'es' ? 'días' : 'days'})</option>
                  <option value="24" className="bg-gray-800">24 {language === 'es' ? 'horas' : 'hours'} (3 {language === 'es' ? 'días' : 'days'})</option>
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
                  className="w-full bg-[#4a5568] border-0 rounded-xl px-5 py-4 text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200 cursor-pointer appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 1rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '3rem'
                  }}
                >
                  <option value="5" className="bg-gray-800">5 {language === 'es' ? 'participantes' : 'participants'}</option>
                  <option value="10" className="bg-gray-800">10 {language === 'es' ? 'participantes' : 'participants'}</option>
                  <option value="15" className="bg-gray-800">15 {language === 'es' ? 'participantes' : 'participants'}</option>
                  <option value="20" className="bg-gray-800">20 {language === 'es' ? 'participantes' : 'participants'}</option>
                  <option value="30" className="bg-gray-800">30 {language === 'es' ? 'participantes' : 'participants'}</option>
                  <option value="50" className="bg-gray-800">50+ {language === 'es' ? 'participantes' : 'participants'}</option>
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
                    className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      modality === 'virtual'
                        ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-black shadow-lg shadow-orange-500/30'
                        : 'bg-[#1e293b] text-gray-300 hover:bg-[#2d3748]'
                    }`}
                  >
                    {t.virtual}
                  </button>
                  <button
                    onClick={() => {
                      setModality('presencial');
                      setShowQuote(false);
                    }}
                    className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                      modality === 'presencial'
                        ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-black shadow-lg shadow-orange-500/30'
                        : 'bg-[#1e293b] text-gray-300 hover:bg-[#2d3748]'
                    }`}
                  >
                    {t.presencial}
                  </button>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={!selectedWorkshop}
                className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-black font-black text-lg py-5 rounded-xl hover:brightness-110 active:scale-95 transition-all duration-200 shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                <Calculator className="w-6 h-6" />
                <span>{t.calculate}</span>
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-[#0f1629] backdrop-blur-md border-2 border-[#d4a574] rounded-2xl p-8 shadow-2xl shadow-black/50 flex flex-col justify-center min-h-[600px]">
            {showQuote && selectedWorkshop ? (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center">
                  <h3 className="text-3xl font-black text-yellow-400 mb-6">{t.quoteTitle}</h3>
                  <div className="inline-block bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 rounded-2xl p-8 my-4 shadow-2xl shadow-orange-500/40">
                    <p className="text-sm text-black font-bold mb-2">{t.estimatedPrice}</p>
                    <p className="text-5xl md:text-6xl font-black text-black leading-tight">
                      ${price.toLocaleString('es-CO')}
                    </p>
                    <p className="text-lg font-black text-black/90 mt-2">COP</p>
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
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-black text-lg py-5 rounded-xl hover:brightness-110 transition-all duration-200 shadow-lg shadow-green-500/30 flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  {t.contact}
                  <Sparkles className="w-5 h-5" />
                </button>

                <p className="text-xs text-gray-500 text-center italic">{t.note}</p>
              </div>
            ) : (
              <div className="text-center text-gray-500 space-y-6">
                <Calculator className="w-32 h-32 mx-auto opacity-20" />
                <p className="text-lg text-gray-400">
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
