'use client';

import { ShoppingCart, LogOut, Hexagon, Home, Store, Package, Star, UserCircle, Menu, X } from 'lucide-react';
import { useMockDb } from '@/store/mockDb';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from '@/store/languageStore';
import { useState } from 'react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function CustomerNavbar() {
    const user = useMockDb((state) => state.currentUser);
    const logout = useMockDb((state) => state.logout);
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const navItems = [
        { icon: Home, label: 'Home', path: '/customer' },
        { icon: Store, label: 'Shop', path: '/customer/shop' },
        { icon: ShoppingCart, label: 'Cart', path: '/customer/cart' },
        { icon: Package, label: 'My Orders', path: '/customer/orders' },
        { icon: Star, label: 'Reviews', path: '/customer/reviews' },
        { icon: UserCircle, label: 'Profile', path: '/customer/profile' },
    ];

    return (
        <>
        <header className="h-20 fixed top-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 2xl:px-12 bg-[#1A4731] shadow-md">

            {/* Brand */}
            <div onClick={() => router.push('/customer')} className="flex items-center space-x-3 cursor-pointer group flex-shrink-0">
                <Hexagon className="w-8 h-8 text-[#FFFFFF] group-hover:animate-spin-slow transition-transform border border-[#FFFFFF] rounded-full p-1" />
                <div className="flex flex-col">
                    <span className="font-cinzel text-lg 2xl:text-xl text-[#FFFFFF] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] font-bold tracking-[0.1em]">A.R.I.V.U</span>
                    <span className="text-[10px] uppercase font-rajdhani text-[#D97706] tracking-widest font-bold whitespace-nowrap" data-i18n="nav.customer_portal">{t('nav.customer_portal')}</span>
                </div>
            </div>

            {/* Center Tabs */}
            <nav className="hidden lg:flex items-center justify-center gap-x-1 sm:gap-x-2 min-w-0 flex-1 px-4 overflow-hidden">
                {[
                    { icon: Home, label: t('nav.home'), i18nKey: 'nav.home', path: '/customer' },
                    { icon: Store, label: t('nav.shop'), i18nKey: 'nav.shop', path: '/customer/shop' },
                    { icon: ShoppingCart, label: t('nav.cart'), i18nKey: 'nav.cart', path: '/customer/cart' },
                    { icon: Package, label: t('nav.orders'), i18nKey: 'nav.orders', path: '/customer/orders' },
                    { icon: Star, label: t('nav.reviews'), i18nKey: 'nav.reviews', path: '/customer/reviews' },
                    { icon: UserCircle, label: t('nav.profile'), i18nKey: 'nav.profile', path: '/customer/profile' },
                ].map((item, i) => {
                    const isActive = pathname === item.path || (item.path === '/customer/shop' && pathname.startsWith('/customer/product'));
                    return (
                        <button
                            key={i}
                            title={item.label}
                            onClick={() => router.push(item.path)}
                            className={`flex items-center space-x-1 2xl:space-x-2 px-2 2xl:px-3 py-2 rounded-xl transition-all duration-300 font-rajdhani uppercase tracking-widest text-[10px] 2xl:text-nav-fixed font-bold !shrink min-w-0 ${isActive ? 'bg-[#FFFFFF] text-[#1A4731] shadow-sm' : 'text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF] border border-transparent'}`}
                        >
                            <item.icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-[#1A4731]' : 'text-[#FFFFFF]/70'}`} />
                            <span className="truncate max-w-[100px] 2xl:max-w-[120px]" data-i18n={item.i18nKey}>{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                <div className="mr-1 sm:mr-2 scale-90 sm:scale-100 origin-right">
                    <LanguageSwitcher />
                </div>
                <div className="hidden sm:flex items-center space-x-3 text-right">
                    <span className="text-label-fixed font-rajdhani font-bold text-[#FFFFFF]">{user?.name}</span>
                    <div className="w-10 h-10 rounded-full bg-[#16A34A] border-2 border-[#16A34A] flex items-center justify-center text-[#FFFFFF] font-rajdhani font-bold text-subheading-fixed shadow-sm">
                        {user?.name?.charAt(0) || 'C'}
                    </div>
                </div>

                <div className="hidden lg:block">
                    <button onClick={handleLogout} className="p-2 rounded-full hover:bg-[#DC2626]/20 transition-colors group ml-2">
                        <LogOut className="w-5 h-5 text-[#DC2626] group-hover:text-[#DC2626]" />
                    </button>
                </div>

                <button 
                    className="lg:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
        </header>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
            <div className="lg:hidden fixed top-20 left-0 w-full bg-[#1A4731] shadow-xl border-t border-white/10 flex flex-col py-4 px-4 space-y-2 z-40 max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                {[
                    { icon: Home, label: t('nav.home'), i18nKey: 'nav.home', path: '/customer' },
                    { icon: Store, label: t('nav.shop'), i18nKey: 'nav.shop', path: '/customer/shop' },
                    { icon: ShoppingCart, label: t('nav.cart'), i18nKey: 'nav.cart', path: '/customer/cart' },
                    { icon: Package, label: t('nav.orders'), i18nKey: 'nav.orders', path: '/customer/orders' },
                    { icon: Star, label: t('nav.reviews'), i18nKey: 'nav.reviews', path: '/customer/reviews' },
                    { icon: UserCircle, label: t('nav.profile'), i18nKey: 'nav.profile', path: '/customer/profile' },
                ].map((item, i) => {
                    const isActive = pathname === item.path || (item.path === '/customer/shop' && pathname.startsWith('/customer/product'));
                    return (
                        <button
                            key={i}
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                router.push(item.path);
                            }}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-rajdhani uppercase tracking-widest text-[14px] font-bold ${isActive ? 'bg-[#FFFFFF] text-[#1A4731] shadow-md' : 'text-[#FFFFFF]/80 hover:bg-[#FFFFFF]/10 hover:text-[#FFFFFF]'}`}
                        >
                            <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#1A4731]' : 'text-[#FFFFFF]/80'}`} />
                            <span data-i18n={item.i18nKey}>{item.label}</span>
                        </button>
                    )
                })}
                <div className="pt-2 mt-2 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 font-rajdhani uppercase tracking-widest text-[14px] font-bold text-[#DC2626] bg-[#DC2626]/10 hover:bg-[#DC2626]/20"
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        <span data-i18n="nav.logout">{t('nav.logout') || 'Logout'}</span>
                    </button>
                </div>
            </div>
        )}
        </>
    );
}
