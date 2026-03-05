"use client";

import Link from 'next/link';

export default function BackButton() {
    return (
        <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-cyan-400 text-sm font-bold tracking-widest uppercase hover:text-white transition-colors mb-12"
        >
            <span>← Return to Database</span>
        </Link>
    );
}
