"use client";

import React from 'react';
import BackButton from '@/components/BackButton';
import BioCanvas from '@/components/BioCanvas';

export default function ChronosStasisPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500/30">
            <div className="fixed inset-0 z-0 opacity-30">
                <div className="absolute inset-0 bg-amber-900/20 mix-blend-color z-10 pointer-events-none" />
                <BioCanvas />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
                <BackButton />

                <header className="mb-24">
                    <p className="text-amber-600 font-mono text-xs mb-4">PROJECT ID: 04 // CHRONOS_STASIS</p>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-r from-white via-amber-200 to-orange-500 bg-clip-text text-transparent">
                        CHRONOS<br />STASIS
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed border-l-4 border-amber-500 pl-6">
                        The Chronos-Stasis project aims to suspend biological decay, extending the &quot;golden hour&quot; for trauma patients and enabling deep-space travel. By controlling cellular metabolism at the quantum level, we&apos;re redefining the limits of human endurance.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                    <div className="relative order-2 md:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-3xl blur-xl" />
                        <div className="relative h-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center">

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm font-bold text-amber-500 mb-2">
                                        <span>METABOLIC RATE</span>
                                        <span>5%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[5%] bg-amber-500" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm font-bold text-amber-500 mb-2">
                                        <span>O2 CONSUMPTION</span>
                                        <span>2%</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[2%] bg-amber-500" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm font-bold text-amber-500 mb-2">
                                        <span>SURVIVAL WINDOW</span>
                                        <span>+48 HOURS</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-[100%] bg-amber-500 animate-pulse" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="space-y-12 order-1 md:order-2">
                        <section>
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                                EMERGENCY PRESERVATION
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Trauma patients often bleed out before surgery is possible. Chronos Stasis cools the body and replaces blood with a saline bio-preservative, pausing cellular decay for up to 48 hours.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                                LONG DURATION SLEEP
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Adaptation for interstellar travel is underway. By cycling metabolic states, we aim to enable safe, drug-free hibernation for months or years.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
