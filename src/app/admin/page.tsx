'use client';

import { motion } from 'framer-motion';
import { useMockDb } from '@/store/mockDb';
import { useRouter } from 'next/navigation';
import { LogOut, Activity, Users, DollarSign, Database, ServerCrash } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function AdminDashboard() {
    const user = useMockDb((state) => state.currentUser);
    const products = useMockDb((state) => state.products);
    const logout = useMockDb((state) => state.logout);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const revenueData = [
        { period: 'Q1', rev: 40000 }, { period: 'Q2', rev: 55000 },
        { period: 'Q3', rev: 48000 }, { period: 'Q4', rev: 92000 },
        { period: 'Q5', rev: 115000 },
    ];

    return (
        <div className="min-h-screen bg-bio-black text-bio-cream flex flex-col">
            <header className="h-16 glass-panel border-b border-red-500/20 px-8 flex justify-between items-center z-50">
                <div className="flex items-center gap-3">
                    <Activity className="text-red-500 w-6 h-6 animate-pulse" />
                    <h1 className="font-rajdhani text-xl font-bold tracking-[0.2em] text-bio-cream">S.H.I.E.L.D <span className="text-red-500">OVERSEER</span></h1>
                </div>
                <button onClick={handleLogout} className="text-red-500/80 hover:text-red-500 flex items-center gap-2 text-sm font-rajdhani uppercase tracking-widest">
                    SYSTEM EXIT <LogOut className="w-4 h-4" />
                </button>
            </header>

            <main className="flex-1 p-8">

                {/* Top KPI Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Platform Revenue', value: '$1.4M', icon: DollarSign, color: 'text-bio-green' },
                        { label: 'Active Users', value: '42,891', icon: Users, color: 'text-bio-teal' },
                        { label: 'Blockchain Nodes', value: '144', icon: Database, color: 'text-bio-gold' },
                        { label: 'Critical IoT Alerts', value: '3', icon: ServerCrash, color: 'text-red-500' },
                    ].map((kpi, i) => (
                        <motion.div
                            key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 border-white/5 flex flex-col rounded-2xl relative overflow-hidden group"
                        >
                            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${kpi.color}`}>
                                <kpi.icon className="w-24 h-24" />
                            </div>
                            <span className="font-rajdhani text-sm uppercase tracking-widest text-bio-cream/50 mb-2 relative z-10">{kpi.label}</span>
                            <span className={`font-cinzel text-5xl font-bold relative z-10 ${kpi.color}`}>{kpi.value}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Chart & Tables row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="lg:col-span-2 glass-card rounded-2xl p-6 h-[400px] flex flex-col">
                        <h2 className="font-rajdhani text-lg font-bold uppercase tracking-widest text-bio-cream/80 mb-6 flex items-center gap-2">
                            Platform Transaction Volume
                        </h2>
                        <div className="flex-1 relative">
                            <Line
                                data={{
                                    labels: revenueData.map(d => d.period),
                                    datasets: [
                                        {
                                            fill: true,
                                            label: 'Revenue ($)',
                                            data: revenueData.map(d => d.rev),
                                            borderColor: '#1DB954',
                                            backgroundColor: 'rgba(29, 185, 84, 0.2)',
                                            tension: 0.4,
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.5)' } },
                                        y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false }, ticks: { color: 'rgba(255,255,255,0.5)' } }
                                    }
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* User Management Mini table */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-6 overflow-y-auto">
                        <h2 className="font-rajdhani text-lg font-bold uppercase tracking-widest text-bio-cream/80 mb-6 flex items-center gap-2">
                            Active Farms & Inventory
                        </h2>
                        <div className="space-y-4">
                            {products.map(p => (
                                <div key={p.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                                    <div>
                                        <p className="font-lato text-sm text-bio-cream font-bold">{p.name}</p>
                                        <p className="font-mono text-[10px] text-bio-green mt-1">{p.blockchainHash}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-rajdhani text-xs text-bio-cream/50 uppercase">Stock</p>
                                        <p className="font-rajdhani text-lg text-bio-cream font-bold">{p.stock}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </main>
        </div>
    );
}
