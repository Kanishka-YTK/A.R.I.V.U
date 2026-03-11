'use client';

import { motion } from 'framer-motion';
import { useMockDb } from '@/store/mockDb';
import { MapPin, Box } from 'lucide-react';
import { useTranslation } from '@/store/languageStore';

export default function FarmersList() {
    const farmers = useMockDb((state) => state.farmers);
    const products = useMockDb((state) => state.products);
    const { t } = useTranslation();

    return (
        <div className="space-y-8 pb-12 w-full pt-8 max-w-7xl mx-auto px-4">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D1D5DB] pb-6"
            >
                <div>
                    <h1 className="font-cinzel text-heading-fixed text-[#1A1A1A] font-bold tracking-wider uppercase mb-2" data-i18n="farmers.title">
                        {t('farmers.title') || 'Farmers Directory'}
                    </h1>
                    <p className="font-lato text-body-fixed text-[#374151]" data-i18n="farmers.subtitle">{t('farmers.subtitle') || 'Connections from across the nation verified by A.R.I.V.U'}</p>
                </div>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {farmers.map((farmer, i) => {
                    const farmerProductsCount = products.filter(p => p.farmerId === farmer.id).length;
                    return (
                        <motion.div
                            key={farmer.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#FFFFFF] rounded-[16px] overflow-hidden shadow-sm border border-[#16A34A] group flex flex-col transition-all duration-300 hover:shadow-[0_4px_20px_rgba(22,163,74,0.15)] hover:-translate-y-1 card-container"
                        >
                            <div className="h-24 bg-[#1A4731] relative">
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                                <div className="absolute -bottom-10 w-20 h-20 rounded-full border-4 border-[#FFFFFF] bg-[#16A34A] flex items-center justify-center shadow-lg left-1/2 -translate-x-1/2">
                                    <span className="text-[#FFFFFF] text-3xl font-cinzel font-bold">{farmer.name.charAt(0)}</span>
                                </div>
                            </div>
                            
                            <div className="pt-14 p-6 flex flex-col flex-1 items-center text-center">
                                <h3 className="font-rajdhani text-subheading-fixed font-bold text-[#1A1A1A] mb-1">{farmer.name}</h3>
                                <p className="text-muted-fixed font-lato text-[#6B7280] flex items-center gap-1 mb-4">
                                    <MapPin className="w-3 h-3 text-[#16A34A]"/> {farmer.location || 'India'} • {farmer.farmSize || 'N/A'}
                                </p>
                                
                                <div className="flex-1"></div>

                                <div className="w-full flex items-center justify-between border-t border-[#D1D5DB] pt-4 mt-4">
                                    <div className="flex items-center gap-2 text-[#374151] font-rajdhani font-bold text-label-fixed">
                                        <Box className="w-4 h-4 text-[#D97706]" />
                                        <span data-i18n="farmers.products_count" data-i18n-params={JSON.stringify({ count: farmerProductsCount })}>{t('farmers.products_count', { count: farmerProductsCount })}</span>
                                    </div>
                                    <button className="text-muted-fixed font-rajdhani font-bold text-[#16A34A] uppercase tracking-widest hover:underline line-clamp-1 border px-2 py-1 rounded bg-[#F0FAF0] border-[#16A34A]" data-i18n="farmers.view_products">{t('farmers.view_products') || 'View Products'}</button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
