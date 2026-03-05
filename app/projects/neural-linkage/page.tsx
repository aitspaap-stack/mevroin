"use client";

import BackButton from '@/components/BackButton';
import BioCanvas from '@/components/BioCanvas';

export default function NeuralLinkagePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
            <div className="fixed inset-0 z-0 opacity-30">
                {/* Reusing BioCanvas for consistency but maybe we can overlay a blue filter */}
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-color z-10 pointer-events-none" />
                <BioCanvas />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
                <BackButton />

                <header className="mb-24">
                    <p className="text-cyan-500 font-mono text-xs mb-4">PROJECT ID: 01 // NEURAL_LINKAGE</p>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-r from-white via-cyan-200 to-blue-500 bg-clip-text text-transparent">
                        NEURAL<br />LINKAGE
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed border-l-4 border-cyan-500 pl-6">
                        Bridging the biological gap. The first high-bandwidth, bidirectional interface between the human cortex and silicon intelligence.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                                THE CHALLENGE
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                Traditional BCIs rely on invasive probes that cause tissue damage or non-invasive EEGs with poor resolution. We needed a way to interpret millions of neuron firings in real-time without physical degradation.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                                OUR SOLUTION
                            </h3>
                            <p className="text-white/70 leading-relaxed">
                                A flexible, mesh-like &quot;neural lace&quot; injected via the vascular system. It unfolds to coat the cortex, detecting electrical signals at the capillary level. No craniotomy required.
                            </p>
                        </section>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-3xl blur-xl" />
                        <div className="relative h-full bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
                            <div className="font-mono text-xs text-white/30 mb-8">
                                STATUS: CLINICAL TRIALS PHASE II
                                <br />
                                SUBJECTS: 12
                                <br />
                                LATENCY: &lt; 4ms
                            </div>

                            <div className="space-y-4">
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[92%] bg-cyan-500 animate-pulse" />
                                </div>
                                <div className="flex justify-between text-xs font-bold text-cyan-400">
                                    <span>SIGNAL FIDELITY</span>
                                    <span>92%</span>
                                </div>

                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[100%] bg-blue-500" />
                                </div>
                                <div className="flex justify-between text-xs font-bold text-blue-400">
                                    <span>BIOCOMPATIBILITY</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
