"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ScrollytellingHeroProps {
    onComplete?: () => void;
}


type StoryBeat = {
    range: [number, number];
    title: string;
    subtitle: string;
    bullets?: string[];
    align: 'left' | 'right' | 'center';
    position: 'top' | 'center' | 'bottom';
    showCTA?: boolean;
    frameIndex: number;
    primaryCTA?: { label: string; href: string };
    secondaryCTA?: { label: string; href: string };
    footer?: string;
};

const STORY_BEATS: StoryBeat[] = [
    {
        range: [0, 0.15],
        title: "Mevreon AI Factory for Precision Medicine & Clinical Trials.",
        subtitle: "Turn fragmented EHR, imaging, and omics into simulation-backed, audit-ready decision packs.\nSupport screening, cohort design, and early risk detection—with clinician oversight.",
        footer: "Decision-support platform; validation programs in progress with clinical partners.",
        align: "left",
        position: "center",
        frameIndex: 0,
    },
    {
        range: [0.2, 0.35],
        title: "Mechanistic + AI Simulation Models",
        subtitle: "Combine mechanistic disease models with data-driven learning to simulate progression/response and quantify risk—beyond black-box predictions.",
        align: "right",
        position: "center",
        frameIndex: 1,
    },
    {
        range: [0.4, 0.55],
        title: "Patient to ecosystem digital twins",
        subtitle: "Build longitudinal patient state with provenance, then simulate cohorts to test ‘what-if’ decisions across protocols and endpoints.",
        align: "left",
        position: "center",
        frameIndex: 2,
    },
    {
        range: [0.6, 0.75],
        title: "Privacy-First Data Fabric (De-ID + Synthetic)",
        subtitle: "Enable collaboration, validation, and model development using de-identified data and privacy-safe synthetic datasets—without exposing patient identities.",
        align: "right",
        position: "center",
        frameIndex: 3,
    },
    {
        range: [0.8, 0.9],
        title: "Cutting-Edge Acceleration",
        subtitle: "Bridging the gap between biological data and human outcomes.",
        bullets: [
            "Faster screening & eligibility prioritization (reduce screen-fail and manual review).",
            "More consistent cohorts across sites (reduce protocol drift and amendments).",
            "Earlier risk signals for non-response and safety (support proactive decisions)."
        ],
        align: "left",
        position: "center",
        frameIndex: 4,
        primaryCTA: { label: "Request a Demo", href: "#" },
        secondaryCTA: { label: "Explore the Platform", href: "#" }
    },
    {
        range: [0.93, 1.0],
        title: "The Execution Gap",
        subtitle: "Trial evidence is fragmented across clinical notes, scans, labs, and molecular tests—so teams make high-stakes decisions with partial context. Mevreon turns this fragmented evidence into simulation-backed decision packs to act earlier.",
        align: "left",
        position: "center",
        frameIndex: 5,
    },
];

const FRAME_IMAGES = [
    '/sequence/frame_01.png',
    '/sequence/frame_02.png',
    '/sequence/frame_03.png',
    '/sequence/frame_04.png',
    '/sequence/frame_0d5.png',
    '/sequence/frame_0ss45.png',
];

const ScrollytellingHero: React.FC<ScrollytellingHeroProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const targetProgress = useRef(0);
    const smoothProgress = useRef(0);
    const [isHeroVisible, setIsHeroVisible] = useState(true);
    const [currentBeat, setCurrentBeat] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(false);
    const frameRef = useRef<number>(0);
    const lastSize = useRef({ w: 0, h: 0, dpr: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [showScrollHint, setShowScrollHint] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(
                window.innerWidth < 768 ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            );
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('touchstart', () => setShowScrollHint(false), { passive: true });
        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('touchstart', () => setShowScrollHint(false));
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsHeroVisible(entry.isIntersecting);
        }, { rootMargin: '200px' });

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const TOTAL_FRAMES = FRAME_IMAGES.length;
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);



    const smoothScrollTo = useCallback((targetY: number, duration: number = 50) => {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();

        const easeInOutCubic = (t: number) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);

            window.scrollTo(0, startY + distance * easedProgress);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, []);

    useEffect(() => {
        let loadedCount = 0;
        imagesRef.current = [];

        FRAME_IMAGES.forEach((src, index) => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                setLoadProgress(loadedCount / FRAME_IMAGES.length);
                if (loadedCount === FRAME_IMAGES.length) {
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                console.warn(`Failed to load: ${src}`);
                loadedCount++;
                setLoadProgress(loadedCount / FRAME_IMAGES.length);
            };
            img.src = src;
            imagesRef.current[index] = img;
        });
    }, []);

    const drawFrame = useCallback((progress: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, rect.width, rect.height);
        const currentBeatIndex = STORY_BEATS.findIndex(b => progress >= b.range[0] && progress <= b.range[1]);

        let transitionProgress = 0;
        let currentFrameIndex = 0;
        let nextFrameIndex = 0;

        if (currentBeatIndex !== -1) {
            currentFrameIndex = STORY_BEATS[currentBeatIndex].frameIndex;
            nextFrameIndex = currentFrameIndex;
            transitionProgress = 0;
        } else {
            for (let i = 0; i < STORY_BEATS.length - 1; i++) {
                const prevBeat = STORY_BEATS[i];
                const nextBeat = STORY_BEATS[i + 1];
                if (progress > prevBeat.range[1] && progress < nextBeat.range[0]) {
                    currentFrameIndex = prevBeat.frameIndex;
                    nextFrameIndex = nextBeat.frameIndex;

                    const gapStart = prevBeat.range[1];
                    const gapEnd = nextBeat.range[0];
                    transitionProgress = (progress - gapStart) / (gapEnd - gapStart);
                    break;
                }
            }
        }
        let withinBeatProgress = 0;
        if (currentBeatIndex !== -1) {
            const range = STORY_BEATS[currentBeatIndex].range;
            withinBeatProgress = (progress - range[0]) / (range[1] - range[0]);
        }

        const time = Date.now() * 0.001;

        const drawImageWithTransform = (
            img: HTMLImageElement,
            scale: number = 1,
            offsetX: number = 0,
            offsetY: number = 0,
            rotation: number = 0,
            alpha: number = 1
        ) => {
            if (!img.complete || img.width === 0) return;

            ctx.save();
            ctx.globalAlpha = alpha;

            const imgRatio = img.width / img.height;
            const canvasRatio = rect.width / rect.height;
            let drawWidth, drawHeight;

            if (imgRatio > canvasRatio) {
                drawWidth = rect.width * 0.80;
                drawHeight = drawWidth / imgRatio;
            } else {
                drawHeight = rect.height * 0.80;
                drawWidth = drawHeight * imgRatio;
            }

            const centerX = rect.width / 2 + offsetX;
            const centerY = isMobile
                ? rect.height * 0.28 + offsetY
                : rect.height / 2 + offsetY + 50;

            ctx.translate(centerX, centerY);
            ctx.rotate(rotation);
            const finalScale = isMobile ? scale * 0.85 : scale;
            ctx.scale(finalScale, finalScale);

            ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);

            ctx.globalCompositeOperation = 'destination-in';

            const maskWidth = drawWidth * 1.1;
            const maskHeight = drawHeight * 1.1;

            const edgeMask = ctx.createRadialGradient(
                0, 0, Math.min(drawWidth, drawHeight) * 0.2,
                0, 0, Math.max(drawWidth, drawHeight) * 0.55
            );

            edgeMask.addColorStop(0, 'rgba(255,255,255,1)');
            edgeMask.addColorStop(0.6, 'rgba(255,255,255,0.9)');
            edgeMask.addColorStop(1, 'rgba(255,255,255,0)');

            ctx.fillStyle = edgeMask;
            ctx.fillRect(-maskWidth, -maskHeight, maskWidth * 2, maskHeight * 2);

            ctx.restore();
        };

        const drawMorphParticles = (fromProgress: number, intensity: number) => {
            const particleCount = 120;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            for (let i = 0; i < particleCount; i++) {
                const baseAngle = (i / particleCount) * Math.PI * 2;
                const baseRadius = Math.min(rect.width, rect.height) * 0.4;

                const spreadFactor = 1 - fromProgress * 0.8;
                const orbitSpeed = time * 0.3 + fromProgress * 2;

                const angle = baseAngle + orbitSpeed + Math.sin(i * 0.5) * 0.5;
                const radius = baseRadius * spreadFactor * (0.3 + Math.sin(i * 0.3 + time) * 0.3);

                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius * 0.7;

                const size = 2 + fromProgress * 2 + Math.sin(i + time * 2) * 1;
                const particleAlpha = intensity * (0.4 + Math.sin(i * 0.2 + time) * 0.2);

                const hue = 180 + fromProgress * 60 + Math.sin(i * 0.5) * 30;
                const lightness = 55 + fromProgress * 15;
                ctx.fillStyle = `hsla(${hue}, 65%, ${lightness}%, ${particleAlpha})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();

                if (fromProgress > 0.3 && i % 3 === 0) {
                    const nextI = (i + 3) % particleCount;
                    const nextAngle = (nextI / particleCount) * Math.PI * 2 + orbitSpeed + Math.sin(nextI * 0.5) * 0.5;
                    const nextRadius = baseRadius * spreadFactor * (0.3 + Math.sin(nextI * 0.3 + time) * 0.3);
                    const nextX = centerX + Math.cos(nextAngle) * nextRadius;
                    const nextY = centerY + Math.sin(nextAngle) * nextRadius * 0.7;

                    ctx.strokeStyle = `hsla(${hue}, 50%, 60%, ${particleAlpha * 0.3})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(nextX, nextY);
                    ctx.stroke();
                }
            }
        };

        const drawEnergyTrails = (intensity: number) => {
            const trailCount = 20;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            for (let i = 0; i < trailCount; i++) {
                const startAngle = (i / trailCount) * Math.PI * 2;
                const endAngle = startAngle + Math.PI * 0.5;

                ctx.strokeStyle = `rgba(6, 182, 212, ${intensity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();

                for (let t = 0; t <= 1; t += 0.05) {
                    const angle = startAngle + (endAngle - startAngle) * t;
                    const radius = 50 + t * 150 * intensity;
                    const x = centerX + Math.cos(angle + time) * radius;
                    const y = centerY + Math.sin(angle + time) * radius * 0.6;

                    if (t === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        };
        const currentImg = imagesRef.current[currentFrameIndex];
        const nextImg = imagesRef.current[nextFrameIndex];

        if (imagesLoaded && currentImg) {
            const isTransitioning = transitionProgress > 0 && transitionProgress < 1;

            if (!isTransitioning && transitionProgress === 0) {
                const ambientScale = 1 + withinBeatProgress * 0.1;
                drawImageWithTransform(currentImg, ambientScale, 0, 0, 0, 1);
            } else if (isTransitioning) {
                const slowEase = (t: number) => {
                    if (t < 0.5) {
                        return 16 * t * t * t * t * t;
                    } else {
                        return 1 - Math.pow(-2 * t + 2, 5) / 2;
                    }
                };

                const nextAlpha = slowEase(transitionProgress);
                const currentAlpha = 1 - nextAlpha;

                const currentScale = 1 + withinBeatProgress * 0.15;

                const nextScale = 0.9 + nextAlpha * 0.1;

                const particleIntensity = Math.sin(transitionProgress * Math.PI) * 0.7;
                drawMorphParticles(transitionProgress, particleIntensity);

                const exitAlpha = scrollProgress > 0.85 ? Math.max(0, 1 - (scrollProgress - 0.85) * 6.66) : 1;
                drawImageWithTransform(currentImg, currentScale, 0, 0, 0, currentAlpha * exitAlpha);

                if (nextImg && currentFrameIndex !== nextFrameIndex && nextAlpha > 0.001) {
                    const exitAlpha = scrollProgress > 0.85 ? Math.max(0, 1 - (scrollProgress - 0.85) * 6.66) : 1;
                    drawImageWithTransform(nextImg, nextScale, 0, 0, 0, nextAlpha * exitAlpha);
                }
            } else {
                const targetImg = currentImg;

                const ambientScale = 1 + withinBeatProgress * 0.05;

                if (targetImg) {
                    const exitAlpha = scrollProgress > 0.85 ? Math.max(0, 1 - (scrollProgress - 0.85) * 6.66) : 1;
                    drawImageWithTransform(targetImg, ambientScale, 0, 0, 0, exitAlpha);
                }
            }
        } else {
            drawPlaceholderVisualization(ctx, rect.width, rect.height, progress);
        }

        const microParticleCount = isMobile ? 40 : 60;
        for (let i = 0; i < microParticleCount; i++) {
            const seed = i * 7.89;
            const floatX = (Math.sin(seed) * 0.5 + 0.5) * rect.width;
            const floatY = (Math.cos(seed * 1.3) * 0.5 + 0.5) * rect.height;

            const offsetX = Math.sin(time * 0.5 + i * 0.3) * 30;
            const offsetY = Math.cos(time * 0.4 + i * 0.2) * 25;

            const x = floatX + offsetX;
            const y = floatY + offsetY;
            const size = 1 + Math.sin(time * 2 + i) * 0.5;
            const alpha = 0.15 + Math.sin(time + i * 0.5) * 0.1;

            ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }

        const orbitCount = isMobile ? 8 : 12;
        for (let i = 0; i < orbitCount; i++) {
            const orbitAngle = (i / orbitCount) * Math.PI * 2 + time * 0.15;
            const orbitRadius = Math.min(rect.width, rect.height) * (0.35 + Math.sin(i) * 0.1);

            const x = rect.width / 2 + Math.cos(orbitAngle) * orbitRadius;
            const y = rect.height / 2 + Math.sin(orbitAngle) * orbitRadius * 0.6;
            const size = 2 + Math.sin(time + i * 0.8) * 1;
            const alpha = 0.2 + Math.sin(time * 1.5 + i) * 0.1;

            const hue = i % 2 === 0 ? 185 : 250;
            ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();

            const glowSize = isMobile ? size * 2 : size * 3;
            ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha * 0.3})`;
            ctx.beginPath();
            ctx.arc(x, y, glowSize, 0, Math.PI * 2);
            ctx.fill();
        }

        const sparkCount = isMobile ? 12 : 20;
        for (let i = 0; i < sparkCount; i++) {
            const seed = i * 12.34;
            const baseX = (Math.sin(seed) * 0.5 + 0.5) * rect.width;

            const riseSpeed = 0.3 + (i % 5) * 0.1;
            const yOffset = (time * 50 * riseSpeed + i * 100) % (rect.height + 100);
            const y = rect.height - yOffset;
            const x = baseX + Math.sin(time * 2 + i) * 15;

            const size = 1.5 + Math.sin(i) * 0.5;
            const alpha = 0.25 * (1 - yOffset / rect.height);

            if (alpha > 0.02) {
                ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const streamCount = isMobile ? 3 : 6;
        for (let i = 0; i < streamCount; i++) {
            const startY = (i / streamCount) * rect.height + (time * 20) % (rect.height / streamCount);
            const alpha = 0.08 + Math.sin(time + i) * 0.04;

            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(0, startY);

            const stepSize = isMobile ? 40 : 20;
            for (let x = 0; x < rect.width; x += stepSize) {
                const waveY = startY + Math.sin(x * 0.02 + time + i) * 10;
                ctx.lineTo(x, waveY);
            }
            ctx.stroke();
        }

        const vignette = ctx.createRadialGradient(
            rect.width / 2, rect.height / 2, 0,
            rect.width / 2, rect.height / 2, rect.width * 0.7
        );
        vignette.addColorStop(0, 'transparent');
        vignette.addColorStop(1, 'rgba(2, 6, 23, 0.3)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, rect.width, rect.height);
    }, [imagesLoaded, isMobile]);

    const drawPlaceholderVisualization = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        progress: number
    ) => {
        const centerX = width / 2;
        const centerY = height / 2;
        const time = Date.now() * 0.001;

        const phase1 = Math.max(0, Math.min(1, progress / 0.15));
        const phase2 = Math.max(0, Math.min(1, (progress - 0.15) / 0.25));
        const phase3 = Math.max(0, Math.min(1, (progress - 0.40) / 0.25));
        const phase4 = Math.max(0, Math.min(1, (progress - 0.65) / 0.20));
        const phase5 = Math.max(0, Math.min(1, (progress - 0.85) / 0.15));

        const humanHeight = Math.min(height * 0.7, 500);
        const humanWidth = humanHeight * 0.35;

        const separation = Math.sin(Math.PI * (phase2 + phase3)) * 80 * (1 - phase5);

        ctx.save();
        ctx.translate(centerX, centerY);

        const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, humanHeight * 0.8);
        glowGradient.addColorStop(0, `rgba(6, 182, 212, ${0.15 * (1 - phase2 * 0.5 + phase5 * 0.5)})`);
        glowGradient.addColorStop(0.5, `rgba(99, 102, 241, ${0.08 * (phase2 + phase3)})`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, humanHeight * 0.6, humanHeight * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        if (phase3 > 0 || phase4 > 0) {
            const helixOpacity = Math.min(phase3, 1 - phase5);
            drawDNAHelix(ctx, 0, 0, humanHeight * 0.5, time, helixOpacity);
        }

        const bodyOpacity = 0.3 + phase1 * 0.4 - phase2 * 0.3 + phase5 * 0.4;
        ctx.strokeStyle = `rgba(255, 255, 255, ${bodyOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        ctx.ellipse(0, -humanHeight * 0.38 - separation * 0.5, humanWidth * 0.35, humanWidth * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-humanWidth * 0.4, -humanHeight * 0.22 - separation * 0.3);
        ctx.quadraticCurveTo(-humanWidth * 0.5, humanHeight * 0.1, -humanWidth * 0.25, humanHeight * 0.2);
        ctx.lineTo(humanWidth * 0.25, humanHeight * 0.2);
        ctx.quadraticCurveTo(humanWidth * 0.5, humanHeight * 0.1, humanWidth * 0.4, -humanHeight * 0.22 - separation * 0.3);
        ctx.stroke();

        if (phase2 > 0 && phase5 < 1) {
            const cellOpacity = Math.min(phase2, 1 - phase5 * 0.8);
            drawCellularParticles(ctx, 0, 0, humanHeight * 0.4, time, cellOpacity, progress);
        }

        if (phase4 > 0 && phase5 < 1) {
            drawDataStreams(ctx, 0, 0, humanHeight * 0.5, time, phase4 * (1 - phase5));
        }

        if (phase2 > 0 && phase4 < 0.8) {
            const organsOpacity = Math.min(phase2, 1 - phase4);
            ctx.fillStyle = `rgba(239, 68, 68, ${organsOpacity * 0.2})`;
            ctx.beginPath();
            ctx.ellipse(-humanWidth * 0.1, -humanHeight * 0.05 + separation * 0.2, humanWidth * 0.15, humanWidth * 0.2, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(168, 85, 247, ${organsOpacity * 0.15})`;
            ctx.beginPath();
            ctx.ellipse(humanWidth * 0.05, humanHeight * 0.05 + separation * 0.15, humanWidth * 0.2, humanWidth * 0.15, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();

        drawAmbientParticles(ctx, width, height, time, progress);
    };

    const drawDNAHelix = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        height: number,
        time: number,
        opacity: number
    ) => {
        const steps = 40;
        const radius = 25;

        for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const yPos = y + (t - 0.5) * height;
            const angle = t * Math.PI * 4 + time * 0.5;

            const x1 = x + Math.cos(angle) * radius;
            const x2 = x + Math.cos(angle + Math.PI) * radius;

            ctx.fillStyle = `rgba(6, 182, 212, ${opacity * 0.6})`;
            ctx.beginPath();
            ctx.arc(x1, yPos, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 0.6})`;
            ctx.beginPath();
            ctx.arc(x2, yPos, 3, 0, Math.PI * 2);
            ctx.fill();

            if (i % 4 === 0) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x1, yPos);
                ctx.lineTo(x2, yPos);
                ctx.stroke();
            }
        }
    };

    const drawCellularParticles = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        time: number,
        opacity: number,
        progress: number
    ) => {
        const particleCount = 60;

        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2 + time * 0.2;
            const dist = radius * (0.3 + Math.sin(i * 1.5 + time) * 0.4 + progress * 0.3);
            const px = x + Math.cos(angle) * dist;
            const py = y + Math.sin(angle) * dist * 0.8;
            const size = 2 + Math.sin(i + time * 2) * 1.5;

            const hue = 180 + Math.sin(i * 0.5) * 40;
            ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity * 0.4})`;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    const drawDataStreams = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        radius: number,
        time: number,
        opacity: number
    ) => {
        const streamCount = 8;

        for (let i = 0; i < streamCount; i++) {
            const angle = (i / streamCount) * Math.PI * 2;
            const startDist = radius * 0.2;
            const endDist = radius * 1.2;

            const gradient = ctx.createLinearGradient(
                x + Math.cos(angle) * startDist,
                y + Math.sin(angle) * startDist,
                x + Math.cos(angle) * endDist,
                y + Math.sin(angle) * endDist
            );
            gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity * 0.4})`);
            gradient.addColorStop(0.5, `rgba(99, 102, 241, ${opacity * 0.2})`);
            gradient.addColorStop(1, 'transparent');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();

            for (let j = 0; j < 20; j++) {
                const t = j / 20;
                const dist = startDist + (endDist - startDist) * t;
                const wave = Math.sin(t * Math.PI * 4 + time * 2 + i) * 5;
                const px = x + Math.cos(angle) * dist + Math.cos(angle + Math.PI / 2) * wave;
                const py = y + Math.sin(angle) * dist + Math.sin(angle + Math.PI / 2) * wave;

                if (j === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }
    };

    const drawAmbientParticles = (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        time: number,
        progress: number
    ) => {
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const seed = i * 1234.5678;
            const x = (Math.sin(seed) * 0.5 + 0.5) * width + Math.sin(time * 0.3 + i) * 20;
            const y = (Math.cos(seed * 2) * 0.5 + 0.5) * height + Math.cos(time * 0.2 + i * 0.5) * 30;
            const size = 1 + Math.sin(i + time) * 0.5;
            const opacity = 0.1 + Math.sin(time + i * 0.3) * 0.1;

            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    useEffect(() => {
        if (!isHeroVisible) return;

        const scrollRaf = 0;

        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
            targetProgress.current = progress;

            setIsNavVisible(progress > 0.02);

            const beatIndex = STORY_BEATS.findIndex(
                beat => progress >= beat.range[0] && progress < beat.range[1]
            );
            setCurrentBeat(beatIndex >= 0 ? beatIndex : STORY_BEATS.length - 1);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHeroVisible]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
            const isPastHero = containerRef.current && containerRef.current.getBoundingClientRect().bottom <= window.innerHeight + 50;
            let currentProgress = 0;
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                currentProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
            }

            const heroFinished = currentProgress >= 0.99 || isPastHero;

            if (heroFinished) {
                return;
            }

            e.preventDefault();

            setShowScrollHint(false);

            const heroHeight = containerRef.current?.getBoundingClientRect().height || window.innerHeight * 8;
            const currentScroll = window.scrollY;
            const duration = isMobile ? 300 : 50;

            const sectionStops: number[] = [];

            const beatStops = STORY_BEATS.map((beat) => {
                const beatCenterProgress = (beat.range[0] + beat.range[1]) / 2;
                return beatCenterProgress * (heroHeight - window.innerHeight);
            });
            sectionStops.push(0, ...beatStops);

            const headings = Array.from(document.querySelectorAll('h2'));

            const whoWeAreSpan = Array.from(document.querySelectorAll('span')).find(s => s.textContent?.includes('Who We Are'));
            if (whoWeAreSpan) {
                const section = whoWeAreSpan.closest('section');
                if (section) {
                    sectionStops.push(section.getBoundingClientRect().top + window.scrollY);
                }
            }

            const platform = document.getElementById('platform');
            if (platform) sectionStops.push(platform.offsetTop);

            const impactHeading = headings.find(h => h.textContent?.includes('OUR IMPACT'));
            if (impactHeading) {
                const section = impactHeading.closest('section');
                if (section) {
                    sectionStops.push(section.getBoundingClientRect().top + window.scrollY);
                }
            }

            const research = document.getElementById('research');
            if (research) sectionStops.push(research.offsetTop);

            const pillarsHeading = headings.find(h => h.textContent?.includes('OUR PILLARS'));
            if (pillarsHeading) {
                const section = pillarsHeading.closest('section');
                if (section) {
                    sectionStops.push(section.getBoundingClientRect().top + window.scrollY);
                }
            }

            const about = document.getElementById('about');
            if (about) sectionStops.push(about.offsetTop);

            const roadmapHeading = headings.find(h => h.textContent?.includes('ROAD TO IN-SILICO'));
            if (roadmapHeading) {
                sectionStops.push(roadmapHeading.getBoundingClientRect().top + window.scrollY - 100);
            }

            const bookDemo = document.getElementById('book-demo');
            if (bookDemo) sectionStops.push(bookDemo.offsetTop);

            const uniqueStops = Array.from(new Set(sectionStops)).sort((a, b) => a - b);

            let targetY: number;

            if (e.key === 'ArrowUp') {
                targetY = 0;
                for (let i = uniqueStops.length - 1; i >= 0; i--) {
                    if (uniqueStops[i] < currentScroll - 100) {
                        targetY = uniqueStops[i];
                        break;
                    }
                }
                smoothScrollTo(targetY, duration);
            } else if (e.key === 'ArrowDown') {
                targetY = document.body.scrollHeight;
                for (let i = 0; i < uniqueStops.length; i++) {
                    if (uniqueStops[i] > currentScroll + 100) {
                        targetY = uniqueStops[i];
                        break;
                    }
                }
                smoothScrollTo(targetY, duration);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [smoothScrollTo]);

    useEffect(() => {
        if (!isHeroVisible) return;

        let animationId: number;


        const animate = () => {
            if (smoothProgress.current === 0 && targetProgress.current > 0.01) {
                smoothProgress.current = targetProgress.current;
            } else {
                smoothProgress.current += (targetProgress.current - smoothProgress.current) * 0.05;
            }

            setScrollProgress(prev => {
                const diff = Math.abs(smoothProgress.current - prev);
                if (diff > 0.0001) {
                    return smoothProgress.current;
                }
                return prev;
            });

            drawFrame(smoothProgress.current);
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [drawFrame, isHeroVisible, isMobile]);

    const [forceShowUI, setForceShowUI] = useState(false);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem('mevreon_intro_shown');

        if (hasVisited) {
            setForceShowUI(true);
        } else {
            const timer = setTimeout(() => {
                setForceShowUI(true);
                sessionStorage.setItem('mevreon_intro_shown', 'true');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, []);

    const totalImageFrames = FRAME_IMAGES.length;
    const frameProgressTotal = scrollProgress * (totalImageFrames - 1);
    const currentFrameIdx = Math.floor(frameProgressTotal);
    const beatTransitionProgress = frameProgressTotal - currentFrameIdx;

    useEffect(() => {
        const beatIndex = STORY_BEATS.findIndex(beat =>
            scrollProgress >= beat.range[0] && scrollProgress <= beat.range[1]
        );
        setCurrentBeat(beatIndex);
    }, [scrollProgress]);

    const totalBeats = STORY_BEATS.length;
    const progressInBeats = scrollProgress * (totalBeats - 1);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const controlsContent = (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-[100]"
            >
                <div className="mx-auto max-w-7xl px-4 py-2 md:px-6 md:py-4">
                    <div className="flex items-center justify-between 
  bg-white/10 
  backdrop-blur-md 
  border border-white/20 
  shadow-lg 
  px-4 py-2 md:px-6 md:py-3 
  rounded-xl ring-1 ring-white/20 " style={{ borderRadius: '25px' }}>
                        <div
                            className={`
                                text-white/90 font-semibold tracking-tight text-lg cursor-pointer
                                transition-all duration-700 ease-out
                                ${isNavVisible || forceShowUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
                            `}
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            Mevreon<span className="text-cyan-400">.ai</span>
                        </div>

                        <div
                            className={`
                                hidden md:flex items-center gap-10 text-base font-medium text-white/90
                                transition-all duration-700 delay-100 ease-out
                                ${isNavVisible || forceShowUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
                            `}
                        >
                            <button
                                onClick={() => {
                                    const el = document.getElementById('about');
                                    if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY);
                                }}
                                className="hover:text-cyan-400 transition-colors"
                            >
                                About
                            </button>
                            <button
                                onClick={() => {
                                    const el = document.getElementById('platform');
                                    if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY + window.innerHeight * 0.1);
                                }}
                                className="hover:text-cyan-400 transition-colors"
                            >
                                Platform
                            </button>
                            <button
                                onClick={() => {
                                    const el = document.getElementById('why-mevreon');
                                    if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY);
                                }}
                                className="hover:text-cyan-400 transition-colors"
                            >
                                Why Mevreon
                            </button>
                            <button
                                onClick={() => {
                                    const el = document.getElementById('team');
                                    if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY);
                                }}
                                className="hover:text-cyan-400 transition-colors"
                            >
                                Team
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                const el = document.getElementById('book-demo');
                                if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY);
                            }}
                            className={`
                                px-3 py-1.5 md:px-4 md:py-2 bg-white/10 hover:bg-white/15 rounded-full text-sm text-white/90 font-medium border border-white/10
                                transition-all duration-700 delay-200 ease-out hover:scale-105
                                ${isNavVisible || forceShowUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
                            `}
                        >
                            Request Access
                        </button>
                    </div>
                </div>
            </nav>



            <div className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col gap-1.5 md:gap-2 transition-all duration-1000 ${isNavVisible || forceShowUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {showScrollHint && (isNavVisible || forceShowUI) && (
                    <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-3 animate-[fadeInSlide_0.8s_ease-out]
                                    -left-32 md:-48">
                        <div className="relative group/hint">

                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-md md:rounded-lg blur-md md:blur-lg opacity-60 animate-[pulse_2s_ease-in-out_infinite]" />

                            <div className="relative px-2.5 py-1.5 md:px-4 md:py-2.5 bg-gradient-to-r from-cyan-500/90 to-indigo-500/90 rounded-md md:rounded-lg border border-white/30 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] md:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                                <div className="text-white font-bold text-[10px] md:text-sm whitespace-nowrap animate-[blink_1.5s_ease-in-out_infinite]">
                                    <span className="hidden md:inline">👆 Click Me Navigate!</span>
                                    <span className="md:hidden">👆 Click!</span>
                                </div>
                            </div>

                            <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-[ping_1.5s_ease-in-out_infinite]" />
                            <div className="absolute -bottom-0.5 -left-0.5 md:-bottom-1 md:-left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-300 rounded-full animate-[ping_2s_ease-in-out_infinite_0.5s]" />
                        </div>

                        <div className="animate-[bounce_1s_ease-in-out_infinite]">
                            <svg className="w-4 h-4 md:w-6 md:h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => {
                        setShowScrollHint(false);

                        const isPastHero = containerRef.current && containerRef.current.getBoundingClientRect().bottom <= window.innerHeight + 50;
                        const heroFinished = scrollProgress >= 0.99 || isPastHero;

                        if (heroFinished) {
                            window.scrollBy({
                                top: -window.innerHeight * 0.9,
                                behavior: 'smooth'
                            });
                            return;
                        }

                        const heroHeight = containerRef.current?.getBoundingClientRect().height || window.innerHeight * 8;
                        const currentScroll = window.scrollY;
                        const duration = isMobile ? 300 : 50;
                        const sectionStops: number[] = [];
                        const beatStops = STORY_BEATS.map((beat) => {
                            const beatCenterProgress = (beat.range[0] + beat.range[1]) / 2;
                            return beatCenterProgress * (heroHeight - window.innerHeight);
                        });
                        sectionStops.push(0, ...beatStops);

                        const headings = Array.from(document.querySelectorAll('h2'));

                        const whoWeAreSpan = Array.from(document.querySelectorAll('span')).find(s => s.textContent?.includes('Who We Are'));
                        if (whoWeAreSpan) {
                            const section = whoWeAreSpan.closest('section');
                            if (section) {
                                sectionStops.push(section.getBoundingClientRect().top + window.scrollY);
                            }
                        }
                        const platform = document.getElementById('platform');
                        if (platform) sectionStops.push(platform.getBoundingClientRect().top + window.scrollY);

                        const impactHeading = headings.find(h => h.textContent?.includes('OUR IMPACT'));
                        if (impactHeading) {
                            const section = impactHeading.closest('section');
                            if (section) {
                                sectionStops.push(section.getBoundingClientRect().top + window.scrollY);
                            }
                        }
                        const whyMevreon = document.getElementById('why-mevreon');
                        if (whyMevreon) sectionStops.push(whyMevreon.getBoundingClientRect().top + window.scrollY);
                        const pillarsHeading = headings.find(h => h.textContent?.includes('OUR PILLARS'));
                        if (pillarsHeading) {
                            const section = pillarsHeading.closest('section');
                            if (section) {
                                sectionStops.push(section.getBoundingClientRect().top + window.scrollY);
                            }
                        }
                        const about = document.getElementById('about');
                        if (about) sectionStops.push(about.getBoundingClientRect().top + window.scrollY);
                        const roadmapHeading = headings.find(h => h.textContent?.includes('ROAD TO IN-SILICO'));
                        if (roadmapHeading) {
                            sectionStops.push(roadmapHeading.getBoundingClientRect().top + window.scrollY - 100);
                        }
                        const bookDemo = document.getElementById('book-demo');
                        if (bookDemo) sectionStops.push(bookDemo.getBoundingClientRect().top + window.scrollY);
                        const teamSection = document.getElementById('team');
                        if (teamSection) sectionStops.push(teamSection.getBoundingClientRect().top + window.scrollY);

                        const uniqueStops = Array.from(new Set(sectionStops)).sort((a, b) => a - b);

                        let targetY = 0;
                        for (let i = uniqueStops.length - 1; i >= 0; i--) {
                            if (uniqueStops[i] < currentScroll - 100) {
                                targetY = uniqueStops[i];
                                break;
                            }
                        }
                        smoothScrollTo(targetY, duration);
                    }}
                    className="p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95 group shadow-lg cursor-pointer pointer-events-auto"
                    aria-label="Scroll Up"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>

                <button
                    onClick={() => {
                        setShowScrollHint(false);

                        const isPastHero = containerRef.current && containerRef.current.getBoundingClientRect().bottom <= window.innerHeight + 50;
                        const heroFinished = scrollProgress >= 0.99 || isPastHero;

                        if (heroFinished) {
                            window.scrollBy({
                                top: window.innerHeight * 0.9,
                                behavior: 'smooth'
                            });
                            return;
                        }

                        const heroHeight = containerRef.current?.getBoundingClientRect().height || window.innerHeight * 8;
                        const currentScroll = window.scrollY;
                        const duration = isMobile ? 300 : 50;
                        const sectionStops: number[] = [];
                        const beatStops = STORY_BEATS.map((beat) => {
                            const beatCenterProgress = (beat.range[0] + beat.range[1]) / 2;
                            return beatCenterProgress * (heroHeight - window.innerHeight);
                        });
                        sectionStops.push(0, ...beatStops);

                        const whoWeAreSpan = Array.from(document.querySelectorAll('span')).find(s => s.textContent?.includes('Who We Are'));
                        if (whoWeAreSpan) {
                            const section = whoWeAreSpan.closest('section');
                            if (section) {
                                sectionStops.push(section.getBoundingClientRect().top + window.scrollY);
                            }
                        }
                        const platform = document.getElementById('platform');
                        if (platform) sectionStops.push(platform.getBoundingClientRect().top + window.scrollY);

                        const headings = Array.from(document.querySelectorAll('h2'));
                        const impactHeading = headings.find(h => h.textContent?.includes('OUR IMPACT'));
                        if (impactHeading) {
                            const section = impactHeading.closest('section');
                            if (section) {
                                sectionStops.push(section.getBoundingClientRect().top + window.scrollY);
                            }
                        }
                        const whyMevreon = document.getElementById('why-mevreon');
                        if (whyMevreon) sectionStops.push(whyMevreon.getBoundingClientRect().top + window.scrollY);
                        const pillarsHeading = headings.find(h => h.textContent?.includes('OUR PILLARS'));
                        if (pillarsHeading) {
                            const section = pillarsHeading.closest('section');
                            if (section) {
                                sectionStops.push(section.getBoundingClientRect().top + window.scrollY);
                            }
                        }
                        const about = document.getElementById('about');
                        if (about) sectionStops.push(about.getBoundingClientRect().top + window.scrollY);
                        const roadmapHeading = headings.find(h => h.textContent?.includes('ROAD TO IN-SILICO'));
                        if (roadmapHeading) {
                            sectionStops.push(roadmapHeading.getBoundingClientRect().top + window.scrollY - 100);
                        }
                        const bookDemo = document.getElementById('book-demo');
                        if (bookDemo) sectionStops.push(bookDemo.getBoundingClientRect().top + window.scrollY);
                        const teamSection = document.getElementById('team');
                        if (teamSection) sectionStops.push(teamSection.getBoundingClientRect().top + window.scrollY);

                        const uniqueStops = Array.from(new Set(sectionStops)).sort((a, b) => a - b);

                        let targetY = document.body.scrollHeight;
                        for (let i = 0; i < uniqueStops.length; i++) {
                            if (uniqueStops[i] > currentScroll + 100) {
                                targetY = uniqueStops[i];
                                break;
                            }
                        }
                        smoothScrollTo(targetY, duration);
                    }}
                    className="p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all hover:scale-110 active:scale-95 group shadow-lg cursor-pointer pointer-events-auto"
                    aria-label="Scroll Down"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </>
    );

    return (
        <>
            {mounted && createPortal(controlsContent, document.body)}

            <div
                ref={containerRef}
                className="relative"
                style={{ height: '800vh' }}
            >
                <div className="absolute inset-0 pointer-events-none">
                    {STORY_BEATS.map((beat, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-[100vh]"
                            style={{
                                top: `${beat.range[0] * 700}vh`,
                            }}
                        />
                    ))}
                </div>

                <div
                    className="sticky top-0 h-screen w-full overflow-hidden transition-colors duration-500"
                    style={{
                        backgroundColor: scrollProgress > 0.94 ? `rgba(2, 6, 23, ${Math.max(0, 1 - (scrollProgress - 0.94) * 16.6)})` : '#020617'
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full pointer-events-none select-none"
                        onContextMenu={(e) => e.preventDefault()}
                    />

                    {!imagesLoaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617] z-10">
                            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
                                    style={{ width: `${loadProgress * 100}%` }}
                                />
                            </div>
                            <p className="text-white/40 text-sm tracking-widest uppercase">Loading Experience</p>
                        </div>
                    )}

                    {imagesLoaded && STORY_BEATS.map((beat, i) => {
                        const diff = progressInBeats - i;
                        let opacity = 0;

                        if (currentBeat === i) {
                            const range = beat.range;
                            const localWithinBeatProgress = (scrollProgress - range[0]) / (range[1] - range[0]);

                            const fadeRange = 0.15;
                            if (localWithinBeatProgress < fadeRange) {
                                opacity = localWithinBeatProgress / fadeRange;
                            } else if (localWithinBeatProgress > (1 - fadeRange)) {
                                opacity = (1 - localWithinBeatProgress) / fadeRange;
                            } else {
                                opacity = 1;
                            }
                        } else {
                            opacity = 0;
                        }

                        if (i === 0 && (forceShowUI || isNavVisible) && scrollProgress < 0.1) {
                            opacity = 1;
                        }

                        if (opacity <= 0.01) return null;

                        const isIncoming = diff <= 0;
                        const xOffset = isIncoming ? (1 - opacity) * 40 : -(1 - opacity) * 40;

                        return (
                            <div
                                key={i}
                                className={`absolute inset-0 z-20 flex items-center pointer-events-none transition-transform duration-[1500ms] ease-out ${beat.align === 'left' ? 'justify-start' :
                                    beat.align === 'right' ? 'justify-end' : 'justify-center'
                                    } ${isMobile ? 'items-end pb-16' :
                                        beat.position === 'top' ? 'items-start pt-32' :
                                            beat.position === 'bottom' ? 'items-end pb-32' : 'items-center'
                                    }`}
                                style={{
                                    opacity: opacity,
                                    transform: `translateX(${xOffset}px)`
                                }}
                            >
                                <div className={`px-8 md:px-16 pt-[110px] max-w-xl ${beat.align === 'left' ? 'text-left' :
                                    beat.align === 'right' ? 'text-right' : 'text-center'
                                    }`}>
                                    {beat.title && (
                                        <h1 className={`text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.1] ${beat.align === 'center' || isMobile ? 'text-center mx-auto' :
                                            beat.align === 'right' ? 'text-right ml-auto' : 'text-left mr-auto'
                                            }`}>
                                            {beat.title.split(" ").map((word, w_i) => (
                                                <span
                                                    key={w_i}
                                                    className="inline-block animate-reveal-word opacity-0"
                                                    style={{ animationDelay: `${w_i * 0.03}s` }}
                                                >
                                                    {word}&nbsp;
                                                </span>
                                            ))}
                                        </h1>
                                    )}
                                    {beat.subtitle && (
                                        <div className={`relative mb-8 max-w-xl ${beat.align === 'center' || isMobile ? 'mx-auto' : beat.align === 'right' ? 'ml-auto' : 'mr-auto'}`}>
                                            <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(6,182,212,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] rounded-xl pointer-events-none md:hidden" />

                                            <p className={`relative text-xl md:text-2xl text-white/90 leading-relaxed font-light px-6 py-4 md:py-0 
                                                ${beat.align === 'center' ? 'text-center md:px-0' :
                                                    beat.align === 'right' ? 'text-right md:border-r-[3px] md:border-cyan-500/50 md:pr-6 md:pl-0' :
                                                        'text-left md:border-l-[3px] md:border-cyan-500/50 md:pl-6 md:pr-0'
                                                } md:drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]`}>
                                                {beat.subtitle.split(" ").map((word, w_i) => (
                                                    <span
                                                        key={w_i}
                                                        className="inline-block animate-reveal-word opacity-0 text-white/90"
                                                        style={{ animationDelay: `${(w_i * 0.01) + 0.3}s` }}
                                                    >
                                                        {word}&nbsp;
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    )}

                                    {beat.footer && (
                                        <div className={`mt-2 max-w-xl ${beat.align === 'center' ? 'mx-auto text-center' : beat.align === 'right' ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
                                            <p className="text-[16px] md:text-xs text-blue-100/80 font-bold  font-sans tracking-wider opacity-0 animate-reveal-word" style={{ animationDelay: '0.8s' }}>
                                                {beat.footer}
                                            </p>
                                        </div>
                                    )}


                                    {beat.bullets && (
                                        <div className={`flex flex-col gap-4 mt-8 ${beat.align === 'center' ? 'items-center' :
                                            beat.align === 'right' ? 'items-end' : 'items-start'
                                            }`}>
                                            {beat.bullets.map((bullet, b_i) => (
                                                <div key={b_i} className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full w-fit animate-reveal-word opacity-0" style={{ animationDelay: `${0.6 + b_i * 0.1}s` }}>
                                                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                                    <span className="text-sm md:text-base text-white/90 font-medium tracking-wide">{bullet}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className={`mt-12 flex flex-wrap gap-4 pointer-events-auto ${beat.align === 'center' || isMobile ? 'justify-center' :
                                        beat.align === 'right' ? 'justify-end' : 'justify-start'
                                        }`}>
                                        {beat.primaryCTA && (
                                            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full text-white font-bold text-base hover:scale-105 transition-all shadow-[0_0_40px_rgba(6,182,212,0.3)] ring-1 ring-white/20 animate-reveal-word opacity-0" style={{ animationDelay: '0.8s' }}>
                                                {beat.primaryCTA.label}
                                            </button>
                                        )}
                                        {beat.secondaryCTA && (
                                            <button
                                                onClick={() => {
                                                    if (beat.secondaryCTA?.label === "Explore the Platform") {
                                                        const el = document.getElementById('who-we-are');
                                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                }}
                                                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-white font-bold text-base transition-all animate-reveal-word opacity-0"
                                                style={{ animationDelay: '0.9s' }}
                                            >
                                                {beat.secondaryCTA.label}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent overflow-hidden">
                            <div
                                className="w-full h-4 bg-cyan-400/50"
                                style={{ transform: `translateY(${scrollProgress * 48}px)` }}
                            />
                        </div>
                        <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">
                            Scroll
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScrollytellingHero;
