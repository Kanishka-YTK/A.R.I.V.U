'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Tractor, ShoppingCart, ShieldCheck, ArrowLeft, Leaf } from 'lucide-react';
import { useMockDb, Role, User } from '@/store/mockDb';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useTranslation } from '@/store/languageStore';

export default function LandingPage() {
    const router = useRouter();
    const login = useMockDb((state) => state.login);
    const { t } = useTranslation();

    const [selectedRole, setSelectedRole] = useState<'FARMER' | 'CUSTOMER' | null>(null);
    const [isRegistering, setIsRegistering] = useState(false);

    // Form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    
    // Farmer specific
    const [farmName, setFarmName] = useState('');
    const [farmLocation, setFarmLocation] = useState('');
    const [farmSize, setFarmSize] = useState('');
    const [aadhar, setAadhar] = useState('');

    // Customer specific
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const particles = useMemo(() => {
        return [...Array(20)].map(() => ({
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animateX: [0, Math.random() * 100 - 50, 0],
            animateY: [0, Math.random() * 100 - 50, 0],
            duration: Math.random() * 10 + 10,
        }));
    }, []);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedRole) return;

        const mockUser: User = {
            id: Math.random().toString(36).substring(7),
            name: fullName || (selectedRole === 'FARMER' ? 'Arjun Farmer' : 'Sophia Buyer'),
            role: selectedRole,
            email: email || `${selectedRole.toLowerCase()}@arivu.com`
        };
        
        login(mockUser);

        if (selectedRole === 'FARMER') router.push('/farmer');
        else if (selectedRole === 'CUSTOMER') router.push('/customer');
    };

    return (
        <div className="relative min-h-screen bg-[#F0FAF0] flex flex-col items-center justify-center overflow-y-auto">
            {/* Language Switcher */}
            <div className="absolute top-6 right-6 z-50">
                <LanguageSwitcher />
            </div>

            {/* Grain Texture Overlay */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            {/* Soft Animated Particles/Waves */}
            {mounted && (
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {particles.map((p, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-[#16A34A]/10 blur-xl"
                            style={{
                                width: p.width,
                                height: p.height,
                                left: p.left,
                                top: p.top,
                            }}
                            animate={{
                                x: p.animateX,
                                y: p.animateY,
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            )}
            <div className="absolute top-10 left-10 opacity-5">
                <Leaf className="w-64 h-64 text-[#16A34A] transform -rotate-45" />
            </div>
            <div className="absolute bottom-10 right-10 opacity-5">
                <Leaf className="w-64 h-64 text-[#16A34A] transform rotate-45" />
            </div>

            {/* Hero Content */}
            <div className="z-10 flex flex-col items-center text-center space-y-2 px-4 w-full max-w-5xl pb-10">

                {/* Logo with Glowing Ring */}
                <div className="relative p-2 sm:p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 border-[3px] border-[#16A34A] rounded-full sm:rounded-3xl border-opacity-50"
                        style={{ boxShadow: '0 0 30px rgba(22, 163, 74, 0.4)' }}
                    />

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-5xl sm:text-7xl md:text-8xl font-cinzel font-bold tracking-[0.15em] relative z-10 flex flex-wrap justify-center"
                        data-i18n="hero.project"
                    >
                        {t('hero.project')}
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex flex-col items-center gap-2 mt-2"
                >
                    <div className="inline-flex items-center gap-3 py-2 px-6 bg-[#FFFFFF]/60 backdrop-blur-sm shadow-sm rounded-full text-[#1A4731] text-subheading-fixed font-bold tracking-widest font-rajdhani uppercase border border-[#16A34A]/30">
                        <ShieldCheck className="w-6 h-6 text-[#16A34A]" /> <span data-i18n="hero.powered">{t('hero.powered')}</span>
                    </div>
                </motion.div>

                {/* Interactive Area */}
                <div className="w-full mt-2 min-h-[350px] flex justify-center">
                    <AnimatePresence mode="wait">
                        {!selectedRole ? (
                                <motion.div
                                    key="role-selection"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center w-full"
                                >
                                    <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full mb-6" style={{ perspective: 1000 }}>
                                        {/* FARMER FLIP CARD */}
                                        <div className="group w-[280px] min-h-[220px] cursor-pointer" onClick={() => { setSelectedRole('FARMER'); setIsRegistering(false); setEmail('f1'); setPassword('1234'); }}>
                                            <div className="relative w-full min-h-[220px] h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-[0_10px_30px_rgba(26,71,49,0.2)] rounded-[16px]">
                                                {/* Front */}
                                                <div className="absolute inset-0 w-full h-full bg-[#FFFFFF] rounded-[16px] border-2 border-[#16A34A] flex flex-col items-center justify-center text-center p-3 [backface-visibility:hidden]">
                                                    <Tractor className="w-10 h-10 text-[#1A4731] mb-2" />
                                                    <h3 className="font-rajdhani text-card-title-fixed font-bold text-[#1A1A1A] tracking-wide uppercase" data-i18n="card.farmer.title">
                                                        {t('card.farmer.title')}
                                                    </h3>
                                                    <p className="mt-1 font-lato text-body-fixed text-[#374151] role-card-desc" data-i18n="card.farmer.desc">{t('card.farmer.desc')}</p>
                                                </div>
                                                {/* Back */}
                                                <div className="absolute inset-0 w-full h-full bg-[#1A4731] rounded-[16px] border-2 border-[#16A34A] flex flex-col items-center justify-center text-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                                    <h3 className="font-rajdhani text-subheading-fixed font-bold text-[#FFFFFF] tracking-widest uppercase mb-2" data-i18n="card.farmer.login">
                                                        {t('card.farmer.login')}
                                                    </h3>
                                                    <span className="text-[#86EFAC] text-label-fixed font-lato" data-i18n="card.farmer.enter">{t('card.farmer.enter')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CUSTOMER FLIP CARD */}
                                        <div className="group w-[280px] min-h-[220px] cursor-pointer" onClick={() => { setSelectedRole('CUSTOMER'); setIsRegistering(false); setEmail('cust1'); setPassword('1234'); }}>
                                            <div className="relative w-full min-h-[220px] h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-[0_10px_30px_rgba(217,119,6,0.2)] rounded-[16px]">
                                                {/* Front */}
                                                <div className="absolute inset-0 w-full h-full bg-[#FFFFFF] rounded-[16px] border-2 border-[#D97706] flex flex-col items-center justify-center text-center p-3 [backface-visibility:hidden]">
                                                    <ShoppingCart className="w-10 h-10 text-[#D97706] mb-2" />
                                                    <h3 className="font-rajdhani text-card-title-fixed font-bold text-[#1A1A1A] tracking-wide uppercase" data-i18n="card.customer.title">
                                                        {t('card.customer.title')}
                                                    </h3>
                                                    <p className="mt-1 font-lato text-body-fixed text-[#374151] role-card-desc" data-i18n="card.customer.desc">{t('card.customer.desc')}</p>
                                                </div>
                                                {/* Back */}
                                                <div className="absolute inset-0 w-full h-full bg-[#D97706] rounded-[16px] border-2 border-[#D97706] flex flex-col items-center justify-center text-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                                    <h3 className="font-rajdhani text-subheading-fixed font-bold text-[#FFFFFF] tracking-widest uppercase mb-2" data-i18n="card.customer.login">
                                                        {t('card.customer.login')}
                                                    </h3>
                                                    <span className="text-[#FEF3C7] text-label-fixed font-lato" data-i18n="card.customer.enter">{t('card.customer.enter')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Strip */}
                                    <motion.div 
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                        className="stats-strip text-nav-fixed font-rajdhani font-bold text-[#1A4731] tracking-widest uppercase transition-all shadow-sm"
                                    >
                                        <div className="stat-item"><span data-i18n="stats.farmers">{t('stats.farmers')}</span></div>
                                        <div className="stat-divider w-1.5 h-1.5 bg-[#16A34A] rounded-full"></div>
                                        <div className="stat-item"><span data-i18n="stats.products">{t('stats.products')}</span></div>
                                        <div className="stat-divider w-1.5 h-1.5 bg-[#16A34A] rounded-full"></div>
                                        <div className="stat-item"><span data-i18n="stats.countries">{t('stats.countries')}</span></div>
                                        <div className="stat-divider w-1.5 h-1.5 bg-[#16A34A] rounded-full"></div>
                                        <div className="stat-item"><span className="text-[#D97706]" data-i18n="stats.verified">{t('stats.verified')}</span></div>
                                    </motion.div>
                                </motion.div>
                        ) : (
                                <motion.div
                                    key="auth-form"
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full max-w-md bg-[#FFFFFF] p-4 sm:p-6 mb-2 rounded-[16px] border shadow-[0_4px_20px_rgba(22,163,74,0.15)] border-[#16A34A]"
                                >
                                <button
                                    onClick={() => setSelectedRole(null)}
                                    className="flex items-center text-button-fixed font-rajdhani font-bold text-[#374151] hover:text-[#16A34A] mb-6 transition-colors uppercase tracking-widest"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> <span data-i18n="auth.back">{t('auth.back')}</span>
                                </button>

                                <div className="flex flex-col items-center mb-4">
                                    {selectedRole === 'FARMER' ? <Tractor className="w-8 h-8 text-[#1A4731] mb-1" /> : <ShoppingCart className="w-8 h-8 text-[#D97706] mb-1" />}
                                    <h2 className="font-cinzel-alt text-subheading-fixed font-bold text-[#1A1A1A]" 
                                        data-i18n={isRegistering ? (selectedRole === 'FARMER' ? 'auth.btn.regFarm' : 'auth.btn.regCust') : (selectedRole === 'FARMER' ? 'auth.btn.logFarm' : 'auth.btn.logCust')}>
                                        {isRegistering 
                                            ? (selectedRole === 'FARMER' ? t('auth.btn.regFarm') : t('auth.btn.regCust')) 
                                            : (selectedRole === 'FARMER' ? t('auth.btn.logFarm') : t('auth.btn.logCust'))}
                                    </h2>
                                </div>

                                <form onSubmit={handleLoginSubmit} className="space-y-3">
                                    {isRegistering && (
                                        <div className="space-y-4">
                                            <input type="text" data-i18n="auth.name" placeholder={t('auth.name')} required value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] transition-colors" />
                                            {selectedRole === 'FARMER' && (
                                                <>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input type="text" data-i18n="auth.phone" placeholder={t('auth.phone')} required value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                        <input type="email" data-i18n="auth.email" placeholder={t('auth.email')} required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                    </div>
                                                    <input type="text" data-i18n="auth.farmName" placeholder={t('auth.farmName')} required value={farmName} onChange={e => setFarmName(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input type="text" data-i18n="auth.location" placeholder={t('auth.location')} required value={farmLocation} onChange={e => setFarmLocation(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                        <input type="number" data-i18n="farm.size" placeholder={t('farm.size')} required value={farmSize} onChange={e => setFarmSize(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                    </div>
                                                    <input type="text" data-i18n="auth.aadhar" placeholder={t('auth.aadhar')} required value={aadhar} onChange={e => setAadhar(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                </>
                                            )}
                                            {selectedRole === 'CUSTOMER' && (
                                                <>
                                                    <input type="email" data-i18n="auth.email" placeholder={t('auth.email')} required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                    <input type="text" data-i18n="auth.phone" placeholder={t('auth.phone')} required value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <input type="text" data-i18n="auth.country" placeholder={t('auth.country')} required value={country} onChange={e => setCountry(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                        <input type="text" data-i18n="auth.city" placeholder={t('auth.city')} required value={city} onChange={e => setCity(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                    </div>
                                                </>
                                            )}
                                            <input type="password" data-i18n="auth.password" placeholder={t('auth.password')} required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                            <input type="password" data-i18n="auth.confirmPassword" placeholder={t('auth.confirmPassword')} required className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                        </div>
                                    )}

                                    {!isRegistering && (
                                        <div className="space-y-3">
                                            {selectedRole === 'FARMER' ? (
                                                <>
                                                    <input type="text" data-i18n="auth.farmerId" placeholder={t('auth.farmerId')} required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                </>
                                            ) : (
                                                <>
                                                    <input type="text" data-i18n="auth.customerId" placeholder={t('auth.customerId')} required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                                </>
                                            )}
                                            <input type="password" data-i18n="auth.password" placeholder={t('auth.password')} required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 text-placeholder-fixed rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#1A1A1A] placeholder-[#6B7280] focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]" />
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="w-full py-2 text-button-fixed mt-3 rounded-md font-rajdhani font-bold uppercase tracking-widest bg-[#16A34A] text-[#FFFFFF] transition-opacity hover:opacity-90"
                                    >
                                        <span data-i18n={isRegistering ? (selectedRole === 'FARMER' ? 'auth.btn.regFarm' : 'auth.btn.regCust') : (selectedRole === 'FARMER' ? 'auth.btn.logFarm' : 'auth.btn.logCust')}>
                                            {isRegistering 
                                                ? (selectedRole === 'FARMER' ? t('auth.btn.regFarm') : t('auth.btn.regCust')) 
                                                : (selectedRole === 'FARMER' ? t('auth.btn.logFarm') : t('auth.btn.logCust'))}
                                        </span>
                                    </button>
                                </form>

                                <div className="mt-3 text-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsRegistering(!isRegistering)}
                                        className="text-muted-fixed font-lato underline-offset-4 hover:underline text-[#374151]"
                                        data-i18n={isRegistering ? 'auth.alreadyAccount' : (selectedRole === 'FARMER' ? 'auth.newFarmer' : 'auth.newCustomer')}
                                    >
                                        {isRegistering 
                                            ? t('auth.alreadyAccount') 
                                            : (selectedRole === 'FARMER' ? t('auth.newFarmer') : t('auth.newCustomer'))}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Bottom Marquee / Ticker */}
            <div className="fixed bottom-0 w-full bg-[#1A4731] text-[#86EFAC] py-2 overflow-hidden border-t border-[#16A34A] z-20">
                <div className="whitespace-nowrap animate-marquee flex items-center font-rajdhani font-bold tracking-widest text-muted-fixed uppercase">
                    <span className="mx-8">• <span data-i18n="marquee.tip">{t('marquee.tip')}</span></span>
                    <span className="mx-8">• <span data-i18n="marquee.market">{t('marquee.market')}</span></span>
                    <span className="mx-8">• <span data-i18n="marquee.weather">{t('marquee.weather')}</span></span>
                    <span className="mx-8">• <span data-i18n="marquee.blockchain">{t('marquee.blockchain')}</span></span>
                    <span className="mx-8">• <span data-i18n="marquee.shield">{t('marquee.shield')}</span></span>
                </div>
            </div>

            {/* Marquee Keyframes (injected via useEffect) */}
        </div>
    );
}
