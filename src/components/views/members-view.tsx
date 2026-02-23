
'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/app-context';
import { useTranslation } from '@/context/language-context';
import { SectionTitle } from '@/components/common/section-title';
import { SocialButton, MultiInstagramButton, MultiUrlButton } from '@/components/common/social-button';
import { ARTISTS } from '@/lib/data';
import { Globe, Video, Facebook, MessageCircle, Youtube, Linkedin, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

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

export function MembersView() {
    const { setActiveTab } = useApp();
    const { t } = useTranslation();
    
    return (
        <div className="px-6 md:px-12 pt-48 pb-20 max-w-[1600px] mx-auto animate-fade-in">
            <SpatialSection>
                <SectionTitle subtitle={t('members.subtitle')}>{t('members.title')}</SectionTitle>
                <p className="text-lg text-muted-foreground max-w-3xl -mt-12 mb-16">{t('members.intro')}</p>
            </SpatialSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                {ARTISTS.map(member => {
                    const [isExpanded, setIsExpanded] = React.useState(false);
                    const name = t(`artists.${member.id}.name`);
                    const primaryRolesString = t(`artists.${member.id}.primary_roles`);
                    const secondaryRolesString = t(`artists.${member.id}.secondary_roles`);
                    const secondaryRoles = secondaryRolesString ? secondaryRolesString.split(',') : [];
                    const nucleoRolesString = t(`artists.${member.id}.nucleo_roles`);
                    const nucleoRoles = nucleoRolesString ? nucleoRolesString.split(',') : [];
                    const bio = t(`artists.${member.id}.bio`);

                    return (
                        <SpatialSection key={member.id} className="h-full">
                            <div className="group flex flex-col bg-muted/20 rounded-2xl border border-border transition-all duration-300 hover:border-foreground/20 hover:shadow-lg h-full">
                                <div className="relative aspect-[4/5] bg-muted overflow-hidden rounded-t-2xl">
                                    <Image 
                                        src={member.avatar} 
                                        alt={`${t('alt.portrait_of')} ${name}`}
                                        width={600}
                                        height={800}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                                    />
                                </div>
                                
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold font-headline text-foreground mb-1">{name}</h3>
                                    <div className="mb-4">
                                      <p className="font-code text-primary/80 text-sm tracking-wider">
                                        {primaryRolesString}
                                      </p>
                                    </div>
                                    
                                    <p className="text-sm text-foreground/80 leading-relaxed mb-6 flex-grow" dangerouslySetInnerHTML={{ __html: bio.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                                    
                                    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
                                        <CollapsibleContent className="space-y-6 mb-6 animate-fade-in">
                                          <div>
                                              <h4 className="font-bold text-sm text-foreground/80 mb-3">{t('members.key_skills')}</h4>
                                              <div className="flex flex-wrap gap-2">
                                                    {secondaryRoles.map(role => (
                                                        <span key={role} className="text-xs bg-muted text-muted-foreground font-medium px-3 py-1 rounded-full">{role.trim()}</span>
                                                    ))}
                                                </div>
                                          </div>
                                          {nucleoRoles.length > 0 && (
                                              <div>
                                                  <h4 className="font-bold text-sm text-foreground/80 mb-3">{t('members.nucleo_roles')}</h4>
                                                  <div className="flex flex-wrap gap-2">
                                                      {nucleoRoles.map(role => (
                                                          <span key={role} className="text-xs bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">{role.trim()}</span>
                                                      ))}
                                                  </div>
                                              </div>
                                          )}
                                        </CollapsibleContent>
                                        
                                        <div className="mt-auto pt-6 border-t border-border flex flex-wrap gap-4 items-center justify-between">
                                            <div className="flex gap-2 items-center">
                                                {member.social.instagram && <MultiInstagramButton urls={Array.isArray(member.social.instagram) ? member.social.instagram : [member.social.instagram]} />}
                                                {member.social.websites && <MultiUrlButton icon={Globe} urls={member.social.websites.map(w => ({...w, label: t(w.label) }))} ariaLabel="Websites" />}
                                                {member.social.youtube && <MultiUrlButton icon={Youtube} urls={member.social.youtube.map(y => ({...y, label: t(y.label) }))} ariaLabel="YouTube" />}
                                                {member.social.facebook && <SocialButton icon={Facebook} url={member.social.facebook} label="Facebook" />}
                                                {member.social.tiktok && <SocialButton icon={Video} url={member.social.tiktok} label="TikTok" />}
                                                {member.social.linkedin && <SocialButton icon={Linkedin} url={member.social.linkedin} label="LinkedIn" />}
                                                {member.social.whatsapp && (
                                                    <a
                                                    href={member.social.whatsapp}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] transition-colors"
                                                    aria-label="WhatsApp"
                                                    >
                                                    <MessageCircle size={18} fill="white"/>
                                                    </a>
                                                )}
                                            </div>
                                            <CollapsibleTrigger asChild>
                                                <button className="flex items-center gap-1 text-sm font-bold text-primary">
                                                    {isExpanded ? t('members.hide') : t('members.view_more')}
                                                    {isExpanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                                                </button>
                                            </CollapsibleTrigger>
                                        </div>
                                    </Collapsible>
                                </div>
                            </div>
                        </SpatialSection>
                    );
                })}
            </div>

            <SpatialSection className="mt-20 text-center border-t pt-16">
                <h3 className="text-3xl font-bold font-headline mb-4">{t('members.cta.title')}</h3>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                   {t('members.cta.description')}
                </p>
                <a
                    href="https://forms.gle/smy3CpQaSMLeMYXj6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-accent text-accent-foreground px-10 py-5 text-lg font-bold rounded-lg hover:bg-yellow-400 transition-all group shadow-lg hover:shadow-yellow-500/50 transform hover:-translate-y-1"
                >
                    {t('members.cta.button')}
                </a>
            </SpatialSection>
        </div>
    );
}
