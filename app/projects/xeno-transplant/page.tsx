"use client";

import React from 'react';
import BackButton from '@/components/BackButton';
import BioCanvas from '@/components/BioCanvas';

export default function XenoTransplantPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500/30">
            <div className="fixed inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-pink-900/20 mix-blend-color z-10 pointer-events-none" />
                <BioCanvas />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                <BackButton />

                <header className="mb-24">
                    <p className="text-pink-500 font-mono text-xs mb-4">PROJECT ID: 02 // XENO_TRANSPLANT</p>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-r from-white via-pink-200 to-purple-500 bg-clip-text text-transparent">
                        XENO<br />TRANSPLANT
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed border-l-4 border-pink-500 pl-6">
                        Eliminating the donor waitlist. Bio-printing functional, fully vascularized human organs on demand.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                    <div className="relative order-2 md:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-3xl blur-xl" />
                        <div className="relative h-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-pink-400 mb-1">24h</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/50">PRINT TIME</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-purple-400 mb-1">0%</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/50">REJECTION RATE</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl text-center col-span-2">
                                    <div className="text-3xl font-bold text-white mb-1">Kidney, Heart, Liver</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/50">AVAILABLE TEMPLATES</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12 order-1 md:order-2">
                        <section>
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-pink-500 rounded-full" />
                                THE PARADIGM SHIFT
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                We utilize patient-specific stem cells to print scaffolding and tissue simultaneously. This ensures 100% genetic compatibility, removing the need for lifelong immunosuppressants.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-pink-500 rounded-full" />
                                VASCULARIZATION
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                The biggest hurdle in tissue engineering was blood flow. Our proprietary 'Fractal Flow' algorithm generates micro-capillaries that mimic nature&apos;s efficiency, keeping printed organs alive and functional.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
