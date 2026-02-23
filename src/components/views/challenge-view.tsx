
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '@/context/app-context';
import { useFirebase } from '@/firebase/provider';
import Image from 'next/image';
import {
    X, ArrowRight, ArrowLeft, Zap, Sparkles, Calculator, RefreshCw, Folder, Trash2, Sliders, Copy, BrainCircuit, Users2, Target, Save, Lightbulb, Hammer, Flame, Globe, Terminal, Info
} from 'lucide-react';
import { evaluateCreativeSolution, type EvaluationOutput } from '@/ai/flows/evaluate-creative-solution';
import { generateCreativeSolution, type SolutionOutput } from '@/ai/flows/generate-creative-solution';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/context/language-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BRAND } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function NodesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: any[] = [];
        const numParticles = 60; 
        const colors = [BRAND.yellow, '#8B5CF6', '#00FFFF']; 

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 1.2 + 0.5,
                    color: colors[i % colors.length]
                });
            }
        };

        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.3;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = (1 - dist / 150) * 0.1;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
            
            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
}

function SpatialSection({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative z-10", className)}
    >
      {children}
    </motion.div>
  );
}

const StrategicChallenge = ({ onBack }: { onBack: () => void }) => {
    const { t } = useTranslation();
    const [pageIndex, setPageIndex] = useState(0);
    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const placeholderImageUrls = PlaceHolderImages.reduce((acc, curr) => {
        acc[curr.id] = curr.imageUrl;
        return acc;
    }, {} as Record<string, string>);

    const perfiles: any = {
        'artista': { 
            mensaje: t('challenge.strategic.profiles.artist.message'),
            mision: t('challenge.strategic.profiles.artist.mission'),
            imagen: placeholderImageUrls['perfil-artista'], 
            beneficios: [
                { icon: Target, title: t('challenge.strategic.profiles.artist.benefits.0.title'), text: t('challenge.strategic.profiles.artist.benefits.0.text') }, 
                { icon: Users2, title: t('challenge.strategic.profiles.artist.benefits.1.title'), text: t('challenge.strategic.profiles.artist.benefits.1.text') }, 
                { icon: Zap, title: t('challenge.strategic.profiles.artist.benefits.2.title'), text: t('challenge.strategic.profiles.artist.benefits.2.text') }
            ] 
        },
        'academica': { 
            mensaje: t('challenge.strategic.profiles.academic.message'),
            mision: t('challenge.strategic.profiles.academic.mission'),
            imagen: placeholderImageUrls['perfil-academica'], 
            beneficios: [
                { icon: Target, title: t('challenge.strategic.profiles.academic.benefits.0.title'), text: t('challenge.strategic.profiles.academic.benefits.0.text') }, 
                { icon: Users2, title: t('challenge.strategic.profiles.academic.benefits.1.title'), text: t('challenge.strategic.profiles.academic.benefits.1.text') }, 
                { icon: Zap, title: t('challenge.strategic.profiles.academic.benefits.2.title'), text: t('challenge.strategic.profiles.academic.benefits.2.text') }
            ] 
        },
        'emprendedor': { 
            mensaje: t('challenge.strategic.profiles.entrepreneur.message'),
            mision: t('challenge.strategic.profiles.entrepreneur.mission'),
            imagen: placeholderImageUrls['perfil-emprendedor'], 
            beneficios: [
                { icon: Target, title: t('challenge.strategic.profiles.entrepreneur.benefits.0.title'), text: t('challenge.strategic.profiles.entrepreneur.benefits.0.text') }, 
                { icon: Users2, title: t('challenge.strategic.profiles.entrepreneur.benefits.1.title'), text: t('challenge.strategic.profiles.entrepreneur.benefits.1.text') }, 
                { icon: Zap, title: t('challenge.strategic.profiles.entrepreneur.benefits.2.title'), text: t('challenge.strategic.profiles.entrepreneur.benefits.2.text') }
            ] 
        }
    };
    
    const handleStart = () => { if (!name.trim() || !profile) { setErrorMsg(t('challenge.strategic.error_name_profile')); return; } setErrorMsg(''); setPageIndex(2); };
    
    const ProgressBar = ({ current, total }: { current: number, total: number }) => {
        const progress = Math.max(0, ((current - 1) / (total - 1)) * 100);
        return (
            <div className="w-12 sm:w-20 bg-gray-800 rounded-full h-1.5">
                <div className="bg-accent h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
        );
    };

    const NavButtons = () => {
        if (pageIndex === 0 || pageIndex === 1 || pageIndex === 9) return null; 
        
        return (
            <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
                <div className="w-full max-w-xs sm:max-w-sm flex justify-between items-center pointer-events-auto bg-black border border-neutral-800 p-2 shadow-2xl rounded-full">
                    <button onClick={() => setPageIndex(pageIndex - 1)} className="flex items-center gap-2 rounded-full px-4 py-2 bg-accent text-accent-foreground hover:bg-yellow-400 transition-colors text-xs sm:text-sm font-bold shrink-0">
                        <ArrowLeft className="size-4" />
                        <span className="hidden sm:inline">{t('challenge.previous')}</span>
                    </button>
                    <div className="flex flex-col items-center gap-1 mx-2 text-center">
                        <span className="text-xs font-code text-neutral-400 whitespace-nowrap">{t('challenge.step')} {pageIndex - 1} / 7</span>
                        <ProgressBar current={pageIndex - 1} total={7} />
                    </div>
                    {pageIndex < 8 ? (
                        <button onClick={() => setPageIndex(pageIndex + 1)} className="flex items-center gap-2 rounded-full px-4 py-2 bg-accent text-accent-foreground hover:bg-yellow-400 transition-colors text-xs sm:text-sm font-bold shrink-0">
                            <span className="hidden sm:inline">{t('challenge.next')}</span>
                            <ArrowRight className="size-4" />
                        </button>
                    ) : (
                         <button onClick={() => setPageIndex(pageIndex + 1)} className="flex items-center gap-2 rounded-full px-4 py-2 bg-accent text-accent-foreground hover:bg-yellow-400 transition-colors text-xs sm:text-sm font-bold shrink-0">
                            <span className="hidden sm:inline">{t('challenge.strategic.end_tour')}</span>
                            <ArrowRight className="size-4" />
                        </button>
                    )}
                </div>
            </div>
        ); 
    };
    
    return (
        <>
        <AnimatePresence mode="wait">
        {pageIndex === 0 && (
             <motion.div 
                key="start"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                className="flex-grow flex flex-col justify-center items-center container mx-auto p-4 md:p-8 z-10"
             >
                <section className="w-full max-w-4xl flex flex-col items-center justify-center text-center relative overflow-hidden rounded-2xl p-8 md:p-16 bg-neutral-900/50 border border-neutral-800">
                    <div className="relative z-10">
                        <div className="flex justify-center mb-8">
                            <Image src="https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/ICONO%20LOGO%20AMARILLO.png" alt="Logo" width={100} height={100} className="w-16 h-16 md:w-24 md:h-24" />
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black leading-tight mb-8 tracking-tighter font-headline">
                            <span className="block text-white mb-2">{t('challenge.strategic.main_title_1')}</span>
                            <span className="block text-accent">{t('challenge.strategic.main_title_2')}</span>
                        </h1>
                        <p className="text-neutral-300 text-sm md:text-xl font-light mb-10 max-w-2xl mx-auto">{t('challenge.strategic.main_subtitle')}</p>
                         <div className="flex flex-col items-center gap-6">
                            <button onClick={() => setPageIndex(1)} className="btn-primary text-base md:text-xl px-10 md:px-12 py-4 md:py-5 uppercase tracking-wider">
                                {t('challenge.strategic.start_experience')}
                            </button>
                            <button onClick={onBack} className="flex items-center gap-2 font-code text-xs text-neutral-500 hover:text-white transition-colors">
                                <ArrowLeft className="size-4" /> {t('challenge.back_to_challenges')}
                            </button>
                        </div>
                    </div>
                </section>
            </motion.div>
        )}
        {pageIndex > 0 && (
            <motion.div 
                key={`page-${pageIndex}`}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}
                className="flex-grow flex flex-col justify-center container mx-auto p-4 md:p-8 z-10"
            >
                {pageIndex === 1 && (<section className="min-h-[60vh] flex flex-col items-center justify-center text-center"><h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-accent font-headline">{t('challenge.strategic.personalize_title')}</h2><div className="bg-neutral-900 border border-neutral-700/60 p-6 md:p-8 rounded-2xl max-w-lg w-full"><p className="text-neutral-300 text-sm md:text-base mb-6">{t('challenge.strategic.personalize_intro')}</p><div className="mb-4 text-left"><label className="block text-[10px] md:text-xs font-bold uppercase text-neutral-500 mb-2">{t('challenge.strategic.your_name')}</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('challenge.strategic.name_placeholder')} className="w-full px-4 py-3 rounded-lg bg-gray-800 text-neutral-200 border border-neutral-700 focus:outline-none focus:border-accent text-sm md:text-base" /></div><div className="mb-6 text-left"><label className="block text-[10px] md:text-xs font-bold uppercase text-neutral-500 mb-2">{t('challenge.strategic.your_profile')}</label><select value={profile} onChange={(e) => setProfile(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-gray-800 text-neutral-200 border border-neutral-700 focus:outline-none focus:border-accent text-sm md:text-base"><option value="">{t('challenge.strategic.select_profile')}</option><option value="artista">{t('challenge.strategic.profile_artist')}</option><option value="academica">{t('challenge.strategic.profile_academic')}</option><option value="emprendedor">{t('challenge.strategic.profile_entrepreneur')}</option></select></div>{errorMsg && <p className="text-red-400 text-xs mb-4">{errorMsg}</p>}<button onClick={handleStart} className="btn-primary w-full py-3 md:py-4 text-sm md:text-base">{t('challenge.strategic.start_mission')}</button></div></section>)}
                {pageIndex === 2 && (<header className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center text-center rounded-2xl overflow-hidden p-6">
                    <div className="absolute inset-0 bg-cover bg-center z-0">
                      <Image src={perfiles[profile]?.imagen || placeholderImageUrls['sintesis-bg']} fill className="object-cover" alt="Profile background"/>
                      <div className="absolute inset-0 bg-neutral-900 opacity-75"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl"><h1 className="text-3xl md:text-6xl font-bold mb-4 text-accent font-headline">{t('challenge.strategic.greeting')}, {name}</h1><p className="text-base md:text-2xl text-neutral-200" dangerouslySetInnerHTML={{ __html: t('challenge.strategic.mission_intro') }}></p></div></header>)}
                {pageIndex >= 3 && pageIndex <= 8 && (
                    <section className="min-h-[60vh] md:min-h-[70vh] flex flex-col items-center justify-center">
                        {pageIndex === 3 && (<><h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-accent font-headline">{t('challenge.strategic.what_is_title')}</h2><p className="max-w-4xl text-center text-sm md:text-lg text-neutral-300 mb-10 md:mb-12">{t('challenge.strategic.what_is_desc')}</p><div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">{[...Array(3)].map((_, i) => { return (<div key={i} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-700/60 text-center hover:border-accent transition-all duration-300"><div className="flex justify-center mb-4"><Zap className="size-8 md:size-12 text-accent" /></div><h3 className="text-lg md:text-xl font-bold mb-2 font-headline">{t(`challenge.strategic.what_is_cards.${i}.title`)}</h3><p className="text-neutral-400 text-xs md:text-sm">{t(`challenge.strategic.what_is_cards.${i}.text`)}</p></div>)})}</div></>)}
                        {pageIndex === 4 && (<div className="max-w-5xl mx-auto p-6 md:p-10 rounded-2xl bg-neutral-900 border border-neutral-700/60"><h2 className="text-2xl md:text-4xl font-bold mb-6 text-center text-accent font-headline">{t('challenge.strategic.summary_title')}</h2>{profile && (<div className="p-4 border-l-4 border-accent bg-neutral-800 rounded-r-lg mb-6"><p className="text-sm md:text-lg text-neutral-300 italic">"{perfiles[profile].mensaje}"</p></div>)}<p className="text-sm md:text-lg text-neutral-300 leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: t('challenge.strategic.summary_desc')}}></p></div>)}
                        {pageIndex === 5 && (<><h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-accent font-headline">{t('challenge.strategic.our_focus_title')}</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">{[...Array(3)].map((_, i) => { return (<div key={i} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-700/60 text-center hover:border-accent transition-all"><div className="flex justify-center mb-4"><Target className="size-8 md:size-12 text-accent" /></div><h3 className="text-lg md:text-xl font-bold mb-2 font-headline">{t(`challenge.strategic.our_focus_cards.${i}.title`)}</h3><p className="text-neutral-400 text-xs md:text-sm">{t(`challenge.strategic.our_focus_cards.${i}.text`)}</p></div>)})}</div></>)}
                        {pageIndex === 6 && (<><h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-accent font-headline">{t('challenge.strategic.who_we_seek_title')}</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">{[...Array(3)].map((_, i) => { return (<div key={i} className="p-6 rounded-2xl bg-neutral-900 border border-neutral-700/60 text-center hover:border-accent transition-all"><div className="flex justify-center mb-4"><Users2 className="size-8 md:size-12 text-accent" /></div><h3 className="text-lg md:text-xl font-bold mb-2 font-headline">{t(`challenge.strategic.who_we_seek_cards.${i}.title`)}</h3><p className="text-neutral-400 text-xs md:text-sm">{t(`challenge.strategic.who_we_seek_cards.${i}.text`)}</p></div>)})}</div></>)}
                        {pageIndex === 7 && (<div className="text-center min-h-[60vh] flex flex-col items-center justify-center bg-neutral-900 py-12 md:py-16 px-6 rounded-2xl"><h2 className="text-2xl md:text-4xl font-bold mb-4 text-accent font-headline">{t('challenge.strategic.accept_mission_title')}</h2><p className="max-w-3xl mx-auto text-sm md:text-lg mb-8 text-neutral-300">{profile ? perfiles[profile].mision : t('challenge.strategic.accept_mission_desc_default')}</p><button onClick={() => setPageIndex(8)} className="btn-primary py-3 md:py-4 px-10 md:px-12 text-sm md:text-base">{t('challenge.strategic.accept_mission_button')}</button></div>)}
                        {pageIndex === 8 && profile && (<><h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-accent font-headline">{t('challenge.strategic.benefits_title')}</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">{perfiles[profile].beneficios.map((b:any, i:number) => (<div key={i} className="p-6 rounded-2xl bg-neutral-900 border border-accent/40 text-center"><div className="flex justify-center mb-4"><b.icon className="size-8 md:size-12 text-accent" /></div><h3 className="text-lg md:text-xl font-bold mb-2 font-headline">{b.title}</h3><p className="text-neutral-400 text-xs md:text-sm">{b.text}</p></div>))}</div></>)}
                    </section>
                )}
                {pageIndex === 9 && (<div className="text-center min-h-[60vh] flex flex-col items-center justify-center bg-neutral-900 py-12 md:py-16 px-6 rounded-2xl relative border border-neutral-800">
                    <button onClick={onBack} className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors">
                        <X className="size-5 md:size-6" />
                    </button>
                    <div className="flex justify-center mb-8">
                        <Image src="https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/ICONO%20LOGO%20AMARILLO.png" alt="Logo" width={80} height={80} className="w-16 h-16 md:w-20 md:h-20" />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-6 text-accent font-headline">{t('contact.cta_title')}</h2>
                    <p className="max-w-3xl mx-auto text-sm md:text-lg mb-8 text-neutral-300">{t('contact.cta_description')}</p>
                    <a
                        href="https://forms.gle/smy3CpQaSMLeMYXj6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-base md:text-xl px-10 md:px-12 py-4 md:py-5 uppercase tracking-wider"
                    >
                        {t('contact.cta_button')}
                    </a>
                </div>)}
            </motion.div>
        )}
        </AnimatePresence>
        <NavButtons />
        </>
    );
};

const CreativeMachine = ({ onBack }: { onBack: () => void }) => {
    const { db, user } = useFirebase();
    const { playSound } = useApp();
    const { t } = useTranslation();
    const [creativeMachineView, setCreativeMachineView] = useState('start'); 
    const [currentChallenge, setCurrentChallenge] = useState<any>(null);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState<EvaluationOutput | null>(null);
    const [aiSolution, setAiSolution] = useState<SolutionOutput | null>(null);
    const [userSolution, setUserSolution] = useState("");
    const [showSaved, setShowSaved] = useState(false);
    const [savedList, setSavedList] = useState<any[]>([]);
    const [openSelector, setOpenSelector] = useState<string | null>(null);
    const [seed, setSeed] = useState(1125);

    const appId = 'nucleo-app';

    const conceptos = useMemo(() => t('challenge.creative.variables.concepts').split('|'), [t]);
    const acciones = useMemo(() => t('challenge.creative.variables.actions').split('|'), [t]);
    const desafios = useMemo(() => t('challenge.creative.variables.challenges').split('|'), [t]);
    const contextos = useMemo(() => t('challenge.creative.variables.contexts').split('|'), [t]);

    const variableMap: Record<string, string[]> = {
        concepto: conceptos,
        accion: acciones,
        desafio: desafios,
        contexto: contextos,
    };

    const cardConfig: Record<string, { label: string, icon: any, color: string, textColor: string, num: string }> = {
        concepto: { label: "CONCEPTO", icon: Lightbulb, color: "#00FFFF", textColor: "text-cyan-400", num: "01" },
        accion: { label: "ACCIÓN", icon: Hammer, color: "#FFA500", textColor: "text-orange-400", num: "02" },
        desafio: { label: "DESAFÍO", icon: Flame, color: "#FF0000", textColor: "text-red-500", num: "03" },
        contexto: { label: "CONTEXTO", icon: Globe, color: "#00FF00", textColor: "text-green-500", num: "04" }
    };
    
    const generateChallenge = () => {
        const newChallenge = {
            id: Date.now(),
            concepto: conceptos[Math.floor(Math.random() * conceptos.length)],
            accion: acciones[Math.floor(Math.random() * acciones.length)],
            desafio: desafios[Math.floor(Math.random() * desafios.length)],
            contexto: contextos[Math.floor(Math.random() * contextos.length)]
        };
        setCurrentChallenge(newChallenge);
        setSeed(Math.floor(Math.random() * 9999));
        setUserSolution("");
        setEvaluationResult(null);
        setAiSolution(null);
    };

    const handleChallengeGeneration = () => {
        playSound('click');
        generateChallenge();
    };

    const handleSelectVariable = (variable: string, value: string) => {
        if (!currentChallenge) return;
        setCurrentChallenge((prev: any) => ({
            ...prev,
            [variable]: value,
        }));
        setOpenSelector(null);
        setEvaluationResult(null);
        setAiSolution(null);
        playSound('click');
    };

    const handleStart = async () => {
        playSound('start');
        generateChallenge();
        setCreativeMachineView('game');
    };
    
    const handleEvaluate = async () => {
        if (!currentChallenge || !userSolution) return;
        setIsEvaluating(true);
        setEvaluationResult(null);
        setAiSolution(null);
        playSound('start');

        try {
            const result = await evaluateCreativeSolution({
                ...currentChallenge,
                propuesta: userSolution,
            });
            setEvaluationResult(result);
            playSound('success');
        } catch (e) {
            setEvaluationResult({
                puntuacion: 0,
                calificacion: "Error",
                titulo: t('challenge.creative.error.connection_title'),
                retroalimentacion: t('challenge.creative.error.connection_body'),
            });
        } finally {
            setIsEvaluating(false);
        }
    };
    
    const handleGenerateSolution = async () => {
        if (!currentChallenge) return;
        setIsGenerating(true);
        setAiSolution(null);
        setEvaluationResult(null);
        playSound('start');

        try {
            const result = await generateCreativeSolution({
                ...currentChallenge,
            });
            setAiSolution(result);
            playSound('success');
        } catch (e) {
            setAiSolution({
                titulo: t('challenge.creative.error.connection_title'),
                solucion: t('challenge.creative.error.connection_body'),
                palabrasClave: ["Error", "Connection", "AI"]
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = () => {
        if (!user || !db || !currentChallenge ) return;
        
        const dataToSave = {
            ...currentChallenge,
            userSolution: userSolution,
            evaluationResult: evaluationResult,
            aiSolution: aiSolution,
            timestamp: Date.now()
        };

        addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'challenges'), dataToSave)
        .then(() => {
            playSound('success');
            alert(t('challenge.creative.save_success'));
        })
        .catch(error => {
            const contextualError = new FirestorePermissionError({
                path: `artifacts/${appId}/users/${user.uid}/challenges`,
                operation: 'create',
                requestResourceData: dataToSave
            });
            errorEmitter.emit('permission-error', contextualError);
        });
    };

    useEffect(() => {
        if (showSaved && user && db) {
            const q = collection(db, 'artifacts', appId, 'users', user.uid, 'challenges');
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSavedList(list);
            });
            return () => unsubscribe();
        }
    }, [showSaved, user, db]);

    const handleDelete = (itemId: string) => {
        if (!user || !db) return;
        const docRef = doc(db, 'artifacts', appId, 'users', user.uid, 'challenges', itemId);
        deleteDoc(docRef).then(() => playSound('click'));
    }

    if (creativeMachineView === 'start') {
        return (
            <div className="relative z-10 text-center flex flex-col items-center justify-center flex-grow animate-fade-in-up antialiased">
                <div className="w-20 h-20 md:w-32 md:h-32 mb-8 relative flex items-center justify-center">
                    <Image src="https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/ICONO%20LOGO%20AMARILLO.png" alt="Logo" width={120} height={120} className="relative z-10 w-20 h-20 md:w-32 md:h-32" />
                </div>
                <h1 className="text-3xl md:text-7xl font-black font-headline tracking-tighter mb-6 text-white uppercase">
                    {t('challenge.creative.main_title_1')}
                    <span className="text-accent block text-2xl md:text-5xl mt-2">{t('challenge.creative.main_title_2')}</span>
                </h1>
                <p className="text-sm md:text-xl text-neutral-400 mb-10 md:mb-12 font-light max-w-2xl mx-auto leading-relaxed border-t border-b border-white/5 py-6 italic">
                    {t('challenge.creative.main_subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <button onClick={onBack} className="text-[10px] py-3 px-6 border border-white/20 hover:bg-white/10 text-white flex items-center justify-center gap-2 font-bold uppercase tracking-widest transition-all">
                       <ArrowLeft className="size-4"/> {t('challenge.back')}
                    </button>
                    <button onClick={handleStart} className="btn-primary text-base md:text-xl py-4 md:py-5 px-10 md:px-12 tracking-widest" onMouseEnter={() => playSound('hover')}>
                        {t('challenge.creative.insert_coin')}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-5xl mx-auto relative z-10 animate-fade-in px-4 antialiased py-6 md:py-10 font-code">
            <style>{`
                .grid-bg {
                    background-size: 40px 40px;
                    background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
                }
                .matriz-card {
                    background: rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .matriz-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                }
                .icon-glow {
                    filter: drop-shadow(0 0 8px currentColor);
                }
            `}</style>

            <div className="fixed inset-0 grid-bg pointer-events-none -z-10 opacity-40"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6 border-b border-white/10 pb-6 md:pb-8">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <span className="text-cyan-400 text-lg md:text-xl font-black">[ + ]</span>
                        <h2 className="text-xl md:text-3xl font-black text-white tracking-widest uppercase font-headline">
                            MATRIZ DE RETO
                        </h2>
                    </div>
                    <p className="text-[8px] md:text-[9px] text-neutral-500 font-code tracking-[0.2em] uppercase">
                        ENCRIPTACIÓN: AES-256 | SEED: #{seed}
                    </p>
                </div>
                <div className="flex gap-3">
                    <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 border border-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                        <X className="size-4"/> SALIR
                    </button>
                    <button onClick={() => { setShowSaved(true); }} className="flex items-center gap-2 px-4 py-2 border border-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                        <Folder className="size-4"/> ARCHIVO
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
                {currentChallenge && Object.keys(cardConfig).map((key) => {
                    const cfg = cardConfig[key];
                    const val = currentChallenge[key];
                    const Icon = cfg.icon;
                    return (
                        <div key={key} onClick={() => setOpenSelector(key)} className="matriz-card relative p-6 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer group min-h-[140px] md:min-h-[180px]">
                            <span className="absolute top-3 left-4 text-[8px] text-white/10 font-bold tracking-widest">{cfg.num}</span>
                            <div className="mb-3 md:mb-4 transform group-hover:scale-110 transition-transform duration-300 icon-glow" style={{ color: cfg.color }}>
                                <Icon className="size-8 md:size-10" strokeWidth={1.5} />
                            </div>
                            <h3 className={cn("text-[8px] font-black tracking-[0.4em] mb-2 uppercase", cfg.textColor)}>
                                {cfg.label}
                            </h3>
                            <p className="text-base md:text-xl font-light text-white leading-tight max-w-xs font-mono">
                                {val}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="bg-black/60 border-l-4 border-l-primary p-6 md:p-8 mb-10 md:mb-16 relative shadow-2xl backdrop-blur-md">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Terminal className="size-12 md:size-16" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="text-primary size-4" fill="currentColor" />
                    <h3 className="text-[8px] md:text-[9px] font-black tracking-[0.4em] text-white/40 uppercase">MISIÓN GENERADA</h3>
                </div>
                {currentChallenge && (
                    <p className="text-base md:text-2xl font-light leading-relaxed text-white/90 font-mono"
                        dangerouslySetInnerHTML={{
                            __html: t('challenge.creative.challenge_sentence')
                                .replace('{context}', `<span class="text-green-500 font-bold">${currentChallenge.contexto}</span>`)
                                .replace('{challenge}', `<span class="text-red-500 font-bold">${currentChallenge.desafio}</span>`)
                                .replace('{action}', `<span class="text-orange-400 font-bold">${currentChallenge.accion}</span>`)
                                .replace('{concept}', `<span class="text-cyan-400 font-bold">${currentChallenge.concepto}</span>`)
                        }}
                    />
                )}
            </div>

            <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
                <div className="space-y-4">
                    <h3 className="text-[8px] md:text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase text-center">{t('challenge.creative.your_solution_title')}</h3>
                    <textarea 
                        value={userSolution} 
                        onChange={(e) => setUserSolution(e.target.value)} 
                        placeholder={t('challenge.creative.solution_placeholder')} 
                        className="w-full h-32 md:h-40 p-6 md:p-8 bg-white/5 text-sm md:text-lg text-white border border-white/10 focus:border-cyan-500 focus:bg-white/[0.08] outline-none transition-all placeholder:text-white/10 font-light resize-none custom-scrollbar font-mono"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    <button 
                        onClick={handleEvaluate} 
                        disabled={isEvaluating || !userSolution} 
                        className="px-6 md:px-8 py-3 md:py-4 bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed text-[10px] md:text-xs"
                    >
                        {isEvaluating ? <RefreshCw className="animate-spin size-4" /> : <Calculator className="size-4"/>}
                        {isEvaluating ? t('challenge.creative.evaluating') : t('challenge.creative.evaluate_button')}
                    </button>
                    <button 
                        onClick={handleGenerateSolution} 
                        disabled={isGenerating} 
                        className="px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-3 text-[10px] md:text-xs"
                    >
                        {isGenerating ? <RefreshCw className="animate-spin size-4" /> : <Sparkles className="size-4"/>}
                        {isGenerating ? t('challenge.creative.generating') : t('challenge.creative.ai_help_button')}
                    </button>
                    <button 
                        onClick={handleChallengeGeneration} 
                        className="px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center gap-3 text-[10px] md:text-xs"
                    >
                        <RefreshCw className="size-4"/> {t('challenge.creative.new_challenge_button')}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {(aiSolution || evaluationResult) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                        className="mt-12 md:mt-20 max-w-4xl mx-auto"
                    >
                        {aiSolution && !isGenerating && (
                            <div className="bg-white/5 border border-white/10 p-6 md:p-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none"><Sparkles className="size-16 md:size-24" /></div>
                                <h3 className="text-xl md:text-2xl font-black text-white mb-2 font-headline uppercase tracking-tight">{aiSolution.titulo}</h3>
                                <p className="text-[8px] font-code text-primary tracking-[0.3em] mb-6 md:mb-8 uppercase">ANÁLISIS ESPECULATIVO IA v2.5</p>
                                <p className="text-sm md:text-lg text-neutral-300 leading-relaxed font-light mb-6 md:mb-8 font-mono">{aiSolution.solucion}</p>
                                <div className="flex flex-wrap gap-2">
                                    {aiSolution.palabrasClave.map(kw => (
                                        <span key={kw} className="px-3 py-1 border border-white/10 bg-white/5 text-[8px] md:text-[9px] font-bold text-white/60 uppercase tracking-widest rounded-full">{kw}</span>
                                    ))}
                                </div>
                                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10 flex justify-end">
                                    <button onClick={() => { setUserSolution(aiSolution.solucion); playSound('click'); }} className="flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors">
                                        <Copy className="size-4"/> {t('challenge.creative.use_solution_button')}
                                    </button>
                                </div>
                            </div>
                        )}

                        {evaluationResult && !isEvaluating && (
                            <div className="bg-white/5 border border-white/10 p-6 md:p-10 relative overflow-hidden mt-6">
                                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none"><BrainCircuit className="size-16 md:size-24" /></div>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black text-white mb-2 font-headline uppercase tracking-tight">{evaluationResult.titulo}</h3>
                                        <p className="text-[8px] font-code text-cyan-400 tracking-[0.3em] uppercase">{evaluationResult.calificacion}</p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <div className="text-4xl md:text-5xl font-black text-white font-headline">{evaluationResult.puntuacion}</div>
                                        <div className="text-[8px] font-bold text-white/30 tracking-widest uppercase mt-1">MATRIZ_INNOVACIÓN</div>
                                    </div>
                                </div>
                                <p className="text-sm md:text-lg text-neutral-300 leading-relaxed font-light mb-8 md:mb-10 border-l-2 border-cyan-400/30 pl-6 font-mono">{evaluationResult.retroalimentacion}</p>
                                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10 flex justify-end gap-6">
                                    {user ? (
                                        <button onClick={handleSave} className="flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                                            <Save className="size-4"/> {t('challenge.creative.save_to_archive_button')}
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2 text-[8px] md:text-[9px] text-white/30 italic">
                                            <Info className="size-4"/> Inicia sesión para guardar tus hallazgos
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <Dialog open={!!openSelector} onOpenChange={(open) => !open && setOpenSelector(null)}>
                <DialogContent className="bg-black/95 border border-white/20 text-white max-w-xl max-h-[80vh] flex flex-col p-0 shadow-2xl">
                    <DialogTitle className="sr-only">{t('challenge.creative.select_variable_title')}</DialogTitle>
                    <DialogDescription className="sr-only">{t('challenge.creative.choose_new')}</DialogDescription>
                    <div className="p-6 md:p-8 border-b border-white/10">
                        <h2 className="text-lg md:text-xl font-black font-headline tracking-widest uppercase flex items-center gap-4">
                            <Sliders className="size-5 text-cyan-400"/> {t('challenge.creative.select_variable_title')}
                        </h2>
                    </div>
                    <div className="overflow-y-auto p-6 md:p-8 space-y-2 flex-grow custom-scrollbar">
                        {openSelector && variableMap[openSelector].map(option => (
                            <button key={option} onClick={() => handleSelectVariable(openSelector!, option)} className="w-full text-left p-4 md:p-5 bg-white/5 border border-transparent hover:border-white/20 hover:bg-white/10 transition-all text-neutral-400 hover:text-white font-light text-sm md:text-base font-mono">
                                {option}
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={showSaved} onOpenChange={setShowSaved}>
                <DialogContent className="bg-black/95 border border-white/20 text-white max-w-4xl max-h-[85vh] flex flex-col p-0 shadow-2xl">
                    <DialogTitle className="sr-only">{t('challenge.creative.saved_archives_title')}</DialogTitle>
                    <DialogDescription className="sr-only">{t('challenge.creative.saved_archives_title')}</DialogDescription>
                    <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
                        <h2 className="text-lg md:text-xl font-black font-headline tracking-widest uppercase flex items-center gap-4">
                            <Folder className="size-5 text-cyan-400"/> {t('challenge.creative.saved_archives_title')}
                        </h2>
                    </div>
                    <div className="overflow-y-auto p-6 md:p-8 space-y-4 flex-grow custom-scrollbar">
                        {!user ? (
                            <div className="text-center py-20 text-neutral-500 font-light italic">Debes iniciar sesión para ver tus archivos.</div>
                        ) : savedList.length === 0 ? (
                            <div className="text-center py-20 text-neutral-500 font-light italic">No hay registros en la base de datos local.</div>
                        ) : savedList.map(item => (
                            <div key={item.id} className="p-6 md:p-8 bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-start" 
                            onClick={() => { 
                                setCurrentChallenge(item);
                                setAiSolution(item.aiSolution || null);
                                setEvaluationResult(item.evaluationResult || null);
                                setUserSolution(item.userSolution || "");
                                setShowSaved(false); 
                                playSound('click');
                            }}>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-4 text-[8px] font-bold tracking-widest text-white/30 uppercase">
                                        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                                        {item.aiSolution && <span className="text-primary border border-primary/30 px-2 py-0.5 rounded">IA GENERATED</span>}
                                    </div>
                                    <h4 className="text-base md:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors font-headline">{item.concepto}</h4>
                                    <p className="text-[10px] md:text-xs text-neutral-500 font-light line-clamp-1 font-mono">{item.accion} · {item.contexto}</p>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="text-neutral-600 hover:text-red-500 p-2 transition-colors">
                                    <Trash2 className="size-4"/>
                                </button>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export function ChallengeView() {
    const { t } = useTranslation();
    const [challengeType, setChallengeType] = useState<'cover' | 'strategic' | 'creative'>('cover');

    const handleSelectChallenge = (type: 'strategic' | 'creative') => {
        setChallengeType(type);
    };
    
    const renderCover = () => (
        <SpatialSection className="flex flex-col items-center justify-center text-center z-10 animate-fade-in flex-grow w-full max-w-5xl px-4 antialiased">
            <div className="flex justify-center items-center gap-4 md:gap-6 mb-4">
                <Image src="https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/ICONO%20LOGO%20AMARILLO.png" alt="Núcleo Colectivo Logo" width={80} height={80} className="w-14 h-14 md:w-20 md:h-20" />
                <h1 className="text-2xl md:text-6xl font-black font-headline tracking-tighter text-white uppercase">{t('challenge.cover.title')}</h1>
            </div>
            <p className="text-xs md:text-lg text-neutral-400 max-w-2xl mx-auto mb-10 md:mb-16">{t('challenge.cover.subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                <div className="group bg-neutral-900 border border-white/5 p-6 md:p-10 text-left flex flex-col hover:border-accent transition-all duration-300 rounded-2xl">
                    <div className="flex-grow">
                        <Users2 className="size-8 md:size-10 mb-4 text-accent"/>
                        <h2 className="text-xl md:text-3xl font-bold font-headline text-white mb-3">{t('challenge.cover.strategic_challenge.title')}</h2>
                        <p className="text-sm md:text-base text-neutral-400 leading-relaxed mb-8">
                            {t('challenge.cover.strategic_challenge.description')}
                        </p>
                    </div>
                    <button 
                        onClick={() => handleSelectChallenge('strategic')}
                        className="bg-accent text-accent-foreground px-6 md:px-8 py-3 md:py-4 font-bold rounded-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 uppercase tracking-wider group/btn text-xs md:text-base"
                    >
                        {t('challenge.cover.strategic_challenge.cta')} <ArrowRight className="size-4 md:size-5 group-hover/btn:translate-x-1 transition-transform"/>
                    </button>
                </div>
                <div className="group bg-neutral-900 border border-white/5 p-6 md:p-10 text-left flex flex-col hover:border-cyan-400 transition-all duration-300 rounded-2xl">
                     <div className="flex-grow">
                        <BrainCircuit className="size-8 md:size-10 mb-4 text-cyan-400"/>
                        <h2 className="text-xl md:text-3xl font-bold font-headline text-white mb-3">{t('challenge.cover.creative_machine.title')}</h2>
                        <p className="text-sm md:text-base text-neutral-400 leading-relaxed mb-8">
                            {t('challenge.cover.creative_machine.description')}
                        </p>
                    </div>
                    <button 
                        onClick={() => handleSelectChallenge('creative')}
                        className="bg-cyan-500 text-black px-6 md:px-8 py-3 md:py-4 font-bold rounded-lg hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 uppercase tracking-wider group/btn text-xs md:text-base"
                    >
                        {t('challenge.cover.creative_machine.cta')} <ArrowRight className="size-4 md:size-5 group-hover/btn:translate-x-1 transition-transform"/>
                    </button>
                </div>
            </div>
        </SpatialSection>
    );

    return (
        <div className="font-body bg-black text-neutral-200 min-h-screen flex flex-col pt-20 overflow-hidden relative">
             <NodesBackground />
             <div className="flex-grow flex items-center justify-center p-4 relative z-10 antialiased font-medium">
                {challengeType === 'cover' && renderCover()}
                {challengeType === 'strategic' && <StrategicChallenge onBack={() => setChallengeType('cover')} />}
                {challengeType === 'creative' && <CreativeMachine onBack={() => setChallengeType('cover')} />}
             </div>
        </div>
    );
}
