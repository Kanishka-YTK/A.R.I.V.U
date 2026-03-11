'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, Package, ShoppingCart, ThermometerSun, BarChart3, Settings, LogOut, Hexagon, Users } from 'lucide-react';
import { useMockDb } from '@/store/mockDb';
import { useTranslation } from '@/store/languageStore';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function FarmerNavbar() {
    const user = useMockDb((state) => state.currentUser);
    const logout = useMockDb((state) => state.logout);
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const navItems = [
        { icon: Home, label: 'Home', path: '/farmer' },
        { icon: Package, label: 'My Products', path: '/farmer/products' },
        { icon: ShoppingCart, label: 'Orders', path: '/farmer/orders' },
        { icon: ThermometerSun, label: 'Crop Monitor', path: '/farmer/crop-monitor' },
        { icon: BarChart3, label: 'Analytics', path: '/farmer/analytics' },
        { icon: Users, label: 'Farmers', path: '/farmer/farmers' },
        { icon: Settings, label: 'Settings', path: '/farmer/settings' },
    ];

    return (
        <header className="h-20 fixed top-0 w-full z-50 flex items-center justify-between px-6 2xl:px-12 bg-[#1A4731] shadow-md">
            {/* Left: Brand */}
            <div onClick={() => router.push('/farmer')} className="flex items-center space-x-3 cursor-pointer group flex-shrink-0">
                <Hexagon className="w-8 h-8 text-[#FFFFFF] group-hover:animate-spin-slow transition-transform" />
                <div className="flex flex-col">
                    <span className="font-cinzel text-[18px] 2xl:text-[20px] text-[#FFFFFF] font-bold tracking-[0.1em]">A.R.I.V.U</span>
                    <span className="text-[10px] uppercase font-rajdhani text-[#FFFFFF] tracking-widest font-bold opacity-80" data-i18n="nav.farmer_panel">{t('nav.farmer_panel')}</span>
                </div>
            </div>

            {/* Center Tabs */}
            <nav className="hidden lg:flex items-center justify-center gap-x-0.5 xl:gap-x-2 min-w-0 flex-1 px-2 2xl:px-4 overflow-hidden">
                {[
                    { icon: Home, label: t('nav.home'), i18nKey: 'nav.home', path: '/farmer' },
                    { icon: Package, label: t('nav.my_products'), i18nKey: 'nav.my_products', path: '/farmer/products' },
                    { icon: ShoppingCart, label: t('nav.orders'), i18nKey: 'nav.orders', path: '/farmer/orders' },
                    { icon: ThermometerSun, label: t('nav.crop_monitor'), i18nKey: 'nav.crop_monitor', path: '/farmer/crop-monitor' },
                    { icon: BarChart3, label: t('nav.analytics'), i18nKey: 'nav.analytics', path: '/farmer/analytics' },
                    { icon: Users, label: t('nav.farmers'), i18nKey: 'nav.farmers', path: '/farmer/farmers' },
                    { icon: Settings, label: t('nav.settings'), i18nKey: 'nav.settings', path: '/farmer/settings' },
                ].map((item, i) => {
                    const isActive = pathname === item.path;
                    return (
                        <button
                            key={i}
                            onClick={() => router.push(item.path)}
                            className={`flex items-center space-x-1 xl:space-x-2 px-1.5 xl:px-3 py-2 rounded-xl transition-all duration-300 font-rajdhani uppercase tracking-widest text-[10px] xl:text-nav-fixed font-bold flex-shrink min-w-0 ${isActive ? 'bg-[#FFFFFF] text-[#16A34A]' : 'text-[#FFFFFF] opacity-80 hover:bg-[#FFFFFF]/10 hover:opacity-100'}`}
                        >
                            <item.icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#16A34A]' : 'text-[#FFFFFF]'}`} />
                            <span className="text-nav-fixed truncate max-w-[70px] xl:max-w-[120px]" data-i18n={item.i18nKey}>{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            {/* Right Info */}
            <div className="flex items-center space-x-6">
                <div className="hidden lg:block mr-2 scale-90 origin-right">
                    <LanguageSwitcher />
                </div>
                <div className="hidden sm:flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center text-[#FFFFFF] font-rajdhani font-bold text-subheading-fixed">
                        {user?.name?.charAt(0) || 'F'}
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-label-fixed font-rajdhani font-bold text-[#FFFFFF]">{user?.name}</span>
                    </div>
                </div>

                {/* Logout */}
                <button onClick={handleLogout} className="p-2 rounded-full hover:bg-white/10 transition-colors group">
                    <LogOut className="w-6 h-6 text-[#FFFFFF] group-hover:text-red-400" />
                </button>
            </div>
        </header>
    );
}
