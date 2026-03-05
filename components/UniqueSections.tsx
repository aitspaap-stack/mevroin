"use client";

import React, { useEffect, useRef, useState } from 'react';
import NextImage from "next/image";


export const PedigreeCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const team = [
        { name: "Nishant Agrawal", role: "Co-Founder & CEO", experience: "ex-intel Principal Scientist, LLMs on 10k+ GPUs, 22+ years leading AI/HPC innovation, 10+ patents & 20+ publications", award: "Gordon Bell Prize Finalist(2024), BRICS Young Scientist(Top-10 India)", img: "/Nishant.png" },
        { name: "TBA", role: "Co-Founder", experience: "Chief Scientist - HPC & AI for Science, 20+ years in Scientific Computing", award: "Gordon Bell Prize Winner(COVID-19 therapeutics), Best Paper Award(SC, MLSys, ICLR)", img: "" },
        { name: "TBA", role: "Co-Founder", experience: "Research Scientist - AI & GPU/LLM System Architecture(TBA Research Lab), 15+ years in Simulation/Modelling, McKinsey", award: "Best Paper Award(AI/HPC, ISCA, MIRCO), PhD in CS(UMass Amherst USA)", img: "" },
        { name: "Tushar Bopche", role: "Co-Founder", experience: "Serial enterprenuer - fintech/edtech, GTM & ops, Product head roles at leading fintech, Deep expertise in marketing, startegy, Partnerships, fundraising, growth", award: "", img: "/Tushar.png" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % team.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [team.length]);

    return (
        <div className="relative h-[650px] w-full flex items-center justify-center perspective-1000 overflow-hidden">
            {team.map((member, i) => {
                const offset = (i - activeIndex + team.length) % team.length;
                let rotate = 0;
                let translateZ = 0;
                let opacity = 0;
                let zIndex = 0;
                let translateX = 0;

                if (offset === 0) {
                    rotate = 0; translateZ = 0; opacity = 1; zIndex = 20; translateX = 0;
                } else if (offset === 1) {
                    rotate = -10; translateZ = -100; opacity = 0.5; zIndex = 10; translateX = 450;
                } else if (offset === team.length - 1) {
                    rotate = 10; translateZ = -100; opacity = 0.5; zIndex = 10; translateX = -450;
                } else {
                    opacity = 0;
                    translateZ = -200;
                }

                const experiences = member.experience.split(',').map(s => s.trim()).filter(s => s.length > 0);
                const awards = member.award ? member.award.split(',').map(s => s.trim()).filter(s => s.length > 0) : [];

                return (
                    <div
                        key={i}
                        className="absolute w-[360px] min-h-[580px] bg-[#0f172a]/90 border border-cyan-500/30 rounded-[2rem] p-8 flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl group overflow-hidden"
                        style={{
                            opacity,
                            zIndex,
                            transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotate}deg)`
                        }}
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg" />

                        <div className="absolute top-6 right-6 text-[8px] font-mono text-cyan-500/40 tracking-widest">ID-{i.toString().padStart(3, '0')}</div>

                        <div className="relative w-32 h-32 shrink-0 mb-6 group-hover:scale-105 transition-transform duration-500">
                            <div className="absolute inset-[-4px] rounded-full border border-dashed border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-[-8px] rounded-full border border-t-transparent border-cyan-500/20 rotate-45" />

                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)] relative z-10 bg-slate-950">
                                {member.img ? (
                                    <NextImage src={member.img} alt={member.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                                        <span className="text-3xl font-bold text-white">{member.name === "TBA" ? "TBA" : member.name.charAt(0)}</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent h-1/3 animate-[scan_3s_linear_infinite]" />
                            </div>
                        </div>

                        <div className="text-center mb-6 relative z-10">
                            <h4 className="text-3xl font-black text-white mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">{member.name}</h4>
                            <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                                <p className="text-cyan-200 text-xs font-black uppercase tracking-[0.25em]">{member.role}</p>
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-5 text-left border-t border-white/5 pt-5 relative z-10">

                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                                    <p className="text-[9px] text-cyan-400/70 uppercase tracking-widest font-bold">EXPERIENCE DATABASE</p>
                                </div>
                                <ul className="space-y-2.5">
                                    {experiences.map((pt, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed font-mono font-medium">
                                            <span className="text-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.4)]">›</span>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {awards.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
                                        <p className="text-[9px] text-amber-500/70 uppercase tracking-widest font-bold">HONORS & AWARDS</p>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {awards.map((pt, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-amber-100 leading-relaxed font-mono font-bold">
                                                <span className="text-amber-400 mt-1 shadow-[0_0_10px_rgba(251,191,36,0.4)]">★</span>
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                    </div>
                );
            })}
        </div>
    );
};


export const RoadmapTimeline = () => {
    const [progress, setProgress] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const viewDesc = window.innerHeight;

            const start = viewDesc - 100;
            const end = 0;

            let p = (start - rect.top) / (start - end);
            p = Math.max(0, Math.min(1, p));
            setProgress(p);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const phases = [
        { id: "01", title: "Platform Alpha", desc: "Core twin engine + decision packs" },
        { id: "02", title: "Clinical Validation", desc: "Concordance studies + pilot deployments" },
        { id: "03", title: "Scale", desc: "Multi-site, multi-indication support" },
    ];

    return (
        <div ref={ref} className="relative w-full py-20 px-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />

            <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 -translate-y-1/2 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress * 100}%` }}
            />

            <div className="relative flex justify-between w-full max-w-5xl mx-auto">
                {phases.map((phase, i) => {
                    const active = progress > (i / (phases.length - 1)) - 0.1;
                    return (
                        <div key={i} className={`flex flex-col items-center gap-4 transition-all duration-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}`}>
                            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center bg-slate-950 z-10 ${active ? 'border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'border-white/20 text-white/20'}`}>
                                <span className="font-bold text-sm">{phase.id}</span>
                            </div>
                            <div className="text-center">
                                <h4 className={`text-lg font-bold ${active ? 'text-white' : 'text-white/40'}`}>{phase.title}</h4>
                                <p className="text-xs text-white/50">{phase.desc}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
