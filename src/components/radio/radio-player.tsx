"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Bot, Volume2 } from 'lucide-react';
import { WELCOME_DJ_URL, DJ_MESSAGES, DJ_INTERVAL_MINUTES, STATIONS_DATA } from '@/lib/data';
import { cn } from '@/lib/utils';

type Station = typeof STATIONS_DATA[0]['stations'][0];

interface RadioPlayerProps {
  currentStation: Station | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  onAnalyserReady: (analyser: AnalyserNode) => void;
  volume: number;
  isMuted: boolean;
}

export function RadioPlayer({ currentStation, isPlaying, onTogglePlay, isExpanded, setIsExpanded, onAnalyserReady, volume, isMuted }: RadioPlayerProps) {
  const streamRef = useRef<HTMLAudioElement | null>(null);
  const djRef = useRef<HTMLAudioElement | null>(null);
  const [djActive, setDjActive] = useState(false);
  const [welcomePlayed, setWelcomePlayed] = useState(false);
  const [lastDjTime, setLastDjTime] = useState(0);
  const [isInitializing, setIsInitializing] = useState(false);
  const [countdown, setCountdown] = useState('');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.volume = isMuted ? 0 : volume;
    }
    if (djRef.current) {
      djRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    streamRef.current = new Audio();
    djRef.current = new Audio();
    streamRef.current.crossOrigin = "anonymous";
    djRef.current.crossOrigin = "anonymous";

    return () => {
      streamRef.current?.pause();
      djRef.current?.pause();
      audioCtxRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const initAudioContext = () => {
      if (!audioCtxRef.current && isPlaying && streamRef.current) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtxRef.current = new AudioContext();
          analyserRef.current = audioCtxRef.current.createAnalyser();
          analyserRef.current.fftSize = 256;
          sourceRef.current = audioCtxRef.current.createMediaElementSource(streamRef.current);
          sourceRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioCtxRef.current.destination);
          if (onAnalyserReady) onAnalyserReady(analyserRef.current);
        } catch (e) {
          console.warn("AudioContext Init Warning (CORS):", e);
        }
      } else if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };
    if (isPlaying) {
        initAudioContext();
    }
  }, [isPlaying, onAnalyserReady]);

  useEffect(() => {
    if (!isPlaying || djActive || isInitializing || !lastDjTime) {
      setCountdown('');
      return;
    }
    const timer = setInterval(() => {
      const nextTime = lastDjTime + DJ_INTERVAL_MINUTES * 60 * 1000;
      const diff = nextTime - Date.now();
      if (diff > 0) {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setCountdown(`-${mins}:${secs.toString().padStart(2, '0')} MIN`);
      } else {
        setCountdown("EN CUALQUIER MOMENTO...");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, lastDjTime, djActive, isInitializing]);

  useEffect(() => {
    if (currentStation && streamRef.current) {
      streamRef.current.src = currentStation.url;
      if (isPlaying && welcomePlayed && !djActive) {
        streamRef.current.play().catch(e => console.log("Stream Change Play Error:", e));
      }
    }
  }, [currentStation, isPlaying, welcomePlayed, djActive]);

  const playWelcomeSequence = () => {
    if (!djRef.current || !streamRef.current) return;
    setIsInitializing(true);
    setDjActive(true);
    streamRef.current.pause();
    djRef.current.src = WELCOME_DJ_URL;
    
    const cleanupAndStartRadio = () => {
      if (djRef.current) {
          djRef.current.removeEventListener('ended', handleEnded);
          djRef.current.removeEventListener('error', handleError);
      }
      setWelcomePlayed(true);
      setDjActive(false);
      setIsInitializing(false);
      setLastDjTime(Date.now());
      startMainStream();
    };

    const handleEnded = () => cleanupAndStartRadio();
    const handleError = () => cleanupAndStartRadio();
    
    djRef.current.addEventListener('ended', handleEnded);
    djRef.current.addEventListener('error', handleError);
    djRef.current.play().catch(e => cleanupAndStartRadio());
  };

  const startMainStream = () => {
    if (streamRef.current) {
      streamRef.current.play().catch(e => console.log("Error fatal iniciando stream:", e));
    }
  };
  
  useEffect(() => {
    if (!streamRef.current || !djRef.current) return;
    if (!isPlaying) {
        streamRef.current.pause();
        djRef.current.pause();
        return;
    }
    if (audioCtxRef.current?.state === 'suspended') audioCtxRef.current.resume();

    if (!welcomePlayed && !isInitializing && !djActive) {
        playWelcomeSequence();
    } else if (welcomePlayed && !djActive && !isInitializing) {
        streamRef.current.play().catch(e => console.log("Stream Resume Error:", e));
    } else if (djActive && !isInitializing) {
        djRef.current.play().catch(e => console.log("DJ Resume Error:", e));
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || !welcomePlayed || djActive || isInitializing) return;
    const checkInterval = setInterval(() => {
      if (lastDjTime && (Date.now() - lastDjTime) / 1000 / 60 >= DJ_INTERVAL_MINUTES) {
        triggerAutoDJ();
      }
    }, 10000);
    return () => clearInterval(checkInterval);
  }, [isPlaying, welcomePlayed, lastDjTime, djActive, isInitializing]);

  const fadeVolume = (audioEl: HTMLAudioElement, targetVol: number, duration: number) => {
    if (isMuted) return;
    const startVol = audioEl.volume;
    const steps = 20;
    const stepTime = duration / steps;
    const volStep = (targetVol - startVol) / steps;
    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      currentStep++;
      const newVol = startVol + (volStep * currentStep);
      if (newVol >= 0 && newVol <= 1) audioEl.volume = newVol;
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        audioEl.volume = targetVol;
      }
    }, stepTime);
  };

  const triggerAutoDJ = () => {
    if (DJ_MESSAGES.length === 0 || !streamRef.current || !djRef.current) return;
    setDjActive(true);
    djRef.current.src = DJ_MESSAGES[Math.floor(Math.random() * DJ_MESSAGES.length)];
    fadeVolume(streamRef.current, volume * 0.2, 1000);
    djRef.current.play().then(() => {
      if(djRef.current) {
        djRef.current.onended = () => {
          if (streamRef.current) fadeVolume(streamRef.current, volume, 1500);
          setDjActive(false);
          setLastDjTime(Date.now());
        };
      }
    }).catch(e => {
      if(streamRef.current) streamRef.current.volume = volume;
      setDjActive(false);
      setLastDjTime(Date.now());
    });
  };

  if (!currentStation) return null;

  return (
    <div className={cn("fixed bottom-0 left-0 z-[100] transition-all duration-500 ease-in-out", isExpanded ? 'w-full md:w-96' : 'w-full md:w-auto')}>
      <div className="bg-black text-white shadow-2xl border-t border-neutral-800 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 h-16 bg-neutral-900 md:bg-black cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center gap-4">
            <div className={cn("w-2 h-2 rounded-full", isPlaying ? 'bg-accent animate-pulse' : 'bg-primary')}></div>
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-code text-neutral-400 tracking-widest uppercase">EN EL AIRE</span>
                {djActive && (<span className="text-[10px] font-code bg-primary text-primary-foreground px-1 rounded animate-pulse">{isInitializing ? "BIENVENIDA" : "DJ LIVE"}</span>)}
              </div>
              <span className="text-sm font-bold truncate max-w-[200px]">{currentStation.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <button onClick={onTogglePlay} className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">{isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-1" />}</button>
          </div>
        </div>
        {isExpanded && (
          <div className="bg-neutral-900 p-6 border-t border-neutral-800 animate-fade-in">
            <div className="flex justify-between items-start mb-4"><div><h4 className="text-xs font-code text-neutral-500 mb-1">EMISORA</h4><p className="text-xl font-bold">{currentStation.title}</p></div><div className="text-right"><h4 className="text-xs font-code text-neutral-500 mb-1">ORIGEN</h4><p className="text-sm">{currentStation.location}</p></div></div>
            <div className="flex items-center gap-2 mb-4 bg-neutral-800 p-3 rounded text-xs font-code text-neutral-400"><Bot size={16} className={djActive ? "text-accent" : "text-neutral-600"}/><span>AUTO DJ: {djActive ? <span className="text-accent">{isInitializing ? "INICIANDO TRANSMISIÓN..." : "INTERVINIENDO..."}</span> : <span>ESPERANDO TURNO <span className="text-accent">{countdown}</span></span>}</span></div>
            <p className="text-sm text-neutral-400 mb-6 font-light">{currentStation.description}</p>
            <div className="flex gap-2 mb-6">{currentStation.tags.map(tag => (<span key={tag} className="text-[10px] uppercase border border-neutral-700 px-2 py-1 rounded-full text-neutral-300">{tag}</span>))}</div>
            <div className="flex justify-between text-[10px] font-code text-neutral-500 mt-2"><span>LIVE STREAM</span><span>128 KBPS</span></div>
          </div>
        )}
      </div>
    </div>
  );
};
