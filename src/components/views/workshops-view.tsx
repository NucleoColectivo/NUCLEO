
'use client';

import React, { useRef, useState } from 'react';
import NextImage from 'next/image';
import { useTranslation } from '@/context/language-context';
import { 
  BrainCircuit, Clock, Award, CheckCircle, GitBranch, 
  MessageCircle, ArrowRight, Target, Wand2, Zap, Microscope, 
  Layers, Presentation, Sparkles, ChevronRight, UserCheck, Users,
  Flame, Medal
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

function SpatialSection({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 50, damping: 25, mass: 0.5 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]), springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, rotateX, perspective: 1200 }}
      className={cn("relative z-10 antialiased", className)}
    >
      {children}
    </motion.div>
  );
}

const SpecItemMini = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black rounded-none shadow-sm">
    <Icon className="size-3 text-black/60" />
    <div className="flex gap-2">
      <span className="text-[8px] font-black uppercase text-black/60 font-code">{label}:</span>
      <span className="text-[9px] font-bold text-black uppercase font-headline">{value}</span>
    </div>
  </div>
);

const StudioBanner = () => (
  <motion.a
    href="https://studio--studio-771194584-c2484.us-central1.hosted.app/"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    className="group relative w-full mb-6 overflow-hidden rounded-none border-2 border-black bg-white flex flex-col p-4 md:px-10 md:py-4 shadow-[12px_12px_0px_0px_#F8C300] transition-all duration-300 cursor-pointer"
  >
    <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 flex items-center gap-2 z-20 border-b border-r border-black">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
        <span className="text-[8px] font-black uppercase tracking-[0.3em] font-code">MEGA DATABASE ONLINE</span>
    </div>

    <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-10">
        <div className="flex-1 text-left space-y-2">
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-black text-black font-headline uppercase tracking-tighter leading-none group-hover:animate-glitch break-words">
                SINTAXIS / NC
            </h2>
            <div className="flex items-start gap-3">
                <div className="w-1.5 bg-accent min-h-[30px] flex-shrink-0" />
                <p className="font-code text-[10px] md:text-xs text-neutral-600 max-w-md leading-relaxed uppercase">
                    Atlas de Mediación IA: Una app que conecta conceptos, herramientas e IA para procesos creativos y sociales.
                </p>
            </div>
            <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-2 group/btn">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] font-code text-black">EXPLORAR UNIVERSO</span>
                    <div className="w-8 h-8 rounded-none bg-accent text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-all border border-black">
                        <ArrowRight className="size-4" />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-20 md:w-[175px] flex-shrink-0 self-end md:self-auto opacity-80 group-hover:opacity-100 transition-opacity">
            <BrainCircuit className="w-full h-auto text-black" strokeWidth={0.8} />
        </div>
    </div>
  </motion.a>
);

const EditorialBanner = () => (
  <motion.a
    href="https://studio--studio-4229710558-f71da.us-central1.hosted.app/"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    className="group relative w-full mb-6 overflow-hidden rounded-none border-2 border-black bg-white flex flex-col p-4 md:px-10 md:py-4 shadow-[12px_12px_0px_0px_#F8C300] transition-all duration-300 cursor-pointer"
  >
    <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 flex items-center gap-2 z-20 border-b border-r border-black">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
        <span className="text-[8px] font-black uppercase tracking-[0.3em] font-code">EDITORIAL SYSTEM ONLINE</span>
    </div>

    <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-10">
        <div className="flex-1 text-left space-y-2">
            <div className="space-y-0">
                <h2 className="text-3xl sm:text-6xl md:text-8xl font-black text-black font-headline uppercase tracking-tighter leading-[0.85] group-hover:animate-glitch break-words">
                    NÚCLEO
                </h2>
                <h2 className="text-3xl sm:text-6xl md:text-8xl font-black text-black font-headline uppercase tracking-tighter leading-[0.85] group-hover:animate-glitch break-words">
                    EDITORIAL
                </h2>
            </div>
            <div className="flex items-start gap-3">
                <div className="w-1.5 bg-primary min-h-[30px] flex-shrink-0" />
                <div>
                    <p className="font-code text-xs font-black text-primary tracking-[0.4em] uppercase mb-1">EDITORIAL / NC</p>
                    <p className="font-code text-[10px] md:text-xs text-neutral-600 max-w-lg leading-relaxed uppercase">
                        Plataforma de experimentación editorial y publicaciones híbridas para la memoria cultural.
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-2 group/btn">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] font-code text-primary">VISITAR EDITORIAL</span>
                    <div className="w-8 h-8 rounded-none bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-all border border-black">
                        <ArrowRight className="size-4" />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-24 md:w-[180px] flex-shrink-0 self-end md:self-auto opacity-90 group-hover:opacity-100 transition-opacity">
            <NextImage src="https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/LOGO%20EDITORIAL.png" alt="Editorial Logo" width={180} height={180} className="w-full h-auto" />
        </div>
    </div>
  </motion.a>
);

const ReactorBanner = () => (
  <motion.a
    href="https://studio--studio-6395697884-85cdf.us-central1.hosted.app/"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2 }}
    className="group relative w-full mb-6 overflow-hidden rounded-none border-2 border-accent/20 bg-black flex flex-col p-4 md:px-10 md:py-4 shadow-[12px_12px_0px_0px_rgba(248,195,0,0.15)] transition-all duration-300 cursor-pointer"
  >
    <div className="absolute top-0 left-0 bg-accent text-black px-3 py-1 flex items-center gap-2 z-20 border-b border-r border-accent">
        <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></div>
        <span className="text-[8px] font-black uppercase tracking-[0.3em] font-code">REACTOR SYSTEM ONLINE</span>
    </div>

    <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-10">
        <div className="flex-1 text-left space-y-2">
            <h2 className="text-3xl sm:text-6xl md:text-8xl font-black text-white font-headline uppercase tracking-tighter leading-[0.85] mb-2 group-hover:animate-glitch break-words">
                <span className="block transition-colors">NÚCLEO</span>
                <span className="block text-accent transition-colors">REACTOR</span>
            </h2>
            <div className="flex items-start gap-3">
                <div className="w-1.5 bg-accent min-h-[30px] flex-shrink-0" />
                <div>
                    <p className="font-code text-xs font-black text-accent tracking-[0.4em] uppercase mb-1">
                        [ SISTEMA_DE_ACTIVACIÓN_CREATIVA_CON_IA ]
                    </p>
                    <p className="font-code text-[10px] md:text-xs text-neutral-400 max-w-xl leading-relaxed uppercase">
                        "NÚCLEO REACTOR" Laboratorio digital de creación y pensamiento que utiliza la IA como un colaborador creativo. Un workspace para experimentar, prototipar y publicar proyectos que exploran las nuevas fronteras del arte, la cultura y la tecnología.
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-2 group/btn">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] font-code text-white">VISITAR REACTOR</span>
                    <div className="w-8 h-8 rounded-none bg-accent text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-all border border-black">
                        <ArrowRight className="size-4" />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-20 md:w-[180px] flex-shrink-0 self-end md:self-auto text-accent opacity-70 group-hover:opacity-100 transition-opacity">
            <Flame className="w-full h-auto" strokeWidth={0.8} />
        </div>
    </div>
  </motion.a>
);

const LabBanner = ({ t }: { t: any }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group relative w-full mb-8 overflow-hidden rounded-none border-2 border-black bg-accent flex flex-col md:flex-row items-center p-6 md:px-10 md:py-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
    >
      <div className="absolute top-0 left-0 bg-black text-white px-3 py-1 flex items-center gap-2 z-20 border-b border-r border-black">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
          <span className="text-[8px] font-black uppercase tracking-[0.3em] font-code">LABORATORY SYSTEM ONLINE</span>
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center gap-8 pt-10">
          <div className="flex-1 text-left space-y-3">
              <div>
                  <h2 className="text-3xl sm:text-6xl md:text-8xl font-black text-black font-headline uppercase tracking-tighter leading-none group-hover:animate-glitch break-words">
                      IA / CREATIVA
                  </h2>
                  <p className="text-black/60 font-code text-[10px] md:text-xs font-black tracking-[0.4em] uppercase mt-1">
                      INVESTIGACIÓN-CREACIÓN
                  </p>
              </div>
              
              <div className="flex items-start gap-3">
                  <div className="w-1.5 bg-black h-8 flex-shrink-0" />
                  <p className="font-code text-[10px] md:text-xs text-black/80 max-w-2xl leading-relaxed uppercase">
                      Un laboratorio de inmersión técnica que integra la IA como extensión cognitiva para la creación contemporánea.
                  </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                  <SpecItemMini icon={Clock} label="Horas" value="16 h" />
                  <SpecItemMini icon={GitBranch} label="Tipo" value="Híbrida" />
                  <SpecItemMini icon={Microscope} label="Carácter" value="I-C" />
              </div>
          </div>
          
          <div className="flex items-center pt-4 md:pt-0">
              <a href="https://wa.me/573006101221" target="_blank" rel="noopener noreferrer" className="block w-full max-w-[180px] md:max-w-[280px] group/cta">
                  <svg version="1.1" viewBox="0 0 245.3 213" className="w-full h-auto drop-shadow-lg transition-transform duration-300 group-hover/cta:scale-110">
                    <style type="text/css">{`.st0{fill:#000000;}`}</style>
                    <g>
                      <path className="st0" d="M33.9,26.2c-0.9-0.6-2-1.1-3.1-1.4c-1.1-0.4-2.2-0.7-3.3-0.9c-1.1-0.2-2.1-0.5-3.1-0.7c-0.9-0.2-1.7-0.5-2.3-0.9 c-0.6-0.4-0.9-0.9-0.9-1.5c0-0.4,0.1-0.8,0.4-1.2c0.3-0.4,0.8-0.7,1.4-0.9c0.7-0.2,1.5-0.4,2.6-0.4c1.2,0,2.5,0.2,3.8,0.5 c1.3,0.3,2.6,0.9,3.9,1.6l2.4-5.8c-1.3-0.8-2.9-1.4-4.7-1.8c-1.8-0.4-3.5-0.6-5.4-0.6c-2.7,0-5,0.4-6.8,1.2 c-1.8,0.8-3.2,1.9-4.1,3.2c-0.9,1.3-1.3,2.8-1.3,4.5c0,1.5,0.3,2.7,0.9,3.7c0.6,1,1.3,1.8,2.2,2.4c0.9,0.6,2,1.1,3.1,1.5 c1.1,0.4,2.3,0.7,3.3,0.9c1.1,0.2,2.1,0.5,3.1,0.7c0.9,0.3,1.7,0.6,2.3,0.9c0.6,0.4,0.9,0.8,0.9,1.4c0,0.5-0.2,0.9-0.5,1.2 c-0.3,0.3-0.8,0.6-1.4,0.8C26.7,35,25.8,35,24.7,35c-1.6,0-3.2-0.3-4.9-0.8c-1.6-0.5-3.1-1.2-4.3-2L13,38.1c1.3,0.9,3,1.6,5.1,2.2 c2.1,0.6,4.3,0.9,6.6,0.9c2.7,0,5-0.4,6.9-1.2c1.8-0.8,3.2-1.9,4.1-3.3c0.9-1.4,1.4-2.8,1.4-4.5c0-1.5-0.3-2.7-0.9-3.6 C35.6,27.6,34.8,26.8,33.9,26.2z"/>
                      <path className="st0" d="M65.6,16.4c-1.4-1.3-3-2.3-4.9-3c-1.9-0.7-3.9-1.1-6.1-1.1s-4.3,0.4-6.1,1.1c-1.9,0.7-3.5,1.7-4.9,3 c-1.4,1.3-2.5,2.8-3.2,4.6c-0.8,1.7-1.2,3.6-1.2,5.7c0,2.1,0.4,4,1.2,5.8c0.8,1.8,1.9,3.3,3.2,4.6c1.4,1.3,3,2.3,4.9,3 c1.9,0.7,3.9,1.1,6.1,1.1c2.2,0,4.3-0.4,6.1-1.1c1.9-0.7,3.5-1.7,4.9-3c1.4-1.3,2.5-2.8,3.2-4.6c0.8-1.8,1.1-3.7,1.1-5.8 c0-2.1-0.4-4-1.2-5.7C68,19.2,67,17.7,65.6,16.4z M61.5,30c-0.4,1-0.9,1.8-1.6,2.5c-0.7,0.7-1.5,1.2-2.4,1.6 c-0.9,0.4-1.9,0.6-3,0.6c-1.1,0-2-0.2-3,0.6c-0.9-0.4-1.7-0.9-2.4-1.6C48.5,31.8,48,31,47.6,30c-0.4-1-0.6-2.1-0.6-3.3 c0-1.2,0.2-2.3,0.6-3.3c0.4-1,0.9-1.8,1.6-2.5c0.7-0.7,1.5-1.2,2.4-1.6c0.9-0.4,1.9-0.6,3-0.6c1.1,0,2,0.2,3,0.6 c0.9,0.4,1.7,0.9,2.4,1.6c0.7,0.7,1.2,1.5,1.6,2.5c0.4,1,0.6,2.1,0.6,3.3C62.1,27.9,61.9,29,61.5,30z"/>
                      <polygon className="st0" points="82,12.9 74.1,12.9 74.1,40.6 95.2,40.6 95.2,34.4 82,34.4"/>
                      <rect x="98.3" y="12.9" className="st0" width="7.8" height="27.7"/>
                      <path className="st0" d="M120.4,21c0.7-0.7,1.5-1.2,2.4-1.6c1-0.4,2-0.6,3.1-0.6c1.3,0,2.5,0.3,3.6,0.8c1.1,0.6,2.1,1.4,3,2.4l5-4.5 c-1.3-1.7-3-3-5.1-3.9c-2-0.9-4.3-1.3-6.9-1.3c-2.2,0-4.2,0.4-6.1,1c-1.8,0.7-3.5,1.7-4.8,3c-1.4,1.3-2.4,2.8-3.2,4.6 c-0.8,1.8-1.1,3.7-1.1,5.8c0,2.1,0.4,4.1,1.1,5.8c0.8,1.8,1.8,3.3,3.2,4.6c1.4,1.3,3,2.3,4.8,3c1.8,0.7,3.9,1,6.1,1 c2.6,0,4.9-0.4,6.9-1.3c2-0.9,3.7-2.2,5.1-3.9l-5-4.5c-0.9,1.1-1.9,1.9-3,2.5c-1.1,0.6-2.3,0.8-3.6,0.8c-1.1,0-2.2-0.2-3.1-0.6 c-1-0.4-1.8-0.9-2.4-1.6c-0.7-0.7-1.2-1.5-1.6-2.5c-0.4-1-0.6-2.1-0.6-3.2c0-1.2,0.2-2.3,0.6-3.2C119.2,22.5,119.7,21.7,120.4,21z"/>
                      <rect x="140.7" y="12.9" className="st0" width="7.8" height="27.7"/>
                      <polygon className="st0" points="176.3,12.9 151.5,12.9 151.5,19.1 160,19.1 160,40.6 167.8,40.6 167.8,19.1 176.3,19.1"/>
                      <path className="st0" d="M186.8,12.9l-12.2,27.7h8l2.2-5.4h11.7l2.2,5.4h8.2l-12.3-27.7H186.8z M187,29.4l3.6-8.9l3.6,8.9H187z"/>
                      <path className="st0" d="M226.1,40.6h8.4l-6-8.7c1.7-0.8,3-1.9,4-3.3c1-1.5,1.5-3.3,1.5-5.5c0-3.2-1.1-5.7-3.2-7.5c-2.2-1.8-5.3-2.7-9.4-2.7H209 v27.7h7.8v-7.4h4.2L226.1,40.6z M224.8,20.1c0.8,0.7,1.2,1.7,1.2,3c0,1.3-0.4,2.3-1.2,3c-0.8,0.7-2,1.1-3.7,1.1h-4.3V19h4.3 C222.8,19,224,19.4,224.8,20.1z"/>
                      <path className="st0" d="M31.7,51.9c-1.6-0.7-3.6-1.1-5.8-1.1H14.7v24.4h6.9v-6.4h4.2c2.2,0,4.2-0.4,5.8-1.1c1.6-0.7,2.9-1.8,3.7-3.1 c0.9-1.3,1.3-2.9,1.3-4.8c0-1.8-0.4-3.4-1.3-4.8C34.5,53.7,33.3,52.6,31.7,51.9z M28.7,62.5c-0.7,0.6-1.8,0.9-3.2,0.9h-3.8v-7.1 h3.8c1.4,0,2.5,0.3,3.2,1c0.7,0.6,1.1,1.5,1.1,2.6C29.8,61,29.4,61.8,28.7,62.5z"/>
                      <path className="st0" d="M60.7,64.6c0.9-1.3,1.3-2.9,1.3-4.8c0-2.8-1-5-2.9-6.6c-1.9-1.6-4.6-2.4-8.2-2.4H40.1v24.4H47v-6.5h3.7l4.4,6.5h7.4 l-5.3-7.7C58.8,66.8,59.9,65.9,60.7,64.6z M54,57.2c0.7,0.6,1.1,1.5,1.1,2.6c0,1.1-0.4,2-1.1,2.6c-0.7,0.6-1.8,0.9-3.2,0.9H47 v-7.1h3.8C52.2,56.3,53.3,56.6,54,57.2z"/>
                      <path className="st0" d="M87.9,53.9c-1.2-1.1-2.6-2-4.3-2.6c-1.7-0.6-3.5-0.9-5.4-0.9s-3.8,0.3-5.4,0.9c-1.7,0.6-3.1,1.5-4.3,2.7 c-1.2,1.2-2.2,2.5-2.8,4c-0.7,1.5-1,3.2-1,5c0,1.8,0.3,3.5,1,5.1c0.7,1.5,1.6,2.9,2.8,4c1.2,1.2,2.6,2,4.3,2.7 c1.7,0.6,3.5,0.9,5.4,0.9c2,0,3.8-0.3,5.4-0.9c1.6-0.6,3.1-1.5,4.3-2.6c1.2-1.1,2.2-2.5,2.8-4c0.7-1.5,1-3.2,1-5.1 c0-1.8-0.3-3.5-1-5.1C90,56.4,89.1,55.1,87.9,53.9z M84.2,65.9c-0.3,0.8-0.8,1.6-1.4,2.2c-0.6,0.6-1.3,1.1-2.1,1.4 S79.1,70,78.2,70c-0.9,0-1.8-0.2-2.6-0.5c-0.8-0.3-1.5-0.8-2.1-1.4c-0.6-0.6-1.1-1.3-1.4-2.2c-0.3-0.8-0.5-1.8-0.5-2.9 c0-1.1,0.2-2,0.5-2.9c0.3-0.8,0.8-1.6,1.4-2.2c0.6-0.6,1.3-1.1,2.1-1.4c0.8-0.3,1.7-0.5,2.6-0.5c0.9,0,1.8,0.2,2.6,0.5 s1.5,0.8,2.1,1.4c0.6,0.6,1.1,1.3,1.4,2.2c0.3,0.8,0.5,1.8,0.5,2.9C84.7,64.1,84.6,65.1,84.2,65.9z"/>
                      <path className="st0" d="M103,58c0.6-0.6,1.3-1.1,2.2-1.4c0.9-0.3,1.8-0.5,2.9-0.5c1.2,0,2.3,0.2,3.2,0.7c1,0.4,1.9,1.1,2.7,2.1l4.4-4 c-1.2-1.4-2.7-2.5-4.5-3.3s-3.9-1.2-6.1-1.2c-2,0-3.8,0.3-5.5,0.9c-1.7,0.6-3.1,1.5-4.3,2.6c-1.2,1.1-2.2,2.5-2.8,4 c-0.7,1.6-1,3.3-1,5.1s0.3,3.6,1,5.1c0.7,1.6,1.6,2.9,2.8,4c1.2,1.1,2.6,2,4.3,2.6c1.6,0.6,3.4,0.9,5.4,0.9c1.8,0,3.6-0.3,5.4-0.8 c1.8-0.5,3.4-1.3,4.9-2.3V62.5h-6.1v6.7c-0.2,0.1-0.5,0.2-0.7,0.3c-1,0.3-2,0.5-3,0.5c-1,0-2-0.2-2.8-0.5 c-0.8-0.3-1.6-0.8-2.2-1.4c-0.6-0.6-1.1-1.4-1.4-2.2c-0.3-0.9-0.5-1.8-0.5-2.8c0-1,0.2-2,0.5-2.9C101.9,59.3,102.4,58.6,103,58z"/>
                      <path className="st0" d="M142.9,64.6c0.9-1.3,1.3-2.9,1.3-4.8c0-2.8-1-5-2.9-6.6c-1.9-1.6-4.6-2.4-8.2-2.4h-10.9v24.4h6.9v-6.5h3.7l4.4,6.5h7.4 l-5.3-7.7C140.9,66.8,142.1,65.9,142.9,64.6z M136.2,57.2c0.7,0.6,1.1,1.5,1.1,2.6c0,1.1-0.4,2-1.1,2.6c-0.7,0.6-1.8,0.9-3.2,0.9 h-3.8v-7.1h3.8C134.4,56.3,135.4,56.6,136.2,57.2z"/>
                      <path className="st0" d="M155.8,50.8l-10.8,24.4h7l1.9-4.8h10.3l1.9,4.8h7.2l-10.8-24.4H155.8z M156,65.4l3.1-7.8l3.1,7.8H156z"/>
                      <polygon className="st0" points="198,50.8 189.6,64.9 181.1,50.8 175.4,50.8 175.4,75.2 181.7,75.2 181.7,62.6 188,72.8 191,72.8 197.3,62.3 197.4,75.2 203.7,75.2 203.7,50.8"/>
                      <path className="st0" d="M226.9,75.2h7.2l-10.8-24.4h-6.8l-10.8,24.4h7l1.9-4.8H225L226.9,75.2z M216.7,65.4l3.1-7.8l3.1,7.8H216.7z"/>
                      <path className="st0" d="M23,93.1c0.6-0.7,1.4-1.2,2.3-1.5c0.9-0.3,1.9-0.5,3-0.5c1.2,0,2.3,0.3,3.4,0.8c1,0.5,2,1.3,2.8,2.3l4.7-4.3 c-1.3-1.6-2.9-2.8-4.8-3.7c-1.9-0.8-4.1-1.3-6.5-1.3c-2.1,0-4,0.3-5.7,1c-1.7,0.7-3.3,1.6-4.6,2.8c-1.3,1.2-2.3,2.7-3,4.3 c-0.7,1.7-1.1,3.5-1.1,5.5s0.4,3.8,1.1,5.5c0.7,1.7,1.7,3.1,3,4.3c1.3,1.2,2.8,2.1,4.6,2.8c1.7,0.7,3.7,1,5.7,1 c2.4,0,4.6-0.4,6.5-1.3c1.9-0.8,3.5-2.1,4.8-3.7l-4.7-4.3c-0.8,1-1.8,1.8-2.8,2.3c-1,0.5-2.1,0.8-3.4,0.8c-1.1,0-2.1-0.2-3-0.5 c-0.9-0.3-1.7-0.9-2.3-1.5c-0.6-0.7-1.1-1.5-1.5-2.4c-0.4-0.9-0.5-1.9-0.5-3.1c0-1.1,0.2-2.1,0.5-3.1C21.8,94.5,22.3,93.7,23,93.1 z"/>
                      <path className="st0" d="M64.4,88.8c-1.3-1.2-2.8-2.2-4.6-2.8c-1.8-0.7-3.7-1-5.8-1s-4,0.3-5.8,1c-1.8,0.7-3.3,1.6-4.6,2.9c-1.3,1.2-2.3,2.7-3,4.3 c-0.7,1.6-1.1,3.4-1.1,5.4c0,2,0.4,3.8,1.1,5.4c0.7,1.7,1.8,3.1,3,4.3c1.3,1.2,2.8,2.2,4.6,2.9c1.8,0.7,3.7,1,5.8,1 c2.1,0,4-0.3,5.8-1c1.8-0.7,3.3-1.6,4.6-2.8c1.3-1.2,2.3-2.7,3-4.3c0.7-1.7,1.1-3.5,1.1-5.5c0-2-0.4-3.8-1.1-5.4 C66.7,91.4,65.7,90,64.4,88.8z M60.5,101.6c-0.4,0.9-0.9,1.7-1.5,2.4c-0.6,0.7-1.4,1.2-2.2,1.5c-0.9,0.4-1.8,0.5-2.8,0.5 c-1,0-1.9-0.2-2.8-0.5c-0.9-0.3-1.6-0.9-2.3-1.5c-0.6-0.7-1.1-1.4-1.5-2.4c-0.3-0.9-0.5-1.9-0.5-3.1c0-1.1,0.2-2.2,0.5-3.1 c0.3-0.9,0.8-1.7,1.5-2.4c0.6-0.7,1.4-1.2,2.3-1.5C52.1,91.2,53,91,54,91c1,0,1.9,0.2,2.8,0.5c0.9,0.3,1.6,0.9,2.2,1.5 c0.6,0.7,1.1,1.4,1.5,2.4c0.4,0.9,0.5,1.9,0.5,3.1C61.1,99.7,60.9,100.7,60.5,101.6z"/>
                      <polygon className="st0" points="96.8,85.4 87.8,100.6 78.6,85.4 72.5,85.4 72.5,111.6 79.3,111.6 79.3,98.1 86,109 89.3,109 96,97.7 96.1,111.6 102.9,111.6 102.9,85.4"/>
                      <path className="st0" d="M126.4,86.6c-1.7-0.8-3.8-1.2-6.2-1.2h-11.9v26.2h7.4v-6.8h4.5c2.4,0,4.5-0.4,6.2-1.2c1.7-0.8,3.1-1.9,4-3.3 c0.9-1.4,1.4-3.2,1.4-5.2c0-2-0.5-3.7-1.4-5.1C129.4,88.5,128.1,87.4,126.4,86.6z M123.2,97.9c-0.8,0.7-1.9,1-3.5,1h-4.1v-7.6h4.1 c1.5,0,2.7,0.3,3.5,1c0.8,0.7,1.2,1.6,1.2,2.8C124.3,96.3,124,97.2,123.2,97.9z"/>
                      <polygon className="st0" points="142.8,85.4 135.4,85.4 135.4,111.6 155.3,111.6 155.3,105.7 142.8,105.7"/>
                      <polygon className="st0" points="165.6,101.1 177.2,101.1 177.2,95.6 165.6,95.6 165.6,91.2 178.8,91.2 178.8,85.4 158.3,85.4 158.3,111.6 179.3,111.6 179.3,105.9 165.6,105.9"/>
                      <polygon className="st0" points="180.9,91.3 189,91.3 189,111.6 196.4,111.6 196.4,91.3 204.4,91.3 204.4,85.4 180.9,85.4"/>
                      <path className="st0" d="M233.4,93.1c-0.7-1.6-1.8-3.1-3-4.3c-1.3-1.2-2.8-2.2-4.6-2.8c-1.8-0.7-3.7-1-5.8-1c-2.1,0-4,0.3-5.8,1 c-1.8,0.7-3.3,1.6-4.6,2.9c-1.3,1.2-2.3,2.7-3,4.3c-0.7,1.6-1.1,3.4-1.1,5.4c0,2,0.4,3.8,1.1,5.4c0.7,1.7,1.8,3.1,3,4.3 c1.3,1.2,2.8,2.2,4.6,2.9c1.8,0.7,3.7,1,5.8,1c2.1,0,4-0.3,5.8-1c1.8-0.7,3.3-1.6,4.6-2.8c1.3-1.2,2.3-2.7,3-4.3 c0.7-1.7,1.1-3.5,1.1-5.5C234.5,96.5,234.1,94.7,233.4,93.1z M226.5,101.6c-0.4,0.9-0.9,1.7-1.5,2.4c-0.6,0.7-1.4,1.2-2.2,1.5 c-0.9,0.4-1.8,0.5-2.8,0.5c-1,0-1.9-0.2-2.8-0.5c-0.9-0.3-1.6-0.9-2.3-1.5c-0.6-0.7-1.1-1.4-1.5-2.4c-0.3-0.9-0.5-1.9-0.5-3.1 c0-1.1,0.2-2.2,0.5-3.1c0.3-0.9,0.8-1.7,1.5-2.4c0.6-0.7,1.4-1.2,2.3-1.5C218,91.2,219,91,220,91c1,0,1.9,0.2,2.8,0.5 c0.9,0.3,1.6,0.9,2.2,1.5c0.6,0.7,1.1,1.4,1.5,2.4c0.4,0.9,0.5,1.9,0.5,3.1C227,99.7,226.9,100.7,226.5,101.6z"/>
                    </g>
                    <g>
                      <circle cx="119" cy="168.6" r="28.3" className="st0"/>
                      <polygon points="111.2,151 137.8,169 111.2,187.1" fill="#F8C300"/>
                      <polygon points="105.9,156.2 124.8,169 105.9,181.9" fill="#000000"/>
                    </g>
                  </svg>
              </a>
          </div>
      </div>
    </motion.div>
  );
};

export function WorkshopsView() {
  const { t } = useTranslation();
  const detailsKey = 'workshops_details.ia';

  return (
    <div className="px-4 md:px-12 pt-32 md:pt-40 pb-32 max-w-[1600px] mx-auto animate-fade-in perspective-1200">
        
        <SpatialSection className="mb-10 md:mb-12">
          <div className="flex items-baseline gap-3 mb-2">
            <div className="w-8 md:w-10 h-1 bg-black" />
            <span className="font-code text-[9px] md:text-xs font-black uppercase tracking-[0.4em] text-neutral-400">Proposals_v2.0</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-foreground tracking-tighter font-headline uppercase leading-[0.85] break-words">
            Laboratorios
          </h1>
          <p className="text-base md:text-xl text-muted-foreground font-light max-w-2xl mt-4 md:mt-6">
            Propuestas de formación avanzada y experimentación técnica para la creación contemporánea.
          </p>
        </SpatialSection>

        <SpatialSection>
          <StudioBanner />
        </SpatialSection>

        <SpatialSection>
          <EditorialBanner />
        </SpatialSection>

        <SpatialSection>
          <ReactorBanner />
        </SpatialSection>

        {/* Unified IA / CREATIVA Block */}
        <div className="bg-muted/5 rounded-none p-4 md:p-8 border border-border/50 border-dashed">
          <SpatialSection>
            <LabBanner t={t} />
          </SpatialSection>

          {/* Objectives Section */}
          <SpatialSection className="mb-20 md:mb-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
                  <div className="lg:col-span-4 flex h-full">
                      <div className="p-6 md:p-8 bg-primary text-white rounded-none shadow-xl relative overflow-hidden group flex flex-col justify-center w-full">
                        <div className="absolute -top-12 -right-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[2s]">
                          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-white/40 flex items-center justify-center">
                            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border border-white/40 flex items-center justify-center">
                              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/40 flex items-center justify-center">
                                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/40"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative z-10">
                          <h4 className="font-code text-[8px] tracking-[0.4em] mb-4 text-white/50 uppercase">
                            {t(`${detailsKey}.section_3_obj_general_title`)}
                          </h4>
                          <p className="text-lg md:text-2xl font-bold font-headline leading-tight italic tracking-tight">
                            "{t(`${detailsKey}.section_3_obj_general_text`)}"
                          </p>
                        </div>
                      </div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col justify-center pt-8 lg:pt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8">
                          {(t(`${detailsKey}.section_3_obj_specific_list`) as string[]).slice(0, 4).map((obj, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                              <div className="text-6xl md:text-8xl font-black text-primary/5 group-hover:text-primary/10 transition-all duration-500 font-headline flex-shrink-0 leading-none select-none">
                                {String(i+1).padStart(2, '0')}
                              </div>
                              <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed pt-2 group-hover:text-foreground transition-colors uppercase font-bold">
                                {obj}
                              </p>
                            </div>
                          ))}
                      </div>
                  </div>
              </div>
          </SpatialSection>

          <SpatialSection className="mb-20 md:mb-32 px-2 md:px-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-10 md:mb-12 border-b-2 border-black pb-6 md:pb-8">
                <div className="overflow-hidden">
                  <span className="text-primary font-code font-black text-[9px] md:text-xs uppercase tracking-[0.4em] mb-2 block">Process_Mapping</span>
                  <h2 className="text-3xl md:text-6xl font-black font-headline uppercase tracking-tighter leading-none break-words">
                    {t(`${detailsKey}.section_7_title`)}
                  </h2>
                </div>
                <div className="flex items-center gap-2 md:gap-3 bg-black text-white px-3 md:px-4 py-1.5 md:py-2 rounded-none border border-black font-code text-[8px] md:text-10px font-black uppercase tracking-widest whitespace-nowrap">
                  <Zap className="text-accent size-3 md:size-4 animate-pulse" />
                  <span>4 Etapas de Producción</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {[1, 2, 3, 4].map(i => (
                      <SessionCard
                          key={i}
                          number={`0${i}`}
                          title={t(`${detailsKey}.section_7_session_${i}_title`)}
                          contents={t(`${detailsKey}.section_7_session_${i}_contents_list`)}
                          results={t(`${detailsKey}.section_7_session_${i}_results_list`)}
                      />
                  ))}
              </div>
          </SpatialSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start px-2 md:px-4">
              <div className="lg:col-span-7">
                  <SpatialSection>
                      <h3 className="text-2xl md:text-4xl font-black font-headline mb-6 md:mb-10 flex items-center gap-3 uppercase tracking-tighter break-words">
                        <Layers className="text-primary size-6 md:size-8 flex-shrink-0" /> {t(`${detailsKey}.section_6_title`)}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        {[
                          { icon: Zap, title: "Activación", desc: "Introducción conceptual y mapeo de bloqueos creativos para iniciar el flujo." },
                          { icon: Presentation, title: "Demos Técnicas", desc: "Demostraciones en vivo del uso de herramientas IA en imagen y sonido." },
                          { icon: UserCheck, title: "Práctica Guiada", desc: "Ejercicios intensivos de producción aplicada en tiempo real." },
                          { icon: Users, title: "Socialización", desc: "Cierre colectivo con retroalimentación experta sobre prototipos." }
                        ].map((step, idx) => (
                          <div key={idx} className="relative pl-6 md:pl-8 border-l-[2px] border-primary/20 hover:border-primary transition-all group">
                            <div className="absolute top-0 left-[-10px] md:left-[-12px] w-4 h-4 md:w-5 md:h-5 rounded-none bg-white border-2 border-primary flex items-center justify-center group-hover:bg-primary transition-all">
                              <step.icon className="text-primary" size={20} />
                            </div>
                            <h4 className="font-black text-base md:text-lg text-foreground mb-1 md:mb-2 uppercase tracking-tight font-headline">{step.title}</h4>
                            <p className="text-xs md:sm text-muted-foreground leading-relaxed">{step.desc}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-10 md:mt-16 p-6 md:p-10 bg-white rounded-none border-2 border-dashed border-black">
                        <h4 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 md:mb-6 font-code">ESPECIFICACIONES TÉCNICAS</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                          {(t(`${detailsKey}.section_11_list`) as string[]).map((item, i) => (
                            <li key={i} className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-foreground/70 uppercase font-headline">
                              <div className="w-1.5 h-1.5 bg-accent rounded-none shadow-[0_0_6px_rgba(248,195,0,0.5)] flex-shrink-0" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                  </SpatialSection>
              </div>

              <div className="lg:col-span-5 space-y-6">
                  <SpatialSection>
                      <div className="bg-black text-white p-6 md:p-10 rounded-none shadow-xl relative overflow-hidden group border-2 border-black">
                          <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500 rotate-12 pointer-events-none">
                            <Medal size={120} />
                          </div>
                          <h4 className="text-xl md:text-2xl font-black font-headline mb-6 md:mb-8 flex items-center gap-3 uppercase tracking-tighter">
                            <Award className="text-accent size-5 md:size-6 flex-shrink-0"/> {t(`${detailsKey}.section_10_title`)}
                          </h4>
                          <ul className="space-y-4 md:space-y-6">
                            {(t(`${detailsKey}.section_10_list`) as string[]).map((item, index) => (
                              <li key={index} className="text-xs md:text-sm leading-relaxed border-l-2 border-accent/40 pl-4 md:pl-5 hover:border-accent transition-colors">
                                <p dangerouslySetInnerHTML={{ __html: item }} className="text-neutral-300 font-light" />
                              </li>
                            ))}
                          </ul>
                      </div>
                  </SpatialSection>

                  <SpatialSection>
                      <div className="bg-white border-2 border-black p-6 md:p-10 rounded-none shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center">
                          <div className="w-10 h-10 md:w-14 md:h-14 bg-primary/10 rounded-none flex items-center justify-center mx-auto mb-4 md:mb-6 text-primary border border-primary/20">
                              <Wand2 size={40} />
                          </div>
                          <h3 className="text-xl md:text-2xl font-black font-headline mb-3 text-black uppercase tracking-tighter">¿Propuesta personalizada?</h3>
                          <p className="text-neutral-600 mb-6 md:mb-8 text-sm md:text-base font-light leading-relaxed">Adaptamos este programa para instituciones educativas, museos y departamentos creativos.</p>
                          <a href="https://wa.me/573006101221" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-primary text-white px-6 md:px-8 py-3.5 md:py-4 font-black uppercase tracking-widest rounded-none hover:bg-black hover:shadow-xl transition-all w-full shadow-md shadow-primary/10 transform hover:-translate-y-0.5 text-xs md:text-sm">
                              <MessageCircle className="size-5"/> {t(`${detailsKey}.contact_cta`)}
                          </a>
                      </div>
                  </SpatialSection>
              </div>
          </div>
        </div>
    </div>
  );
}

function SessionCard({ number, title, contents, results }: { number: string, title: string, contents: string[], results: string[] }) {
    return (
        <div className="group relative bg-muted/5 p-5 rounded-none border border-border hover:border-primary/40 hover:bg-white transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-lg">
            <div className="absolute -top-2 -right-2 p-2 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
              <span className="text-6xl font-black font-headline leading-none text-primary">{number}</span>
            </div>
            <div className="relative z-10 h-full flex flex-col">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-4 h-[2px] bg-primary"></span>
                        <span className="text-primary font-code text-[9px] font-black tracking-[0.3em] uppercase">ETAPA {number}</span>
                    </div>
                    <h4 className="text-xl font-black font-headline text-foreground leading-tight uppercase tracking-tighter break-words">{title}</h4>
                </div>
                <div className="space-y-4 flex-grow">
                    <div>
                        <h5 className="font-black text-foreground/40 mb-3 text-[8px] uppercase tracking-[0.2em] font-code flex items-center gap-2">
                            <Layers size={12} /> NÚCLEOS TEMÁTICOS
                        </h5>
                        <ul className="space-y-2">
                            {Array.isArray(contents) && contents.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                <ChevronRight className="text-accent mt-0.5 size-3 flex-shrink-0" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                        </ul>
                    </div>
                     <div className="pt-4 border-t border-border">
                        <h5 className="font-black text-foreground/40 mb-3 text-[8px] uppercase tracking-[0.2em] font-code flex items-center gap-2">
                            <Sparkles size={12} /> OUTPUT
                        </h5>
                        <ul className="space-y-2">
                            {Array.isArray(results) && results.map((item, index) => (
                              <li key={index} className="flex items-start gap-2 text-xs text-primary font-bold italic">
                                <div className="w-4 h-4 rounded-none bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <CheckCircle className="size-2.5"/>
                                </div>
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
