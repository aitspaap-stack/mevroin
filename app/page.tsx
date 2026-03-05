"use client";

import React, { useEffect, useRef, useState } from 'react';
import NextImage from "next/image";
import BioCanvas from "../components/BioCanvas";
import ScrollytellingHero from "../components/ScrollytellingHero";
import { PedigreeCarousel, RoadmapTimeline } from '../components/UniqueSections';
import ProjectPyramid from "../components/ProjectPyramid";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
        }
        setIsOpen(false);
    };

    return (
        <>
            <nav className="fixed top-2 md:top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-0">
                <div className="w-full max-w-[95%] md:max-w-7xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(6,182,212,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] rounded-full px-4 py-3 md:px-6 md:py-4 flex justify-between items-center relative">

                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                    >
                        <div className="flex flex-col gap-1.5 w-6">
                            <span className="w-full h-0.5 bg-white group-hover:bg-cyan-200 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            <span className="w-2/3 h-0.5 bg-white group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        </div>
                    </button>

                    <div
                        className="absolute left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <NextImage
                            src="/Mevreon Logo.png"
                            alt="Mevreon"
                            width={140}
                            height={50}
                            className="h-5 md:h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        />
                    </div>

                    <div className="hidden md:flex items-center gap-6 mr-1 bg-white/5 border border-white/20 rounded-full px-6 py-2 shadow-inner">
                        {['About', 'Platform', 'Why Mevreon', 'Team', 'Book Demo'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                                className="text-xs font-bold text-white/90 hover:text-cyan-300 uppercase tracking-widest transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <div className={`menu-overlay fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-2xl duration-500 transition-all ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="menu-close absolute top-4 right-4 md:top-8 md:right-8 text-white p-3 md:p-4 hover:rotate-90 transition-transform duration-300"
                >
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="flex flex-col items-center justify-center h-full gap-6 md:gap-8 px-4">
                    {['About', 'Platform', 'Why Mevreon', 'Team', 'Book Demo'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                            className="text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 hover:to-white transition-all tracking-tighter w-full text-center py-2 md:py-0"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

const Stat = ({ number, label }: { number: string, label: string }) => (
    <div className="flex flex-col items-center justify-center p-3 md:p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
        <div className="text-2xl md:text-4xl font-bold bg-gradient-to-br from-white to-cyan-200 bg-clip-text text-transparent mb-1 md:mb-2 group-hover:scale-110 transition-transform">
            {number}
        </div>
        <div className="text-[10px] md:text-sm text-cyan-500 font-bold uppercase tracking-widest text-center">
            {label}
        </div>
    </div>
);

export default function Home() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {

        const handleScroll = () => requestAnimationFrame(() => setScrollY(window.scrollY));
        window.addEventListener("scroll", handleScroll);

        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
            }, 100);
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = index * 50;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        entry.target.classList.remove('hidden-initial');
                    }, delay);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        });

        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-bottom, .reveal-scale, .stagger-children');
        revealElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const [projects, setProjects] = useState([
        {
            title: "DE-RISKING THE FUTURE OF MEDICINE",
            category: "The Challenge",
            image: "/comparison_chart_timelineweek.png",
            description: "Clinical evidence is fragmented and decisions are reactive. We provide simulation-backed evidence to improve screening, cohorts, and early risk detection.",
            layout: 'standard'
        },
        {
            title: "THE PROTOCOL OF TRUST",
            category: "Privacy-First Data Fabric",
            image: "/foundation_physics_ai.png",
            description: "Privacy-first collaboration using de-identification, governance, and synthetic data options—plus audit trails for compliant validation.",
            layout: 'reversed'
        },
        {
            title: "THE OMNITWIN ENGINE",
            category: "Automated Biological Intelligence",
            image: "/Photos/AI Mevreon Platformb1.jpeg",
            description: "From static data to dynamic life. Automating the creation of patient-specific digital twins.",
            pillars: [
                { title: "Ingest", desc: "EHR, imaging, omics" },
                { title: "Normalize + De-ID", desc: "Privacy-first processing" },
                { title: "Simulate + Generate Decision Packs", desc: "Actionable operational evidence" }
            ],
            layout: 'featured'
        }
    ]);

    const [introFinished, setIntroFinished] = useState(false);

    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formMessage, setFormMessage] = useState('');

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/xykegvql', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormStatus('success');
                setFormMessage('Thank you! We\'ll be in touch soon.');
                form.reset();
            } else {
                setFormStatus('error');
                setFormMessage('Something went wrong. Please try again.');
            }
        } catch {
            setFormStatus('error');
            setFormMessage('Network error. Please check your connection.');
        }
    };

    return (
        <main className="relative min-h-screen font-sans selection:bg-cyan-500/30 bg-transparent">
            <div className="fixed inset-0 z-0">
                <BioCanvas />
            </div>

            <div className="relative z-10">
                <ScrollytellingHero />
            </div>

            <section id="about" className="relative z-10 py-16 md:py-32 overflow-hidden w-full h-auto">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-12 md:mb-16 reveal hidden-initial">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
                            <span className="text-xs font-mono text-cyan-400/80 tracking-[0.3em] uppercase">Who We Are</span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
                        </div>
                        <h2 className="text-3xl md:text-6xl font-black tracking-tight mb-4 md:mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60">
                                About Mevreon:
                            </span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Clinical development has reached an inflection point.
                            </span>
                        </h2>
                        <p className="text-sm md:text-xl text-white max-w-3xl mx-auto leading-relaxed text-justify md:text-center px-2 md:px-0">
                            Science is advancing fast, but trial execution remains slow because evidence is siloed and decisions are reactive. Mevreon is building a digital twin factory that operationalizes multimodal clinical data into repeatable, auditable decision outputs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div className="reveal-left hidden-initial delay-200 p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-500 group">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
                            <p className="text-white/50 leading-relaxed">
                                Build the OmniTwin Factory: Patient + Cohort digital twins that support earlier, safer decisions in therapy planning and trials.
                            </p>
                        </div>
                        <div className="reveal-right hidden-initial delay-400 p-6 md:p-8 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-500 group">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">🔬</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
                            <p className="text-white/50 leading-relaxed">
                                Make simulation-backed decisions a standard layer in clinical operations—clinician-in-the-loop, validation-driven, and deployment-ready.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="platform" className="relative z-10 py-16 md:py-32 overflow-hidden scroll-section w-full h-auto">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/80 pointer-events-none" />

                <div className="relative max-w-6xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
                    <div className="text-center reveal hidden-initial">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                                THE MEVREON ADVANTAGE
                            </span>
                        </h2>
                        <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto">
                            Three things differentiate us:
                        </p>
                    </div>
                </div>

                <div className="relative w-full overflow-hidden py-10">
                    <style>{`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee {
                            animation: marquee 30s linear infinite;
                            width: fit-content;
                        }
                        .animate-marquee:hover {
                            animation-play-state: paused;
                        }
                    `}</style>

                    <div className="flex animate-marquee">
                        <div className="flex gap-4 md:gap-8 px-2 md:px-4 shrink-0">
                            <div className="group w-[85vw] md:w-[30vw] min-w-[300px] md:min-w-[400px]">
                                <div className="relative h-full p-5 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden group-hover:-translate-y-2">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-80" />
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4 md:mb-6">
                                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-105 transition-transform duration-500">
                                                <span className="text-xl md:text-3xl">🧪</span>
                                            </div>
                                            <span className="text-2xl md:text-4xl font-black text-white/5 font-mono group-hover:text-cyan-500/20 transition-colors">01</span>
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">The OmniTwin Engine</h3>
                                        <p className="text-[10px] md:text-xs font-mono text-cyan-400/80 tracking-widest uppercase mb-4 md:mb-6">Biological Intelligence</p>
                                        <p className="text-xs md:text-sm text-white/60 mb-4 md:mb-6 font-medium leading-relaxed border-l-2 border-cyan-500/30 pl-4">INDUSTRIAL-GRADE SIMULATION</p>
                                        <ul className="space-y-3 md:space-y-4">
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                                                <span>Creates Executable Patient Twins (longitudinal state + provenance).</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                                                <span>Uses mechanistic priors + data-driven learning for interpretable models.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="group w-[85vw] md:w-[30vw] min-w-[300px] md:min-w-[400px]">
                                <div className="relative h-full p-5 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden group-hover:-translate-y-2">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-80" />
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4 md:mb-6">
                                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform duration-500">
                                                <span className="text-xl md:text-3xl">📊</span>
                                            </div>
                                            <span className="text-2xl md:text-4xl font-black text-white/5 font-mono group-hover:text-emerald-500/20 transition-colors">02</span>
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Decision Packs for Operations</h3>
                                        <p className="text-[10px] md:text-xs font-mono text-emerald-400/80 tracking-widest uppercase mb-4 md:mb-6">Operational Impact</p>
                                        <p className="text-xs md:text-sm text-white/60 mb-4 md:mb-6 font-medium leading-relaxed border-l-2 border-emerald-500/30 pl-4">AUDIT-READY DECISION FACTORY</p>
                                        <ul className="space-y-3 md:space-y-4">
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                                                <span>Delivers audit-ready evidence packs for trial teams, CROs, and clinicians.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
                                                <span>Supports screening, cohorting, and early risk detection.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="group w-[85vw] md:w-[30vw] min-w-[300px] md:min-w-[400px]">
                                <div className="relative h-full p-5 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-red-500/30 hover:border-red-500/60 transition-all duration-500 hover:shadow-[0_0_50px_rgba(239,68,68,0.15)] overflow-hidden group-hover:-translate-y-2">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-80" />
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4 md:mb-6">
                                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center border border-red-500/20 group-hover:scale-105 transition-transform duration-500">
                                                <span className="text-xl md:text-3xl">⚠️</span>
                                            </div>
                                            <span className="text-2xl md:text-4xl font-black text-white/5 font-mono group-hover:text-red-500/20 transition-colors">03</span>
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Why It Works</h3>
                                        <p className="text-[10px] md:text-xs font-mono text-red-400/80 tracking-widest uppercase mb-4 md:mb-6">The Platform</p>
                                        <p className="text-xs md:text-sm text-white/60 mb-4 md:mb-6 font-medium leading-relaxed border-l-2 border-red-500/30 pl-4">UNIFYING PHYISCS + AI</p>
                                        <ul className="space-y-3 md:space-y-4">
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
                                                <span>Moves beyond black-box predictions with simulation-grounded evidence.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                                                <span>Breaks silos via privacy-first sharing and adoptable outputs.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 md:gap-8 px-2 md:px-4 shrink-0">
                            <div className="group w-[85vw] md:w-[30vw] min-w-[300px] md:min-w-[400px]">
                                <div className="relative h-full p-5 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden group-hover:-translate-y-2">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-80" />
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4 md:mb-6">
                                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:scale-105 transition-transform duration-500">
                                                <span className="text-xl md:text-3xl">🧪</span>
                                            </div>
                                            <span className="text-2xl md:text-4xl font-black text-white/5 font-mono group-hover:text-cyan-500/20 transition-colors">01</span>
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">The OmniTwin Engine</h3>
                                        <p className="text-[10px] md:text-xs font-mono text-cyan-400/80 tracking-widest uppercase mb-4 md:mb-6">Biological Intelligence</p>
                                        <p className="text-xs md:text-sm text-white/60 mb-4 md:mb-6 font-medium leading-relaxed border-l-2 border-cyan-500/30 pl-4">INDUSTRIAL-GRADE SIMULATION</p>
                                        <ul className="space-y-3 md:space-y-4">
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                                                <span>Creates Executable Patient Twins (longitudinal state + provenance).</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                                                <span>Uses mechanistic priors + data-driven learning for interpretable models.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="group w-[85vw] md:w-[30vw] min-w-[300px] md:min-w-[400px]">
                                <div className="relative h-full p-5 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden group-hover:-translate-y-2">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-80" />
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4 md:mb-6">
                                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-105 transition-transform duration-500">
                                                <span className="text-xl md:text-3xl">📊</span>
                                            </div>
                                            <span className="text-2xl md:text-4xl font-black text-white/5 font-mono group-hover:text-emerald-500/20 transition-colors">02</span>
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Decision Packs for Operations</h3>
                                        <p className="text-[10px] md:text-xs font-mono text-emerald-400/80 tracking-widest uppercase mb-4 md:mb-6">Operational Impact</p>
                                        <p className="text-xs md:text-sm text-white/60 mb-4 md:mb-6 font-medium leading-relaxed border-l-2 border-emerald-500/30 pl-4">AUDIT-READY DECISION FACTORY</p>
                                        <ul className="space-y-3 md:space-y-4">
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                                                <span>Delivers audit-ready evidence packs for trial teams, CROs, and clinicians.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
                                                <span>Supports screening, cohorting, and early risk detection.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="group w-[85vw] md:w-[30vw] min-w-[300px] md:min-w-[400px]">
                                <div className="relative h-full p-5 md:p-8 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-red-500/30 hover:border-red-500/60 transition-all duration-500 hover:shadow-[0_0_50px_rgba(239,68,68,0.15)] overflow-hidden group-hover:-translate-y-2">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 opacity-80" />
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4 md:mb-6">
                                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center border border-red-500/20 group-hover:scale-105 transition-transform duration-500">
                                                <span className="text-xl md:text-3xl">⚠️</span>
                                            </div>
                                            <span className="text-2xl md:text-4xl font-black text-white/5 font-mono group-hover:text-red-500/20 transition-colors">03</span>
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Why It Works</h3>
                                        <p className="text-[10px] md:text-xs font-mono text-red-400/80 tracking-widest uppercase mb-4 md:mb-6">The Platform</p>
                                        <p className="text-xs md:text-sm text-white/60 mb-4 md:mb-6 font-medium leading-relaxed border-l-2 border-red-500/30 pl-4">UNIFYING PHYISCS + AI</p>
                                        <ul className="space-y-3 md:space-y-4">
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
                                                <span>Moves beyond black-box predictions with simulation-grounded evidence.</span>
                                            </li>
                                            <li className="flex items-start gap-3 text-xs md:text-sm text-white/70 leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 md:mt-2 shrink-0 shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                                                <span>Breaks silos via privacy-first sharing and adoptable outputs.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 py-12 md:py-20 w-full h-auto">
                <div className="max-w-5xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-10 reveal hidden-initial">
                        <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 tracking-tight mb-3">
                            OUR IMPACT
                        </h2>
                        <p className="text-white font-bold max-w-xl mx-auto">
                            Measured in operational KPIs: screening speed, cohort stability, and early risk detection.
                        </p>
                    </div>

                    <div className="flex flex-row gap-0.5 md:gap-6 w-full items-stretch justify-between">
                        <div className="flex-1 min-w-0 reveal-left hidden-initial delay-100 text-center p-0.5 md:p-6 rounded-lg md:rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-amber-500/30 hover:border-amber-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]">
                            <div className="w-15 h-15 md:w-16 mt-2 md:h-16 mx-auto mb-1 md:mb-4 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                                <span className="text-[20px] md:text-3xl font-black text-amber-400">Time</span>
                            </div>
                            <h3 className="h-[12px] md:h-auto mt-10 flex items-center justify-center text-[5px] md:text-lg font-bold text-white mb-0.5 md:mb-2 leading-tight">Shorter decision cycles</h3>
                            <p className="h-[150px] md:h-auto mt-12 flex items-start justify-center text-[4px] md:text-sm text-white/70 font-medium leading-tight">Faster screening and earlier go/no-go calls with consistent evidence.</p>
                        </div>

                        <div className="flex-1 min-w-0 reveal-bottom hidden-initial delay-200 text-center p-0.5 md:p-6 rounded-lg md:rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-orange-500/30 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)]">
                            <div className="w-15 h-15 md:w-16 mt-2 md:h-16 mx-auto mb-1 md:mb-4 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                                <span className="text-[20px] md:text-3xl font-black text-orange-400 tracking-tighter">Savings</span>
                            </div>
                            <h3 className="h-[12px] md:h-auto mt-13 flex items-center justify-center text-[5px] md:text-lg font-bold text-white mb-0.5 md:mb-2 leading-tight">Lower operational waste</h3>
                            <p className="h-[150px] md:h-auto mt-10 flex items-start justify-center text-[4px] md:text-sm text-white/70 font-medium leading-tight">Reduce avoidable rework from amendments, cohort drift, and late surprises.</p>
                        </div>

                        <div className="flex-1 min-w-0 reveal-right hidden-initial delay-300 text-center p-0.5 md:p-6 rounded-lg md:rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-red-500/30 hover:border-red-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                            <div className="w-15 h-15 md:w-16  mt-2 md:h-16 mx-auto mb-1 md:mb-4 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                                <span className="text-[20px] md:text-3xl font-black text-red-400">Success</span>
                            </div>
                            <h3 className="h-[12px] md:h-auto mt-12 flex items-center justify-center text-[5px] md:text-lg font-bold text-white mb-0.5 md:mb-2 leading-tight">Higher trial reliability</h3>
                            <p className="h-[150px] md:h-auto mt-12 flex items-start justify-center text-[4px] md:text-sm text-white/70 font-medium leading-tight">Earlier detection of non-response and safety risk to protect endpoints.</p>
                        </div>
                    </div>
                </div>
            </section>


            <div id="why-mevreon" className="relative z-10 scroll-section">
                <ProjectPyramid />
            </div>

            <section className="relative z-10 min-h-[auto] md:min-h-screen flex items-center py-12 md:py-16 w-full">
                <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
                    <div className="text-center mb-8 md:mb-12 reveal hidden-initial">
                        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight mb-4">
                            OUR PILLARS
                        </h2>
                        <p className="text-white/40 text-sm md:text-base max-w-xl mx-auto">
                            Three foundational technologies powering the future of medicine
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 scale-[0.7] md:scale-100 origin-top">
                        {projects.map((project: any, index) => {
                            const animationClass = index === 0 ? 'reveal-left' : index === 1 ? 'reveal-bottom' : 'reveal-right';
                            const delayClass = index === 0 ? 'delay-100' : index === 1 ? 'delay-300' : 'delay-500';

                            const gradients = [
                                { from: '#06b6d4', to: '#3b82f6' },    // Cyan to Blue
                                { from: '#a855f7', to: '#ec4899' },    // Purple to Pink
                                { from: '#10b981', to: '#14b8a6' }     // Emerald to Teal
                            ];
                            const gradient = gradients[index];

                            return (
                                <div
                                    key={index}
                                    className={`
                                        relative rounded-2xl md:rounded-3xl border border-white/10 
                                        bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden
                                        ${animationClass} ${delayClass} hidden-initial
                                        group/card hover:border-white/20 transition-all duration-700
                                        hover:shadow-[0_0_60px_rgba(6,182,212,0.15)]
                                        transform hover:scale-[1.02]
                                    `}
                                    style={{
                                        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                                    }}
                                >
                                    <div
                                        className="absolute top-0 left-0 right-0 h-1 opacity-80"
                                        style={{
                                            background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`
                                        }}
                                    />

                                    <div
                                        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(ellipse at center, ${gradient.from}10, transparent 70%)`
                                        }}
                                    />

                                    <div className="relative h-36 md:h-44 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/95 z-10" />
                                        {project.image ? (
                                            <NextImage
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover group-hover/card:scale-110 transition-transform duration-1000"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-800" />
                                        )}

                                        <div className="absolute bottom-3 left-4 z-20">
                                            <span
                                                className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                                style={{
                                                    background: `linear-gradient(135deg, ${gradient.from}30, ${gradient.to}30)`,
                                                    color: gradient.from,
                                                    border: `1px solid ${gradient.from}40`
                                                }}
                                            >
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 md:p-6 space-y-3">
                                        <h3
                                            className="text-lg md:text-xl font-bold tracking-tight leading-tight"
                                            style={{
                                                background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text'
                                            }}
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                        {project.metrics && project.metrics.length > 0 && (
                                            <div className="flex gap-3 pt-2">
                                                {project.metrics.slice(0, 2).map((m: any, i: number) => (
                                                    <div key={i} className="text-center flex-1">
                                                        <div
                                                            className="text-lg font-bold"
                                                            style={{ color: gradient.from }}
                                                        >
                                                            {m.value}
                                                        </div>
                                                        <div className="text-[9px] text-white/40 uppercase tracking-wider">{m.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {project.pillars && (
                                            <div className="space-y-1.5 pt-2">
                                                {project.pillars.map((p: any, i: number) => (
                                                    <div key={i} className="flex items-center gap-2 text-xs">
                                                        <div
                                                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                                                            style={{
                                                                background: `${gradient.from}20`,
                                                                color: gradient.from,
                                                                border: `1px solid ${gradient.from}30`
                                                            }}
                                                        >
                                                            {i + 1}
                                                        </div>
                                                        <span className="text-white/60 font-medium">{p.title}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div
                                        className="absolute bottom-0 right-0 w-24 h-24 opacity-10 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle at bottom right, ${gradient.from}, transparent 70%)`
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="about" className="relative py-12 md:py-24 scroll-section">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 space-y-24 md:space-y-32">

                    <div id="team" className="w-full text-center reveal hidden-initial scroll-section">
                        <h2 className="text-3xl md:text-5xl font-bold  mb-6 " style={{ color: "#FFA500" }}>ENGINEERING THE IMPOSSIBLE</h2>
                        <p className="text-lg font-bold md:text-xl text-white leading-relaxed mb-12 max-w-3xl mx-auto">
                            50+ years combined across AI model R&D and deployment, clinical modeling and simulation, and datacenter-scale infrastructure—so we can deliver both the science and the platform.
                        </p>

                        <div className="w-full">
                            <PedigreeCarousel />
                        </div>

                        <div className="mt-12 text-sm text-white/40 tracking-[0.2em] uppercase font-bold">
                            BACKED BY INDUSTRY VETERANS FROM MIT, STANFORD & DEEPMIND
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center reveal hidden-initial max-w-6xl mx-auto">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase">From Fragmented Data to Simulated Decision Packs</h2>
                            <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed">
                                <p>
                                    Mevreon operationalizes multimodal clinical evidence into Patient Twins and Cohort Twins—then runs simulation-backed ‘what-if’ analysis to deliver audit-ready decision packs for trial teams and clinicians.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 md:gap-6">
                            <Stat number="Multimodal" label="Ingestion (EHR + imaging + omics)" />
                            <Stat number="Twins" label="Patient + cohort generation" />
                            <Stat number="What-if" label="Simulation-backed analysis" />
                            <Stat number="Audit-ready" label="Decision packs" />
                        </div>
                    </div>

                    <div className="relative w-full reveal hidden-initial max-w-6xl mx-auto my-16 md:my-28 ">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

                            <div className="relative bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                                <NextImage
                                    src="/Photos/extraimage.png"
                                    alt="OmniTwin Factory Technical Workflow"
                                    width={1200}
                                    height={800}
                                    className="w-full h-[500px] object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full reveal hidden-initial max-w-6xl mx-auto mt-20px">
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">THE ROAD TO IN-SILICO CERTAINTY</h2>
                        <RoadmapTimeline />
                    </div>
                </div>
            </section>

            <section id="book-demo" className="relative py-16 md:py-24 px-4 md:px-6 flex flex-col items-center justify-center scroll-section">
                <div className="relative max-w-3xl w-full bg-transparent backdrop-blur-sm border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-16 text-center reveal hidden-initial overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 -z-10" />

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                        READY TO <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">SEE MORE?</span>
                    </h2>
                    <p className="text-base md:text-lg text-white/70 mb-6 max-w-2xl mx-auto leading-relaxed">
                        Request access for a walkthrough of the OmniTwin Factory and sample decision packs.
                    </p>
                    <p className="text-xs md:text-sm text-white/40 mb-8 md:mb-10 max-w-xl mx-auto italic">
                        We’ll share the right view based on your role: sponsor, CRO, hospital, or researcher.
                    </p>

                    {formStatus === 'success' ? (
                        <div className="max-w-md mx-auto text-center py-8">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30">
                                <span className="text-4xl">✓</span>
                            </div>
                            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-3">
                                Request Received!
                            </h3>
                            <p className="text-white/60 mb-6">{formMessage}</p>
                            <button
                                onClick={() => setFormStatus('idle')}
                                className="px-6 py-3 border border-white/20 rounded-xl text-white/70 hover:bg-white/5 transition-colors text-sm"
                            >
                                Submit Another Request
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleFormSubmit}
                            className="max-w-md mx-auto space-y-4 mb-0 relative z-20"
                            suppressHydrationWarning
                        >
                            <input type="hidden" name="_subject" value="New Access Request from Mevreon Website" />

                            {formStatus === 'error' && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                    {formMessage}
                                </div>
                            )}

                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                    disabled={formStatus === 'submitting'}
                                    className="relative w-full px-5 py-3 md:px-6 md:py-4 bg-slate-900/90 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition-colors text-sm md:text-base disabled:opacity-50"
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    required
                                    disabled={formStatus === 'submitting'}
                                    className="relative w-full px-5 py-3 md:px-6 md:py-4 bg-slate-900/90 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition-colors text-sm md:text-base disabled:opacity-50"
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company / Organization (optional)"
                                    disabled={formStatus === 'submitting'}
                                    className="relative w-full px-5 py-3 md:px-6 md:py-4 bg-slate-900/90 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition-colors text-sm md:text-base disabled:opacity-50"
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                                <textarea
                                    name="message"
                                    placeholder="Tell us about your interest (optional)"
                                    rows={3}
                                    disabled={formStatus === 'submitting'}
                                    className="relative w-full px-5 py-3 md:px-6 md:py-4 bg-slate-900/90 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition-colors text-sm md:text-base resize-none disabled:opacity-50"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="relative w-full py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-xl font-bold tracking-[0.15em] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all shadow-[0_0_30px_rgba(6,182,212,0.2)] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {formStatus === 'submitting' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        SUBMITTING...
                                    </span>
                                ) : (
                                    'REQUEST ACCESS →'
                                )}
                            </button>

                            <p className="text-xs text-white/30 mt-4">
                                By submitting, you agree to receive communications from Mevreon.ai. We respect your privacy.
                            </p>
                        </form>
                    )}
                </div>
            </section>
            <footer className="relative z-10 py-16 px-6 border-t border-white/5 bg-slate-950/50 backdrop-blur-xl text-center md:text-left mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-lg">M</div>
                            <span className="text-xl font-bold tracking-tight text-white/90">Mevre<span className="text-cyan-400">on</span>.ai</span>
                        </div>
                        <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
                            Accelerating the future of medicine through high-fidelity in-silico simulation and digital twins.
                        </p>
                    </div>

                    <div className="flex gap-8 text-sm font-semibold text-white/60 tracking-wider uppercase">
                        <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
                        <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
                    </div>

                    <div className="text-white/20 text-xs font-mono">
                        © 2026 MEVREON INC.
                    </div>
                </div>
            </footer>
        </main>
    );
}
