import { useEffect } from 'react';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Services } from '@/sections/Services';
import { Projects } from '@/sections/Projects';
import { About } from '@/sections/About';
import { Process } from '@/sections/Process';
import { Quote } from '@/sections/Quote';
import { Footer } from '@/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function App() {
  // Links diretos com âncora (ex.: seusite.com/#orcamento): rola até a seção após a renderização.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      try {
        document.querySelector(decodeURIComponent(hash))?.scrollIntoView({ behavior: 'auto' });
      } catch {
        /* âncora inválida: ignora */
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Services />
        <Projects />
        <About />
        <Process />
        <Quote />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
