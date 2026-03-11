'use client';

import { motion } from 'framer-motion';
import { useMockDb } from '@/store/mockDb';
import { useRouter } from 'next/navigation';
import { LogOut, FileText, Globe2, ScanFace, Ship, FileCheck2, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function ExportBuyerDashboard() {
    const user = useMockDb((state) => state.currentUser);
    const logout = useMockDb((state) => state.logout);
    const router = useRouter();
    const [generating, setGenerating] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => setGenerating(false), 2500);
    };

    return (
        <div className="min-h-screen bg-bio-black text-bio-cream flex flex-col">

            {/* Topbar */}
            <header className="h-20 glass-panel border-b border-bio-green/20 px-8 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Ship className="text-bio-green w-8 h-8" />
                    <h1 className="font-cinzel text-xl md:text-2xl neon-text-green font-bold tracking-widest">A.R.I.V.U Export</h1>
                </div>
                <div className="flex items-center gap-6">
                    <span className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/60">{user?.name}</span>
                    <button onClick={handleLogout} className="text-red-500 hover:text-red-400">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Main Grid Floor */}
            <main className="flex-1 p-8 overflow-x-hidden">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Logistics Map Center */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 glass-card rounded-3xl p-6 min-h-[500px] flex flex-col"
                    >
                        <h2 className="font-rajdhani text-xl font-bold uppercase tracking-widest text-bio-cream mb-4 flex items-center gap-2">
                            <Globe2 className="w-5 h-5 text-bio-teal" /> Global Logistics Routing
                        </h2>
                        <div className="flex-1 rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bio-teal/10 via-bio-black to-bio-black relative overflow-hidden flex items-center justify-center">

                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>

                            {/* Mock World Map Outline */}
                            <svg viewBox="0 0 1000 500" className="w-full h-full text-bio-teal/20 mx-4">
                                <path fill="currentColor" d="M200,100 Q300,50 400,100 T600,200 T800,150 L800,400 L200,400 Z" opacity="0.1" />

                                {/* Simulated Shipment Paths */}
                                <path d="M 300 200 Q 500 50 700 250" fill="transparent" stroke="rgba(0,229,255,0.4)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />

                                {/* Node India */}
                                <circle cx="700" cy="250" r="8" fill="#00FF88" className="animate-pulse" />
                                <text x="715" y="255" fill="#00FF88" fontSize="12" fontFamily="monospace">Port 04 (Origin)</text>

                                {/* Node EU */}
                                <circle cx="300" cy="200" r="6" fill="#F0C040" />
                                <text x="230" y="200" fill="#F0C040" fontSize="12" fontFamily="monospace">Rotterdam</text>
                            </svg>

                        </div>
                    </motion.div>

                    {/* Quick Stats & Action Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6"
                    >

                        {/* Cold Storage Monitor */}
                        <div className="glass-card rounded-2xl p-6 border-blue-500/20">
                            <h3 className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/60 mb-4">Cold Storage Status</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-cinzel text-5xl font-bold text-blue-400">2.4°C</span>
                                    <p className="font-lato text-xs text-blue-400/50 mt-1 uppercase">Container 44A</p>
                                </div>
                                <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 flex items-center justify-center relative">
                                    <div className="absolute inset-2 bg-blue-500/20 rounded-full animate-ping"></div>
                                    <div className="w-8 h-8 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Document Generator */}
                        <div className="glass-card rounded-2xl p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-rajdhani text-lg uppercase tracking-wide text-bio-cream/90 flex items-center gap-2 mb-2">
                                    <FileCheck2 className="w-5 h-5 text-bio-gold" /> Customs Documentation
                                </h3>
                                <p className="font-lato text-sm text-bio-cream/50 mb-6">
                                    Generate FSSAI, ISO, and Blockchain Certificate PDFs for current shipments.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                                    <span className="font-mono text-xs text-bio-cream/80 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-bio-cream/40" /> FSSAI_Clearance.pdf
                                    </span>
                                    <div className="w-2 h-2 rounded-full bg-bio-green"></div>
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    variant="secondary"
                                    className="w-full flex items-center justify-center gap-2 h-14"
                                    disabled={generating}
                                >
                                    {generating ? (
                                        <span className="animate-pulse">Compiling Ledger Data...</span>
                                    ) : (
                                        <>
                                            <Download className="w-5 h-5" /> Generate Export Manifest
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                    </motion.div>

                </div>
            </main>
        </div>
    );
}
