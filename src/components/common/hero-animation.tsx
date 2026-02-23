'use client';

import React, { useRef, useEffect } from 'react';
import { BRAND } from '@/lib/data';
import { cn } from '@/lib/utils';

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5);
        this.vy = (Math.random() - 0.5);
        this.radius = Math.random() * 1.5 + 1;
        this.color = color;
    }

    update(canvas: HTMLCanvasElement, mouse: { x: number, y: number }, scrollY: number) {
        const speedFactor = 0.2 + Math.min(scrollY / 1000, 1) * 0.5;
        
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const maxRepelDist = 100;
        
        if (dist < maxRepelDist) {
            const force = (maxRepelDist - dist) / maxRepelDist;
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * force * 0.5;
            this.vy += Math.sin(angle) * force * 0.5;
        }

        this.x += this.vx * speedFactor;
        this.y += this.vy * speedFactor;
        this.vx *= 0.98;
        this.vy *= 0.98;

        if (this.x < this.radius || this.x > canvas.width - this.radius) {
            this.vx *= -1;
            this.x = Math.max(this.radius, Math.min(this.x, canvas.width - this.radius));
        }
        if (this.y < this.radius || this.y > canvas.height - this.radius) {
            this.vy *= -1;
            this.y = Math.max(this.radius, Math.min(this.y, canvas.height - this.radius));
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export function HeroAnimation({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -1000, y: -1000 });
    const scrollY = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const particles: Particle[] = [];
        const numParticles = 80;
        const colors = [BRAND.purple, BRAND.yellow, BRAND.purpleLight];

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            particles.length = 0;
            for (let i = 0; i < numParticles; i++) {
                 const x = Math.random() * canvas.width;
                 const y = Math.random() * canvas.height;
                particles.push(new Particle(x, y, colors[i % colors.length]));
            }
        };

        resizeCanvas();

        const handleMouseMove = (e: MouseEvent) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };
        
        const handleScroll = () => {
            scrollY.current = window.scrollY;
        };

        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 120) {
                        const opacity = 1 - (dist / 120);
                        ctx.strokeStyle = `rgba(76, 2, 153, ${opacity * 0.3})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const render = () => {
            if(ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(p => {
                    p.update(canvas, mouse.current, scrollY.current);
                    p.draw(ctx);
                });
                connectParticles();
            }
            animationFrameId = window.requestAnimationFrame(render);
        };
        
        render();

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return <canvas ref={canvasRef} className={cn("absolute top-0 right-0 w-[600px] h-[600px] opacity-40 pointer-events-none", className)} />;
}
