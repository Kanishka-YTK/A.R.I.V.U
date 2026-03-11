'use client';

import { motion } from 'framer-motion';
import { Package, Truck, Heart, Trophy, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { useMockDb } from '@/store/mockDb';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/store/languageStore';

export default function CustomerHome() {
    const user = useMockDb((state) => state.currentUser);
    const products = useMockDb((state) => state.products);
    const router = useRouter();
    const { t } = useTranslation();

    const statCards = [
        { title: t('cust.total_orders'), i18nKey: 'cust.total_orders', value: '12', icon: Package, color: 'text-[#1A4731]' },
        { title: t('cust.pending_deliveries'), i18nKey: 'cust.pending_deliveries', value: '2', icon: Truck, color: 'text-[#D97706]' },
        { title: t('cust.wishlist'), i18nKey: 'cust.wishlist', value: '8', icon: Heart, color: 'text-[#DC2626]' },
        { title: t('cust.rewards'), i18nKey: 'cust.rewards', value: '1,450', icon: Trophy, color: 'text-[#16A34A]' },
    ];

    return (
        <div className="space-y-12 pb-12 w-full">
            
            {/* Welcome Banner */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-[#1A4731] to-[#0F2D1F] rounded-[24px] p-8 md:p-12 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="relative z-10">
                    <span className="px-3 py-1 bg-[#FFFFFF]/10 backdrop-blur-md text-[#FFFFFF] rounded-full font-rajdhani text-muted-fixed uppercase tracking-widest flex items-center gap-2 w-fit mb-4 border border-[#FFFFFF]/20">
                        <ShieldCheck className="w-3 h-3" /> <span data-i18n="cust.validated">{t('cust.validated')}</span>
                    </span>
                    <h1 className="font-cinzel text-heading-fixed text-[#FFFFFF] font-bold mb-2">
                        <span data-i18n="cust.welcome" data-i18n-params={JSON.stringify({ name: user?.name || '' })}>{t('cust.welcome', { name: user?.name || '' })}</span> 🌿
                    </h1>
                    <p className="font-lato text-[#FFFFFF]/80 max-w-xl text-body-fixed" data-i18n="cust.desc">{t('cust.desc')}</p>
                </div>
                <div className="relative z-10 mt-6 md:mt-0 flex">
                    <button onClick={() => router.push('/customer/shop')} className="bg-[#16A34A] text-[#FFFFFF] px-8 py-4 rounded-xl font-rajdhani font-bold uppercase tracking-widest text-button-fixed hover:bg-[#1A4731] transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center gap-2">
                        <span data-i18n="cust.explore">{t('cust.explore')}</span> <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#2E7D32]/20 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform"
                    >
                        <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
                            <stat.icon className="w-24 h-24" />
                        </div>
                        <div className="relative z-10">
                            <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                            <span className="font-rajdhani text-label-fixed safe-wrap uppercase tracking-widest text-[#6B7280] block mb-1" data-i18n={stat.i18nKey}>{stat.title}</span>
                            <span className="font-cinzel font-bold text-heading-fixed text-[#1A1A1A]">{stat.value}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Featured Products Carousel */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-cinzel text-heading-fixed text-[#1A1A1A] font-bold" data-i18n="cust.featured">{t('cust.featured')}</h2>
                </div>
                
                <div className="flex overflow-x-auto gap-6 hide-scrollbar pb-8 px-2">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            onClick={() => router.push(`/customer/product/${product.id}`)}
                            className="min-w-[300px] w-[300px] bg-[#FFFFFF] rounded-[16px] border border-[#16A34A] overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-all group"
                        >
                            <div className="h-48 relative overflow-hidden bg-[#F0FAF0]">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-t-[16px]" />
                                <div className="absolute top-2 left-2 flex flex-row flex-wrap gap-1">
                                    <span className="px-2 py-1 bg-[#1A4731] text-[#FFFFFF] text-[10px] font-rajdhani uppercase rounded-[4px] flex items-center gap-1 border border-[#1A4731] whitespace-nowrap">
                                        <ShieldCheck className="w-3 h-3 text-[#22C55E]" /> <span data-i18n="cust.verified">{t('cust.verified')}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <span className="text-muted-fixed font-rajdhani font-bold text-[#FFFFFF] bg-[#16A34A] px-2 py-1 rounded-full uppercase tracking-widest whitespace-nowrap inline-block" data-i18n={`cat.${product.category.toLowerCase().replace(/ /g, '_')}`}>{t(`cat.${product.category.toLowerCase().replace(/ /g, '_')}`)}</span>
                                <h3 className="font-rajdhani text-subheading-fixed font-bold text-[#1A1A1A] mb-2 mt-2 line-clamp-1" data-i18n={product.name}>{t(product.name)}</h3>
                                <div className="flex justify-between items-center mt-4 border-t border-[#D1D5DB] pt-3">
                                    <span className="font-rajdhani font-bold text-[#16A34A] text-subheading-fixed">${product.retailPrice.toFixed(2)}</span>
                                    <button className="w-8 h-8 rounded-full bg-[#F0FAF0] flex items-center justify-center text-[#1A4731] hover:bg-[#16A34A] hover:text-[#FFFFFF] transition-colors border border-[#16A34A]">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
