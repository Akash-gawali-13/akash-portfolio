import { lazy, Suspense, useCallback, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { sectionOrder, testimonials, type Project, type SectionId } from './data/portfolio';
import { SmoothScrollProvider } from './hooks/smoothScroll';
import CustomCursor from './components/CustomCursor';
import NeuralBackground from './components/NeuralBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EntryGate from './components/EntryGate';
import WhatsAppButton from './components/WhatsAppButton';
import Scene from './components/Scene';
import About from './components/About';
import Seasons from './components/Seasons';
import Originals from './components/Originals';
import TopPicks from './components/TopPicks';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Services from './components/Services';
import ResumeSection from './components/ResumeViewer';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';

// Overlays are only needed on demand — split them out of the first load.
const PlayIntro = lazy(() => import('./components/PlayIntro'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

export default function App() {
  return (
    <SmoothScrollProvider>
      <Series />
    </SmoothScrollProvider>
  );
}

/** The site opens straight onto the landing page; everything else follows as you scroll. */
function Series() {
  // one-click entry screen: the click unlocks sound so the intro can play with audio
  const [entered, setEntered] = useState<null | { voice: boolean }>(null);
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  // the Reviews section only appears once there is at least one testimonial
  const order = sectionOrder.filter((id) => id !== 'testimonials' || testimonials.length > 0);

  const closeIntro = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Seasons />,
    originals: <Originals onOpen={setProject} />,
    services: <Services />,
    picks: <TopPicks />,
    skills: <Skills />,
    moments: <Achievements />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
    testimonials: <Testimonials />,
    contact: <Contact />,
  };

  return (
    <LayoutGroup>
      <div className="grain" aria-hidden />
      <NeuralBackground />
      <CustomCursor />

      <div className="relative z-[1]">
        <Navbar order={order} />
        <main>
          {entered ? <Hero onPlay={() => setPlaying(true)} withVoice={entered.voice} /> : <section id="top" className="h-[100svh]" aria-hidden />}
          {order.map((id) => (
            <Scene key={id} id={id} className={id === 'originals' ? '!py-0 sm:!py-0' : ''}>
              {sections[id]}
            </Scene>
          ))}
          <FinalCTA />
        </main>
      </div>

      {entered && <WhatsAppButton />}
      <AnimatePresence>{!entered && <EntryGate key="gate" onEnter={(withSound) => setEntered({ voice: withSound })} />}</AnimatePresence>

      <Suspense fallback={null}>
        <AnimatePresence>{playing && <PlayIntro key="intro" onClose={closeIntro} />}</AnimatePresence>
        <AnimatePresence>{project && <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />}</AnimatePresence>
        <AnimatePresence>{resumeOpen && <ResumeModal key="resume" onClose={closeResume} />}</AnimatePresence>
      </Suspense>
    </LayoutGroup>
  );
}
