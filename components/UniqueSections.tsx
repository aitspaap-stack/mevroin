"use client";

import React, { useEffect, useRef, useState } from 'react';
import NextImage from "next/image";


export const PedigreeCarousel = () => {
    const team = [
        { name: "Nishant Agrawal", role: "Co-Founder & CEO", experience: "ex-intel Principal Scientist, LLMs on 10k+ GPUs, 22+ years leading AI/HPC innovation, 10+ patents & 20+ publications", award: "Gordon Bell Prize Finalist(2024), BRICS Young Scientist(Top-10 India)", img: "/Nishant.png" },
        { name: "TBA", role: "Co-Founder", experience: "Chief Scientist - HPC & AI for Science, 20+ years in Scientific Computing", award: "Gordon Bell Prize Winner(COVID-19 therapeutics), Best Paper Award(SC, MLSys, ICLR)", img: "" },
        { name: "TBA", role: "Co-Founder", experience: "Research Scientist - AI & GPU/LLM System Architecture(TBA Research Lab), 15+ years in Simulation/Modelling, McKinsey", award: "Best Paper Award(AI/HPC, ISCA, MIRCO), PhD in CS(UMass Amherst USA)", img: "" },
        { name: "Tushar Bopche", role: "Co-Founder", experience: "Serial entrepreneur - fintech/edtech, GTM & ops, Product head roles at leading fintech, Deep expertise in marketing, strategy, Partnerships, fundraising, growth", award: "", img: "/Tushar.png" },
    ];

    return (
        <div className="w-full">
            <style>{`
                @keyframes cardPulse {
                    0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.12), 0 20px 40px -10px rgba(0,0,0,0.7); }
                    50% { box-shadow: 0 0 40px rgba(6,182,212,0.28), 0 24px 48px -8px rgba(0,0,0,0.85); }
                }
                @keyframes borderRun {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }
                @keyframes scan {
                    0% { top: -33%; }
                    100% { top: 133%; }
                }
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spinReverse {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                .team-card {
                    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease;
                }
                .team-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 0 50px rgba(6,182,212,0.25), 0 30px 60px -12px rgba(0,0,0,0.9) !important;
                }
            `}</style>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6 w-full">
                {team.map((member, i) => {
                    const accentColors = [
                        { border: 'rgba(34,211,238,0.45)', glow: 'rgba(34,211,238,0.2)', dot: '#22d3ee', grad: 'from-cyan-500 to-blue-500' },
                        { border: 'rgba(167,139,250,0.45)', glow: 'rgba(167,139,250,0.2)', dot: '#a78bfa', grad: 'from-purple-500 to-indigo-500' },
                        { border: 'rgba(52,211,153,0.45)', glow: 'rgba(52,211,153,0.2)', dot: '#34d399', grad: 'from-emerald-500 to-teal-500' },
                        { border: 'rgba(251,191,36,0.45)', glow: 'rgba(251,191,36,0.2)', dot: '#fbbf24', grad: 'from-amber-400 to-orange-500' },
                    ];
                    const c = accentColors[i % accentColors.length];
                    const hasExperience = member.experience && member.experience.trim().length > 0;
                    const hasAwards = member.award && member.award.trim().length > 0;

                    return (
                        <div key={i} className="relative team-card">
                            {/* Animated gradient border wrapper */}
                            <div className="absolute -inset-[1.5px] rounded-[1.6rem] z-0 overflow-hidden">
                                <div
                                    className="absolute inset-0 rounded-[1.6rem]"
                                    style={{
                                        background: 'linear-gradient(90deg, #22d3ee, #a78bfa, #34d399, #fbbf24, #22d3ee)',
                                        backgroundSize: '300% 100%',
                                        animation: 'borderRun 4s linear infinite',
                                        opacity: 0.5,
                                    }}
                                />
                            </div>

                            {/* Card body */}
                            <div
                                className="relative bg-[#080f1d] rounded-[1.5rem] p-5 md:p-6 flex flex-col items-center overflow-hidden z-10 h-full"
                                style={{
                                    border: `1px solid ${c.border}`,
                                    animation: 'cardPulse 4s ease-in-out infinite',
                                    animationDelay: `${i * 0.8}s`,
                                }}
                            >
                                {/* Grid bg pattern */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                                {/* Corner accents */}
                                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-md" />
                                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-md" />
                                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-md" />
                                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-500/50 rounded-br-md" />

                                {/* ID badge */}
                                <div className="absolute top-4 right-5 text-[8px] font-mono text-cyan-500/30 tracking-widest">
                                    ID-{i.toString().padStart(3, '0')}
                                </div>

                                {/* Avatar */}
                                <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 mb-4 mt-2">
                                    <div
                                        className="absolute inset-[-4px] rounded-full border border-dashed border-cyan-400/40"
                                        style={{ animation: 'spinSlow 12s linear infinite' }}
                                    />
                                    <div
                                        className="absolute inset-[-10px] rounded-full border border-purple-500/20"
                                        style={{ animation: 'spinReverse 20s linear infinite' }}
                                    />
                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_24px_rgba(6,182,212,0.25)] relative z-10 bg-slate-950">
                                        {member.img ? (
                                            <NextImage src={member.img} alt={member.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                                <span className="text-2xl font-bold text-white">
                                                    {member.name === "TBA" ? "?" : member.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        {/* Scan line */}
                                        <div
                                            className="absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent pointer-events-none"
                                            style={{ animation: 'scan 3s linear infinite', top: '-33%' }}
                                        />
                                    </div>
                                </div>

                                {/* Name & Role */}
                                <div className="text-center mb-4 relative z-10">
                                    <h4 className="text-lg md:text-xl font-black text-white mb-2 tracking-tight"
                                        style={{ textShadow: `0 0 16px ${c.glow}` }}
                                    >
                                        {member.name}
                                    </h4>
                                    <div
                                        className="inline-block px-3 py-1 rounded-full"
                                        style={{
                                            background: `linear-gradient(90deg, ${c.glow}, rgba(167,139,250,0.08))`,
                                            border: `1px solid ${c.border}`,
                                        }}
                                    >
                                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-transparent bg-clip-text"
                                            style={{ backgroundImage: `linear-gradient(90deg, ${c.dot}, #a78bfa)` }}
                                        >
                                            {member.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

                                {/* Details */}
                                <div className="w-full flex flex-col gap-3 text-left relative z-10 flex-grow">
                                    {hasExperience && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                                                <p className="text-[8px] text-cyan-400/60 uppercase tracking-widest font-bold">Experience</p>
                                            </div>
                                            <p className="text-[11px] md:text-xs text-white/75 leading-relaxed font-mono">{member.experience}</p>
                                        </div>
                                    )}
                                    {hasAwards && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(167,139,250,0.8)]" />
                                                <p className="text-[8px] text-purple-400/60 uppercase tracking-widest font-bold">Honours & Awards</p>
                                            </div>
                                            <p className="text-[11px] md:text-xs text-white/90 leading-relaxed font-mono font-semibold">{member.award}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
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
        <div ref={ref} className="relative w-full py-12 md:py-20 px-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />

            <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 -translate-y-1/2 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress * 100}%` }}
            />

            <div className="relative flex justify-between w-full max-w-5xl mx-auto">
                {phases.map((phase, i) => {
                    const active = progress > (i / (phases.length - 1)) - 0.1;
                    return (
                        <div key={i} className={`flex flex-col items-center gap-3 md:gap-4 transition-all duration-500 ${active ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'}`}>
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center bg-slate-950 z-10 ${active ? 'border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'border-white/20 text-white/20'}`}>
                                <span className="font-bold text-xs md:text-sm">{phase.id}</span>
                            </div>
                            <div className="text-center">
                                <h4 className={`text-sm md:text-lg font-bold ${active ? 'text-white' : 'text-white/40'}`}>{phase.title}</h4>
                                <p className="text-[10px] md:text-xs text-white/50 max-w-[100px] md:max-w-none">{phase.desc}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};
