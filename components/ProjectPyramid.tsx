"use client";

import React from 'react';

export default function ProjectPyramid() {
    const project = {
        title: "From multimodal data to repeatable decision packs.",
        subtitle: "Built for scale across programs: multiple twins per disease, protocol, and endpoint.",
        description: "",
        steps: [
            {
                number: "01",
                title: "OmniTwin",
                subtitle: "AI Platform",
                description: "A scalable discovery and simulation platform to accelerate therapeutic design and decision-making.",
                detail: "Turns multimodal evidence into repeatable, deployable “decision packs” across programs.",
                icon: "1",
                color: "#06b6d4",
                images: ["/Photos/step1.1.png", "/Photos/step1.2.png"],
                features: [
                    "Multi-source data integration",
                    "Real-time processing pipeline",
                    "Automated quality control",
                    "Privacy-by-design security & governance"
                ]
            },
            {
                number: "02",
                title: "Digital Twin",
                subtitle: "Disease progression + therapy simulation",
                description: "Patient- and cohort-level twins that model disease progression over time.",
                detail: "Run therapy “what-if” simulations to estimate response, risk, and strategy tradeoffs—packaged as decision-ready evidence.",
                icon: "2",
                color: "#8b5cf6",
                images: ["/Photos/step2.1.png", "/Photos/step2.2.png", "/Photos/step2.3.png", "/Photos/step2.4.png"],
                features: [
                    "Longitudinal progression modeling",
                    "Therapy response simulation",
                    "Uncertainty & risk scoring",
                    "Clinician-in-the-loop review"
                ]
            },
            {
                number: "03",
                title: "Synthetic Data",
                subtitle: "with Privacy Preserving",
                description: "Generates privacy-safe synthetic datasets to unlock scarce, sensitive clinical data.",
                detail: "Generate privacy-safe synthetic datasets to accelerate development and validation without exposing patient identities.",
                icon: "3",
                color: "#ec4899",
                images: ["/Photos/step3.1.png", "/Photos/step3.2.png"],
                features: [
                    "Privacy-safe synthetic cohorts",
                    "De-ID + governance controls",
                    "Retrospective validation support",
                    "Training data expansion (when permitted)"
                ]
            },
            {
                number: "04",
                title: "Multimodal AI",
                subtitle: "Harness Imaging, Omics, EHR",
                description: "Fuses imaging, omics, and EHR/clinical records into a single intelligence layer.",
                detail: "Extract structured signal from complex clinical data to power stratification, endpoints, and simulation inputs.",
                icon: "4",
                color: "#f59e0b",
                images: ["/Photos/step4.1.png", "/Photos/step4.2.png", "/Photos/step4.3.png"],
                features: [
                    "Operational dashboards",
                    "Protocol optimization",
                    "Patient stratification",
                    "Outcome prediction"
                ]
            }
        ]
    };

    return (
        <section id="projects" className="relative min-h-screen w-full bg-slate-950 overflow-hidden py-12 md:py-20 flex items-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,1)_0%,rgba(15,23,42,0.8)_50%,rgba(2,6,23,1)_100%)] pointer-events-none" />
            <div className="absolute top-[5%] left-[15%] w-96 h-96 rounded-full blur-[120px] bg-cyan-500/15" />
            <div className="absolute top-[35%] right-[10%] w-96 h-96 rounded-full blur-[120px] bg-purple-500/15" />
            <div className="absolute bottom-[35%] left-[10%] w-96 h-96 rounded-full blur-[120px] bg-pink-500/15" />
            <div className="absolute bottom-[5%] right-[15%] w-96 h-96 rounded-full blur-[120px] bg-amber-500/15" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
                        <span className="text-xs font-mono text-cyan-400/80 tracking-[0.3em] uppercase">Core Technology</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                            {project.title}
                        </span>
                    </h2>
                    <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto font-light mb-2">
                        {project.subtitle}
                    </p>
                    <p className="text-xs md:text-sm text-white/30 max-w-3xl mx-auto">
                        {project.description}
                    </p>
                </div>
                <div className="relative max-w-5xl mx-auto">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 via-pink-500/50 to-amber-500/50 hidden md:block -translate-x-1/2" />
                    <div className="space-y-8 md:space-y-12">
                        {project.steps.map((step, index) => {
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                        <div
                                            className="group relative rounded-2xl md:rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-slate-950 backdrop-blur-xl border-2 overflow-hidden transition-all duration-300"
                                            style={{
                                                borderColor: `${step.color}40`,
                                                boxShadow: `0 0 60px ${step.color}25, 0 20px 40px -15px rgba(0,0,0,0.6)`
                                            }}
                                        >
                                            <div
                                                className="absolute top-0 left-0 right-0 h-1"
                                                style={{
                                                    background: `linear-gradient(90deg, ${step.color}, ${step.color}80, ${step.color})`
                                                }}
                                            />
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                                                style={{
                                                    background: `radial-gradient(circle at ${isEven ? 'right' : 'left'}, ${step.color}40, transparent 70%)`
                                                }}
                                            />
                                            <div className={`relative z-10 p-6 md:p-8 space-y-4 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                                                <div className={`flex items-start gap-4 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row`}>
                                                    <div
                                                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-4xl md:text-5xl flex-shrink-0 transition-transform duration-300"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${step.color}40, ${step.color}20)`,
                                                            border: `2px solid ${step.color}60`,
                                                            boxShadow: `0 0 40px ${step.color}40, inset 0 0 30px ${step.color}20`
                                                        }}
                                                    >
                                                        {step.icon}
                                                    </div>
                                                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} text-left`}>
                                                        <h3
                                                            className="text-3xl md:text-4xl font-black tracking-tight mb-1"
                                                            style={{
                                                                color: step.color,
                                                                textShadow: `0 0 30px ${step.color}50`
                                                            }}
                                                        >
                                                            {step.title}
                                                        </h3>
                                                        <p className="text-xs md:text-sm font-bold text-white/60 uppercase tracking-wider">
                                                            {step.subtitle}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`h-0.5 w-20 rounded-full ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}
                                                    style={{
                                                        background: `linear-gradient(to ${isEven ? 'left' : 'right'}, ${step.color}, transparent)`
                                                    }}
                                                />
                                                <p className={`text-sm md:text-base text-white/70 leading-relaxed ${isEven ? 'md:text-right' : 'md:text-left'} text-left`}>
                                                    {step.description}
                                                </p>
                                                {step.images && step.images.length > 0 && (
                                                    <div className={`flex flex-wrap gap-2 pt-3 ${isEven ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                                                        {step.images.map((image, imgIdx) => (
                                                            <div
                                                                key={imgIdx}
                                                                className="group/icon relative w-20 h-20 md:w-22 md:h-22 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-110 hover:-translate-y-1 flex-shrink-0"

                                                                style={{
                                                                    borderColor: `${step.color}50`,
                                                                    backgroundColor: `${step.color}10`,
                                                                    boxShadow: `0 0 15px ${step.color}30`
                                                                }}
                                                            >
                                                                <img
                                                                    src={image}
                                                                    alt={`${step.title} - Icon ${imgIdx + 1}`}
                                                                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover/icon:scale-110"
                                                                />
                                                                <div
                                                                    className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                                    style={{
                                                                        background: `radial-gradient(circle at center, ${step.color}40, transparent 70%)`,
                                                                        boxShadow: `0 0 25px ${step.color}60`
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 ${isEven ? 'md:grid-flow-row-dense' : ''}`}>
                                                    {step.features.map((feature, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 transition-all duration-200 ${isEven ? 'md:flex-row-reverse md:text-right' : ''
                                                                }`}
                                                        >
                                                            <div
                                                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                                style={{
                                                                    backgroundColor: step.color,
                                                                    boxShadow: `0 0 10px ${step.color}`
                                                                }}
                                                            />
                                                            <span className="text-xs text-white/60 font-medium">
                                                                {feature}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 items-center justify-center z-20">
                                        <div
                                            className="relative w-12 h-12 rounded-full flex items-center justify-center font-black text-lg border-4 border-slate-950"
                                            style={{
                                                backgroundColor: step.color,
                                                boxShadow: `0 0 30px ${step.color}80, 0 0 60px ${step.color}40`
                                            }}
                                        >
                                            <span className="text-slate-950">{step.number}</span>
                                        </div>
                                    </div>
                                    <div className={`hidden md:flex w-[calc(50%-2rem)] flex-col gap-6 ${isEven ? 'md:items-start' : 'md:items-end'}`}>
                                        <div
                                            className="p-8 rounded-2xl border-l-4 bg-slate-900/40 backdrop-blur-md animate-[shutter-open_0.8s_ease-out_both]"
                                            style={{
                                                borderColor: step.color,
                                                boxShadow: `inset 0 0 40px ${step.color}10`
                                            }}
                                        >
                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: step.color }} />
                                                    <span className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-[0.4em]">Integrated Dashboard</span>
                                                </div>
                                                <p className="text-xl lg:text-2xl font-black text-white leading-tight tracking-tight">
                                                    {step.description}
                                                </p>
                                                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />
                                                <p className="text-sm lg:text-base text-cyan-400 font-mono leading-relaxed uppercase tracking-wider">
                                                    {step.detail}
                                                </p>
                                                <div className="flex gap-4 mt-4 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                                                    <div className="px-3 py-1 border border-white/20 text-[8px] font-mono text-white/40 uppercase">IX-Unit-{(index + 1).toString().padStart(2, '0')}</div>
                                                    <div className="px-3 py-1 border border-white/20 text-[8px] font-mono text-white/40 uppercase">Mevreon-{(1000 * (index + 1)).toString()}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {index < project.steps.length - 1 && (
                                        <div className="md:hidden flex justify-center w-full">
                                            <div
                                                className="w-0.5 h-8 rounded-full"
                                                style={{
                                                    background: `linear-gradient(to bottom, ${step.color}80, ${project.steps[index + 1].color}80)`
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-12 md:mt-16 text-center">
                    <div className="inline-flex flex-col items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="text-lg font-mono text-white/90 uppercase tracking-widest">
                            Harnessing physics-driven AI + synthetic data to speed cures – breaking data silos without compromising privacy
                        </span>
                        <span className="text-md font-mono text-white/90 uppercase tracking-widest text-yellow-500">
                            Building a global digital twin factory for trial operations and precision medicine—privacy-first, validation-driven, deployment-ready.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
