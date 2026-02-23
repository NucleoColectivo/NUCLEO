import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { AppProvider } from '@/context/app-context';
import { LanguageProvider } from '@/context/language-context';
import Script from 'next/script';
import './globals.css';

const iconUrl = 'https://raw.githubusercontent.com/NucleoColectivo/NUCLEO/main/imagen/LOGOS-13.png';

export const metadata: Metadata = {
  title: 'Núcleo Colectivo',
  description: 'Laboratorio, archivo y vitrina para la creación contemporánea.',
  icons: {
    icon: [{ url: iconUrl, type: 'image/png' }],
    shortcut: [iconUrl],
    apple: [
      { url: iconUrl },
      { url: iconUrl, sizes: '180x180', type: 'image/png' },
      { url: iconUrl, sizes: '167x167', type: 'image/png' },
      { url: iconUrl, sizes: '152x152', type: 'image/png' },
    ],
  },
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { 'agent-id': string };
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js"></script>
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <AppProvider>
            <LanguageProvider>
              {children}
              <elevenlabs-convai agent-id="agent_01jvahqbrgff9tky3wf1brsssp"></elevenlabs-convai>
            </LanguageProvider>
          </AppProvider>
        </FirebaseClientProvider>
        <Toaster />
        <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
      </body>
    </html>
  );
}
