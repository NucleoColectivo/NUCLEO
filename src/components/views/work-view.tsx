
"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { SectionTitle } from '@/components/common/section-title';
import { ProjectDetailModal } from '@/components/modals/project-detail-modal';
import { VideoPlayerModal } from '@/components/modals/video-player-modal';
import { PROJECTS, SPECIAL_PROJECTS } from '@/lib/data';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type Project = (typeof PROJECTS)[0] & { type?: string };

type Video = {
  id: string;
  titulo: string;
  canal: string;
  url: string;
  descripcion: string;
};

function SpatialSection({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const FilterButton = ({ children, active, ...props }: { children: React.ReactNode, active: boolean, [key: string]: any }) => (
  <button
    {...props}
    className={cn(
      "px-4 py-2 text-sm font-bold rounded-none transition-colors whitespace-nowrap border-2",
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-muted text-muted-foreground border-transparent hover:bg-muted/80"
    )}
  >
    {children}
  </button>
);

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void; }) => {
  const { t } = useTranslation();
  const title = project.type === 'special' 
    ? t(`special_projects.${project.id}.title`)
    : t(`projects_data.${project.id}.title`);
  const summary = project.type === 'special'
    ? t(`special_projects.${project.id}.description`)
    : t(`projects_data.${project.id}.summary`);
  const author = project.authors.map(a => t(`artists.${a.id}.name`)).join(', ');
  
  return (
    <div onClick={onClick} className="group block cursor-pointer bg-muted/30 rounded-none overflow-hidden border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-xl h-full flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3] bg-neutral-900">
        <Image 
          src={project.media.hero_image} 
          alt={`${title}: ${summary}`} 
          fill={true} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-background/80 text-foreground text-[10px] px-2.5 py-1 rounded-none font-bold backdrop-blur-sm shadow-md">{project.year}</div>
        <div className="absolute bottom-0 left-0 p-4">
          <p className="text-white font-bold font-headline text-2xl line-clamp-2 uppercase italic leading-none">{title}</p>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-primary font-code text-[10px] font-black uppercase tracking-widest mb-3">{project.curatorial_line || author}</p>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-5 flex-grow font-light">{summary}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
              {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-muted text-muted-foreground font-black uppercase px-2 py-0.5 rounded-none border border-border">{tag}</span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};


export function WorkView() {
  const { playSound } = useApp();
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const allProjects = useMemo(() => {
    const formattedSpecial = SPECIAL_PROJECTS.map(p => ({
        ...p,
        summary: p.description,
        media: { ...p.media, hero_image: p.media.hero_image || p.media.gallery[0] },
        type: 'special'
    }));
    const regularProjects = PROJECTS.map(p => ({ ...p, type: 'regular' }));
    
    const combined: Project[] = [...formattedSpecial, ...regularProjects];
    const priorityIds = ['cosiaca', 'criaturas-imposibles'];

    return combined.sort((a, b) => {
      const aPriority = priorityIds.indexOf(a.id);
      const bPriority = priorityIds.indexOf(b.id);
      if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
      if (aPriority !== -1) return -1;
      if (bPriority !== -1) return 1;
      return b.year - a.year;
    });
  }, []);

  const filters = [
    { key: 'all', label: t('work.filters.all') },
    { key: 'special', label: t('work.filters.special') },
    { key: 'interactive', label: t('work.filters.interactive') },
    { key: 'ai', label: t('work.filters.ai') },
    { key: 'video', label: t('work.filters.video') }
  ];

  const filteredProjects = useMemo(() => {
    switch (activeFilter) {
      case 'all': return allProjects;
      case 'special': return allProjects.filter(p => p.type === 'special');
      case 'interactive': return allProjects.filter(p => p.curatorial_line?.toLowerCase().includes('interactivo'));
      case 'ai': return allProjects.filter(p => p.curatorial_line?.toLowerCase().includes('ia'));
      case 'video': return allProjects.filter(p => p.curatorial_line?.toLowerCase().includes('videoarte'));
      default: return allProjects;
    }
  }, [activeFilter, allProjects]);

  const handleProjectClick = (project: Project) => {
    playSound('click');
    if (project.media.externalUrl?.includes('youtube.com')) {
      setSelectedVideo({
        id: project.id,
        titulo: t(project.type === 'special' ? `special_projects.${project.id}.title` : `projects_data.${project.id}.title`),
        canal: project.authors.map(a => t(`artists.${a.id}.name`)).join(', '),
        url: project.media.externalUrl,
        descripcion: t(project.type === 'special' ? `special_projects.${project.id}.description` : `projects_data.${project.id}.summary`),
      });
    } else if (project.media.externalUrl) {
      window.open(project.media.externalUrl, '_blank');
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <div className="px-6 md:px-12 pt-48 pb-20 max-w-[1600px] mx-auto animate-fade-in">
      <SpatialSection>
        <SectionTitle subtitle={t('work.subtitle')}>{t('work.title')}</SectionTitle>
        
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-border pb-8">
          {filters.map(filter => (
            <FilterButton 
              key={filter.key} 
              active={activeFilter === filter.key} 
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </div>
      </SpatialSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProjects.map((project) => (
          <SpatialSection key={project.id} className="h-full">
            <ProjectCard project={project} onClick={() => handleProjectClick(project)} />
          </SpatialSection>
        ))}
        <SpatialSection className="h-full">
          <a href="https://forms.gle/smy3CpQaSMLeMYXj6" target="_blank" rel="noopener noreferrer" className="border-2 border-dashed border-accent/50 rounded-none flex flex-col items-center justify-center aspect-[3/4] bg-neutral-900 cursor-pointer hover:border-accent hover:bg-neutral-800 transition-all duration-300 group">
            <div className="text-center p-8">
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-neutral-400 group-hover:text-white uppercase italic tracking-tighter">{t('work.placeholder.title')}</h3>
              <p className="text-xs md:text-sm text-neutral-500 group-hover:text-neutral-300 mt-4 leading-relaxed max-w-[240px] mx-auto">{t('work.placeholder.description')}</p>
              <div className="mt-10">
                <div className="w-14 h-14 rounded-full border-2 border-neutral-700 flex items-center justify-center mx-auto mb-4 group-hover:border-accent transition-all group-hover:scale-110">
                    <Plus size={28} className="text-neutral-600 transition-colors group-hover:text-accent" />
                </div>
                <p className="text-neutral-500 font-black uppercase tracking-[0.2em] text-[10px] transition-colors group-hover:text-accent">{t('work.placeholder.cta')}</p>
              </div>
            </div>
          </a>
        </SpatialSection>
      </div>

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
}
