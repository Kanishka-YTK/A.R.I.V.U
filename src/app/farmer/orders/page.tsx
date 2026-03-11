'use client';

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useTranslation } from '@/store/languageStore';

export default function FarmerOrders() {
    const { t } = useTranslation();
    const mockOrders = [
        { id: 'ORD-1001', customer: 'Sophia Buyer', product: 'prod.heirloom_tomatoes', qty: 5, type: 'Retail', total: 22.50, country: 'USA', status: 'Pending' },
        { id: 'ORD-1002', customer: 'Global Trade Corp', product: 'prod.neem_pesticide', qty: 100, type: 'Wholesale', total: 1000.00, country: 'UAE', status: 'Shipped' },
        { id: 'ORD-1003', customer: 'Local Mart', product: 'prod.heirloom_tomatoes', qty: 60, type: 'Wholesale', total: 180.00, country: 'India', status: 'Confirmed' },
        { id: 'ORD-1004', customer: 'John Doe', product: 'prod.whole_wheat', qty: 2, type: 'Retail', total: 12.00, country: 'UK', status: 'Delivered' },
    ];

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Pending': return 'bg-[#F59E0B] text-[#FFFFFF] border-[#F59E0B]';
            case 'Confirmed': return 'bg-[#16A34A] text-[#FFFFFF] border-[#16A34A]';
            case 'Shipped': return 'bg-[#0EA5E9] text-[#FFFFFF] border-[#0EA5E9]';
            case 'Delivered': return 'bg-[#22C55E] text-[#FFFFFF] shadow-[0_2px_10px_rgba(34,197,94,0.3)] border-[#22C55E]';
            default: return 'bg-[#6B7280] text-[#FFFFFF] border-[#6B7280]';
        }
    };

    return (
        <div className="space-y-8 pb-12 w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D1D5DB] pb-6"
            >
                <div>
                    <h1 className="font-cinzel text-3xl md:text-4xl text-[#1A1A1A] font-bold tracking-wider uppercase mb-2" data-i18n="shop.orders">
                        {t('shop.orders')}
                    </h1>
                    <p className="font-lato text-[#374151]" data-i18n="farm.orders_desc">{t('farm.orders_desc') || 'Manage and fulfill your customer requests.'}</p>
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
                                <th className="p-4 pl-6 font-bold" data-i18n="orders.id">{t('orders.id')}</th>
                                <th className="p-4 font-bold" data-i18n="orders.customer">{t('orders.customer')}</th>
                                <th className="p-4 font-bold" data-i18n="orders.product">{t('orders.product')}</th>
                                <th className="p-4 font-bold" data-i18n="orders.qty">{t('orders.qty')}</th>
                                <th className="p-4 font-bold" data-i18n="orders.type">{t('orders.type')}</th>
                                <th className="p-4 font-bold" data-i18n="orders.total">{t('orders.total')}</th>
                                <th className="p-4 font-bold" data-i18n="orders.country">{t('orders.country')}</th>
                                <th className="p-4 font-bold" data-i18n="orders.status">{t('orders.status')}</th>
                            </tr>
                        </thead>
                        <tbody className="font-lato text-[#374151]">
                            {mockOrders.map((order, i) => (
                                <motion.tr 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + (i * 0.1) }}
                                    key={order.id} 
                                    className="border-b border-[#D1D5DB] hover:bg-[#F0FAF0] transition-colors cursor-pointer"
                                >
                                    <td className="p-4 pl-6 font-rajdhani font-bold text-[#1A1A1A]">{order.id}</td>
                                    <td className="p-4 text-[#1A1A1A] font-medium">{order.customer}</td>
                                    <td className="p-4">{t(order.product)}</td>
                                    <td className="p-4">{order.qty}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit whitespace-nowrap ${order.type === 'Retail' ? 'bg-[#16A34A] text-[#FFFFFF]' : 'bg-[#D97706] text-[#FFFFFF]'}`}
                                            data-i18n={order.type === 'Retail' ? 'shop.retail' : 'shop.wholesale'}>
                                            {order.type === 'Retail' ? t('shop.retail') : t('shop.wholesale')}
                                        </span>
                                    </td>
                                    <td className="p-4 font-rajdhani font-bold text-[#1A4731]">${order.total.toFixed(2)}</td>
                                    <td className="p-4">{order.country}</td>
                                    <td className="p-4">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border whitespace-nowrap ${getStatusColor(order.status)}`}
                                            data-i18n={`orders.${order.status.toLowerCase()}`}>
                                            {t(`orders.${order.status.toLowerCase()}`)}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
