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
        img.src = "/sequence/frame_0ss45.png";

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
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none" />
    );
}
