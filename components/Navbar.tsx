"use client";

import React, { useState, useEffect } from 'react';
import NextImage from "next/image";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            <nav className={`fixed top-2 md:top-4 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'translate-y-[-5px]' : ''}`}>
                <div className="max-w-[98%] md:max-w-7xl mx-auto">
                    <div className="relative bg-slate-900/60 backdrop-blur-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] rounded-full px-3 py-2 md:px-6 md:py-3 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr]">
                        
                        {/* Left Side: Logo (Desktop) / Hamburger (Mobile) */}
                        <div className="flex justify-start items-center">
                            {/* Hamburger: Mobile Only */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="p-2 md:p-3 hover:bg-white/10 rounded-full transition-colors group"
                                >
                                    <div className="flex flex-col gap-1.5 w-6">
                                        <span className="w-full h-0.5 bg-white group-hover:bg-cyan-200 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                        <span className="w-2/3 h-0.5 bg-white group-hover:w-full transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                    </div>
                                </button>
                            </div>

                            {/* Logo: Desktop Only */}
                            <div 
                                className="hidden lg:flex items-center cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                <NextImage
                                    src="/Mevreon Logo.png"
                                    alt="Mevreon"
                                    width={160}
                                    height={60}
                                    className="h-9 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                />
                            </div>
                        </div>

                        {/* Center Side: Logo (Mobile Only) */}
                        <div className="flex justify-center items-center">
                            <div 
                                className="lg:hidden flex items-center cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                <NextImage
                                    src="/Mevreon Logo.png"
                                    alt="Mevreon"
                                    width={140}
                                    height={50}
                                    className="h-5 md:h-7 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                                />
                            </div>
                        </div>

                        {/* Right Side: Links (Desktop) / Spacer (Mobile) */}
                        <div className="flex justify-end items-center">
                            <div className="hidden lg:flex items-center gap-2 xl:gap-4 ml-4">
                                <div className="flex items-center gap-1 xl:gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 shadow-inner">
                                    {['About', 'Platform', 'Why Mevreon', 'Team', 'Advisory', 'Book Demo'].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => scrollTo(item.toLowerCase().replace(' ', '-'))}
                                            className="px-2 py-1 text-[9px] xl:text-[11px] font-bold text-white/80 hover:text-cyan-300 uppercase tracking-widest transition-colors whitespace-nowrap"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Mobile Spacer to keep logo centered */}
                            <div className="lg:hidden w-10 md:w-12" />
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`menu-overlay fixed inset-0 z-[101] bg-slate-900/90 backdrop-blur-2xl duration-500 transition-all ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="menu-close absolute top-4 right-4 md:top-8 md:right-8 text-white p-3 md:p-4 hover:rotate-90 transition-transform duration-300"
                >
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="flex flex-col items-center justify-center h-full gap-6 md:gap-8 px-4">
                    {['About', 'Platform', 'Why Mevreon', 'Team', 'Advisory', 'Book Demo'].map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                scrollTo(item.toLowerCase().replace(' ', '-'));
                                setIsOpen(false);
                            }}
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

export default Navbar;
