'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function HeroAnimatedText() {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      content: (
        <div className="leading-tight">
          <div>{t('hero_animated_text.slide1.line1')}<span className="text-primary">.</span></div>
          <div>{t('hero_animated_text.slide1.line2')}<span className="text-accent">.</span></div>
          <div className="flex items-baseline">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('hero_animated_text.slide1.line3')}
            </span>
            <span className="text-primary">.</span>
          </div>
        </div>
      ),
      duration: 15000,
      className: "font-black text-foreground"
    },
    {
      id: 2,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide2') }} />,
      duration: 15000,
      className: "font-light !text-4xl sm:!text-5xl md:!text-7xl"
    },
    {
      id: 3,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide3') }} />,
      duration: 15000,
      className: "font-light !text-4xl sm:!text-5xl md:!text-7xl"
    },
    {
      id: 4,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide4') }} />,
      duration: 15000,
      className: "font-black"
    },
    {
      id: 5,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide5') }} />,
      duration: 15000,
      className: "font-light !text-4xl sm:!text-5xl md:!text-7xl"
    },
    {
      id: 6,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide6') }} />,
      duration: 15000,
      className: "font-black !text-4xl sm:!text-5xl md:!text-7xl"
    },
    {
      id: 7,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide7') }} />,
      duration: 15000,
      className: "font-black"
    },
    {
      id: 8,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide8') }} />,
      duration: 15000,
      className: "font-light !text-4xl sm:!text-5xl md:!text-7xl"
    },
    {
      id: 9,
      content: <div dangerouslySetInnerHTML={{ __html: t('hero_animated_text.slide9') }} />,
      duration: 15000,
      className: "font-bold text-primary"
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, slides[index].duration);

    return () => clearTimeout(timer);
  }, [index, t]); // Add 't' to dependency array to re-render on language change

  const currentSlide = slides[index];

  return (
    <div className="relative flex items-center justify-start text-left min-h-[16rem] sm:min-h-[20rem] md:min-h-[24rem] lg:min-h-[28rem] w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id + t('lang')} // Add language key to force re-render
          initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none font-body",
            currentSlide.className
          )}
        >
          {currentSlide.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
