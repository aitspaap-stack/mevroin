"use client";

import React from 'react';
import BackButton from '@/components/BackButton';
import BioCanvas from '@/components/BioCanvas';

export default function NanoSentinelPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30">
            <div className="fixed inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-emerald-900/20 mix-blend-color z-10 pointer-events-none" />
                <BioCanvas />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                <BackButton />

                <header className="mb-24">
                    <p className="text-emerald-500 font-mono text-xs mb-4">PROJECT ID: 03 // NANO_SENTINEL</p>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-r from-white via-emerald-200 to-teal-500 bg-clip-text text-transparent">
                        NANO<br />SENTINEL
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed border-l-4 border-emerald-500 pl-6">
                        Programmable immunity. A swarm of autonomous nanobots that hunt pathogens and repair cell damage at the molecular level.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                ACTIVE DEFENSE
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Natural immunity is reactive. Nano Sentinels are proactive. They constantly patrol the bloodstream, identifying viral signatures and neutralizing threats before symptoms appear.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                TARGETED ONCOLOGY
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Instead of flooding the body with toxic chemotherapy, Sentinels deliver payloads directly to cancer cells, sparing healthy tissue and eliminating side effects.
                            </p>
                        </section>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-3xl blur-xl" />
                        <div className="relative h-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center">

                            <div className="w-48 h-48 rounded-full border-4 border-emerald-500/30 flex items-center justify-center relative mb-8">
                                <div className="absolute inset-0 border-t-4 border-emerald-400 rounded-full animate-spin" />
                                <div className="text-4xl font-bold text-white">5M+</div>
                            </div>
                            <p className="text-sm font-bold text-white/60 tracking-widest uppercase">ACTIVE BOTS PER DOSE</p>

                            <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                                <div className="text-xs text-white/40">SIZE: <span className="text-emerald-400">50nm</span></div>
                                <div className="text-xs text-white/40">POWER: <span className="text-emerald-400">ATP Clamping</span></div>
                                <div className="text-xs text-white/40">COMMS: <span className="text-emerald-400">Ultrasound</span></div>
                                <div className="text-xs text-white/40">LIFESPAN: <span className="text-emerald-400">2 Weeks</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
