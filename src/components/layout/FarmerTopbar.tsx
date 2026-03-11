'use client';

import { useMockDb } from '@/store/mockDb';
import { Cloud, Bell, BatteryMedium } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/store/languageStore';

export default function FarmerTopbar() {
    const user = useMockDb((state) => state.currentUser);
    const sensorData = useMockDb((state) => state.sensorData);
    const [time, setTime] = useState<string>('');
    const { t } = useTranslation();

    useEffect(() => {
        const int = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);
        return () => clearInterval(int);
    }, []);

    return (
        <header className="h-20 glass-panel border-b border-bio-green/20 fixed top-0 right-0 left-64 z-30 flex items-center justify-between px-8">

            {/* Title */}
            <div>
                <h2 className="text-subheading-fixed font-rajdhani font-bold text-bio-cream uppercase tracking-wide">{user?.name}'s S.H.I.E.L.D</h2>
                <p className="text-muted-fixed font-lato text-bio-green/70 uppercase tracking-widest" data-i18n="farm.active_node">{t('farm.active_node')}</p>
            </div>

            {/* Widgets */}
            <div className="flex items-center space-x-8">

                {/* Weather / Sensors */}
                <div className="flex items-center space-x-6 text-label-fixed font-rajdhani border-r border-white/10 pr-8">
                    <div className="flex items-center space-x-2 text-bio-cream/80">
                        <Cloud className="w-5 h-5 text-bio-teal" />
                        <span className="text-body-fixed">{sensorData.temperature}°C</span>
                    </div>
                    <div className="flex items-center space-x-2 text-bio-cream/80">
                        <BatteryMedium className="w-5 h-5 text-bio-gold" />
                        <span>98% <span className="text-muted-fixed text-bio-cream/40">SOLAR</span></span>
                    </div>
                </div>

                {/* Time */}
                <div className="font-rajdhani text-subheading-fixed text-bio-green font-bold tracking-widest tabular-nums animate-glow-pulse">
                    {time || '00:00:00'}
                </div>

                {/* Alerts */}
                <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors group">
                    <Bell className="w-6 h-6 text-bio-cream/80 group-hover:text-bio-cream" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-bio-black"></span>
                </button>

            </div>
        </header>
    );
}
