"use client";

import { useEffect, useRef } from "react";

export default function BioCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();

        const drawInfo = {
            width: window.innerWidth,
            height: window.innerHeight,
            dpr: Math.min(window.devicePixelRatio || 1, 1.5)
        };

        const render = () => {
            const { width, height, dpr } = drawInfo;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            ctx.fillStyle = "#020617";
            ctx.fillRect(0, 0, width, height);

            if (img.complete) {
                const imgAspect = img.width / img.height;
                const canvasAspect = width / height;
                let drawW, drawH, offsetX, offsetY;

                if (canvasAspect > imgAspect) {
                    drawH = height;
                    drawW = height * imgAspect;
                    offsetX = (width - drawW) / 2;
                    offsetY = 0;
                } else {
                    drawW = width;
                    drawH = width / imgAspect;
                    offsetX = 0;
                    offsetY = (height - drawH) / 2;
                }

                ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
                ctx.fillStyle = "rgba(2, 6, 23, 0.4)";
                ctx.fillRect(0, 0, width, height);
            }
        };

        img.onload = render;

        const handleResize = () => {
            drawInfo.width = window.innerWidth;
            drawInfo.height = window.innerHeight;
            render();
        };

        window.addEventListener("resize", handleResize);
        render();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-230 h-130 -z-10 pointer-events-none" />

            {/* Small Floating Light Dots */}
            <div className="fixed pointer-events-none -z-10 top-[20%] left-[15%] w-1.5 h-1.5 rounded-full bg-teal-300 shadow-[0_0_12px_2px_rgba(45,212,191,0.8)] animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="fixed pointer-events-none -z-10 bottom-[25%] right-[20%] w-2 h-2 rounded-full bg-blue-300 shadow-[0_0_15px_3px_rgba(96,165,250,0.8)] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="fixed pointer-events-none -z-10 top-[10%] right-[30%] w-1 h-1 rounded-full bg-purple-300 shadow-[0_0_10px_2px_rgba(192,132,252,0.8)] animate-pulse" style={{ animationDuration: '5s' }} />
            <div className="fixed pointer-events-none -z-10 bottom-[15%] left-[25%] w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_15px_3px_rgba(34,211,238,0.8)] animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="fixed pointer-events-none -z-10 top-[50%] left-[80%] w-1.5 h-1.5 rounded-full bg-indigo-300 shadow-[0_0_12px_2px_rgba(129,140,248,0.8)] animate-pulse" style={{ animationDuration: '4.5s' }} />
            <div className="fixed pointer-events-none -z-10 top-[70%] left-[10%] w-1.5 h-1.5 rounded-full bg-pink-300 shadow-[0_0_12px_2px_rgba(244,114,182,0.8)] animate-pulse" style={{ animationDuration: '3.5s' }} />
            <div className="fixed pointer-events-none -z-10 top-[40%] right-[10%] w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_15px_3px_rgba(52,211,153,0.8)] animate-pulse" style={{ animationDuration: '5.5s' }} />
        </>
    );
}
