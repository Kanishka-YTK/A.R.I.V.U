'use client';

import { motion } from 'framer-motion';
import { Package, ShoppingCart, AlertTriangle, CloudRain, Sun, FileText, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { useMockDb } from '@/store/mockDb';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/store/languageStore';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function FarmerDashboard() {
    const products = useMockDb((state) => state.products);
    const user = useMockDb((state) => state.currentUser);
    const router = useRouter();
    const { t } = useTranslation();

    const lowStockProducts = products.filter(p => p.farmerId === (user?.id || 'f1') && p.stock < 20);

    const revenueData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Revenue ($)',
            data: [250, 420, 310, 500, 480, 600, 840],
            borderColor: '#16A34A',
            backgroundColor: 'rgba(22, 163, 74, 0.2)',
            fill: true,
            tension: 0.4
        }]
    };

    const tips = [
        t('marquee.tip'),
        "Rotate your crops to maintain soil nutrients.", // Will be handled by tips logic if expanded
        "Update product photos frequently for 40% more sales.",
        "Check automated irrigation rules before heavy rains.",
    ];

    return (
        <div className="space-y-8 pb-12 w-full pt-8 max-w-7xl mx-auto px-4">
            
            {/* Header & Quick Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 pb-6 border-b border-[#D1D5DB]">
                <div>
                    <h1 className="font-cinzel text-heading-fixed text-[#1A1A1A] tracking-wider uppercase mb-2 font-bold">
                        <span data-i18n="farm.welcome">{t('farm.welcome')}</span>, {user?.name?.split(' ')[0] || 'Farmer'}
                    </h1>
                    <p className="font-lato text-[#374151] text-body-fixed" data-i18n="farm.desc">{t('farm.desc')}</p>
                </div>
                
                {/* Quick Actions Row */}
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => router.push('/farmer/products')} className="px-4 py-2 bg-[#1A4731] text-[#FFFFFF] rounded-[8px] font-rajdhani font-bold uppercase tracking-widest text-button-fixed hover:bg-[#16A34A] transition-colors flex items-center gap-2"><Package className="w-4 h-4"/> <span data-i18n="farm.add_product">{t('farm.add_product')}</span></button>
                    <button onClick={() => router.push('/farmer/orders')} className="px-4 py-2 bg-[#F59E0B] text-[#FFFFFF] rounded-[8px] font-rajdhani font-bold uppercase tracking-widest text-button-fixed hover:bg-[#D97706] transition-colors flex items-center gap-2"><ShoppingCart className="w-4 h-4"/> <span data-i18n="farm.view_orders">{t('farm.view_orders')}</span></button>
                    <button onClick={() => router.push('/farmer/crop-monitor')} className="px-4 py-2 bg-[#3B82F6] text-[#FFFFFF] rounded-[8px] font-rajdhani font-bold uppercase tracking-widest text-button-fixed hover:bg-[#2563EB] transition-colors flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> <span data-i18n="farm.sensors">{t('farm.sensors')}</span></button>
                    <button className="px-4 py-2 bg-[#FFFFFF] border border-[#D1D5DB] text-[#374151] rounded-[8px] font-rajdhani font-bold uppercase tracking-widest text-button-fixed hover:border-[#16A34A] hover:text-[#16A34A] transition-colors flex items-center gap-2"><FileText className="w-4 h-4"/> <span data-i18n="farm.report">{t('farm.report')}</span></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Revenue Sparkline */}
                    <div className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[24px] p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="font-rajdhani text-subheading-fixed uppercase tracking-widest text-[#6B7280] font-bold" data-i18n="farm.stats.revenue">{t('farm.stats.revenue')}</h2>
                                <p className="font-cinzel text-subheading-fixed font-bold text-[#1A1A1A] mt-1">$3,400.00 <span className="text-muted-fixed font-lato text-[#16A34A] flex items-center inline-flex ml-2"><ArrowUpRight className="w-4 h-4"/> +12.5%</span></p>
                            </div>
                        </div>
                        <div className="h-48 w-full">
                            <Line 
                                data={revenueData} 
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: { y: { display: false }, x: { grid: { display: false } } },
                                    elements: { point: { radius: 0, hitRadius: 10, hoverRadius: 4 } }
                                }} 
                            />
                        </div>
                    </div>

                    {/* Low Stock Alerts */}
                    <div className="bg-[#FFFFFF] border border-[#F59E0B] rounded-[24px] p-6 shadow-sm">
                        <h2 className="font-rajdhani text-heading-fixed uppercase tracking-widest text-[#D97706] font-bold mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5"/> <span data-i18n="farm.low_stock">{t('farm.low_stock')}</span>
                        </h2>
                        {lowStockProducts.length > 0 ? (
                            <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-2">
                                {lowStockProducts.map(p => (
                                    <div key={p.id} className="min-w-[240px] flex flex-col bg-[#FEF3C7] rounded-[16px] border border-[#FDE68A] overflow-hidden group hover:shadow-md transition-shadow">
                                        <div className="h-32 w-full relative">
                                            <img src={p.image} alt={t(p.name)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            <div className="absolute top-2 right-2">
                                                <span className="font-rajdhani font-bold text-[#DC2626] bg-[#FFFFFF] px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-[#FECACA] shadow-sm w-fit whitespace-nowrap">
                                                    {p.stock} <span data-i18n="farm.stats.units">{t('farm.stats.units')}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <span className="font-lato font-bold text-[#1A1A1A] text-body-fixed block truncate" data-i18n={p.name}>{t(p.name)}</span>
                                            <span className="text-[10px] font-rajdhani font-bold text-[#D97706] uppercase tracking-widest block mt-1" data-i18n={`cat.${p.category.toLowerCase()}`}>{t(`cat.${p.category.toLowerCase()}`)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center bg-[#F0FAF0] rounded-[16px] border border-[#D1D5DB]/30">
                                <CheckCircle2 className="w-10 h-10 text-[#16A34A] mx-auto mb-2 opacity-50" />
                                <p className="font-lato text-[#6B7280]">All products are well stocked.</p>
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-6">
                    
                    {/* Today's Weather */}
                    <div className="bg-gradient-to-br from-[#1A4731] to-[#0F2D1F] rounded-[24px] p-6 shadow-sm text-[#FFFFFF] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -m-4 opacity-10">
                            <Sun className="w-32 h-32" />
                        </div>
                        <h2 className="font-rajdhani text-subheading-fixed uppercase tracking-widest text-[#86EFAC] font-bold mb-4" data-i18n="farm.stats.weather">{t('farm.stats.weather')}</h2>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <Sun className="w-12 h-12 text-[#FCD34D]" />
                            <div>
                                <h3 className="font-cinzel text-subheading-fixed font-bold">28°C</h3>
                                <p className="font-lato text-muted-fixed opacity-80">Sunny & Clear</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-label-fixed font-rajdhani tracking-widest relative z-10">
                            <div className="bg-[#FFFFFF]/10 p-2 rounded-[8px] text-center border border-[#FFFFFF]/10">
                                <span className="block opacity-70 mb-1" data-i18n="farm.stats.humidity">{t('farm.stats.humidity')}</span>
                                <span className="font-bold">60%</span>
                            </div>
                            <div className="bg-[#FFFFFF]/10 p-2 rounded-[8px] text-center border border-[#FFFFFF]/10">
                                <span className="block opacity-70 mb-1" data-i18n="farm.stats.rain">{t('farm.stats.rain')}</span>
                                <span className="font-bold">10%</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Mini Table */}
                    <div className="bg-[#FFFFFF] border border-[#D1D5DB] rounded-[24px] p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-rajdhani text-subheading-fixed uppercase tracking-widest text-[#1A1A1A] font-bold" data-i18n="farm.recent_orders">{t('farm.recent_orders')}</h2>
                            <button onClick={() => router.push('/farmer/orders')} className="text-button-fixed text-[#16A34A] hover:underline font-bold font-rajdhani uppercase tracking-widest" data-i18n="farm.view_all">{t('farm.view_all')}</button>
                        </div>
                        <div className="space-y-4">
                            {[1,2,3,4,5].map((_, i) => (
                                <div key={i} className="flex justify-between items-center text-sm border-b border-[#F3F4F6] pb-3 last:border-0 last:pb-0">
                                    <div className="flex flex-col">
                                        <span className="font-lato font-bold text-[#1A1A1A] text-body-fixed">ORD-2026-0{i+1}</span>
                                        <span className="font-rajdhani text-muted-fixed text-[#6B7280] uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3"/> 2 hrs ago</span>
                                    </div>
                                    <span className={`px-2 py-1 rounded-[8px] text-muted-fixed font-rajdhani font-bold uppercase tracking-widest w-fit whitespace-nowrap ${i === 0 ? 'bg-[#D1FAE5] text-[#059669]' : 'bg-[#FEF3C7] text-[#D97706]'}`}>
                                        {i === 0 ? <span data-i18n="farm.delivered">{t('farm.delivered')}</span> : <span data-i18n="farm.processing">{t('farm.processing')}</span>}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Marketplace Tips Card */}
                    <div className="bg-[#F0FAF0] border border-[#16A34A]/30 rounded-[24px] p-6 shadow-sm relative">
                        <h2 className="font-rajdhani text-subheading-fixed uppercase tracking-widest text-[#16A34A] font-bold mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> <span data-i18n="farm.tips_title">{t('farm.tips_title')}</span></h2>
                        <div className="font-lato text-sm text-[#374151] italic border-l-2 border-[#16A34A] pl-4">
                            "{tips[Math.floor(Math.random() * tips.length)]}"
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
    );
}
