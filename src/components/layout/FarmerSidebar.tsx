'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Leaf, Droplet, Store, ShieldAlert, LogOut, Hexagon } from 'lucide-react';
import { useMockDb } from '@/store/mockDb';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/store/languageStore';

export default function FarmerSidebar() {
    const logout = useMockDb((state) => state.logout);
    const router = useRouter();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const navItems = [
        { icon: LayoutDashboard, label: t('side.control_center'), i18nKey: 'side.control_center', active: true },
        { icon: Store, label: t('side.products_orders'), i18nKey: 'side.products_orders', active: false },
        { icon: Leaf, label: t('side.automation_planner'), i18nKey: 'side.automation_planner', active: false },
        { icon: Droplet, label: t('side.irrigation_map'), i18nKey: 'side.irrigation_map', active: false },
        { icon: ShieldAlert, label: t('side.pest_deterrence'), i18nKey: 'side.pest_deterrence', active: false },
    ];

    return (
        <div className="w-64 h-screen fixed left-0 top-0 glass-panel border-r border-bio-green/20 z-40 flex flex-col pt-8 pb-4">

            {/* Brand */}
            <div className="flex items-center space-x-3 px-6 mb-12">
                <Hexagon className="w-8 h-8 text-bio-green" />
                <span className="font-cinzel text-xl text-bio-green neon-text-green font-bold tracking-widest">A.R.I.V.U</span>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 flex flex-col space-y-2 px-4">
                {navItems.map((item, i) => (
                    <button
                        key={i}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${item.active
                                ? 'bg-bio-green/10 text-bio-green border border-bio-green/30 shadow-[inset_0_0_10px_rgba(0,255,136,0.1)]'
                                : 'text-bio-cream/60 hover:bg-white/5 hover:text-bio-cream border border-transparent'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 ${item.active ? 'text-bio-green' : 'text-bio-cream/60'}`} />
                        <span className="font-rajdhani text-nav-fixed uppercase tracking-wide font-semibold" data-i18n={item.i18nKey}>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Logout */}
            <div className="px-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-colors border border-transparent hover:border-red-500/20"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-rajdhani text-nav-fixed uppercase tracking-wide font-semibold" data-i18n="side.terminate_session">{t('side.terminate_session')}</span>
                </button>
            </div>

        </div>
    );
}
