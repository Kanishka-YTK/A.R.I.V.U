'use client';

import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { useTranslation } from '@/store/languageStore';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function FarmerAnalytics() {
    const { t } = useTranslation();

    const revenueData = {
        labels: [t('common.mon') || 'Mon', t('common.tue') || 'Tue', t('common.wed') || 'Wed', t('common.thu') || 'Thu', t('common.fri') || 'Fri', t('common.sat') || 'Sat', t('common.sun') || 'Sun'],
        datasets: [{
            fill: true,
            label: t('analytics.revenue') || 'Revenue ($)',
            data: [120, 250, 180, 400, 310, 500, 840],
            borderColor: '#2E7D32',
            backgroundColor: 'rgba(46, 125, 50, 0.1)',
            tension: 0.4,
        }]
    };

    const bestSellingData = {
        labels: [t('analytics.tomatoes') || 'Tomatoes', t('analytics.neem') || 'Neem Pesticide', t('analytics.wheat') || 'Wheat Seeds', t('analytics.milk') || 'Organic Milk'],
        datasets: [{
            label: t('analytics.units_sold') || 'Units Sold',
            data: [145, 80, 50, 110],
            backgroundColor: ['#2E7D32', '#A5D6A7', '#F9A825', '#4E4E1A'],
            borderRadius: 6,
        }]
    };

    const typeData = {
        labels: [t('shop.retail') || 'Retail', t('shop.wholesale') || 'Wholesale'],
        datasets: [{
            data: [35, 10],
            backgroundColor: ['#A5D6A7', '#F9A825'],
            borderWidth: 0,
        }]
    };

    return (
        <div className="space-y-8 pb-12 w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D1D5DB] pb-6"
            >
                <div>
                    <h1 className="font-cinzel text-heading-fixed text-[#1A1A1A] font-bold tracking-wider uppercase mb-2" data-i18n="analytics.title">
                        {t('analytics.title') || 'Analytics Hub'}
                    </h1>
                    <p className="font-lato text-body-fixed text-[#374151]" data-i18n="analytics.desc">{t('analytics.desc') || "Comprehensive metrics mapping your farm's performance."}</p>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* Revenue Line Chart */}
                <div className="lg:col-span-2 bg-[#FFFFFF] rounded-[16px] p-6 shadow-sm border border-[#16A34A] h-[400px] flex flex-col">
                    <h3 className="font-rajdhani text-subheading-fixed font-bold uppercase tracking-widest text-[#1A1A1A] mb-4" data-i18n="analytics.weekly_revenue">{t('analytics.weekly_revenue') || 'Weekly Revenue'}</h3>
                    <div className="flex-1 relative w-full h-full">
                        <Line 
                            data={{
                                ...revenueData,
                                datasets: [{
                                    ...revenueData.datasets[0],
                                    borderColor: '#16A34A',
                                    backgroundColor: 'rgba(22, 163, 74, 0.1)'
                                }]
                            }} 
                            options={{ 
                                responsive: true, 
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    x: { grid: { display: false } },
                                    y: { grid: { color: 'rgba(0,0,0,0.05)' }, border: { display: false } }
                                }
                            }} 
                        />
                    </div>
                </div>

                {/* Retail vs Wholesale Pie Chart */}
                <div className="bg-[#FFFFFF] rounded-[16px] p-6 shadow-sm border border-[#16A34A] h-[400px] flex flex-col items-center">
                    <h3 className="font-rajdhani text-subheading-fixed font-bold uppercase tracking-widest text-[#1A1A1A] mb-4 w-full text-left" data-i18n="analytics.order_types">{t('analytics.order_types') || 'Order Types'}</h3>
                    <div className="flex-1 relative w-[80%] h-[80%] flex items-center justify-center">
                        <Pie 
                            data={typeData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'bottom', labels: { font: { family: 'Rajdhani', size: 14 } } }
                                }
                            }}
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
                {/* Best Selling Bar Chart */}
                <div className="bg-[#FFFFFF] rounded-[16px] p-6 shadow-sm border border-[#16A34A] h-[350px] flex flex-col">
                    <h3 className="font-rajdhani text-subheading-fixed font-bold uppercase tracking-widest text-[#1A1A1A] mb-4" data-i18n="analytics.best_selling">{t('analytics.best_selling') || 'Best Selling Products'}</h3>
                    <div className="flex-1 relative w-full h-full">
                        <Bar 
                            data={{
                                ...bestSellingData,
                                datasets: [{
                                    ...bestSellingData.datasets[0],
                                    backgroundColor: ['#16A34A', '#22C55E', '#D97706', '#6B7280'],
                                }]
                            }} 
                            options={{ 
                                responsive: true, 
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    x: { grid: { display: false } },
                                    y: { grid: { color: 'rgba(0,0,0,0.05)' }, border: { display: false } }
                                }
                            }} 
                        />
                    </div>
                </div>

                {/* Placeholder for future heatmaps */}
                <div className="bg-[#FFFFFF] rounded-[16px] p-6 shadow-sm border border-[#16A34A] h-[350px] flex flex-col items-center justify-center text-center">
                    <h3 className="font-rajdhani text-subheading-fixed font-bold uppercase tracking-widest text-[#1A1A1A] mb-2" data-i18n="analytics.heatmap_title">{t('analytics.heatmap_title')}</h3>
                    <p className="font-lato text-body-fixed text-[#374151] max-w-xs" data-i18n="analytics.heatmap_desc">{t('analytics.heatmap_desc')}</p>
                </div>
            </motion.div>
        </div>
    );
}
