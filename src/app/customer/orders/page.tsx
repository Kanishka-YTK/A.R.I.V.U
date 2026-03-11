'use client';

import { motion } from 'framer-motion';
import { Package, Eye, MapPin } from 'lucide-react';
import { useTranslation } from '@/store/languageStore';

export default function CustomerOrders() {
    const { t } = useTranslation();
    const mockOrders = [
        { id: 'ORD-1004', product: 'Country Wheat Seeds', qty: 2, type: 'Retail', total: 12.00, status: 'Delivered', date: 'Oct 12, 2026', tracking: 'TRK-9821' },
        { id: 'ORD-1005', product: 'Organic Heirloom Tomatoes', qty: 5, type: 'Retail', total: 22.50, status: 'Processing', date: 'Oct 15, 2026', tracking: 'Pending' },
        { id: 'ORD-1006', product: 'Neem-extract Pesticide', qty: 10, type: 'Wholesale', total: 100.00, status: 'Shipped', date: 'Oct 14, 2026', tracking: 'TRK-3341' },
    ];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Processing': return 'bg-[#F59E0B] text-[#FFFFFF] border-[#F59E0B]';
            case 'Shipped': return 'bg-[#0EA5E9] text-[#FFFFFF] border-[#0EA5E9]';
            case 'Delivered': return 'bg-[#22C55E] text-[#FFFFFF] shadow-[0_2px_10px_rgba(34,197,94,0.3)] border-[#22C55E]';
            default: return 'bg-[#6B7280] text-[#FFFFFF] border-[#6B7280]';
        }
    };

    return (
        <div className="space-y-8 pb-12 w-full pt-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D1D5DB] pb-6"
            >
                <div>
                    <h1 className="font-cinzel text-3xl md:text-4xl text-[#1A1A1A] font-bold tracking-wider uppercase mb-2" data-i18n="ord.title">
                        {t('ord.title')}
                    </h1>
                    <p className="font-lato text-[#374151]" data-i18n="ord.desc">{t('ord.desc')}</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#FFFFFF] rounded-[16px] shadow-sm border border-[#16A34A] overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F0FAF0] border-b border-[#16A34A] font-rajdhani uppercase tracking-widest text-[#1A4731] text-sm">
                                <th className="p-4 pl-6 font-bold" data-i18n="ord.id">{t('ord.id')}</th>
                                <th className="p-4 font-bold" data-i18n="ord.date">{t('ord.date')}</th>
                                <th className="p-4 font-bold" data-i18n="ord.prod">{t('ord.prod')}</th>
                                <th className="p-4 font-bold" data-i18n="ord.total">{t('ord.total')}</th>
                                <th className="p-4 font-bold" data-i18n="ord.status">{t('ord.status')}</th>
                                <th className="p-4 font-bold" data-i18n="ord.tracking">{t('ord.tracking')}</th>
                                <th className="p-4 font-bold text-center" data-i18n="ord.action">{t('ord.action')}</th>
                            </tr>
                        </thead>
                        <tbody className="font-lato text-[#374151]">
                            {mockOrders.map((order, i) => (
                                <motion.tr 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + (i * 0.1) }}
                                    key={order.id} 
                                    className="border-b border-[#D1D5DB] hover:bg-[#F0FAF0] transition-colors group"
                                >
                                    <td className="p-4 pl-6 font-rajdhani font-bold text-[#1A1A1A]">{order.id}</td>
                                    <td className="p-4 text-sm">{order.date}</td>
                                     <td className="p-4">
                                        <div>
                                            <span className="font-bold">{order.product}</span>
                                            <div className="text-xs text-[#6B7280] mt-1 uppercase tracking-widest">
                                                {order.qty}x <span data-i18n={order.type === 'Retail' ? 'shop.retail' : 'shop.wholesale'}>{t(order.type === 'Retail' ? 'shop.retail' : 'shop.wholesale')}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-rajdhani font-bold text-lg text-[#16A34A]">${order.total.toFixed(2)}</td>
                                     <td className="p-4">
                                        <div 
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}
                                            data-i18n={order.status === 'Processing' ? 'farm.status.processing' : order.status === 'Shipped' ? 'farm.status.shipped' : 'farm.status.delivered'}
                                        >
                                            {t(order.status === 'Processing' ? 'farm.status.processing' : order.status === 'Shipped' ? 'farm.status.shipped' : 'farm.status.delivered')}
                                        </div>
                                    </td>
                                    <td className="p-4 font-mono text-xs text-[#16A34A]">{order.tracking}</td>
                                    <td className="p-4 text-center">
                                        <button className="p-2 bg-[#FFFFFF] rounded-full shadow-sm hover:bg-[#16A34A] hover:text-[#FFFFFF] transition-colors text-[#16A34A] border border-[#16A34A] inline-flex items-center justify-center">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="bg-[#FFFFFF] border border-[#D97706] rounded-[16px] p-6 flex items-start gap-4">
                 <MapPin className="w-6 h-6 text-[#D97706] shrink-0 mt-1" />
                <div>
                    <h3 className="font-rajdhani font-bold text-[#1A1A1A] uppercase tracking-widest mb-1" data-i18n="ord.note_title">{t('ord.note_title')}</h3>
                    <p className="font-lato text-sm text-[#374151]" data-i18n="ord.note_desc">{t('ord.note_desc')}</p>
                </div>
            </motion.div>
        </div>
    );
}
