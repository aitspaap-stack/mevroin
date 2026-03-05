"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const SplashScreen: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);
    const [stage, setStage] = useState<
        "intro" |
        "a1_hero" | "a1_grid" |
        "a2_hero" | "a2_grid" |
        "a3_hero" | "a3_grid" |
        "clear_a" | "bridge_header" |
        "b1_hero" | "b1_grid" |
        "b2_hero" | "b2_grid" |
        "complete" | "none"
    >("intro");

    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem("mevreon_splash_seen");
        if (hasSeenSplash) {
            setShouldRender(false);
            return;
        }

        setIsVisible(true);


        const sequence = [
            { s: "a1_hero", d: 400 },
            { s: "a1_grid", d: 1600 },
            { s: "a2_hero", d: 2200 },
            { s: "a2_grid", d: 3400 },
            { s: "a3_hero", d: 4000 },
            { s: "a3_grid", d: 5200 },
            { s: "clear_a", d: 6000 },
            { s: "bridge_header", d: 6300 },
            { s: "b1_hero", d: 9300 },
            { s: "b1_grid", d: 10500 },
            { s: "b2_hero", d: 11100 },
            { s: "b2_grid", d: 12300 },
            { s: "complete", d: 13100 }
        ];

        const timers = sequence.map(item =>
            setTimeout(() => setStage(item.s as any), item.d)
        );

        const finalTimer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                setShouldRender(false);
                sessionStorage.setItem("mevreon_splash_seen", "true");
                document.documentElement.classList.add('splash-seen');
            }, 1000);
        }, 14100);

        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(finalTimer);
        };
    }, []);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] transition-opacity duration-1000 ease-in-out ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/10 blur-[180px] rounded-full animate-pulse" />
            </div>


            <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${stage === "intro" ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-[2.5] blur-3xl pointer-events-none"}`}>
                <h1 className="flex flex-col items-center gap-6">
                    <span className="text-5xl lg:text-7xl font-black tracking-[0.2em] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Mevreon.AI</span>
                    <div className="flex flex-col items-center">
                        <span className="text-xs lg:text-sm tracking-[0.6em] text-cyan-400 font-mono uppercase animate-pulse">Multimodal Data Platform</span>
                        <span className="text-[10px] lg:text-xs tracking-[0.4em] text-cyan-500/60 font-mono mt-1">AI-powered Digital Twin Engine</span>
                    </div>
                </h1>
            </div>

            <div className={`absolute inset-0 z-40 pointer-events-none opacity-[0.03] transition-opacity duration-500 ${stage.includes('hero') ? 'opacity-[0.01]' : 'opacity-[0.03]'}`}
                style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #000 3px, #000 3px)` }} />
            <div className={`absolute inset-0 z-40 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay transition-opacity duration-500 ${stage.includes('hero') ? 'opacity-[0.01]' : 'opacity-[0.02]'}`} />


            <div className={`relative w-full h-full p-4 lg:p-12 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] 
                ${stage === "intro" ? "opacity-0 scale-95 blur-xl" : "opacity-100 scale-100 blur-0"}
                ${!isVisible ? "opacity-0 scale-110 blur-3xl" : ""}
            `}>


                <div className="relative w-full h-[88vh] lg:h-[80vh] max-w-7xl mx-auto flex items-center justify-center">


                    <div className={`absolute z-50 flex flex-col items-center gap-4 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] 
                        ${stage === "bridge_header" ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10 pointer-events-none"}
                        ${(stage.startsWith('b') || stage === 'complete') ? "opacity-0 -translate-y-10 scale-110" : ""}
                    `}>
                        <h2 className="text-3xl lg:text-5xl font-bold tracking-[0.2em] text-white text-center drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                            What's Inside The <span className="text-cyan-400">Mevreon's AI Factory</span>
                        </h2>
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />
                    </div>


                    {(stage.startsWith('a') || stage === 'clear_a' || stage === 'intro') && (
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 h-full w-full">

                            <div className={`relative flex-1 flex flex-col gap-3 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter,clip-path]
                                ${(stage.startsWith('a1_') || stage.startsWith('a2_') || stage.startsWith('a3_')) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 scale-90 pointer-events-none"}
                                ${stage === "a1_hero" ? "fixed inset-0 z-50 p-6 lg:p-24 bg-[#020617]/98 scale-[1.12]" : "relative scale-100"}
                                ${stage === "clear_a" || stage === "bridge_header" || stage.startsWith('b') ? "opacity-0 -translate-y-24 scale-90 blur-xl transition-all duration-[1000ms]" : ""}
                            `} style={{ transform: 'translate3d(0,0,0)' }}>
                                <div className={`relative flex-1 border border-white/20 rounded-sm overflow-hidden bg-[#0A0F1A]/80 shadow-[0_0_20px_rgba(6,182,212,0.1)] animate-[float_6s_ease-in-out_infinite] glow-pulse backdrop-blur-md transition-all duration-[1200ms] ${stage === "a1_hero" ? "lens-shutter" : "light-sweep"}`}>
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 10l5-5m-5 5l-5-5m5 5l5 5m-5-5l-5 5' stroke='%2306b6d4' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />
                                    <Image src="/Photos/AI Mevreon Platform Slide a1.jpg.jpeg" alt="Module A1" fill className="object-contain scale-x-110" priority />
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-400/60" />
                                    <div className="absolute top-2 left-2 text-[8px] text-cyan-400 font-mono opacity-40">ALPHA_UNIT_1</div>
                                    <div className="absolute bottom-2 right-2 text-[6px] text-cyan-400/30 font-mono tracking-tighter">0x4F_A1_STABLE</div>
                                </div>
                                <span className={`text-[10px] lg:text-xs tracking-[0.5em] text-cyan-400 font-mono font-bold text-center transition-all duration-1000 ${stage === "a1_grid" || stage === "a2_hero" || stage === "a2_grid" || stage === "a3_hero" || stage === "a3_grid" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>Fragmented Data Ingestion</span>
                            </div>


                            <div className={`relative flex-1 flex flex-col gap-3 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter,clip-path]
                                ${stage.startsWith('a2_') || stage.startsWith('a3_') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 scale-90 pointer-events-none"}
                                ${stage === "a2_hero" ? "fixed inset-0 z-50 p-6 lg:p-24 bg-[#020617]/98 scale-[1.12]" : "relative scale-100"}
                                ${stage === "clear_a" || stage === "bridge_header" || stage.startsWith('b') ? "opacity-0 -translate-y-24 scale-90 blur-xl transition-all duration-[1000ms]" : ""}
                            `} style={{ transform: 'translate3d(0,0,0)' }}>
                                <div className={`relative flex-1 border border-cyan-500/40 rounded-sm overflow-hidden bg-[#0A1629]/90 shadow-[0_0_30px_rgba(6,182,212,0.2)] animate-[float_8s_ease-in-out_infinite_1s] glow-pulse-cyan backdrop-blur-lg transition-all duration-[1200ms] ${stage === "a2_hero" ? "lens-shutter" : "light-sweep"}`}>
                                    <Image src="/Photos/AI Mevreon Platform Slide a2.jpg.jpeg" alt="Core A2" fill className="object-contain scale-x-110" priority />
                                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-500" />
                                    <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-500" />
                                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-500" />
                                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-500" />
                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[6px] text-cyan-400/50 font-mono">CPU_LOAD: 2.45ms // CORE_ID: MV-9000</div>
                                    <div className="absolute top-0 inset-x-0 h-[1px] bg-cyan-400/40 blur-sm animate-[scan_2s_linear_infinite]" />
                                </div>
                                <span className={`text-[11px] lg:text-sm tracking-[0.5em] text-cyan-500 font-mono font-bold text-center drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all duration-1000 ${stage === "a2_grid" || stage === "a3_hero" || stage === "a3_grid" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>Mevreon Platform Core</span>
                            </div>


                            <div className={`relative flex-1 flex flex-col gap-2 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter,clip-path]
                                ${stage.startsWith('a3_') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 scale-90 pointer-events-none"}
                                ${stage === "a3_hero" ? "fixed inset-0 z-50 p-6 lg:p-24 bg-[#020617]/98 scale-[1.12]" : "relative scale-100"}
                                ${stage === "clear_a" || stage === "bridge_header" || stage.startsWith('b') ? "opacity-0 -translate-y-24 scale-90 blur-xl transition-all duration-[1000ms]" : ""}
                            `} style={{ transform: 'translate3d(0,0,0)' }}>
                                <div className={`relative flex-1 border border-white/20 rounded-sm overflow-hidden bg-[#0A0F1A]/80 shadow-[0_0_20px_rgba(6,182,212,0.1)] animate-[float_9s_ease-in-out_infinite_2s] glow-pulse backdrop-blur-md transition-all duration-[1200ms] ${stage === "a3_hero" ? "lens-shutter" : "light-sweep"}`}>
                                    <Image src="/Photos/AI Mevreon Platform Slide a3.jpg.jpeg" alt="Module A3" fill className="object-contain scale-x-110" priority />
                                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400/60" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-400/60" />
                                    <div className="absolute top-2 right-2 text-[8px] text-cyan-400 font-mono opacity-40">GAMMA_R_A3</div>
                                </div>
                                <span className={`text-[10px] lg:text-xs tracking-[0.5em] text-cyan-400 font-mono font-bold text-center opacity-60 transition-all duration-1000 ${stage === "a3_grid" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>Synthesis Engine</span>
                            </div>
                        </div>
                    )}


                    {(stage.startsWith('b') || stage === 'complete') && (
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 h-full w-full">

                            <div className={`relative flex-1 flex flex-col gap-3 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter,clip-path]
                                ${(stage.startsWith('b1_') || stage.startsWith('b2_') || stage === 'complete') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 scale-90 pointer-events-none"}
                                ${stage === "b1_hero" ? "fixed inset-0 z-50 p-6 lg:p-24 bg-[#020617]/98 scale-[1.12]" : "relative scale-100"}
                            `} style={{ transform: 'translate3d(0,0,0)' }}>
                                <div className={`relative flex-1 border border-white/20 rounded-sm overflow-hidden bg-[#0A0F1A]/80 shadow-[0_0_20px_rgba(6,182,212,0.1)] animate-[float_7s_ease-in-out_infinite_0.5s] glow-pulse backdrop-blur-md transition-all duration-[1200ms] ${stage === "b1_hero" ? "lens-shutter" : "light-sweep"}`}>
                                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] bg-[size:10px_10px]" />
                                    <Image src="/Photos/AI Mevreon Platfsormb1.jpeg" alt="Lower Base B1" fill className="object-contain scale-x-110" priority />
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-400/60" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-400/60" />
                                    <div className="absolute bottom-2 left-2 text-[8px] text-cyan-400 font-mono opacity-40">BASE_INIT_B1</div>
                                </div>
                                <span className={`text-[11px] lg:text-sm tracking-[0.7em] text-cyan-400 font-mono font-bold text-center opacity-70 transition-all duration-1000 ${stage === "b1_grid" || stage === "b2_hero" || stage === "b2_grid" || stage === "complete" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>AI-Factory Simulation Layer</span>
                            </div>


                            <div className={`relative flex-1 flex flex-col gap-2 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter,clip-path]
                                ${stage.startsWith('b2_') || stage === 'complete' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 scale-90 pointer-events-none"}
                                ${stage === "b2_hero" ? "fixed inset-0 z-50 p-6 lg:p-24 bg-[#020617]/98 scale-[1.12]" : "relative scale-100"}
                            `} style={{ transform: 'translate3d(0,0,0)' }}>
                                <div className={`relative flex-1 border border-white/20 rounded-sm overflow-hidden bg-[#0A0F1A]/80 shadow-[0_0_20px_rgba(6,182,212,0.1)] animate-[float_10s_ease-in-out_infinite_1.5s] glow-pulse backdrop-blur-md transition-all duration-[1200ms] ${stage === "b2_hero" ? "lens-shutter" : "light-sweep"}`}>
                                    <Image src="/Photos/AI Mevreon Platform Slide b2.jpg.jpeg" alt="Module B2" fill className="object-contain scale-x-110" priority />
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-400/60" />
                                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-400/60" />
                                    <div className="absolute bottom-2 right-2 text-[8px] text-cyan-400 font-mono opacity-40">GAMMA_R_B2</div>
                                </div>
                                <span className={`text-[10px] lg:text-xs tracking-[0.5em] text-cyan-400 font-mono font-bold text-center opacity-60 transition-all duration-1000 ${stage === "b2_grid" || stage === "complete" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>Decision Packs</span>


                            </div>
                        </div>
                    )}
                </div>


                <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-cyan-400/20" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-cyan-400/20" />


                <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 w-full transition-opacity duration-1000 ${stage !== "intro" ? "opacity-100" : "opacity-0"}`}>
                    <div className="flex gap-4">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: `${i * 0.15}s` }} />
                        ))}
                    </div>
                    <p className="text-[10px] tracking-[0.6em] text-cyan-400 font-mono font-bold uppercase transition-all duration-500">
                        {stage.includes("a1") && "Initializing Ingestion Module"}
                        {stage.includes("a2") && "Bootstrapping Neural Core"}
                        {stage.includes("a3") && "Optimizing Synthesis Engine"}
                        {stage === "clear_a" && "Sequencing Base Units"}
                        {stage.includes("b1") && "Activating Simulation Layer"}
                        {stage.includes("b2") && "Compiling Decision Packs"}
                        {stage === "complete" && "All Systems Nominal"}
                        {stage === "intro" && "System Initializing"}
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { top: -10%; }
                    100% { top: 110%; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    33% { transform: translateY(-3px) rotate(0.2deg); }
                    66% { transform: translateY(2px) rotate(-0.1deg); }
                }
                .glow-pulse {
                    animation: glow-pulse 4s ease-in-out infinite;
                }
                .glow-pulse-cyan {
                    animation: glow-pulse-cyan 3s ease-in-out infinite;
                }
                @keyframes glow-pulse {
                    0%, 100% { box-shadow: 0 0 20px rgba(6,182,212,0.05); border-color: rgba(255,255,255,0.1); }
                    50% { box-shadow: 0 0 40px rgba(6,182,212,0.15); border-color: rgba(255,255,255,0.3); }
                }
                @keyframes glow-pulse-cyan {
                    0%, 100% { box-shadow: 0 0 30px rgba(6,182,212,0.1); border-color: rgba(6,182,212,0.2); }
                    50% { box-shadow: 0 0 60px rgba(6,182,212,0.3); border-color: rgba(6,182,212,0.5); }
                }
                .lens-shutter {
                    animation: shutter-open 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards,
                               focus-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .light-sweep::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%);
                    animation: sweep 3s infinite;
                    animation-delay: 0.8s;
                }
                @keyframes shutter-open {
                    0% { clip-path: inset(48% 0 48% 0); opacity: 0; }
                    40% { opacity: 1; }
                    100% { clip-path: inset(0 0 0 0); opacity: 1; }
                }
                @keyframes focus-in {
                    0% { filter: blur(12px); }
                    100% { filter: blur(0px); }
                }
                @keyframes sweep {
                    0% { transform: translate3d(-100%, 0, 0); }
                    50%, 100% { transform: translate3d(100%, 0, 0); }
                }
            `}</style>
        </div >
    );
};

export default SplashScreen;
