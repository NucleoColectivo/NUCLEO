
"use client";

import { useEffect } from 'react';
import { useApp } from '@/context/app-context';

import { HomeView } from '@/components/views/home-view';
import { NucleoView } from '@/components/views/nucleo-view';
import { WorkshopsView } from '@/components/views/workshops-view';
import { MembersView } from '@/components/views/members-view';
import { WorkView } from '@/components/views/work-view';
import { RadioPageView } from '@/components/views/radio-page-view';
import { NucleoChannelView } from '@/components/views/nucleo-channel-view';
import { ChallengeView } from '@/components/views/challenge-view';
import { SolutionsView } from '@/components/views/solutions-view';
import { ContactView } from '@/components/views/contact-view';
import { PrivacyPolicyView } from '@/components/views/privacy-policy-view';
import { TermsOfServiceView } from '@/components/views/terms-of-service-view';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LoginModal } from '@/components/modals/login-modal';
import { RadioPlayer } from '@/components/radio/radio-player';

export default function Page() {
  const { 
    activeTab, 
    isLoginOpen,
    currentStation,
    isPlaying,
    setIsPlaying,
    isPlayerExpanded,
    setIsPlayerExpanded,
    audioAnalyser,
    setAudioAnalyser,
    volume,
    isMuted,
    initAudio,
    playSound
  } = useApp();

  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudio();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [initAudio]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView />;
      case 'nucleo': return <NucleoView />;
      case 'talleres': return <WorkshopsView />;
      case 'miembros': return <MembersView />;
      case 'obra': return <WorkView />;
      case 'radio': return <RadioPageView />;
      case 'nucleo-channel': return <NucleoChannelView />;
      case 'reto': return <ChallengeView />;
      case 'soluciones': return <SolutionsView />;
      case 'contacto': return <ContactView />;
      case 'privacy': return <PrivacyPolicyView />;
      case 'terms': return <TermsOfServiceView />;
      default: return <HomeView />;
    }
  };

  return (
    <>
      <Header />
      <main>
        {renderContent()}
      </main>
      <Footer />
      {isLoginOpen && <LoginModal />}
      {currentStation && <RadioPlayer
        currentStation={currentStation}
        isPlaying={isPlaying}
        onTogglePlay={() => {
            playSound('click');
            setIsPlaying(!isPlaying)
        }}
        isExpanded={isPlayerExpanded}
        setIsExpanded={setIsPlayerExpanded}
        onAnalyserReady={setAudioAnalyser}
        volume={volume}
        isMuted={isMuted}
      />}
    </>
  );
}
